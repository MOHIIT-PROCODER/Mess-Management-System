// backend/src/middleware/validationMiddleware.js
const { errorResponse } = require('../utils/response');

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      const details = error.details.map(d => d.message).join('; ');
      return errorResponse(res, `Validation Error: ${details}`, 400);
    }
    req.body = value;
    next();
  };
};

module.exports = {
  validate
};
