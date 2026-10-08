// backend/src/controllers/aiController.js
const { generateMenuRecommendations } = require('../services/groqService');
const { successResponse, errorResponse } = require('../utils/response');

const getAIInsights = async (req, res) => {
  try {
    const feedbackSample = req.body.feedback || [
      { rating: 5, item: 'Paneer Butter Masala', sentiment: 'positive' },
      { rating: 2, item: 'Evening Tea', sentiment: 'negative' }
    ];

    const aiResult = await generateMenuRecommendations(feedbackSample);
    return successResponse(res, 'AI Insights & Recommendations generated', aiResult);
  } catch (err) {
    return errorResponse(res, 'Failed to generate AI insights: ' + err.message, 500);
  }
};

module.exports = {
  getAIInsights
};
