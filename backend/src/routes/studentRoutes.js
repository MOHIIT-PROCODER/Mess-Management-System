// backend/src/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/profile/:id?', studentController.getStudentProfile);
router.put('/profile', studentController.updateStudentProfile);
router.post('/profile', studentController.updateStudentProfile);
router.get('/achievements', studentController.getStudentAchievements);

module.exports = router;
