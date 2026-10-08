import React from 'react';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { getMealBadgeColor } from '../../../utils/attendanceUtils';

export const AttendanceHistory = () => {
  const logs = [
    { id: '1', date: 'Oct 07, 2026', meal: 'dinner', status: 'present', time: '08:15 PM' },
    { id: '2', date: 'Oct 07, 2026', meal: 'snacks', status: 'present', time: '05:30 PM' },
    { id: '3', date: 'Oct 07, 2026', meal: 'lunch', status: 'present', time: '01:10 PM' },
    { id: '4', date: 'Oct 07, 2026', meal: 'breakfast', status: 'present', time: '08:05 AM' },
    { id: '5', date: 'Oct 06, 2026', meal: 'dinner', status: 'present', time: '08:40 PM' }
  ];

  return (
    <div className="p-6 rounded-2xl glass-card space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <span>Recent Attendance Logs</span>
      </h3>

      <div className="space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <span className={`px-2.5 py-1 rounded-lg font-bold capitalize border ${getMealBadgeColor(log.meal)}`}>
                {log.meal}
              </span>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-200">{log.date}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center space-x-1 mt-0.5 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{log.time}</span>
                </p>
              </div>
            </div>
            <span className="flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-1 rounded-md bg-emerald-100 dark:bg-emerald-500/10">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Verified</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

