// backend/src/validators/complaintValidator.js
const Joi = require('joi');

const complaintSchema = Joi.object({
  hostel_id: Joi.string().uuid().required(),
  category: Joi.string().valid('food_quality', 'hygiene', 'staff_behavior', 'amenities', 'other').required(),
  title: Joi.string().min(5).max(150).required(),
  description: Joi.string().min(10).required(),
  image_url: Joi.string().uri().optional().allow('', null)
});

module.exports = {
  complaintSchema
};
