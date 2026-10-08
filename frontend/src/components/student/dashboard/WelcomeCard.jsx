import React from 'react';
import { Sparkles, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { getTodayDateString } from '../../../utils/dateUtils';

export const WelcomeCard = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 border border-indigo-500/30 shadow-xl relative overflow-hidden text-white">
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 relative z-10">
        <div>
          <div className="flex items-center space-x-1.5 text-indigo-300 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-300" />
            <span>Student Dining Portal</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight" style={{ color: '#ffffff' }}>
            Welcome back, {user?.full_name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/90 mt-1 flex flex-wrap items-center gap-2">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>{user?.hostel_name || 'BH-7 (Boys Hostel 7)'} (Room {user?.room_number || '204-A'})</span>
            </span>
          </p>
        </div>
        <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs text-white flex items-center space-x-2 shrink-0 font-medium">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-300" />
          <span>{getTodayDateString()}</span>
        </div>
      </div>
    </div>
  );
};


