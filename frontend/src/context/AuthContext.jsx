import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const AuthContext = createContext();

// Base and Dynamic Admin Credentials
export const getAdminCredentials = () => {
  const base = {
    hostel_admin: [
      { email: 'warden.bh7@campus.edu', password: 'warden123', data: { id: 'hostel-admin-07', full_name: 'Dr. S. K. Mahapatra (BH-7 Warden)', role: 'hostel_admin', hostel_name: 'BH-7 (Boys Hostel 7)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000007' } },
      { email: 'warden.bh1@campus.edu', password: 'warden123', data: { id: 'hostel-admin-01', full_name: 'Prof. R. C. Mohanty (BH-1 Warden)', role: 'hostel_admin', hostel_name: 'Aryabhata Boys Hostel (BH-1)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000001' } },
      { email: 'warden.bh2@campus.edu', password: 'warden123', data: { id: 'hostel-admin-02', full_name: 'Dr. A. K. Behera (BH-2 Warden)', role: 'hostel_admin', hostel_name: 'Varahamihira Boys Hostel (BH-2)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000002' } },
      { email: 'warden.bh3@campus.edu', password: 'warden123', data: { id: 'hostel-admin-03', full_name: 'Dr. P. K. Jena (BH-3 Warden)', role: 'hostel_admin', hostel_name: 'Charaka Boys Hostel (BH-3)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000003' } },
      { email: 'warden.bh4@campus.edu', password: 'warden123', data: { id: 'hostel-admin-04', full_name: 'Dr. M. M. Mishra (BH-4 Warden)', role: 'hostel_admin', hostel_name: 'Sushruta Boys Hostel (BH-4)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000004' } },
      { email: 'warden.bh5@campus.edu', password: 'warden123', data: { id: 'hostel-admin-05', full_name: 'Prof. S. R. Pattnaik (BH-5 Warden)', role: 'hostel_admin', hostel_name: 'Bhaskara Boys Hostel (BH-5)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000005' } },
      { email: 'warden.bh6@campus.edu', password: 'warden123', data: { id: 'hostel-admin-06', full_name: 'Dr. K. C. Tripathy (BH-6 Warden)', role: 'hostel_admin', hostel_name: 'Brahmagupta Boys Hostel (BH-6)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000006' } },
      { email: 'warden.gh1@campus.edu', password: 'warden123', data: { id: 'hostel-admin-08', full_name: 'Dr. Sunita Nayak (GH-1 Warden)', role: 'hostel_admin', hostel_name: 'Gargi Girls Hostel (GH-1)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000008' } },
      { email: 'warden.gh2@campus.edu', password: 'warden123', data: { id: 'hostel-admin-09', full_name: 'Dr. Rashmi Das (GH-2 Warden)', role: 'hostel_admin', hostel_name: 'Maitreyi Girls Hostel (GH-2)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000009' } },
      { email: 'warden.gh3@campus.edu', password: 'warden123', data: { id: 'hostel-admin-10', full_name: 'Dr. Meenakshi Sahu (GH-3 Warden)', role: 'hostel_admin', hostel_name: 'Kalpana Chawla Girls Hostel (GH-3)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000010' } },
    ],
    mess_admin: [
      { email: 'admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-01', full_name: 'Rajesh Sharma', role: 'mess_admin', hostel_name: 'Aryabhata Boys Hostel (BH-1)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000001' } },
      { email: 'bh7admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-07', full_name: 'Alok Verma (BH-7 Caterer)', role: 'mess_admin', hostel_name: 'BH-7 (Boys Hostel 7)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000007' } },
      { email: 'bh2admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-02', full_name: 'Maa Tarini Caterers', role: 'mess_admin', hostel_name: 'Varahamihira Boys Hostel (BH-2)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000002' } },
      { email: 'bh3admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-03', full_name: 'Sahoo Hospitality', role: 'mess_admin', hostel_name: 'Charaka Boys Hostel (BH-3)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000003' } },
      { email: 'bh4admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-04', full_name: 'Utkal Foods', role: 'mess_admin', hostel_name: 'Sushruta Boys Hostel (BH-4)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000004' } },
      { email: 'bh5admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-05', full_name: 'Sai Kitchens', role: 'mess_admin', hostel_name: 'Bhaskara Boys Hostel (BH-5)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000005' } },
      { email: 'bh6admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-06', full_name: 'Royal Caterers', role: 'mess_admin', hostel_name: 'Brahmagupta Boys Hostel (BH-6)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000006' } },
      { email: 'gh1admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-08', full_name: 'Priya Food Services', role: 'mess_admin', hostel_name: 'Gargi Girls Hostel (GH-1)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000008' } },
      { email: 'gh2admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-09', full_name: 'Annapurna Foods', role: 'mess_admin', hostel_name: 'Maitreyi Girls Hostel (GH-2)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000009' } },
      { email: 'gh3admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-10', full_name: 'Shree Krishna Mess', role: 'mess_admin', hostel_name: 'Kalpana Chawla Girls Hostel (GH-3)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000010' } },
    ],
    super_admin: [
      { email: 'director@campus.edu', password: 'super123', data: { id: 'super-admin-01', full_name: 'Dr. V. Ramanathan (Chief Warden)', role: 'super_admin', hostel_name: 'All Campuses (Directorate)' } },
      { email: 'superadmin@campus.edu', password: 'super123', data: { id: 'super-admin-02', full_name: 'Dean Student Affairs', role: 'super_admin', hostel_name: 'All Campuses' } },
    ]
  };

  try {
    const saved = localStorage.getItem('iterp_custom_admins');
    if (saved) {
      const custom = JSON.parse(saved);
      if (Array.isArray(custom)) {
        custom.forEach((acc) => {
          if (acc.role && base[acc.role]) {
            base[acc.role].push(acc);
          }
        });
      }
    }
  } catch (e) {
    console.warn('Custom admins load note:', e);
  }

  return base;
};

