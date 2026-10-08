// backend/src/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/today', menuController.getTodayMenu);
router.get('/weekly', menuController.getWeeklyMenu);
router.post('/', menuController.updateMenuItem);

module.exports = router;
