import React from 'react';
import { QrCode, CheckCircle, Clock, Users, UserCheck, ShieldCheck } from 'lucide-react';
import { useAttendance } from '../../../hooks/useAttendance';

export const TodayAttendance = ({ hostelId }) => {
  const { liveData, loading } = useAttendance(hostelId);

  const totalScanned = liveData?.total_scanned || 142;
  const remaining = liveData?.remaining_students || 58;
  const scans = liveData?.recent_scans || [];

  return (
    <div className="p-5 sm:p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
              Live Scanned Attendance
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Real-time student check-in feed
            </p>
          </div>
        </div>

        {/* Live Pulse Count */}
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 text-xs font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>{totalScanned} Present</span>
        </div>
      </div>

      {/* Mini Stats Bar */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center space-x-2.5">
          <UserCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-500 font-medium">Scanned Today</p>
            <p className="font-black text-sm text-slate-900 dark:text-white">{totalScanned} Students</p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center space-x-2.5">
          <Users className="w-4 h-4 text-indigo-500 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-500 font-medium">Expected Remaining</p>
            <p className="font-black text-sm text-slate-900 dark:text-white">{remaining} Boarders</p>
          </div>
        </div>
      </div>

      {/* Scanned Students Stream List */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
          <span>Recent Scans ({scans.length})</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">Live Sync</span>
        </p>

        {scans.length > 0 ? (
          scans.map((s, idx) => (
            <div
              key={s.id || idx}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 flex items-center justify-between text-xs border border-slate-200 dark:border-slate-700/50 transition-all duration-200 animate-fade-in group shadow-sm hover:shadow"
            >
              <div className="flex items-center space-x-3">
                {/* Avatar Initials */}
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-xs border border-indigo-200 dark:border-indigo-800/40 shrink-0">
                  {s.name ? s.name.charAt(0) : 'S'}
                </div>

                <div>
                  <div className="flex items-center space-x-1.5">
                    <p className="font-bold text-slate-900 dark:text-white leading-tight">
                      {s.name}
                    </p>
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-bold">
                      ({s.roll || s.roll_number || 'STU'})
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Room {s.room || s.room_number || '204-A'} • <span className="capitalize">{s.meal || 'Lunch'}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30">
                  <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Verified</span>
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center space-x-1 font-medium">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{s.time || 'Just now'}</span>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-xs text-slate-500">
            No scans recorded yet for this meal.
          </div>
        )}
      </div>
    </div>
  );
};
