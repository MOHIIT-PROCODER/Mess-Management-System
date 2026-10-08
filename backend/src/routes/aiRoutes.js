// backend/src/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/insights', aiController.getAIInsights);

module.exports = router;
