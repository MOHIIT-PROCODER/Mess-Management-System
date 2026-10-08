import { useState, useEffect, useCallback } from 'react';
import { getMonthlyMealBadgeCalculation, getDaysInCurrentMonth } from '../utils/dateUtils';

const STORAGE_KEY_ATTENDED = 'iterp_student_attended_meals_live';
const STORAGE_KEY_DAY = 'iterp_student_current_day_live';
const STATS_UPDATE_EVENT = 'iterp_attendance_stats_updated';

export const useStudentStats = () => {
  const getInitialDay = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DAY);
      if (saved !== null) return Math.max(1, parseInt(saved, 10));
    } catch (e) {}
    return Math.max(1, new Date().getDate());
  };

  const getInitialAttended = (day) => {
    const elapsed = day * 4;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ATTENDED);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        return Math.max(0, Math.min(parsed, elapsed));
      }
    } catch (e) {}
    // Realistic default: 87.5% attendance pace
    return Math.round(elapsed * 0.875);
  };

  const [currentDay, setCurrentDay] = useState(getInitialDay);
  const [attendedMeals, setAttendedMeals] = useState(() => getInitialAttended(getInitialDay()));

  const syncFromStorage = useCallback(() => {
    const day = getInitialDay();
    const attended = getInitialAttended(day);
    setCurrentDay(day);
    setAttendedMeals(attended);
  }, []);

  useEffect(() => {
    const handleEvent = (e) => {
      if (e?.detail) {
        if (e.detail.day !== undefined) setCurrentDay(e.detail.day);
        if (e.detail.attended !== undefined) setAttendedMeals(e.detail.attended);
      } else {
        syncFromStorage();
      }
    };

    window.addEventListener(STATS_UPDATE_EVENT, handleEvent);
    window.addEventListener('storage', handleEvent);
    return () => {
      window.removeEventListener(STATS_UPDATE_EVENT, handleEvent);
      window.removeEventListener('storage', handleEvent);
    };
  }, [syncFromStorage]);

  const updateStats = useCallback((newAttended, newDay = currentDay) => {
    const day = Math.max(1, newDay);
    const elapsed = day * 4;
    const clampedAttended = Math.max(0, Math.min(newAttended, elapsed));

    try {
      localStorage.setItem(STORAGE_KEY_DAY, day.toString());
      localStorage.setItem(STORAGE_KEY_ATTENDED, clampedAttended.toString());
      window.dispatchEvent(
        new CustomEvent(STATS_UPDATE_EVENT, {
          detail: { day, attended: clampedAttended }
        })
      );
    } catch (e) {}

    setCurrentDay(day);
    setAttendedMeals(clampedAttended);
  }, [currentDay]);

  const setScenario = useCallback((day, meals) => {
    updateStats(meals, day);
  }, [updateStats]);

  // Unified calculations
  const calculation = getMonthlyMealBadgeCalculation(attendedMeals, currentDay);
  const {
    daysInMonth,
    elapsedMealsToDate,
    totalPossibleMonthMeals,
    pacePercentage,
    monthPercentage,
    badges,
    currentBadge,
    nextBadge,
    mealsNeededForNext
  } = calculation;

  const skippedMeals = Math.max(0, elapsedMealsToDate - attendedMeals);

  // Dynamic Fire Streak calculation based on real-time turnout & days
  let streakDays = 0;
  if (attendedMeals > 0) {
    if (pacePercentage >= 100) {
      streakDays = currentDay; // Perfect streak for all active days
    } else if (pacePercentage >= 75) {
      streakDays = Math.max(1, Math.round(currentDay * 0.8));
    } else if (pacePercentage >= 50) {
      streakDays = Math.max(1, Math.round(currentDay * 0.5));
    } else if (pacePercentage >= 25) {
      streakDays = Math.max(1, Math.round(currentDay * 0.25));
    } else {
      streakDays = 0; // Lost streak
    }
  }

  // Dynamic Reward Points calculation
  const badgePoints = currentBadge ? currentBadge.points : 0;
  const mealPoints = attendedMeals * 10;
  const streakBonusPoints = streakDays * 20;
  const totalRewardPoints = badgePoints + mealPoints + streakBonusPoints;

  // Real-time proportional meal breakdown
  const breakfast = Math.round(attendedMeals * 0.26);
  const lunch = Math.round(attendedMeals * 0.32);
  const snacks = Math.round(attendedMeals * 0.18);
  const dinner = Math.max(0, attendedMeals - (breakfast + lunch + snacks));

  const perSlotElapsed = Math.max(1, currentDay);

  // Weekly chart data reflecting live turnout pace
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const avgMealsPerDay = attendedMeals / Math.max(1, currentDay);
  const weeklyChartData = daysOfWeek.map((day, idx) => {
    // Generate realistic daily meal distribution averaging to current attendance pace
    const variation = (idx % 2 === 0 ? 0.2 : -0.2);
    const dayMeals = Math.min(4, Math.max(0, Math.round(avgMealsPerDay + variation)));
    return {
      day,
      attendance: dayMeals
    };
  });

  return {
    currentDay,
    daysInMonth,
    elapsedMealsToDate,
    totalPossibleMonthMeals,
    attendedMeals,
    skippedMeals,
    pacePercentage,
    monthPercentage,
    badges,
    currentBadge,
    nextBadge,
    mealsNeededForNext,
    streakDays,
    totalRewardPoints,
    breakdown: {
      breakfast: { attended: breakfast, total: perSlotElapsed, pct: Math.min(100, Math.round((breakfast / perSlotElapsed) * 100)) },
      lunch: { attended: lunch, total: perSlotElapsed, pct: Math.min(100, Math.round((lunch / perSlotElapsed) * 100)) },
      snacks: { attended: snacks, total: perSlotElapsed, pct: Math.min(100, Math.round((snacks / perSlotElapsed) * 100)) },
      dinner: { attended: dinner, total: perSlotElapsed, pct: Math.min(100, Math.round((dinner / perSlotElapsed) * 100)) }
    },
    weeklyChartData,
    updateStats,
    setScenario
  };
};
