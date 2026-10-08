import React, { useState } from 'react';
import {
  Building, ShieldCheck, UserPlus, Users, Key, Plus,
  Mail, Lock, Phone, Trash2, Copy, CheckCircle2, ChefHat, Eye, EyeOff, Sparkles, Filter, ChevronRight
} from 'lucide-react';
import { AdminAccountCreator } from '../../components/superAdmin/AdminAccountCreator';

const HOSTEL_BLOCKS = [
  { id: 'a1b2c3d4-0000-0000-0000-000000000001', code: 'BH-1', name: 'Aryabhata Boys Hostel (BH-1)', type: 'Boys', capacity: 420, mess_capacity: 180, defaultWarden: 'Prof. R. C. Mohanty', defaultCaterer: 'Rajesh Sharma' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000002', code: 'BH-2', name: 'Varahamihira Boys Hostel (BH-2)', type: 'Boys', capacity: 400, mess_capacity: 170, defaultWarden: 'Dr. A. K. Behera', defaultCaterer: 'Maa Tarini Caterers' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000003', code: 'BH-3', name: 'Charaka Boys Hostel (BH-3)', type: 'Boys', capacity: 450, mess_capacity: 190, defaultWarden: 'Dr. P. K. Jena', defaultCaterer: 'Sahoo Hospitality' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000004', code: 'BH-4', name: 'Sushruta Boys Hostel (BH-4)', type: 'Boys', capacity: 430, mess_capacity: 185, defaultWarden: 'Dr. M. M. Mishra', defaultCaterer: 'Utkal Foods' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000005', code: 'BH-5', name: 'Bhaskara Boys Hostel (BH-5)', type: 'Boys', capacity: 410, mess_capacity: 175, defaultWarden: 'Prof. S. R. Pattnaik', defaultCaterer: 'Sai Kitchens' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000006', code: 'BH-6', name: 'Brahmagupta Boys Hostel (BH-6)', type: 'Boys', capacity: 450, mess_capacity: 200, defaultWarden: 'Dr. K. C. Tripathy', defaultCaterer: 'Royal Caterers' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000007', code: 'BH-7', name: 'BH-7 (Boys Hostel 7)', type: 'Boys', capacity: 450, mess_capacity: 220, defaultWarden: 'Dr. S. K. Mahapatra', defaultCaterer: 'Alok Verma' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000008', code: 'GH-1', name: 'Gargi Girls Hostel (GH-1)', type: 'Girls', capacity: 480, mess_capacity: 210, defaultWarden: 'Dr. Sunita Nayak', defaultCaterer: 'Priya Food Services' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000009', code: 'GH-2', name: 'Maitreyi Girls Hostel (GH-2)', type: 'Girls', capacity: 460, mess_capacity: 200, defaultWarden: 'Dr. Rashmi Das', defaultCaterer: 'Annapurna Foods' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000010', code: 'GH-3', name: 'Kalpana Chawla Girls Hostel (GH-3)', type: 'Girls', capacity: 500, mess_capacity: 230, defaultWarden: 'Dr. Meenakshi Sahu', defaultCaterer: 'Shree Krishna Mess' },
];

export const HostelManagement = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'buildings' | 'admins'
  const [selectedHostelFilter, setSelectedHostelFilter] = useState('ALL');

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
            Central management of all 10 campus hostel buildings, capacities, and authorized Warden & Mess Caterer accounts
          </p>
        </div>

        {/* View Switcher */}
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
            Hostel Blocks (10)
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
      </div>

      {/* Top Campus Capacity Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Hostel Blocks</p>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">10 Buildings</p>
          <p className="text-[10px] text-slate-500 mt-0.5">7 Boys + 3 Girls Hostels</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Campus Capacity</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">4,450</p>
          <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">Registered Student Beds</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Dining Capacity</p>
          <p className="text-2xl font-black text-amber-500 mt-1">1,965</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Simultaneous Mess Seats</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Hostel Admins</p>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">20 Admins</p>
          <p className="text-[10px] text-slate-500 mt-0.5">10 Wardens + 10 Caterers</p>
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
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold">
              10 Active Hostels
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HOSTEL_BLOCKS.map((h) => (
              <div
                key={h.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 transition-all space-y-3 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 dark:text-white text-base">{h.code}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          h.type === 'Boys'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                            : 'bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300 border border-pink-200 dark:border-pink-800'
                        }`}
                      >
                        {h.type} Hostel
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-0.5">{h.name}</p>
                  </div>
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

                <div className="text-[11px] space-y-1 pt-1 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-purple-500" />
                      <span>Assigned Warden:</span>
                    </span>
                    <strong className="text-slate-900 dark:text-white">{h.defaultWarden}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <ChefHat className="w-3 h-3 text-emerald-500" />
                      <span>Mess Caterer:</span>
                    </span>
                    <strong className="text-slate-900 dark:text-white">{h.defaultCaterer}</strong>
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
    </div>
  );
};
export default HostelManagement;

