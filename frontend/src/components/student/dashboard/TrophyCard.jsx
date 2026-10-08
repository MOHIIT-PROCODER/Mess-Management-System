import React from 'react';
import { Trophy, Award, ChevronRight, Sparkles, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStudentStats } from '../../../hooks/useStudentStats';

export const TrophyCard = () => {
  const {
    attendedMeals,
    elapsedMealsToDate,
    pacePercentage,
    currentBadge,
    nextBadge,
    mealsNeededForNext
  } = useStudentStats();

  return (
    <div className="p-5 rounded-2xl glass-card border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-indigo-500/10 dark:from-amber-500/5 dark:to-indigo-500/5 space-y-3.5 relative overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="text-3xl">{currentBadge ? currentBadge.icon : '🌱'}</span>
          <div>
            <div className="flex items-center space-x-1.5">
              <p className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">Live Badge Standing</p>
              {pacePercentage >= 100 && (
                <span className="px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[9px] font-bold">
                  100% Pace
                </span>
              )}
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
              {currentBadge ? `Current Level: ${currentBadge.name}` : 'Unranked (Under 25%)'}
            </h4>
          </div>
        </div>

        <Link
          to="/student/achievements"
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center shrink-0"
        >
          <span>All Badges</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Progress Bar & Target */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="font-semibold text-slate-600 dark:text-slate-400">
            {attendedMeals} / {elapsedMealsToDate} Meals Attended
          </span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            {pacePercentage}% Live Turnout
          </span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-200 dark:border-slate-700/60 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              pacePercentage >= 75
                ? 'bg-gradient-to-r from-amber-400 via-purple-500 to-emerald-400'
                : pacePercentage >= 50
                ? 'bg-gradient-to-r from-indigo-500 to-blue-400'
                : 'bg-gradient-to-r from-amber-500 to-rose-400'
            }`}
            style={{ width: `${pacePercentage}%` }}
          />
        </div>
      </div>

      {/* Next Badge Unlock Status */}
      {nextBadge ? (
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-amber-200/60 dark:border-amber-900/30 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-base">{nextBadge.icon}</span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              Next Badge: <strong className="text-slate-900 dark:text-white">{nextBadge.name}</strong>
            </span>
          </div>
          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">
            {mealsNeededForNext} more {mealsNeededForNext === 1 ? 'meal' : 'meals'} to unlock!
          </span>
        </div>
      ) : (
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold text-center">
          👑 Max Level Reached! Mess Legend Badge Unlocked!
        </div>
      )}
    </div>
  );
};
