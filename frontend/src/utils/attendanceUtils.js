// frontend/src/utils/attendanceUtils.js

export const calculateAttendancePercentage = (presentCount, totalMeals) => {
  if (!totalMeals || totalMeals === 0) return 0;
  return Math.round((presentCount / totalMeals) * 100);
};

export const getMealBadgeColor = (meal) => {
  switch (meal) {
    case 'breakfast': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    case 'lunch': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    case 'snacks': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    case 'dinner': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
    default: return 'bg-slate-700 text-slate-300';
  }
};
