// backend/src/services/analyticsService.js

const getHostelAnalyticsData = async (hostelId) => {
  return {
    totalStudents: 450,
    todayTurnout: 398,
    turnoutPercentage: 88.4,
    avgRating: 4.3,
    activeComplaintsCount: 4,
    mealBreakdown: {
      breakfast: 380,
      lunch: 420,
      snacks: 310,
      dinner: 398
    },
    weeklyTrend: [
      { day: 'Mon', attendance: 390, rating: 4.2 },
      { day: 'Tue', attendance: 405, rating: 4.5 },
      { day: 'Wed', attendance: 412, rating: 4.1 },
      { day: 'Thu', attendance: 395, rating: 4.3 },
      { day: 'Fri', attendance: 420, rating: 4.6 },
      { day: 'Sat', attendance: 380, rating: 4.0 },
      { day: 'Sun', attendance: 350, rating: 4.4 }
    ]
  };
};

module.exports = {
  getHostelAnalyticsData
};
