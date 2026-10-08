import React, { useState, useEffect } from 'react';
import {
  Building2, User, Phone, Mail, MapPin, Clock, ShieldCheck,
  Edit3, Save, CheckCircle2, Users, Utensils, Wifi, Droplets,
  Tv, Dumbbell, BookOpen, AlertCircle, Sparkles, Plus, Trash2
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const DEFAULT_HOSTEL_PROFILE = {
  hostel_name: 'BH-7 (Boys Hostel 7)',
  block: 'Block-D, Engineering Campus',
  established_year: '2018',
  total_floors: 5,
  total_rooms: 225,
  capacity: 450,
  current_occupancy: 428,
  mess_capacity: 450,
  
  // Warden Details
  warden_name: 'Prof. Rajesh Kumar Mohapatra',
  warden_phone: '+91 98765 43210',
  warden_email: 'warden.bh7@iter.ac.in',
  warden_office: 'Ground Floor, Room G-04, BH-7',
  
  // Assistant Warden / Caretaker
  caretaker_name: 'Mr. Manoj Das',
  caretaker_phone: '+91 98765 43211',
  caretaker_email: 'caretaker.bh7@iter.ac.in',

  // Timings
  gate_open: '06:00 AM',
  gate_close: '10:00 PM',
  breakfast_time: '07:30 - 09:30 AM',
  lunch_time: '12:00 - 02:30 PM',
  snacks_time: '05:00 - 06:15 PM',
  dinner_time: '07:30 - 09:45 PM',

  // Emergency Contacts
  emergency_helpline: '+91 674 2350666',
  ambulance: '108 / +91 674 2350108',
  security_desk: '+91 98765 43299',

  // Notice Bulletin
  notice_title: 'Sunday Special Dinner Feast & Cleanliness Inspection',
  notice_content: 'All residents are advised that Sunday Dinner features a special royal feast with Paneer Butter Masala and Gulab Jamun. Monthly room hygiene review will take place this Saturday morning.',

  // Facilities
  amenities: [
    { id: 'wifi', name: 'High-Speed Wi-Fi (1 Gbps)', enabled: true, icon: 'Wifi' },
    { id: 'ro_water', name: 'RO Water Coolers on Every Floor', enabled: true, icon: 'Droplets' },
    { id: 'solar_water', name: 'Solar Geyser Hot Water System', enabled: true, icon: 'Droplets' },
    { id: 'gym', name: 'Hostel Gymnasium & Fitness Room', enabled: true, icon: 'Dumbbell' },
    { id: 'study_room', name: '24x7 Air-Conditioned Study Hall', enabled: true, icon: 'BookOpen' },
    { id: 'cctv', name: '24x7 CCTV Surveillance & Bio-Entry', enabled: true, icon: 'ShieldCheck' },
  ],

  // Student Food Committee
  representatives: [
    { id: 1, name: 'Aarav Patel', roll: '2101297001', room: '204-A', phone: '+91 98111 22334' },
    { id: 2, name: 'Rohan Gupta', roll: '2101297045', room: '312-B', phone: '+91 98222 33445' },
    { id: 3, name: 'Priyanshu Verma', roll: '2101297089', room: '405-A', phone: '+91 98333 44556' },
  ]
};

export const HostelProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('iterp_hostel_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      ...DEFAULT_HOSTEL_PROFILE,
      hostel_name: user?.hostel_name || DEFAULT_HOSTEL_PROFILE.hostel_name,
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Field updater
  const updateField = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  // Amenity toggle
  const toggleAmenity = (id) => {
    if (!isEditing) return;
    setProfile((prev) => ({
      ...prev,
      amenities: prev.amenities.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
    }));
  };

  // Add Representative
  const addRepresentative = () => {
    const newRep = {
      id: Date.now(),
      name: 'New Student Rep',
      roll: '2101297000',
      room: '101-A',
      phone: '+91 98000 00000',
    };
    setProfile((prev) => ({
      ...prev,
      representatives: [...prev.representatives, newRep],
    }));
  };

  // Remove Representative
  const removeRepresentative = (id) => {
    setProfile((prev) => ({
      ...prev,
      representatives: prev.representatives.filter((r) => r.id !== id),
    }));
  };

  // Update Representative
  const updateRepresentative = (id, key, val) => {
    setProfile((prev) => ({
      ...prev,
      representatives: prev.representatives.map((r) => (r.id === id ? { ...r, [key]: val } : r)),
    }));
  };

  const handleSave = () => {
    localStorage.setItem('iterp_hostel_profile', JSON.stringify(profile));
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold">
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Official Hostel Residence & Governance Profile</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {profile.hostel_name} Profile
            </h1>
            <p className="text-indigo-100 text-xs md:text-sm max-w-2xl">
              Manage and update official hostel specifications, warden contacts, gate/mess timings, facilities, and student food committee members.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 rounded-xl bg-white text-indigo-950 hover:bg-indigo-50 text-xs font-extrabold shadow-md flex items-center gap-2 transition-all"
              >
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <span>Edit Hostel Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center gap-3 text-xs font-bold animate-fade-in shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Hostel Profile updated and persisted successfully across the entire portal!</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: General Info & Warden Contacts */}
        <div className="space-y-6">
          {/* Hostel Core Specs */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-500" />
              <span>Building & Resident Capacity</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Hostel Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.hostel_name}
                    onChange={(e) => updateField('hostel_name', e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <p className="font-extrabold text-slate-900 dark:text-white text-sm">{profile.hostel_name}</p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Campus Block / Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.block}
                    onChange={(e) => updateField('block', e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{profile.block}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Total Rooms</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profile.total_rooms}
                      onChange={(e) => updateField('total_rooms', Number(e.target.value))}
                      className="w-full mt-1 px-2 py-1 bg-white dark:bg-slate-700 border rounded text-xs font-bold"
                    />
                  ) : (
                    <p className="text-base font-extrabold text-slate-900 dark:text-white">{profile.total_rooms}</p>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Resident Capacity</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profile.capacity}
                      onChange={(e) => updateField('capacity', Number(e.target.value))}
                      className="w-full mt-1 px-2 py-1 bg-white dark:bg-slate-700 border rounded text-xs font-bold"
                    />
                  ) : (
                    <p className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">{profile.capacity} Beds</p>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Active Occupancy</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profile.current_occupancy}
                      onChange={(e) => updateField('current_occupancy', Number(e.target.value))}
                      className="w-full mt-1 px-2 py-1 bg-white dark:bg-slate-700 border rounded text-xs font-bold"
                    />
                  ) : (
                    <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">{profile.current_occupancy} Students</p>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Mess Capacity</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profile.mess_capacity}
                      onChange={(e) => updateField('mess_capacity', Number(e.target.value))}
                      className="w-full mt-1 px-2 py-1 bg-white dark:bg-slate-700 border rounded text-xs font-bold"
                    />
                  ) : (
                    <p className="text-base font-extrabold text-slate-900 dark:text-white">{profile.mess_capacity} Seats</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Warden & Administration Contact */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-500" />
              <span>Hostel Warden & Administration</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Chief Warden Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.warden_name}
                    onChange={(e) => updateField('warden_name', e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-white focus:outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-900 dark:text-white">{profile.warden_name}</p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Warden Phone Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.warden_phone}
                    onChange={(e) => updateField('warden_phone', e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-white focus:outline-none"
                  />
                ) : (
                  <p className="font-mono text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{profile.warden_phone}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Warden Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.warden_email}
                    onChange={(e) => updateField('warden_email', e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-white focus:outline-none"
                  />
                ) : (
                  <p className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{profile.warden_email}</span>
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Caretaker / Assistant Warden</label>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <input
                      type="text"
                      placeholder="Name"
                      value={profile.caretaker_name}
                      onChange={(e) => updateField('caretaker_name', e.target.value)}
                      className="px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={profile.caretaker_phone}
                      onChange={(e) => updateField('caretaker_phone', e.target.value)}
                      className="px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    />
                  </div>
                ) : (
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {profile.caretaker_name} • <span className="text-slate-500 font-mono">{profile.caretaker_phone}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Timings & Facilities */}
        <div className="space-y-6">
          {/* Hostel & Mess Timings */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Gate & Dining Timings Schedule</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-700 dark:text-slate-300">Hostel Main Gate Hours</span>
                {isEditing ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={profile.gate_open}
                      onChange={(e) => updateField('gate_open', e.target.value)}
                      className="w-20 px-2 py-1 bg-white dark:bg-slate-700 border rounded text-[11px] font-mono"
                    />
                    <span>-</span>
                    <input
                      type="text"
                      value={profile.gate_close}
                      onChange={(e) => updateField('gate_close', e.target.value)}
                      className="w-20 px-2 py-1 bg-white dark:bg-slate-700 border rounded text-[11px] font-mono"
                    />
                  </div>
                ) : (
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {profile.gate_open} – {profile.gate_close}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-amber-600 dark:text-amber-400">Breakfast Slot</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.breakfast_time}
                    onChange={(e) => updateField('breakfast_time', e.target.value)}
                    className="w-44 px-2 py-1 bg-white dark:bg-slate-700 border rounded text-[11px] font-mono"
                  />
                ) : (
                  <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">{profile.breakfast_time}</span>
                )}
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Lunch Slot</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.lunch_time}
                    onChange={(e) => updateField('lunch_time', e.target.value)}
                    className="w-44 px-2 py-1 bg-white dark:bg-slate-700 border rounded text-[11px] font-mono"
                  />
                ) : (
                  <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">{profile.lunch_time}</span>
                )}
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-purple-600 dark:text-purple-400">Evening Snacks</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.snacks_time}
                    onChange={(e) => updateField('snacks_time', e.target.value)}
                    className="w-44 px-2 py-1 bg-white dark:bg-slate-700 border rounded text-[11px] font-mono"
                  />
                ) : (
                  <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">{profile.snacks_time}</span>
                )}
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">Dinner Slot</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.dinner_time}
                    onChange={(e) => updateField('dinner_time', e.target.value)}
                    className="w-44 px-2 py-1 bg-white dark:bg-slate-700 border rounded text-[11px] font-mono"
                  />
                ) : (
                  <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">{profile.dinner_time}</span>
                )}
              </div>
            </div>
          </div>

          {/* Amenities & Resident Facilities */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Hostel Amenities & Facilities</span>
              </h3>
              {isEditing && <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">Click to toggle</span>}
            </div>

            <div className="space-y-2">
              {profile.amenities.map((a) => (
                <div
                  key={a.id}
                  onClick={() => toggleAmenity(a.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isEditing ? 'cursor-pointer hover:border-indigo-400' : ''
                  } ${
                    a.enabled
                      ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/40 text-slate-900 dark:text-white'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/40 text-slate-400 opacity-60'
                  }`}
                >
                  <span className="text-xs font-semibold">{a.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    a.enabled
                      ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}>
                    {a.enabled ? 'Available' : 'Disabled'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Notice Board & Student Food Committee */}
        <div className="space-y-6">
          {/* Official Warden Notice Bulletin */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800/40 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <h3 className="font-extrabold text-sm">Warden Official Notice Bulletin</h3>
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Notice Title"
                  value={profile.notice_title}
                  onChange={(e) => updateField('notice_title', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                />
                <textarea
                  rows={3}
                  placeholder="Notice Details"
                  value={profile.notice_content}
                  onChange={(e) => updateField('notice_content', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 resize-none"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">{profile.notice_title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{profile.notice_content}</p>
              </div>
            )}
          </div>

          {/* Student Mess Committee Representatives */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" />
                <span>Student Food Committee Reps</span>
              </h3>
              {isEditing && (
                <button
                  type="button"
                  onClick={addRepresentative}
                  className="p-1 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {profile.representatives.map((rep) => (
                <div key={rep.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1 relative group">
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={rep.name}
                          onChange={(e) => updateRepresentative(rep.id, 'name', e.target.value)}
                          placeholder="Student Name"
                          className="w-full px-2 py-1 bg-white dark:bg-slate-700 border rounded text-xs font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => removeRepresentative(rep.id)}
                          className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          value={rep.roll}
                          onChange={(e) => updateRepresentative(rep.id, 'roll', e.target.value)}
                          placeholder="Roll No"
                          className="px-2 py-1 bg-white dark:bg-slate-700 border rounded text-[11px]"
                        />
                        <input
                          type="text"
                          value={rep.room}
                          onChange={(e) => updateRepresentative(rep.id, 'room', e.target.value)}
                          placeholder="Room"
                          className="px-2 py-1 bg-white dark:bg-slate-700 border rounded text-[11px]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">{rep.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold">
                          Room {rep.room}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                        <span className="font-mono">{rep.roll}</span>
                        <span className="font-mono text-indigo-600 dark:text-indigo-400">{rep.phone}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Helplines */}
          <div className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 shadow-sm space-y-3">
            <h3 className="font-extrabold text-rose-900 dark:text-rose-200 text-xs uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-rose-600" />
              <span>Emergency Services Desk</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Hostel Security Gate:</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{profile.security_desk}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Campus Ambulance:</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{profile.ambulance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HostelProfile;
