import React, { useState } from 'react';
import {
  Mail, Phone, Home, Shield, Award, Edit3, Check, X,
  Building, User, Hash, Utensils, Sparkles, CheckCircle2, AlertCircle
} from 'lucide-react';
import { ProfileImage } from './ProfileImage';
import { useAuth } from '../../../hooks/useAuth';
import { studentService } from '../../../services/studentService';
import { supabase } from '../../../lib/supabaseClient';

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

export const ProfileCard = ({ user: initialUser }) => {
  const { user: authUser, updateUser } = useAuth();
  const user = authUser || initialUser;

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    full_name: user?.full_name || 'Aarav Patel',
    hostel_name: user?.hostel_name || 'BH-7 (Boys Hostel 7)',
    room_number: user?.room_number || '204-A',
    phone: user?.phone || user?.phone_number || '+91 98765 43210',
    dietary_pref: user?.dietary_pref || 'Vegetarian'
  });

  const handleStartEdit = () => {
    setFormData({
      full_name: user?.full_name || 'Aarav Patel',
      hostel_name: user?.hostel_name || 'BH-7 (Boys Hostel 7)',
      room_number: user?.room_number || '204-A',
      phone: user?.phone || user?.phone_number || '+91 98765 43210',
      dietary_pref: user?.dietary_pref || 'Vegetarian'
    });
    setSuccessMessage('');
    setErrorMessage('');
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrorMessage('');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMessage('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.full_name.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }

    setSaving(true);
    setErrorMessage('');

    try {
      const hostelId = HOSTEL_IDS[formData.hostel_name] || 'a1b2c3d4-0000-0000-0000-000000000007';
      const payload = {
        id: user?.id,
        full_name: formData.full_name.trim(),
        hostel_name: formData.hostel_name,
        hostel_id: hostelId,
        room_number: formData.room_number.trim(),
        phone: formData.phone.trim(),
        phone_number: formData.phone.trim(),
        dietary_pref: formData.dietary_pref
      };

      // 1. Update AuthContext & localStorage immediately
      if (updateUser) {
        updateUser(payload);
      }

      // 2. Sync to Backend API
      await studentService.updateProfile(payload);

      // 3. Sync to Supabase DB directly if session exists
      if (user?.id) {
        try {
          await supabase.from('students').update({
            full_name: payload.full_name,
            hostel_name: payload.hostel_name,
            hostel_id: payload.hostel_id,
            room_number: payload.room_number,
            phone: payload.phone
          }).eq('id', user.id);

          await supabase.from('profiles').update({
            full_name: payload.full_name,
            hostel_name: payload.hostel_name,
            hostel_id: payload.hostel_id,
            room_number: payload.room_number,
            phone: payload.phone
          }).eq('id', user.id);
        } catch (supaErr) {
          console.warn('Direct Supabase update notice:', supaErr);
        }
      }

      setSaving(false);
      setIsEditing(false);
      setSuccessMessage('Profile details updated successfully!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error('Error saving profile:', err);
      setSaving(false);
      setErrorMessage('Failed to save profile changes. Please try again.');
    }
  };

  return (
    <div className="p-6 rounded-2xl glass-card space-y-6 relative overflow-hidden transition-all duration-300">
      {/* Background ambient accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Success Alert */}
      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage('')} className="text-emerald-600 hover:text-emerald-800">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs font-semibold flex items-center space-x-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
          <ProfileImage name={user?.full_name || 'Aarav Patel'} />
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {user?.full_name || 'Aarav Patel'}
              </h2>
            </div>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-bold flex items-center justify-center sm:justify-start space-x-1.5">
              <span>Roll No: {user?.roll_number || '21CS089'}</span>
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-0.5">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 text-[10px] uppercase font-bold">
                {user?.role || 'Student'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 text-[10px] font-bold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Verified Resident</span>
              </span>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        {!isEditing && (
          <button
            onClick={handleStartEdit}
            className="gradient-btn px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center space-x-2 shadow-md shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-transform shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Mode View: Edit Form vs Display Cards */}
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4 pt-1 animate-fadeIn">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Modify Resident Information</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Student Full Name"
              />
            </div>

            {/* Hostel Selection (includes BH-7) */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>Hostel Name</span>
              </label>
              <select
                name="hostel_name"
                value={formData.hostel_name}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500 transition-colors"
              >
                {HOSTELS.map((hostel) => (
                  <option key={hostel} value={hostel}>
                    {hostel}
                  </option>
                ))}
              </select>
            </div>

            {/* Room Number */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <Home className="w-3.5 h-3.5 text-slate-400" />
                <span>Room Number</span>
              </label>
              <input
                type="text"
                name="room_number"
                value={formData.room_number}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="e.g. 204-A, 104-B"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Phone / Contact Number</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Dietary Preference */}
            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <Utensils className="w-3.5 h-3.5 text-slate-400" />
                <span>Dietary Preference</span>
              </label>
              <select
                name="dietary_pref"
                value={formData.dietary_pref}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="Vegetarian">Vegetarian (Standard Veg Mess)</option>
                <option value="Non-Vegetarian">Non-Vegetarian (Special Feasts Included)</option>
                <option value="Jain Meal">Jain Meal (No Onion / Garlic)</option>
                <option value="Eggetarian">Eggetarian</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              disabled={saving}
              className="gradient-btn px-5 py-2 rounded-xl text-xs font-bold text-white flex items-center space-x-1.5 shadow-md shadow-indigo-500/25"
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Email Address */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex items-center space-x-3.5 transition-all hover:border-slate-300 dark:hover:border-slate-600">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Campus Email</p>
              <p className="font-semibold text-slate-900 dark:text-slate-200 truncate mt-0.5">
                {user?.email || 'student@campus.edu'}
              </p>
            </div>
          </div>

          {/* Hostel & Room */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex items-center justify-between space-x-3.5 transition-all hover:border-slate-300 dark:hover:border-slate-600 group">
            <div className="flex items-center space-x-3.5 min-w-0">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                <Home className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Hostel & Room</p>
                <p className="font-semibold text-slate-900 dark:text-slate-200 mt-0.5">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">{user?.hostel_name || 'BH-7 (Boys Hostel 7)'}</span>
                  <span className="text-slate-400 mx-1.5">•</span>
                  <span>Room {user?.room_number || '204-A'}</span>
                </p>
              </div>
            </div>
            <button
              onClick={handleStartEdit}
              title="Edit Hostel & Room"
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Contact Phone */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex items-center space-x-3.5 transition-all hover:border-slate-300 dark:hover:border-slate-600">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Phone Number</p>
              <p className="font-semibold text-slate-900 dark:text-slate-200 mt-0.5">
                {user?.phone || user?.phone_number || '+91 98765 43210'}
              </p>
            </div>
          </div>

          {/* Dietary Preference */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex items-center space-x-3.5 transition-all hover:border-slate-300 dark:hover:border-slate-600">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
              <Utensils className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Meal Preference</p>
              <p className="font-semibold text-slate-900 dark:text-slate-200 mt-0.5">
                {user?.dietary_pref || 'Vegetarian'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
