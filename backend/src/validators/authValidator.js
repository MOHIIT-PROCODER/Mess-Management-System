// backend/src/validators/authValidator.js
const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  full_name: Joi.string().required(),
  roll_number: Joi.string().optional().allow(''),
  phone: Joi.string().optional().allow(''),
  phone_number: Joi.string().optional().allow(''),
  hostel_name: Joi.string().optional().allow(''),
  role: Joi.string().valid('student', 'hostel_admin', 'mess_admin', 'super_admin').default('student'),
  hostel_id: Joi.string().optional().allow(null, ''),
  room_number: Joi.string().optional().allow('')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = {
  registerSchema,
  loginSchema
};
