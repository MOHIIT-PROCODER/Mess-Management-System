import React from 'react';
import { Flame } from 'lucide-react';
import { useStudentStats } from '../../../hooks/useStudentStats';

export const StreakCard = ({ streakDays: propStreak }) => {
  const { streakDays: liveStreak, pacePercentage } = useStudentStats();
  const streak = propStreak !== undefined ? propStreak : liveStreak;

  return (
    <div className="p-3.5 sm:p-4 rounded-2xl glass-card flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-amber-500/10 dark:from-orange-500/10 dark:to-amber-500/5 transition-all">
      <div className="flex items-center space-x-3">
        <div className="p-2.5 sm:p-3 rounded-xl bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30 shrink-0">
          <Flame className={`w-5 h-5 sm:w-6 sm:h-6 ${streak > 0 ? 'animate-pulse text-orange-500' : 'text-slate-400'}`} />
        </div>
        <div>
          <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-400 font-semibold">Active Attendance Streak</p>
          <p className="text-base sm:text-xl font-black text-slate-900 dark:text-white">
            {streak > 0 ? `${streak} Days Fire Streak 🔥` : 'No Active Streak'}
          </p>
        </div>
      </div>
      <span className="text-[10px] sm:text-xs font-bold text-orange-700 dark:text-orange-400 px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-500/20 border border-orange-300 dark:border-orange-500/30 shrink-0">
        {pacePercentage >= 75 ? 'Top 5% Diner' : pacePercentage >= 50 ? 'Active Diner' : 'Casual Diner'}
      </span>
    </div>
  );
};


