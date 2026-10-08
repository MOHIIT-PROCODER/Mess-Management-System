import React from 'react';
import { Calendar, Edit3, ShieldCheck, Sparkles, Clock, Utensils } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { WeeklyMenu } from '../../components/messAdmin/menu/WeeklyMenu';
import { LiveHostelTimetable } from '../../components/hostelAdmin/LiveHostelTimetable';

export const HostelTimetable = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-500" />
            <span>{hostelName} Dining Timetable & Menu Manager</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time live dining session monitor and full 7-day cook timetable with interactive warden edit permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5" />
            <span>Warden Edit Mode Enabled</span>
          </span>
        </div>
      </div>

      {/* 1. Live Time Table Active Slot Card */}
      <LiveHostelTimetable hostelName={hostelName} />

      {/* 2. 7-Day Full Interactive Weekly Timetable Editor */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>7-Day Full Weekly Timetable Schedule</span>
          </h2>
          <span className="text-xs text-slate-500">Click any day or meal card below to edit dishes and timings</span>
        </div>

        <WeeklyMenu />
      </div>
    </div>
  );
};
export default HostelTimetable;
