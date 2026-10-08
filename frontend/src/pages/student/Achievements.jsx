import React from 'react';
import { StreakCard } from '../../components/student/dashboard/StreakCard';
import { AchievementList } from '../../components/student/profile/AchievementList';
import { Trophy, Award, Sparkles, Flame } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Achievements = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <span>Dining Badges & Attendance Streaks</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
            Unlock official monthly dining badges based on your attendance turnout (Days in Month × 4 Meals)
          </p>
        </div>
      </div>

      <StreakCard />

      {/* Main Monthly Meal Badges & Progress Calculation */}
      <AchievementList />
    </div>
  );
};
