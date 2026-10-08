import React from 'react';
import { ProfileCard } from '../../components/student/profile/ProfileCard';
import { useAuth } from '../../hooks/useAuth';
import { UserCheck, ShieldCheck, QrCode, Sparkles, Building2, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <UserCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Student Account Profile</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
            Manage your personal resident details, hostel dining allocation, and meal preferences
          </p>
        </div>

        <Link
          to="/student/attendance"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-100 transition-all flex items-center space-x-2 shrink-0"
        >
          <QrCode className="w-4 h-4" />
          <span>View Dining Pass</span>
        </Link>
      </div>

      {/* Main Profile Card with Edit Capability */}
      <ProfileCard user={user} />

      {/* Auxiliary Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Anti-Fraud Security Badge */}
        <div className="p-5 rounded-2xl glass-card border border-indigo-500/20 space-y-3">
          <div className="flex items-center space-x-2.5 text-indigo-600 dark:text-indigo-400">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700/50">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Smart Token Security</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Your dining barcode and QR tokens are cryptographically linked to your Roll No <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{user?.roll_number || '21CS089'}</span> and dynamically rotate every 30 seconds to prevent unauthorized sharing.
          </p>
        </div>

        {/* Active Dining Allocation */}
        <div className="p-5 rounded-2xl glass-card border border-purple-500/20 space-y-3">
          <div className="flex items-center space-x-2.5 text-purple-600 dark:text-purple-400">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/50">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Assigned Mess Hall</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Currently enrolled in <strong className="text-slate-900 dark:text-white font-bold">{user?.hostel_name || 'BH-7 (Boys Hostel 7)'}</strong> dining hall. You can update your room number or hostel block anytime using the Edit Profile option above.
          </p>
        </div>
      </div>
    </div>
  );
};
