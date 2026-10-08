import React from 'react';
import { useStudentStats } from '../../../hooks/useStudentStats';

export const MonthlyStats = () => {
  const { pacePercentage, attendedMeals, skippedMeals, totalRewardPoints } = useStudentStats();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="p-4 rounded-xl glass-card text-center">
        <p className="text-[10px] text-slate-400 uppercase font-semibold">Live Turnout</p>
        <p className="text-xl font-black text-indigo-400 mt-1">{pacePercentage}%</p>
      </div>
      <div className="p-4 rounded-xl glass-card text-center">
        <p className="text-[10px] text-slate-400 uppercase font-semibold">Meals Consumed</p>
        <p className="text-xl font-black text-emerald-400 mt-1">{attendedMeals}</p>
      </div>
      <div className="p-4 rounded-xl glass-card text-center">
        <p className="text-[10px] text-slate-400 uppercase font-semibold">Meals Skipped</p>
        <p className="text-xl font-black text-rose-400 mt-1">{skippedMeals}</p>
      </div>
      <div className="p-4 rounded-xl glass-card text-center">
        <p className="text-[10px] text-slate-400 uppercase font-semibold">Reward Points</p>
        <p className="text-xl font-black text-amber-400 mt-1">{totalRewardPoints} PTS</p>
      </div>
    </div>
  );
};
