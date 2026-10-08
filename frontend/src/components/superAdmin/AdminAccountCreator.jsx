import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, UserPlus, Key, Mail, Lock, Building, Phone,
  Trash2, Copy, CheckCircle2, ChefHat, Eye, EyeOff, Sparkles, Filter, Edit3, X, Save
} from 'lucide-react';

const HOSTEL_OPTIONS = [
  { id: 'a1b2c3d4-0000-0000-0000-000000000001', name: 'Aryabhata Boys Hostel (BH-1)', capacity: 420 },
  { id: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Varahamihira Boys Hostel (BH-2)', capacity: 400 },
  { id: 'a1b2c3d4-0000-0000-0000-000000000003', name: 'Charaka Boys Hostel (BH-3)', capacity: 450 },
  { id: 'a1b2c3d4-0000-0000-0000-000000000004', name: 'Sushruta Boys Hostel (BH-4)', capacity: 430 },
  { id: 'a1b2c3d4-0000-0000-0000-000000000005', name: 'Bhaskara Boys Hostel (BH-5)', capacity: 410 },
  { id: 'a1b2c3d4-0000-0000-0000-000000000006', name: 'Brahmagupta Boys Hostel (BH-6)', capacity: 450 },
  { id: 'a1b2c3d4-0000-0000-0000-000000000007', name: 'BH-7 (Boys Hostel 7)', capacity: 450 },
  { id: 'a1b2c3d4-0000-0000-0000-000000000008', name: 'Gargi Girls Hostel (GH-1)', capacity: 480 },
  { id: 'a1b2c3d4-0000-0000-0000-000000000009', name: 'Maitreyi Girls Hostel (GH-2)', capacity: 460 },
  { id: 'a1b2c3d4-0000-0000-0000-000000000010', name: 'Kalpana Chawla Girls Hostel (GH-3)', capacity: 500 },
];

const DEFAULT_ACCOUNTS = [
  { id: 'hostel-admin-07', email: 'warden.bh7@campus.edu', password: 'warden123', full_name: 'Dr. S. K. Mahapatra', role: 'hostel_admin', roleLabel: 'Hostel Warden', hostel_name: 'BH-7 (Boys Hostel 7)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000007', phone: '+91 94370 77707' },
  { id: 'mess-admin-07', email: 'bh7admin@mess.edu', password: 'admin123', full_name: 'Alok Verma', role: 'mess_admin', roleLabel: 'Mess Caterer', hostel_name: 'BH-7 (Boys Hostel 7)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000007', phone: '+91 94370 77708' },
  { id: 'hostel-admin-01', email: 'warden.bh1@campus.edu', password: 'warden123', full_name: 'Prof. R. C. Mohanty', role: 'hostel_admin', roleLabel: 'Hostel Warden', hostel_name: 'Aryabhata Boys Hostel (BH-1)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000001', phone: '+91 94370 11101' },
  { id: 'mess-admin-01', email: 'admin@mess.edu', password: 'admin123', full_name: 'Rajesh Sharma', role: 'mess_admin', roleLabel: 'Mess Caterer', hostel_name: 'Aryabhata Boys Hostel (BH-1)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000001', phone: '+91 94370 11102' },
];

export const AdminAccountCreator = () => {
  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('iterp_custom_admins');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge defaults with saved
          const merged = [...DEFAULT_ACCOUNTS];
          parsed.forEach((p) => {
            if (!merged.some((m) => m.email.toLowerCase() === p.email.toLowerCase())) {
              merged.push(p);
            }
          });
          return merged;
        }
      }
    } catch (e) {}
    return DEFAULT_ACCOUNTS;
  });

  const [form, setForm] = useState({
    role: 'hostel_admin', // 'hostel_admin' | 'mess_admin'
    full_name: '',
    email: '',
    password: '',
    phone: '',
    hostel_id: HOSTEL_OPTIONS[6].id, // Default to BH-7
  });

  const [filterRole, setFilterRole] = useState('ALL');
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  // Edit Account State
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editForm, setEditForm] = useState({
    id: '',
    full_name: '',
    email: '',
    password: '',
    phone: '',
    role: 'hostel_admin',
    hostel_id: HOSTEL_OPTIONS[6].id,
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim() || !form.password.trim()) return;

    const selectedHostel = HOSTEL_OPTIONS.find((h) => h.id === form.hostel_id) || HOSTEL_OPTIONS[0];

    const newAccount = {
      id: `custom-${Date.now()}`,
      email: form.email.trim().toLowerCase(),
      password: form.password.trim(),
      full_name: form.full_name.trim(),
      role: form.role,
      roleLabel: form.role === 'hostel_admin' ? 'Hostel Warden' : 'Mess Caterer',
      hostel_name: selectedHostel.name,
      hostel_id: selectedHostel.id,
      phone: form.phone.trim() || '+91 98765 00000',
      data: {
        id: `custom-${Date.now()}`,
        full_name: form.full_name.trim(),
        role: form.role,
        hostel_name: selectedHostel.name,
        hostel_id: selectedHostel.id,
        phone: form.phone.trim() || '+91 98765 00000',
      }
    };

    const updated = [newAccount, ...accounts];
    setAccounts(updated);
    try {
      localStorage.setItem('iterp_custom_admins', JSON.stringify(updated));
    } catch (err) {}

    setSuccessMsg(`🎉 Successfully created ${newAccount.roleLabel} credentials for ${selectedHostel.name}!`);
    setForm({
      role: 'hostel_admin',
      full_name: '',
      email: '',
      password: '',
      phone: '',
      hostel_id: HOSTEL_OPTIONS[6].id,
    });
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleOpenEdit = (acc) => {
    setEditingAdmin(acc);
    setEditForm({
      id: acc.id,
      full_name: acc.full_name || '',
      email: acc.email || '',
      password: acc.password || '',
      phone: acc.phone || '',
      role: acc.role || 'hostel_admin',
      hostel_id: acc.hostel_id || HOSTEL_OPTIONS[0].id,
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editForm.full_name.trim() || !editForm.email.trim() || !editForm.password.trim()) return;

    const selectedHostel = HOSTEL_OPTIONS.find((h) => h.id === editForm.hostel_id) || HOSTEL_OPTIONS[0];

    const updated = accounts.map((acc) => {
      if (acc.id === editForm.id) {
        return {
          ...acc,
          full_name: editForm.full_name.trim(),
          email: editForm.email.trim().toLowerCase(),
          password: editForm.password.trim(),
          phone: editForm.phone.trim() || '+91 98765 00000',
          role: editForm.role,
          roleLabel: editForm.role === 'hostel_admin' ? 'Hostel Warden' : 'Mess Caterer',
          hostel_name: selectedHostel.name,
          hostel_id: selectedHostel.id,
          data: {
            ...acc.data,
            full_name: editForm.full_name.trim(),
            role: editForm.role,
            hostel_name: selectedHostel.name,
            hostel_id: selectedHostel.id,
            phone: editForm.phone.trim() || '+91 98765 00000',
          }
        };
      }
      return acc;
    });

    setAccounts(updated);
    try {
      localStorage.setItem('iterp_custom_admins', JSON.stringify(updated));
    } catch (e) {}

    setSuccessMsg(`✓ Successfully updated ${editForm.full_name}'s credentials!`);
    setEditingAdmin(null);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleDelete = (id) => {
    const updated = accounts.filter((a) => a.id !== id);
    setAccounts(updated);
    try {
      localStorage.setItem('iterp_custom_admins', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleCopy = (acc) => {
    const text = `Portal: ${window.location.origin}/login\nRole: ${acc.roleLabel}\nHostel: ${acc.hostel_name}\nUser ID/Email: ${acc.email}\nPassword: ${acc.password}`;
    navigator.clipboard.writeText(text);
    setCopiedEmail(acc.id);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const filtered = accounts.filter((a) => filterRole === 'ALL' || a.role === filterRole);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-500" />
            <span>Hostel Wardens & Mess Admins Provisioning Desk</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Super Admins can create dedicated User IDs & Passwords for Hostel Wardens and Mess Contractors for each separate hostel.
          </p>
        </div>
      </div>

      {/* Account Creation Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-indigo-500" />
          <span>Create New Admin Account</span>
        </h3>

        {successMsg && (
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          {/* Role Choice */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 dark:text-slate-300">Choose Admin Tier:</label>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: 'hostel_admin' })}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                  form.role === 'hostel_admin'
                    ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-600 text-purple-700 dark:text-purple-300 font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-purple-500" />
                <span>Hostel Admin / Warden</span>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, role: 'mess_admin' })}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                  form.role === 'mess_admin'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-600 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <ChefHat className="w-4 h-4 text-emerald-500" />
                <span>Mess Caterer / Manager</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Full Name / Officer Name</label>
              <input
                type="text"
                required
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                placeholder={form.role === 'hostel_admin' ? 'Dr. Ramesh Sahu (Warden)' : 'Annapurna Caterers (Mess Admin)'}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            {/* Email / User ID */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">User ID / Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={form.role === 'hostel_admin' ? 'warden.bh2@campus.edu' : 'bh2admin@mess.edu'}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Set Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Assigned Hostel */}
            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-700 dark:text-slate-300">Assign to Specific Hostel & Mess</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={form.hostel_id}
                  onChange={(e) => setForm({ ...form, hostel_id: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-semibold"
                >
                  {HOSTEL_OPTIONS.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name} (Capacity: {h.capacity} Students)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Official Contact Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 94370 00000"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Issue & Save Credentials</span>
            </button>
          </div>
        </form>
      </div>

      {/* List of Active Admin Accounts */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-500" />
            <span>Active Hostel Wardens & Mess Caterers ({accounts.length})</span>
          </h3>

          <div className="flex items-center gap-2 text-xs">
            {['ALL', 'hostel_admin', 'mess_admin'].map((r) => (
              <button
                key={r}
                onClick={() => setFilterRole(r)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                  filterRole === r
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                }`}
              >
                {r === 'ALL' ? 'All Roles' : r === 'hostel_admin' ? 'Wardens' : 'Mess Caterers'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((acc) => (
            <div
              key={acc.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">{acc.full_name}</span>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border shrink-0 ${
                        acc.role === 'hostel_admin'
                          ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                          : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      }`}
                    >
                      {acc.roleLabel}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    <span>{acc.hostel_name}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Edit Admin Account Button */}
                  <button
                    onClick={() => handleOpenEdit(acc)}
                    title="Edit Admin Credentials"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors flex items-center gap-1 text-xs font-bold"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleCopy(acc)}
                    title="Copy Login Credentials"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                  >
                    {copiedEmail === acc.id ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleDelete(acc.id)}
                    title="Revoke / Delete Account"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Credential Details */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs font-mono space-y-1">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="text-slate-400">User ID / Email:</span>
                  <span className="font-bold">{acc.email}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="text-slate-400">Password:</span>
                  <span className="font-bold text-amber-500">{acc.password}</span>
                </div>
                {acc.phone && (
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400">Contact:</span>
                    <span>{acc.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Edit Admin Account Modal ── */}
      {editingAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Edit Admin Account: {editForm.full_name}
                  </h3>
                  <p className="text-[11px] text-slate-500">Update warden/caterer role, assigned hostel, email and password</p>
                </div>
              </div>

              <button
                onClick={() => setEditingAdmin(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEdit} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Admin Role Tier:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditForm({ ...editForm, role: 'hostel_admin' })}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                      editForm.role === 'hostel_admin'
                        ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-600 text-purple-700 dark:text-purple-300 font-bold shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-500" />
                    <span>Hostel Warden</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditForm({ ...editForm, role: 'mess_admin' })}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                      editForm.role === 'mess_admin'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-600 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <ChefHat className="w-4 h-4 text-emerald-500" />
                    <span>Mess Caterer</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Officer / Caterer Full Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.full_name}
                    onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-bold"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Assigned Hostel Building</label>
                  <select
                    value={editForm.hostel_id}
                    onChange={(e) => setEditForm({ ...editForm, hostel_id: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  >
                    {HOSTEL_OPTIONS.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">User ID / Login Email</label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Password</label>
                  <input
                    type="text"
                    required
                    value={editForm.password}
                    onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono font-bold text-amber-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Contact Number</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingAdmin(null)}
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
export default AdminAccountCreator;

