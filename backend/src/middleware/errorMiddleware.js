// backend/src/middleware/errorMiddleware.js
const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error('🔥 Server Error:', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return errorResponse(res, message, statusCode, err);
};

module.exports = errorHandler;
