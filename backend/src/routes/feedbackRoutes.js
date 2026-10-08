// backend/src/routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.get('/', feedbackController.getAllFeedback);
router.post('/', feedbackController.submitFeedback);
router.get('/summary', feedbackController.getFeedbackSummary);
router.post('/:id/reply', feedbackController.replyFeedback);

module.exports = router;
