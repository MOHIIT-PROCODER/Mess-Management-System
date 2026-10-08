// backend/src/routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/uploadMiddleware');

router.post('/image', upload.single('image'), uploadController.uploadImage);

module.exports = router;
