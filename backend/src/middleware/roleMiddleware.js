// backend/src/middleware/roleMiddleware.js
const { errorResponse } = require('../utils/response');

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.user_metadata?.role || req.user?.role || 'student';
    if (!allowedRoles.includes(userRole) && userRole !== 'super_admin') {
      return errorResponse(res, `Forbidden: Access restricted to roles [${allowedRoles.join(', ')}]`, 403);
    }
    next();
  };
};

module.exports = {
  requireRole
};
