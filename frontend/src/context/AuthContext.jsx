import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const AuthContext = createContext();

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  hostel_admin: [
    { email: 'warden.bh7@campus.edu', password: 'warden123', data: { id: 'hostel-admin-07', full_name: 'Dr. S. K. Mahapatra (BH-7 Warden)', role: 'hostel_admin', hostel_name: 'BH-7 (Boys Hostel 7)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000007' } },
    { email: 'warden.bh1@campus.edu', password: 'warden123', data: { id: 'hostel-admin-01', full_name: 'Prof. R. C. Mohanty (BH-1 Warden)', role: 'hostel_admin', hostel_name: 'Aryabhata Boys Hostel (BH-1)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000001' } },
  ],
  mess_admin: [
    { email: 'admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-01', full_name: 'Rajesh Sharma', role: 'mess_admin', hostel_name: 'Aryabhata Boys Hostel (BH-1)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000001' } },
    { email: 'bh7admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-07', full_name: 'Alok Verma (BH-7 Caterer)', role: 'mess_admin', hostel_name: 'BH-7 (Boys Hostel 7)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000007' } },
  ],
  super_admin: [
    { email: 'director@campus.edu', password: 'super123', data: { id: 'super-admin-01', full_name: 'Dr. V. Ramanathan (Chief Warden)', role: 'super_admin', hostel_name: 'All Campuses (Directorate)' } },
    { email: 'superadmin@campus.edu', password: 'super123', data: { id: 'super-admin-02', full_name: 'Dean Student Affairs', role: 'super_admin', hostel_name: 'All Campuses' } },
  ]
};

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
