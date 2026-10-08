// backend/src/controllers/analyticsController.js
const { getHostelAnalyticsData } = require('../services/analyticsService');
const { successResponse, errorResponse } = require('../utils/response');

const getDashboardAnalytics = async (req, res) => {
  try {
    const hostelId = req.query.hostel_id || 'a1b2c3d4-0000-0000-0000-000000000001';
    const analyticsData = await getHostelAnalyticsData(hostelId);
    return successResponse(res, 'Analytics data retrieved', analyticsData);
  } catch (err) {
    return errorResponse(res, 'Failed to retrieve analytics: ' + err.message, 500);
  }
};

module.exports = {
  getDashboardAnalytics
};
