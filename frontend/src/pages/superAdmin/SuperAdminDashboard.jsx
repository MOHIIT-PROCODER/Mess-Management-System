import React, { useState } from 'react';
import { AdminAccountCreator } from '../../components/superAdmin/AdminAccountCreator';
import { DynamicBarcodePass } from '../../components/common/DynamicBarcodePass';
import { UniversalScanner } from '../../components/common/UniversalScanner';
import { QrCode, Camera, Shield, Barcode, User, BarChart3, Calendar, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [activeStationTab, setActiveStationTab] = useState('pass'); // 'pass' | 'scanner'

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Institution Super Admin Dashboard</h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Campus-wide mess hall management, central barcode stations & security scanners
          </p>
        </div>

        {/* Dynamic Pass / Scanner Tab */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveStationTab('pass')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeStationTab === 'pass'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
            }`}
          >
            <Barcode className="w-4 h-4" />
            <span>30s Master Pass</span>
          </button>
          <button
            onClick={() => setActiveStationTab('scanner')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeStationTab === 'scanner'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Central Scanner</span>
          </button>
        </div>
      </div>

      {/* Quick Access Action Cards for Super Admin */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          to="/superadmin/attendance"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 shadow-sm transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-4 h-4" />
          </div>
          <p className="font-bold text-slate-900 dark:text-white text-xs">Attendance Graphs</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Day/Week/Month Stats</p>
        </Link>

        <Link
          to="/superadmin/menus"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 shadow-sm transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Calendar className="w-4 h-4" />
          </div>
          <p className="font-bold text-slate-900 dark:text-white text-xs">Food Timetables</p>
          <p className="text-[11px] text-slate-500 mt-0.5">7-Day Campus Menus</p>
        </Link>

        <Link
          to="/superadmin/hostels"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 shadow-sm transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Building className="w-4 h-4" />
          </div>
          <p className="font-bold text-slate-900 dark:text-white text-xs">Hostels & Admins</p>
          <p className="text-[11px] text-slate-500 mt-0.5">10 Blocks & Wardens</p>
        </Link>

        <Link
          to="/superadmin/profile"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 shadow-sm transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <User className="w-4 h-4" />
          </div>
          <p className="font-bold text-slate-900 dark:text-white text-xs">Admin Profile</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Account & Security</p>
        </Link>
      </div>

      {/* Central Station Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {activeStationTab === 'pass' ? (
          <DynamicBarcodePass
            role="super_admin"
            userName={user?.full_name || 'System Super Admin'}
            userCode="SUPER-ROOT"
            hostelName="Central Dining Administration"
            roomNumber="HQ Desk"
          />
        ) : (
          <UniversalScanner
            role="super_admin"
            title="Institution Super Admin Scanner"
            subtitle="Scan and verify dining tokens across any hostel building"
          />
        )}

        <div className="p-6 rounded-3xl glass-card border border-indigo-500/20 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
            <Shield className="w-5 h-5" />
            <h3 className="font-bold text-sm">30-Second Dynamic Anti-Fraud Architecture</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Every Barcode and QR code generated by MessSphere contains a high-entropy cryptographic nonce that rotates automatically every 30 seconds. Screenshots and duplicate sharing are automatically rejected by counter scanners.
          </p>
          <div className="grid grid-cols-2 gap-2 text-center text-xs pt-2">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Token Lifespan</p>
              <p className="text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono">30 Seconds</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Proxy Prevention</p>
              <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">100% Active</p>
            </div>
          </div>
        </div>
      </div>

      <AdminAccountCreator />
    </div>
  );
};


