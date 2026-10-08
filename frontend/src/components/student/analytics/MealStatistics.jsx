import React from 'react';
import { useStudentStats } from '../../../hooks/useStudentStats';

export const MealStatistics = () => {
  const { breakdown } = useStudentStats();

  return (
    <div className="p-6 rounded-2xl glass-card space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-white text-base">Meal Slots Breakdown</h3>
      <div className="space-y-3 text-xs">
        <div>
          <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
            <span>Lunch Turnout</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {breakdown.lunch.pct}% ({breakdown.lunch.attended}/{breakdown.lunch.total})
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${breakdown.lunch.pct}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
            <span>Dinner Turnout</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">
              {breakdown.dinner.pct}% ({breakdown.dinner.attended}/{breakdown.dinner.total})
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
            <div className="bg-indigo-500 h-2 rounded-full transition-all duration-500" style={{ width: `${breakdown.dinner.pct}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
            <span>Breakfast Turnout</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">
              {breakdown.breakfast.pct}% ({breakdown.breakfast.attended}/{breakdown.breakfast.total})
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full transition-all duration-500" style={{ width: `${breakdown.breakfast.pct}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
            <span>Snacks Turnout</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold">
              {breakdown.snacks.pct}% ({breakdown.snacks.attended}/{breakdown.snacks.total})
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: `${breakdown.snacks.pct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};
