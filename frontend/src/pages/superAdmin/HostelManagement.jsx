import React, { useState, useEffect } from 'react';
import {
  Building, ShieldCheck, UserPlus, Users, Key, Plus,
  Mail, Lock, Phone, Trash2, Copy, CheckCircle2, ChefHat, Eye, EyeOff,
  Sparkles, Filter, ChevronRight, Edit3, X, Save, AlertCircle
} from 'lucide-react';
import { AdminAccountCreator } from '../../components/superAdmin/AdminAccountCreator';

const INITIAL_HOSTEL_BLOCKS = [
  { id: 'a1b2c3d4-0000-0000-0000-000000000001', name: 'Aryabhata Boys Hostel (BH-1)', type: 'Boys', capacity: 420, mess_capacity: 180, defaultWarden: 'Prof. R. C. Mohanty', defaultCaterer: 'Rajesh Sharma' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Varahamihira Boys Hostel (BH-2)', type: 'Boys', capacity: 400, mess_capacity: 170, defaultWarden: 'Dr. A. K. Behera', defaultCaterer: 'Maa Tarini Caterers' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000003', name: 'Charaka Boys Hostel (BH-3)', type: 'Boys', capacity: 450, mess_capacity: 190, defaultWarden: 'Dr. P. K. Jena', defaultCaterer: 'Sahoo Hospitality' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000004', name: 'Sushruta Boys Hostel (BH-4)', type: 'Boys', capacity: 430, mess_capacity: 185, defaultWarden: 'Dr. M. M. Mishra', defaultCaterer: 'Utkal Foods' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000005', name: 'Bhaskara Boys Hostel (BH-5)', type: 'Boys', capacity: 410, mess_capacity: 175, defaultWarden: 'Prof. S. R. Pattnaik', defaultCaterer: 'Sai Kitchens' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000006', name: 'Brahmagupta Boys Hostel (BH-6)', type: 'Boys', capacity: 450, mess_capacity: 200, defaultWarden: 'Dr. K. C. Tripathy', defaultCaterer: 'Royal Caterers' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000007', name: 'BH-7 (Boys Hostel 7)', type: 'Boys', capacity: 450, mess_capacity: 220, defaultWarden: 'Dr. S. K. Mahapatra', defaultCaterer: 'Alok Verma' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000008', name: 'Gargi Girls Hostel (GH-1)', type: 'Girls', capacity: 480, mess_capacity: 210, defaultWarden: 'Dr. Sunita Nayak', defaultCaterer: 'Priya Food Services' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000009', name: 'Maitreyi Girls Hostel (GH-2)', type: 'Girls', capacity: 460, mess_capacity: 200, defaultWarden: 'Dr. Rashmi Das', defaultCaterer: 'Annapurna Foods' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000010', name: 'Kalpana Chawla Girls Hostel (GH-3)', type: 'Girls', capacity: 500, mess_capacity: 230, defaultWarden: 'Dr. Meenakshi Sahu', defaultCaterer: 'Shree Krishna Mess' },
];

export const HostelManagement = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'buildings' | 'admins'
  const [hostels, setHostels] = useState(() => {
    try {
      const saved = localStorage.getItem('iterp_campus_hostels');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_HOSTEL_BLOCKS;
  });

  const [editingHostel, setEditingHostel] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    type: 'Boys',
    capacity: 450,
    mess_capacity: 200,
    defaultWarden: '',
    defaultCaterer: ''
  });

  const totalCapacity = hostels.reduce((acc, h) => acc + (Number(h.capacity) || 0), 0);
  const totalMessSeats = hostels.reduce((acc, h) => acc + (Number(h.mess_capacity) || 0), 0);
  const boysCount = hostels.filter((h) => h.type === 'Boys').length;
  const girlsCount = hostels.filter((h) => h.type === 'Girls').length;

  const handleOpenEdit = (h) => {
    setIsAddingNew(false);
    setEditingHostel(h);
    setEditForm({
      id: h.id,
      name: h.name || '',
      type: h.type || 'Boys',
      capacity: Number(h.capacity) || 450,
      mess_capacity: Number(h.mess_capacity) || 200,
      defaultWarden: h.defaultWarden || '',
      defaultCaterer: h.defaultCaterer || ''
    });
  };

  const handleOpenAdd = () => {
    setIsAddingNew(true);
    setEditingHostel({ id: `hostel-${Date.now()}` });
    setEditForm({
      id: `hostel-${Date.now()}`,
      name: `Hostel Block ${hostels.length + 1}`,
      type: 'Boys',
      capacity: 400,
      mess_capacity: 180,
      defaultWarden: 'Prof. New Warden',
      defaultCaterer: 'Campus Caterers'
    });
  };

  const handleSaveHostel = (e) => {
    e.preventDefault();
    if (!editForm.name.trim()) return;

    let updated;
    if (isAddingNew) {
      const newBlock = {
        ...editForm,
        id: `hostel-${Date.now()}`,
        name: editForm.name.trim(),
        capacity: Number(editForm.capacity) || 0,
        mess_capacity: Number(editForm.mess_capacity) || 0
      };
      updated = [...hostels, newBlock];
      setSaveSuccessMsg(`🎉 Added new hostel "${newBlock.name}"!`);
    } else {
      updated = hostels.map((h) =>
        h.id === editForm.id
          ? {
              ...h,
              name: editForm.name.trim(),
              type: editForm.type,
              capacity: Number(editForm.capacity) || 0,
              mess_capacity: Number(editForm.mess_capacity) || 0,
              defaultWarden: editForm.defaultWarden.trim(),
              defaultCaterer: editForm.defaultCaterer.trim()
            }
          : h
      );
      setSaveSuccessMsg(`✓ Successfully updated ${editForm.name}!`);
    }

    setHostels(updated);
    try {
      localStorage.setItem('iterp_campus_hostels', JSON.stringify(updated));
    } catch (err) {}

    setEditingHostel(null);
    setIsAddingNew(false);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Campus Hostels & Admin Provisioning</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
            Central management of all campus hostel buildings, capacities, and authorized Warden & Mess Caterer accounts
          </p>
        </div>

        {/* View Switcher & Add Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
              }`}
            >
              All Overview
            </button>
            <button
              onClick={() => setActiveTab('buildings')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'buildings'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
              }`}
            >
              Hostel Blocks ({hostels.length})
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'admins'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
              }`}
            >
              Wardens & Caterers
            </button>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Hostel</span>
          </button>
        </div>
      </div>

      {/* Global Success Notification */}
      {saveSuccessMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Top Campus Capacity Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Hostel Blocks</p>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{hostels.length} Hostels</p>
          <p className="text-[10px] text-slate-500 mt-0.5">{boysCount} Boys + {girlsCount} Girls Hostels</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Campus Capacity</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalCapacity.toLocaleString()}</p>
          <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">Registered Student Beds</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Dining Capacity</p>
          <p className="text-2xl font-black text-amber-500 mt-1">{totalMessSeats.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Simultaneous Mess Seats</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Hostel Admins</p>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{hostels.length * 2} Admins</p>
          <p className="text-[10px] text-slate-500 mt-0.5">{hostels.length} Wardens + {hostels.length} Caterers</p>
        </div>
      </div>

      {/* ── 1. Hostel Buildings Section ── */}
      {(activeTab === 'all' || activeTab === 'buildings') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-indigo-500" />
              <span>Campus Hostel Buildings Directory</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold">
                {hostels.length} Active Hostels
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hostels.map((h) => (
              <div
                key={h.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 transition-all space-y-3 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                        {h.name}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          h.type === 'Boys'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                            : 'bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300 border border-pink-200 dark:border-pink-800'
                        }`}
                      >
                        {h.type} Hostel
                      </span>
                    </div>
                  </div>

                  {/* Edit Button on each Card */}
                  <button
                    onClick={() => handleOpenEdit(h)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-all flex items-center gap-1 text-xs font-bold shrink-0"
                    title="Edit Hostel Details"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Resident Capacity</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white font-mono">{h.capacity} Students</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Dining Hall Seats</p>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">{h.mess_capacity} Seats</p>
                  </div>
                </div>

                <div className="text-[11px] space-y-1.5 pt-2 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                      <span>Assigned Warden:</span>
                    </span>
                    <strong className="text-slate-900 dark:text-white">{h.defaultWarden || 'Not Assigned'}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <ChefHat className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Mess Caterer:</span>
                    </span>
                    <strong className="text-slate-900 dark:text-white">{h.defaultCaterer || 'Not Assigned'}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 2. Admin Accounts & Provisioning Section ── */}
      {(activeTab === 'all' || activeTab === 'admins') && (
        <div className="pt-2">
          <AdminAccountCreator />
        </div>
      )}

      {/* ── 3. Edit / Add Hostel Modal Dialog ── */}
      {editingHostel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {isAddingNew ? 'Add New Campus Hostel' : `Edit Hostel: ${editForm.name}`}
                  </h3>
                  <p className="text-[11px] text-slate-500">Modify hostel capacities, warden and mess contractor</p>
                </div>
              </div>

              <button
                onClick={() => setEditingHostel(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveHostel} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Hostel Name */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Hostel Full Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="e.g. BH-7 (Boys Hostel 7)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-bold"
                  />
                </div>

                {/* Hostel Type */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Hostel Category / Type</label>
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-bold"
                  >
                    <option value="Boys">Boys Hostel</option>
                    <option value="Girls">Girls Hostel</option>
                  </select>
                </div>

                {/* Resident Capacity */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Resident Capacity (Students)</label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={editForm.capacity}
                    onChange={(e) => setEditForm({ ...editForm, capacity: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono font-bold"
                  />
                </div>

                {/* Dining Hall Capacity */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Dining Hall Seats (Mess)</label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={editForm.mess_capacity}
                    onChange={(e) => setEditForm({ ...editForm, mess_capacity: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono font-bold"
                  />
                </div>

                {/* Assigned Warden */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Assigned Warden Name</label>
                  <input
                    type="text"
                    value={editForm.defaultWarden}
                    onChange={(e) => setEditForm({ ...editForm, defaultWarden: e.target.value })}
                    placeholder="e.g. Dr. S. K. Mahapatra"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Assigned Caterer */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Assigned Mess Caterer / Contractor</label>
                  <input
                    type="text"
                    value={editForm.defaultCaterer}
                    onChange={(e) => setEditForm({ ...editForm, defaultCaterer: e.target.value })}
                    placeholder="e.g. Alok Verma / Annapurna Caterers"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingHostel(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default HostelManagement;



