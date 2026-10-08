// backend/src/controllers/authController.js
const supabaseAdmin = require('../config/supabase');
const { successResponse, errorResponse } = require('../utils/response');

const register = async (req, res) => {
  try {
    const { email, password, full_name, roll_number, role, hostel_id, hostel_name, room_number, phone } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    // Create user via Supabase Admin API with email_confirm: true (bypasses unconfirmed email gate)
    let createdUser = null;
    const { data: userData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: full_name?.trim(),
        role: role || 'student',
        roll_number: roll_number?.trim(),
        hostel_id: hostel_id || 'a1b2c3d4-0000-0000-0000-000000000007',
        hostel_name: hostel_name || 'BH-7 (Boys Hostel 7)',
        room_number: room_number?.trim() || '101',
        phone: phone?.trim()
      }
    });

    if (userData && userData.user) {
      createdUser = userData.user;
    }

    if (authError) {
      // If user already exists, update and confirm their email
      if (
        authError.message?.toLowerCase().includes('already') ||
        authError.message?.toLowerCase().includes('exists')
      ) {
        try {
          const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
          const existing = listData?.users?.find((u) => u.email.toLowerCase() === normalizedEmail);
          if (existing) {
            await supabaseAdmin.auth.admin.updateUserById(existing.id, {
              password,
              email_confirm: true,
              user_metadata: {
                full_name: full_name?.trim(),
                role: role || 'student',
                roll_number: roll_number?.trim(),
                hostel_id: hostel_id || 'a1b2c3d4-0000-0000-0000-000000000007',
                hostel_name: hostel_name || 'BH-7 (Boys Hostel 7)',
                room_number: room_number?.trim() || '101',
                phone: phone?.trim()
              }
            });
            createdUser = existing;
          }
        } catch (listErr) {
          console.warn('User update fallback error:', listErr);
        }
      }

      if (!createdUser) {
        return errorResponse(res, authError.message, 400);
      }
    }

    // Insert or update profiles & students table
    if (createdUser) {
      try {
        await supabaseAdmin.from('profiles').upsert({
          id: createdUser.id,
          email: normalizedEmail,
          full_name: full_name?.trim(),
          roll_number: roll_number?.trim() || null,
          role: role || 'student',
          hostel_id: hostel_id || 'a1b2c3d4-0000-0000-0000-000000000007',
          room_number: room_number?.trim() || '101',
          phone_number: phone?.trim() || null
        });

        await supabaseAdmin.from('students').upsert({
          id: createdUser.id,
          email: normalizedEmail,
          full_name: full_name?.trim(),
          roll_number: roll_number?.trim() || null,
          room_number: room_number?.trim() || '101',
          phone: phone?.trim() || null,
          hostel_name: hostel_name || 'BH-7 (Boys Hostel 7)',
          hostel_id: hostel_id || 'a1b2c3d4-0000-0000-0000-000000000007',
          role: 'student'
        });
      } catch (dbErr) {
        console.warn('DB profile upsert note:', dbErr.message);
      }
    }

    return successResponse(res, 'Student registration successful. Account is pre-confirmed for instant login.', { user: createdUser }, 201);
  } catch (err) {
    return errorResponse(res, 'Registration failed: ' + err.message, 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    // 1. First attempt login
    let { data, error } = await supabaseAdmin.auth.signInWithPassword({ email: normalizedEmail, password });

    // 2. If blocked by "Email not confirmed", auto-confirm with admin API and retry!
    if (error && (error.message.includes('not confirmed') || error.message.includes('email_not_confirmed'))) {
      try {
        const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
        const existing = listData?.users?.find((u) => u.email.toLowerCase() === normalizedEmail);
        if (existing) {
          await supabaseAdmin.auth.admin.updateUserById(existing.id, { email_confirm: true });
          const retry = await supabaseAdmin.auth.signInWithPassword({ email: normalizedEmail, password });
          data = retry.data;
          error = retry.error;
        }
      } catch (adminErr) {
        console.warn('Auto-confirm retry error:', adminErr);
      }
    }

    if (error) {
      return errorResponse(res, error.message, 401);
    }

    return successResponse(res, 'Login successful', data);
  } catch (err) {
    return errorResponse(res, 'Login failed: ' + err.message, 500);
  }
};

const autoConfirmUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return errorResponse(res, 'Email required', 400);

    const normalizedEmail = email.trim().toLowerCase();
    const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
    const existing = listData?.users?.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (existing) {
      await supabaseAdmin.auth.admin.updateUserById(existing.id, { email_confirm: true });
      return successResponse(res, 'Account verified and email confirmed');
    }

    return errorResponse(res, 'User not found in Supabase Auth', 404);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

const getMe = async (req, res) => {
  return successResponse(res, 'User profile fetched', req.user);
};

module.exports = {
  register,
  login,
  autoConfirmUser,
  getMe
};
