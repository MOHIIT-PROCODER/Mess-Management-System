// backend/src/validators/menuValidator.js
const Joi = require('joi');

const menuSchema = Joi.object({
  hostel_id: Joi.string().uuid().required(),
  day_of_week: Joi.number().min(0).max(6).required(),
  meal: Joi.string().valid('breakfast', 'lunch', 'snacks', 'dinner').required(),
  items: Joi.array().items(Joi.string()).required(),
  calories: Joi.number().min(0).optional(),
  dietary_tags: Joi.array().items(Joi.string()).optional(),
  image_url: Joi.string().uri().optional().allow('', null),
  start_time: Joi.string().required(),
  end_time: Joi.string().required(),
  is_special: Joi.boolean().optional()
});

module.exports = {
  menuSchema
};
