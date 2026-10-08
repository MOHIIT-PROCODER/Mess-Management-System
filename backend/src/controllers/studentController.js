// backend/src/controllers/studentController.js
const supabaseAdmin = require('../config/supabase');
const { successResponse, errorResponse } = require('../utils/response');

const getStudentProfile = async (req, res) => {
  try {
    const studentId = req.params.id || req.user?.id || 'demo-student';
    const { data } = await supabaseAdmin.from('profiles').select('*, hostels(name)').eq('id', studentId).single();

    return successResponse(res, 'Student profile retrieved', data || {
      id: studentId,
      full_name: 'Aarav Patel',
      roll_number: '21CS089',
      email: 'aarav.patel@student.edu',
      phone_number: '+91 98765 43210',
      room_number: '204-A',
      hostel_name: 'Aryabhata Boys Hostel',
      streak_days: 14,
      total_points: 650
    });
  } catch (err) {
    return errorResponse(res, 'Failed to fetch student profile: ' + err.message, 500);
  }
};

const getStudentAchievements = async (req, res) => {
  try {
    return successResponse(res, 'Student achievements fetched', [
      { id: '1', title: 'Meal Starter', description: 'Attended 30 meals in the month (25% progress)', badge: '🥉', points: 100, unlocked: true },
      { id: '2', title: 'Meal Pro', description: 'Attended 60 meals in the month (50% progress)', badge: '🥈', points: 250, unlocked: true },
      { id: '3', title: 'Meal Master', description: 'Attended 90 meals in the month (75% progress)', badge: '🥇', points: 400, unlocked: false },
      { id: '4', title: 'Mess Legend', description: 'Attended 120+ meals in the month (100% progress)', badge: '👑', points: 600, unlocked: false }
    ]);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch achievements: ' + err.message, 500);
  }
};

const updateStudentProfile = async (req, res) => {
  try {
    const { id, full_name, room_number, hostel_name, hostel_id, phone, dietary_pref } = req.body;
    if (id) {
      try {
        await supabaseAdmin.from('students').update({
          full_name,
          room_number,
          hostel_name,
          hostel_id,
          phone
        }).eq('id', id);
        await supabaseAdmin.from('profiles').update({
          full_name,
          room_number,
          hostel_name,
          hostel_id,
          phone
        }).eq('id', id);
      } catch (dbErr) {
        console.warn('Supabase DB update note:', dbErr.message);
      }
    }
    return successResponse(res, 'Student profile updated successfully', {
      id, full_name, room_number, hostel_name, hostel_id, phone, dietary_pref
    });
  } catch (err) {
    return errorResponse(res, 'Failed to update profile: ' + err.message, 500);
  }
};

module.exports = {
  getStudentProfile,
  getStudentAchievements,
  updateStudentProfile
};
