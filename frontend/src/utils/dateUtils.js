// frontend/src/utils/dateUtils.js

export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedHours = h % 12 || 12;
  return `${formattedHours}:${minutes} ${ampm}`;
};

/**
 * Returns the meal currently being served, or null if outside serving windows.
 * Breakfast: 07:30 - 09:30 (450 to 570 mins)
 * Lunch:     12:00 - 14:30 (720 to 870 mins) - Closes strictly at 2:30 PM
 * Snacks:    17:00 - 18:15 (1020 to 1095 mins)
 * Dinner:    19:30 - 21:45 (1170 to 1305 mins)
 */
export const getCurrentMeal = () => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (currentMinutes >= 450 && currentMinutes <= 570) return 'breakfast';
  if (currentMinutes >= 720 && currentMinutes <= 870) return 'lunch';
  if (currentMinutes >= 1020 && currentMinutes <= 1095) return 'snacks';
  if (currentMinutes >= 1170 && currentMinutes <= 1305) return 'dinner';

  return null;
};

/**
 * Returns the next upcoming meal if no meal is currently serving.
 */
export const getNextMeal = () => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (currentMinutes < 570) return 'breakfast';
  if (currentMinutes < 870) return 'lunch';
  if (currentMinutes < 1095) return 'snacks';
  if (currentMinutes < 1305) return 'dinner';
  return 'breakfast'; // next day breakfast
};

/**
 * Returns current meal or next upcoming meal for attendance/QR scanner fallbacks.
 */
export const getCurrentOrNextMeal = () => {
  return getCurrentMeal() || getNextMeal() || 'lunch';
};

/**
 * Helper to check status of a specific meal: 'serving' | 'completed' | 'upcoming'
 */
export const getMealTimeStatus = (mealKey) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const slots = {
    breakfast: { start: 450, end: 570 },
    lunch:     { start: 720, end: 870 },
    snacks:    { start: 1020, end: 1095 },
    dinner:    { start: 1170, end: 1305 },
  };

  const slot = slots[mealKey?.toLowerCase()];
  if (!slot) return 'upcoming';

  if (currentMinutes >= slot.start && currentMinutes <= slot.end) {
    return 'serving';
  } else if (currentMinutes > slot.end) {
    return 'completed';
  } else {
    return 'upcoming';
  }
};

export const getTodayDateString = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Days in Month calculation
 */
export const getDaysInCurrentMonth = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 1-indexed
  return new Date(year, month, 0).getDate();
};

/**
 * Calculates dynamic real-time badge standing based on elapsed meals to date.
 * If on Day 1 student eats 4/4 meals -> 100% -> 👑 Mess Legend.
 * If student skips meals over subsequent days, the denominator increases,
 * decreasing their live percentage and lowering their badge tier in real-time.
 */
export const getMonthlyMealBadgeCalculation = (attendedMealsParam, customDay, customElapsed) => {
  const now = new Date();
  const currentDay = customDay !== undefined ? customDay : Math.max(1, now.getDate());
  const daysInMonth = getDaysInCurrentMonth(now);
  const totalPossibleMonthMeals = daysInMonth * 4;

  // Elapsed meals to date in current month (minimum 4 meals on Day 1)
  const elapsedMealsToDate = customElapsed !== undefined ? customElapsed : Math.max(4, currentDay * 4);

  // Attended meals can never exceed elapsed meals to date in the current month
  const rawAttended = attendedMealsParam !== undefined ? attendedMealsParam : Math.round(elapsedMealsToDate * 0.85);
  const attended = Math.max(0, Math.min(rawAttended, elapsedMealsToDate));

  // Real-time Pace Percentage (0% to 100%)
  const pacePercentage = Math.min(100, Math.round((attended / elapsedMealsToDate) * 100));

  // Overall Month Completion Percentage
  const monthPercentage = Math.min(100, Math.round((attended / totalPossibleMonthMeals) * 100));

  const badges = [
    {
      id: 'meal-starter',
      name: 'Meal Starter',
      icon: '🥉',
      minRate: 25,
      requiredMeals: Math.round(totalPossibleMonthMeals * 0.25),
      percentage: 25,
      points: 100,
      description: 'Maintained at least 25% attendance pace to date',
      color: 'amber'
    },
    {
      id: 'meal-pro',
      name: 'Meal Pro',
      icon: '🥈',
      minRate: 50,
      requiredMeals: Math.round(totalPossibleMonthMeals * 0.50),
      percentage: 50,
      points: 250,
      description: 'Maintained at least 50% attendance pace to date',
      color: 'slate'
    },
    {
      id: 'meal-master',
      name: 'Meal Master',
      icon: '🥇',
      minRate: 75,
      requiredMeals: Math.round(totalPossibleMonthMeals * 0.75),
      percentage: 75,
      points: 400,
      description: 'Maintained at least 75% attendance pace to date',
      color: 'yellow'
    },
    {
      id: 'mess-legend',
      name: 'Mess Legend',
      icon: '👑',
      minRate: 100,
      requiredMeals: totalPossibleMonthMeals,
      percentage: 100,
      points: 600,
      description: 'Flawless 100% attendance pace across all meals so far',
      color: 'purple'
    }
  ];

  let currentBadge = null;
  let nextBadge = badges[0];
  let mealsNeededForNext = Math.ceil(elapsedMealsToDate * 0.25) - attended;

  if (pacePercentage >= 100) {
    currentBadge = badges[3]; // Mess Legend 👑
    nextBadge = null;
    mealsNeededForNext = 0;
  } else if (pacePercentage >= 75) {
    currentBadge = badges[2]; // Meal Master 🥇
    nextBadge = badges[3];    // Mess Legend 👑
    mealsNeededForNext = Math.max(1, elapsedMealsToDate - attended);
  } else if (pacePercentage >= 50) {
    currentBadge = badges[1]; // Meal Pro 🥈
    nextBadge = badges[2];    // Meal Master 🥇
    const needed75 = Math.ceil(elapsedMealsToDate * 0.75) - attended;
    mealsNeededForNext = Math.max(1, needed75);
  } else if (pacePercentage >= 25) {
    currentBadge = badges[0]; // Meal Starter 🥉
    nextBadge = badges[1];    // Meal Pro 🥈
    const needed50 = Math.ceil(elapsedMealsToDate * 0.50) - attended;
    mealsNeededForNext = Math.max(1, needed50);
  } else {
    currentBadge = null; // Rookie Cadet (Under 25%)
    nextBadge = badges[0];
    const needed25 = Math.ceil(elapsedMealsToDate * 0.25) - attended;
    mealsNeededForNext = Math.max(1, needed25);
  }

  // Calculate live unlocked status for each badge tier based on pace
  const badgeStatuses = badges.map((b) => {
    const isUnlocked = pacePercentage >= b.minRate;
    return {
      ...b,
      unlocked: isUnlocked,
      requiredMealsForCurrentPeriod: Math.ceil(elapsedMealsToDate * (b.minRate / 100))
    };
  });

  return {
    currentDay,
    daysInMonth,
    elapsedMealsToDate,
    totalPossibleMonthMeals,
    attendedMeals: attended,
    percentage: pacePercentage,
    pacePercentage,
    monthPercentage,
    badges: badgeStatuses,
    currentBadge,
    nextBadge,
    mealsNeededForNext: Math.max(0, mealsNeededForNext)
  };
};
