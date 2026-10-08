// backend/src/utils/dateUtils.js

const getCurrentMealSlot = (currentTime = new Date()) => {
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  if (currentMinutes >= 450 && currentMinutes <= 570) return 'breakfast';
  if (currentMinutes >= 720 && currentMinutes <= 870) return 'lunch';   // Closes strictly at 14:30 (2:30 PM)
  if (currentMinutes >= 1020 && currentMinutes <= 1095) return 'snacks';
  if (currentMinutes >= 1170 && currentMinutes <= 1305) return 'dinner';

  // Fallback to next upcoming meal if outside serving window
  if (currentMinutes < 570) return 'breakfast';
  if (currentMinutes < 870) return 'lunch';
  if (currentMinutes < 1095) return 'snacks';
  if (currentMinutes < 1305) return 'dinner';
  return 'breakfast';
};

const getTodayDayOfWeek = () => {
  return new Date().getDay(); // 0 = Sunday, 6 = Saturday
};

module.exports = {
  getCurrentMealSlot,
  getTodayDayOfWeek
};
