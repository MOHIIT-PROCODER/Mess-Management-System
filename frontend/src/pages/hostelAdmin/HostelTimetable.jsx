import React from 'react';
import { Calendar, Edit3, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { WeeklyMenu } from '../../components/messAdmin/menu/WeeklyMenu';

export const HostelTimetable = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-500" />
            <span>{hostelName} 7-Day Menu Timetable</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Wardens can review and directly edit the weekly cook schedule, dishes, meal times, and special feast menus.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5" />
            <span>Warden Edit Mode Enabled</span>
          </span>
        </div>
      </div>

      {/* Reusable Interactive 7-Day Weekly Menu Editor */}
      <WeeklyMenu />
    </div>
  );
};
export default HostelTimetable;
