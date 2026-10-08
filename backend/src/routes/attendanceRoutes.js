// backend/src/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/generate-qr', attendanceController.generateQRToken);
router.post('/scan-qr', attendanceController.scanQRToken);
router.get('/live', attendanceController.getLiveAttendance);

module.exports = router;
