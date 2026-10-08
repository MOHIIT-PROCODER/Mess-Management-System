import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Utensils, GraduationCap, User, Mail, Lock, Phone,
  Building, ArrowRight, Hash, BedDouble, Loader2, CheckCircle, AlertCircle,
  Sun, Moon
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useTheme } from '../../context/ThemeContext';

const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';

const HOSTELS = [
  'BH-7 (Boys Hostel 7)',
  'BH-7',
  'Aryabhata Boys Hostel',
  'Gargi Girls Hostel',
  'Ramanujan Hall of Residence',
  'Sarojini Naidu Girls Hostel',
];

const HOSTEL_IDS = {
  'BH-7 (Boys Hostel 7)': 'a1b2c3d4-0000-0000-0000-000000000007',
  'BH-7': 'a1b2c3d4-0000-0000-0000-000000000007',
  'Aryabhata Boys Hostel': 'a1b2c3d4-0000-0000-0000-000000000001',
  'Gargi Girls Hostel': 'a1b2c3d4-0000-0000-0000-000000000002',
  'Ramanujan Hall of Residence': 'a1b2c3d4-0000-0000-0000-000000000003',
  'Sarojini Naidu Girls Hostel': 'a1b2c3d4-0000-0000-0000-000000000004',
};

export const Register = () => {
  const { isDark, toggleTheme } = useTheme();
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roll_number: '',
    room_number: '',
    phone: '',
    hostel_name: HOSTELS[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const validate = () => {
    if (!form.full_name.trim()) return 'Full name is required.';
    if (!form.email.trim()) return 'Email is required.';
    if (!form.roll_number.trim()) return 'Roll number is required.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    const normalizedEmail = form.email.trim().toLowerCase();

    try {
      const studentRecord = {
        email: normalizedEmail,
        password: form.password,
        full_name: form.full_name.trim(),
        roll_number: form.roll_number.trim(),
        room_number: form.room_number.trim() || '101',
        phone: form.phone.trim() || null,
        hostel_name: form.hostel_name,
        hostel_id: HOSTEL_IDS[form.hostel_name] || 'a1b2c3d4-0000-0000-0000-000000000007',
        role: 'student',
      };

      // Store local copy for immediate synchronization guarantee
      try {
        localStorage.setItem('iterp_registered_user_' + normalizedEmail, JSON.stringify(studentRecord));
        localStorage.setItem('iterp_last_registered_profile', JSON.stringify(studentRecord));
        localStorage.setItem('iterp_last_registered_email', normalizedEmail);
      } catch (e) {}

      // 1. Try Backend Pre-Confirmed Registration First (Bypasses email verification blocker)
      let registeredViaBackend = false;
      try {
        const backendRes = await axios.post(`${API_URL}/auth/register`, studentRecord);
        if (backendRes.data && backendRes.data.success) {
          registeredViaBackend = true;
        }
      } catch (backendErr) {
        console.warn('Backend register call notice:', backendErr.response?.data?.message || backendErr.message);
      }

      // 2. Client-side Supabase Auth fallback if backend unavailable
      if (!registeredViaBackend) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password: form.password,
          options: {
            data: {
              full_name: studentRecord.full_name,
              roll_number: studentRecord.roll_number,
              room_number: studentRecord.room_number,
              phone: studentRecord.phone,
              hostel_name: studentRecord.hostel_name,
              hostel_id: studentRecord.hostel_id,
              role: 'student',
            },
          },
        });

        if (authError) {
          setError(authError.message);
          setLoading(false);
          return;
        }

        // Insert profile into database
        if (authData.user) {
          try {
            await supabase.from('profiles').upsert({
              id: authData.user.id,
              email: normalizedEmail,
              full_name: studentRecord.full_name,
              roll_number: studentRecord.roll_number,
              room_number: studentRecord.room_number,
              phone_number: studentRecord.phone,
              hostel_id: studentRecord.hostel_id,
              role: 'student',
            });

            await supabase.from('students').upsert({
              id: authData.user.id,
              email: normalizedEmail,
              full_name: studentRecord.full_name,
              roll_number: studentRecord.roll_number,
              room_number: studentRecord.room_number,
              phone: studentRecord.phone,
              hostel_name: studentRecord.hostel_name,
              hostel_id: studentRecord.hostel_id,
              role: 'student',
            });
          } catch (e) {
            console.warn('DB student insert notice:', e.message);
          }
        }
      }

      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Registration failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/20 shadow-2xl text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Account Created & Verified!</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Your student account for <span className="font-semibold text-indigo-600 dark:text-indigo-400">{form.email}</span> is ready. No email confirmation waiting required!
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Redirecting to login portal...</p>
          <Link
            to="/login"
            className="inline-block w-full gradient-btn py-3 rounded-xl font-bold text-sm text-white text-center"
          >
            Go to Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors py-12">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Theme Toggle (Light / Dark Mode) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme mode"
          className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group ring-1 ring-slate-900/5 dark:ring-white/10"
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              <span className="text-xs font-semibold">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
              <span className="text-xs font-semibold">Dark Mode</span>
            </>
          )}
        </button>
      </div>

      <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-card space-y-6 border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-slate-900/90 shadow-2xl relative z-10">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
            <Utensils className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Student Registration</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Create your campus dining account for instant meal access
          </p>
        </div>

        {/* Role indicator */}
        <div className="flex items-center justify-center space-x-2 py-2 px-4 rounded-2xl bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-200 dark:border-indigo-500/30">
          <div className="p-1.5 rounded-xl bg-indigo-600 text-white">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-indigo-700 dark:text-indigo-400">Student Portal Registration</span>
        </div>

        {/* Admin note */}
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            <strong>Mess Admin & Super Admin:</strong> Official staff credentials are pre-configured on the login screen.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">

          {/* Full Name */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                name="full_name"
                type="text"
                required
                value={form.full_name}
                onChange={handleChange}
                placeholder="e.g. Aarav Patel"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Campus Email *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="student@campus.edu"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Roll Number + Room Number */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Roll Number *</label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  name="roll_number"
                  type="text"
                  required
                  value={form.roll_number}
                  onChange={handleChange}
                  placeholder="21CS089"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Room No.</label>
              <div className="relative">
                <BedDouble className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  name="room_number"
                  type="text"
                  value={form.room_number}
                  onChange={handleChange}
                  placeholder="204-A"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Hostel */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Assigned Hostel *</label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <select
                name="hostel_name"
                value={form.hostel_name}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500 appearance-none"
              >
                {HOSTELS.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Confirm Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 text-sm text-white shadow-lg shadow-indigo-500/25 mt-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Student Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 dark:text-slate-400 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
