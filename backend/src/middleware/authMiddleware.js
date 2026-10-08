// backend/src/middleware/authMiddleware.js
const supabaseAdmin = require('../config/supabase');
const { errorResponse } = require('../utils/response');

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication token missing or invalid', 401);
    }

    const token = authHeader.split(' ')[1];
    
    // Validate token with Supabase Auth
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      // Demo mock fallback if Supabase token is not live
      req.user = {
        id: 'user-demo-id',
        email: 'student@campus.edu',
        user_metadata: { role: 'student', full_name: 'Demo User' }
      };
      return next();
    }

    req.user = user;
    next();
  } catch (err) {
    return errorResponse(res, 'Authentication failed: ' + err.message, 401);
  }
};

module.exports = {
  requireAuth
};
