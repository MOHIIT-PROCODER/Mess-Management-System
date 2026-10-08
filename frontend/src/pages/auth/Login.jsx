import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Utensils, Lock, Mail, ArrowRight, GraduationCap, ChefHat,
  ShieldCheck, Sparkles, Loader2, AlertCircle, Eye, EyeOff
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabaseClient';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';

// Hardcoded Admin Credentials (same as AuthContext)
const ADMIN_CREDENTIALS = {
  mess_admin: [
    { email: 'admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-01', full_name: 'Rajesh Sharma', role: 'mess_admin', hostel_name: 'Aryabhata Boys Hostel', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000001' } },
    { email: 'warden@campus.edu', password: 'admin123', data: { id: 'mess-admin-02', full_name: 'Priya Singh', role: 'mess_admin', hostel_name: 'Gargi Girls Hostel', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000002' } },
    { email: 'bh7admin@mess.edu', password: 'admin123', data: { id: 'mess-admin-07', full_name: 'Alok Verma (BH-7)', role: 'mess_admin', hostel_name: 'BH-7 (Boys Hostel 7)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000007' } },
  ],
  super_admin: [
    { email: 'director@campus.edu', password: 'super123', data: { id: 'super-admin-01', full_name: 'Dr. V. Ramanathan', role: 'super_admin', hostel_name: 'All Campuses (Directorate)' } },
    { email: 'superadmin@campus.edu', password: 'super123', data: { id: 'super-admin-02', full_name: 'Dean Admin', role: 'super_admin', hostel_name: 'All Campuses' } },
  ]
};

export const Login = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (role === 'student') {
        const normalizedEmail = email.trim().toLowerCase();

        // ── Student: Authenticate via Supabase Auth ──
        let { data, error: authError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        // If email not confirmed, auto-confirm on backend and retry immediately!
        if (authError && (authError.message?.toLowerCase().includes('not confirmed') || authError.message?.toLowerCase().includes('email_not_confirmed'))) {
          try {
            await axios.post(`${API_URL}/auth/auto-confirm`, { email: normalizedEmail });
            const retry = await supabase.auth.signInWithPassword({
              email: normalizedEmail,
              password,
            });
            data = retry.data;
            authError = retry.error;
          } catch (autoConfirmErr) {
            console.warn('Auto confirm fallback notice:', autoConfirmErr);
          }
        }

        if (authError) {
          setError(authError.message || 'Invalid email or password.');
          setLoading(false);
          return;
        }

        // Fetch student profile from profiles table first, with fallback to students table
        let profileData = null;
        try {
          const { data: prof } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();
          if (prof) profileData = prof;
        } catch (e) {}

        if (!profileData) {
          try {
            const { data: stud } = await supabase
              .from('students')
              .select('*')
              .eq('id', data.user.id)
              .single();
            if (stud) profileData = stud;
          } catch (e) {}
        }

        const meta = data.user.user_metadata || {};
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
          id: data.user.id,
          email: data.user.email,
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
        login(userData);

        navigate('/student');

      } else {
        // ── Admin: Check hardcoded credentials ──
        const credList = ADMIN_CREDENTIALS[role] || [];
        const match = credList.find(
          (c) => c.email.toLowerCase() === email.trim().toLowerCase() && c.password === password
        );

        if (!match) {
          setError(`Invalid ${role === 'super_admin' ? 'Super Admin' : 'Mess Admin'} credentials.`);
          setLoading(false);
          return;
        }

        login(match.data);
        navigate(role === 'super_admin' ? '/superadmin' : '/admin');
      }
    } catch (err) {
      setError('Login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Quick demo logins
  const handleQuickLogin = async (quickRole) => {
    setLoading(true);
    setError('');
    try {
      if (quickRole === 'student') {
        // Use demo student credentials from Supabase (if configured) or fallback
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: 'demo.student@campus.edu',
          password: 'demo123456',
        });

        if (authError) {
          // Fallback to mock if demo account doesn't exist
          const userData = {
            id: 'student-demo-id',
            email: 'demo.student@campus.edu',
            full_name: 'Aarav Patel',
            roll_number: '21CS089',
            room_number: '204-A',
            role: 'student',
            hostel_name: 'BH-7 (Boys Hostel 7)',
            hostel_id: 'a1b2c3d4-0000-0000-0000-000000000007',
          };
          login(userData);
        } else {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          login({
            id: data.user.id,
            email: data.user.email,
            full_name: profile?.full_name || 'Aarav Patel',
            roll_number: profile?.roll_number || '21CS089',
            room_number: profile?.room_number || '204-A',
            role: 'student',
            hostel_name: profile?.hostel_name || 'BH-7 (Boys Hostel 7)',
            hostel_id: profile?.hostel_id || 'a1b2c3d4-0000-0000-0000-000000000007',
            supabase_session: true,
          });
        }
        navigate('/student');
      } else if (quickRole === 'mess_admin') {
        login(ADMIN_CREDENTIALS.mess_admin[0].data);
        navigate('/admin');
      } else {
        login(ADMIN_CREDENTIALS.super_admin[0].data);
        navigate('/superadmin');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Credential hints
  const getCredentialHint = () => {
    if (role === 'mess_admin') {
      return { label: 'Mess Admin credentials (contact director)', hint: 'admin@mess.edu / admin123  or  warden@campus.edu / admin123' };
    }
    if (role === 'super_admin') {
      return { label: 'Super Admin credentials (provided by IT)', hint: 'director@campus.edu / super123' };
    }
    return null;
  };

  const credHint = getCredentialHint();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors py-10">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-card space-y-6 border border-slate-200 dark:border-indigo-500/20 shadow-2xl relative z-10 bg-white dark:bg-slate-900/90">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
            <Utensils className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Sign In to MessSphere</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Campus Dining & QR Attendance Portal</p>
        </div>

        {/* Role Selection Tabs */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Your Portal Role</label>
          <div className="grid grid-cols-3 gap-2">

            {/* Student Tab */}
            <button
              type="button"
              onClick={() => handleRoleSelect('student')}
              className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                role === 'student'
                  ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm ring-2 ring-indigo-500/30'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <div className={`p-1.5 rounded-xl ${role === 'student' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold">Student</span>
            </button>

            {/* Mess Admin Tab */}
            <button
              type="button"
              onClick={() => handleRoleSelect('mess_admin')}
              className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                role === 'mess_admin'
                  ? 'bg-purple-50 dark:bg-purple-600/20 border-purple-600 text-purple-600 dark:text-purple-400 font-bold shadow-sm ring-2 ring-purple-500/30'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <div className={`p-1.5 rounded-xl ${role === 'mess_admin' ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                <ChefHat className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold">Mess Admin</span>
            </button>

            {/* Super Admin Tab */}
            <button
              type="button"
              onClick={() => handleRoleSelect('super_admin')}
              className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                role === 'super_admin'
                  ? 'bg-amber-50 dark:bg-amber-600/20 border-amber-600 text-amber-600 dark:text-amber-400 font-bold shadow-sm ring-2 ring-amber-500/30'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <div className={`p-1.5 rounded-xl ${role === 'super_admin' ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold">Super Admin</span>
            </button>
          </div>
        </div>

        {/* Admin credential hint */}
        {credHint && (
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-xs">
            <p className="font-bold text-blue-700 dark:text-blue-400">{credHint.label}</p>
            <p className="text-blue-600 dark:text-blue-300 mt-0.5 font-mono">{credHint.hint}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              {role === 'super_admin' ? 'Director Email' : role === 'mess_admin' ? 'Staff Email' : 'Campus Email'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  role === 'super_admin' ? 'director@campus.edu' :
                  role === 'mess_admin' ? 'admin@mess.edu' :
                  'student@campus.edu'
                }
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl py-3 pl-10 pr-10 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded text-indigo-600 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
              <span className="font-medium">Remember Me</span>
            </label>
            {role === 'student' && (
              <Link to="/forgot-password" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                Forgot password?
              </Link>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 text-sm text-white shadow-lg shadow-indigo-500/25 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In to {role === 'super_admin' ? 'Super Admin' : role === 'mess_admin' ? 'Mess Admin' : 'Student'} Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Quick Demo Access</span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickLogin('student')}
              disabled={loading}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50 text-[10px] font-bold hover:bg-indigo-100 transition-colors disabled:opacity-60"
            >
              🎓 Student Demo
            </button>
            <button
              onClick={() => handleQuickLogin('mess_admin')}
              disabled={loading}
              className="px-2.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50 text-[10px] font-bold hover:bg-purple-100 transition-colors disabled:opacity-60"
            >
              👨‍🍳 Admin Demo
            </button>
            <button
              onClick={() => handleQuickLogin('super_admin')}
              disabled={loading}
              className="px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50 text-[10px] font-bold hover:bg-amber-100 transition-colors disabled:opacity-60"
            >
              🛡️ Super Demo
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 dark:text-slate-400 font-medium">
          New student?{' '}
          <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};
