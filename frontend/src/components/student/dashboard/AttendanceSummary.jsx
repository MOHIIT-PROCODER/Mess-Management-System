import React from 'react';
import { useStudentStats } from '../../../hooks/useStudentStats';

export const AttendanceSummary = () => {
  const { attendedMeals, skippedMeals, elapsedMealsToDate, pacePercentage } = useStudentStats();

  return (
    <div className="p-4 sm:p-5 rounded-2xl glass-card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Monthly Attendance Summary</h3>
        <span className="text-[11px] sm:text-xs text-indigo-600 dark:text-indigo-400 font-bold">{pacePercentage}% Turnout</span>
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 sm:h-3 overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
        <div
          className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
          style={{ width: `${pacePercentage}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-xs pt-1">
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50">
          <p className="text-slate-600 dark:text-slate-400 text-[10px] sm:text-xs font-semibold">Attended</p>
          <p className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{attendedMeals} Meals</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50">
          <p className="text-slate-600 dark:text-slate-400 text-[10px] sm:text-xs font-semibold">Skipped</p>
          <p className="text-sm sm:text-base font-bold text-rose-600 dark:text-rose-400 mt-0.5">{skippedMeals} Meals</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50">
          <p className="text-slate-600 dark:text-slate-400 text-[10px] sm:text-xs font-semibold">Scheduled</p>
          <p className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-300 mt-0.5">{elapsedMealsToDate} Meals</p>
        </div>
      </div>
    </div>
  );
};

