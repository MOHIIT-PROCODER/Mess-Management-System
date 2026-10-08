// backend/src/validators/feedbackValidator.js
const Joi = require('joi');

const feedbackSchema = Joi.object({
  hostel_id: Joi.string().uuid().required(),
  meal: Joi.string().valid('breakfast', 'lunch', 'snacks', 'dinner').required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().optional().allow(''),
  food_item: Joi.string().optional().allow(''),
  image_url: Joi.string().uri().optional().allow('', null)
});

module.exports = {
  feedbackSchema
};
