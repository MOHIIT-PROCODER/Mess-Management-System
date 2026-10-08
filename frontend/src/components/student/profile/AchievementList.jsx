import React from 'react';
import {
  CheckCircle2, Lock, Sparkles, Trophy, Info, Flame,
  TrendingDown, TrendingUp, Plus, Minus, RefreshCw, Calendar, Zap
} from 'lucide-react';
import { useStudentStats } from '../../../hooks/useStudentStats';

export const AchievementList = () => {
  const {
    currentDay,
    daysInMonth,
    elapsedMealsToDate,
    totalPossibleMonthMeals,
    attendedMeals,
    pacePercentage,
    monthPercentage,
    badges,
    currentBadge,
    nextBadge,
    mealsNeededForNext,
    updateStats,
    setScenario
  } = useStudentStats();

  const handleAttendedChange = (newVal) => {
    updateStats(newVal, currentDay);
  };

  const setDayScenario = (day, meals) => {
    setScenario(day, meals);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Dynamic Monthly Meal Progress Banner */}
      <div className="p-6 rounded-3xl glass-card border border-indigo-500/20 shadow-xl space-y-5 relative overflow-hidden bg-gradient-to-br from-indigo-900/10 via-purple-900/5 to-slate-900/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
              <span className="text-2xl">🍲</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Monthly Meal Progress & Live Badge</h3>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold border border-indigo-200 dark:border-indigo-700/50">
                  Day {currentDay} of {daysInMonth}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Pace Calculation: <strong className="text-indigo-600 dark:text-indigo-400">{attendedMeals}</strong> attended out of <strong className="text-indigo-600 dark:text-indigo-400">{elapsedMealsToDate}</strong> elapsed meals ({currentDay} Days × 4 Meals)
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
              {attendedMeals} / {elapsedMealsToDate} <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Meals</span>
            </p>
            <div className="flex items-center justify-start sm:justify-end gap-1.5 mt-0.5">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                pacePercentage >= 75
                  ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30'
                  : pacePercentage >= 50
                  ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-500/30'
                  : 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/30'
              }`}>
                {pacePercentage}% live turnout rate
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3.5 p-0.5 overflow-hidden border border-slate-200 dark:border-slate-700/60 relative">
            <div
              className={`h-full rounded-full transition-all duration-700 shadow-md ${
                pacePercentage >= 75
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400'
                  : pacePercentage >= 50
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-400'
                  : 'bg-gradient-to-r from-amber-500 to-rose-400'
              }`}
              style={{ width: `${pacePercentage}%` }}
            />
          </div>

          {/* Progress Milestones */}
          <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1 pt-0.5">
            <span>0%</span>
            <span>25% (Starter 🥉)</span>
            <span>50% (Pro 🥈)</span>
            <span>75% (Master 🥇)</span>
            <span>100% (Legend 👑)</span>
          </div>
        </div>

        {/* Current Level & Next Badge Live Standing */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <span className="text-3xl animate-bounce">{currentBadge ? currentBadge.icon : '🌱'}</span>
            <div>
              <div className="flex items-center space-x-1.5">
                <p className="text-[10px] uppercase font-bold text-slate-400">Live Active Badge</p>
                {pacePercentage >= 100 && (
                  <span className="px-2 py-0.2 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                    Peak Performance 🔥
                  </span>
                )}
              </div>
              <p className="font-extrabold text-slate-900 dark:text-white text-base">
                {currentBadge ? `Current Level: ${currentBadge.name}` : 'Unranked Cadet (Under 25% pace)'}
              </p>
            </div>
          </div>

          {nextBadge ? (
            <div className="flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-2 rounded-xl border border-indigo-200 dark:border-indigo-800/40">
              <span className="text-xl">{nextBadge.icon}</span>
              <div>
                <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                  Target: <strong>{nextBadge.name}</strong>
                </p>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-[11px]">
                  {mealsNeededForNext} more {mealsNeededForNext === 1 ? 'meal' : 'meals'} needed to rank up!
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 font-bold">
              <span>👑 Maximum Rank! Flawless 100% Attendance Streak!</span>
            </div>
          )}
        </div>

        {/* Live Attendance Interactive Adjuster & Scenarios */}
        <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Real-Time Attendance Simulator & Badge Deceleration Test:</span>
            </div>

            {/* Quick Increment/Decrement Buttons */}
            <div className="flex items-center space-x-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleAttendedChange(attendedMeals - 1)}
                disabled={attendedMeals <= 0}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950 text-rose-600 text-xs font-bold transition-colors disabled:opacity-30"
                title="Simulate Skipped Meal (Decreases Badge)"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono font-bold text-xs px-2 text-slate-900 dark:text-white">
                {attendedMeals} Attended
              </span>
              <button
                type="button"
                onClick={() => handleAttendedChange(attendedMeals + 1)}
                disabled={attendedMeals >= elapsedMealsToDate}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-emerald-600 text-xs font-bold transition-colors disabled:opacity-30"
                title="Eat Next Meal (Increases Badge)"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Real-Time Test Scenarios */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Test Real-Time Examples:</span>
            
            {/* Day 1: 4/4 = 100% Mess Legend */}
            <button
              type="button"
              onClick={() => setDayScenario(1, 4)}
              className="px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 font-bold hover:bg-purple-100 transition-colors"
            >
              📅 Day 1: Ate 4/4 Meals → 👑 Mess Legend (100%)
            </button>

            {/* Day 3: Skipped 2 days (4/12 = 33%) -> Decreases to Meal Starter */}
            <button
              type="button"
              onClick={() => setDayScenario(3, 4)}
              className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 font-bold hover:bg-amber-100 transition-colors"
            >
              📉 Skipped 2 Days (4/12 Meals) → Drops to 🥉 Meal Starter
            </button>

            {/* Day 8: Ate 16/32 = 50% -> Climbs back to Meal Pro */}
            <button
              type="button"
              onClick={() => setDayScenario(8, 16)}
              className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-bold hover:bg-slate-200 transition-colors"
            >
              📈 Resumed Eating (16/32 Meals) → Climbs to 🥈 Meal Pro
            </button>

            {/* Reset to Active Month Status */}
            <button
              type="button"
              onClick={() => {
                const today = Math.max(1, new Date().getDate());
                setDayScenario(today, Math.round(today * 4 * 0.875)); // e.g. 28/32 on Day 8
              }}
              className="px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40 font-bold hover:bg-indigo-100 transition-colors ml-auto"
            >
              <RefreshCw className="w-3 h-3 inline mr-1" />
              Reset Live
            </button>
          </div>
        </div>
      </div>

      {/* Official Badge Milestones Table */}
      <div className="p-6 rounded-3xl glass-card space-y-4 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Monthly Badge Tier Standings</h3>
          </div>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            Real-Time Turnout Thresholds
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase font-bold">
                <th className="py-3 px-3">Badge</th>
                <th className="py-3 px-3">Required Pace</th>
                <th className="py-3 px-3">Current Meals Target</th>
                <th className="py-3 px-3 text-right">Live Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {badges.map((badge) => (
                <tr
                  key={badge.id}
                  className={`transition-colors ${
                    badge.unlocked
                      ? 'bg-amber-500/5 dark:bg-amber-500/5'
                      : 'opacity-65'
                  }`}
                >
                  <td className="py-3.5 px-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-2xl">{badge.icon}</span>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{badge.name}</span>
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">+{badge.points} PTS</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{badge.percentage}%</span> Turnout Pace
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{badge.requiredMealsForCurrentPeriod}</span> / {elapsedMealsToDate} meals
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    {badge.unlocked ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] border border-emerald-300 dark:border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Active Rank</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold text-[11px]">
                        <Lock className="w-3 h-3" />
                        <span>Needs {badge.requiredMealsForCurrentPeriod - attendedMeals} more</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Real-time Dynamic Rules Explanation */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
          <div className="flex items-center space-x-1.5 font-bold text-slate-900 dark:text-white">
            <Info className="w-4 h-4 text-indigo-500" />
            <span>How Real-Time Badge Decreases & Increases Work:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-[11px] leading-relaxed">
            <li><strong>Day 1 (4 Meals Eaten):</strong> Since you ate 4/4 possible meals (100%), your rank immediately hits 👑 <strong>Mess Legend</strong>!</li>
            <li><strong>Skipped Days (Deceleration):</strong> As calendar days progress without scanning meals, elapsed possible meals increase (e.g. 12 meals by Day 3). If you haven't eaten, your live turnout drops to 33%, causing your badge to dynamically <strong>decrease</strong> to 🥉 <strong>Meal Starter</strong>.</li>
            <li><strong>Resuming Meals (Acceleration):</strong> Attending subsequent meals immediately raises your attendance pace, dynamically climbing back up to 🥈 <strong>Meal Pro</strong>, 🥇 <strong>Meal Master</strong>, and 👑 <strong>Mess Legend</strong>!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
