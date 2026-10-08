// backend/src/middleware/hostelMiddleware.js
const { errorResponse } = require('../utils/response');

const requireHostelAccess = (req, res, next) => {
  const hostelId = req.query.hostel_id || req.body.hostel_id || req.params.hostel_id;
  if (!hostelId) {
    return errorResponse(res, 'Hostel ID is required for this action', 400);
  }
  next();
};

module.exports = {
  requireHostelAccess
};