const ADMIN_CREDENTIALS = getAdminCredentials();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mess_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  // Sync Supabase session on mount
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        const saved = localStorage.getItem('mess_user');
        if (saved) {
          const parsed = JSON.parse(saved);
          // Keep admin sessions (they don't use Supabase Auth)
          if (parsed.role !== 'student') return;
        }
        setUser(null);
        localStorage.removeItem('mess_user');
      } else if (event === 'SIGNED_IN' && session) {
        const supaUser = session.user;
        const normalizedEmail = supaUser.email?.toLowerCase();

        let profileData = null;
        try {
          const { data: prof } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', supaUser.id)
            .single();
          if (prof) profileData = prof;
        } catch (e) {}

        if (!profileData) {
          try {
            const { data: stud } = await supabase
              .from('students')
              .select('*')
              .eq('id', supaUser.id)
              .single();
            if (stud) profileData = stud;
          } catch (e) {}
        }

        const meta = supaUser.user_metadata || {};
        let localSaved = null;
        try {
          const s = localStorage.getItem('iterp_registered_user_' + normalizedEmail) || localStorage.getItem('iterp_last_registered_profile');
          if (s) localSaved = JSON.parse(s);
        } catch (e) {}

        const resolvedFullName = profileData?.full_name || meta.full_name || localSaved?.full_name || 'Student';
        const resolvedRoll = profileData?.roll_number || meta.roll_number || localSaved?.roll_number || '';
        const resolvedRoom = profileData?.room_number || meta.room_number || localSaved?.room_number || '101';
        const resolvedPhone = profileData?.phone_number || profileData?.phone || meta.phone || localSaved?.phone || '';
        const resolvedHostelName = profileData?.hostel_name || meta.hostel_name || localSaved?.hostel_name || 'BH-7 (Boys Hostel 7)';
        const resolvedHostelId = profileData?.hostel_id || meta.hostel_id || localSaved?.hostel_id || 'a1b2c3d4-0000-0000-0000-000000000007';

        const userData = {
          id: supaUser.id,
          email: supaUser.email,
          full_name: resolvedFullName,
          roll_number: resolvedRoll,
          room_number: resolvedRoom,
          phone: resolvedPhone,
          phone_number: resolvedPhone,
          hostel_name: resolvedHostelName,
          hostel_id: resolvedHostelId,
          role: 'student',
          supabase_session: true,
        };

        setUser(userData);
        localStorage.setItem('mess_user', JSON.stringify(userData));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('mess_user', JSON.stringify(userData));
  };

  const logout = async () => {
    const saved = localStorage.getItem('mess_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.role === 'student') {
        await supabase.auth.signOut();
      }
    }
    setUser(null);
    localStorage.removeItem('mess_user');
  };

  const switchRole = (newRole) => {
    const updated = { ...user, role: newRole };
    setUser(updated);
    localStorage.setItem('mess_user', JSON.stringify(updated));
  };

  const updateUser = (updatedFields) => {
    const updated = { ...(user || {}), ...updatedFields };
    setUser(updated);
    localStorage.setItem('mess_user', JSON.stringify(updated));
    return updated;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, updateUser, loading, setLoading, ADMIN_CREDENTIALS }}>
      {children}
    </AuthContext.Provider>
  );
};
