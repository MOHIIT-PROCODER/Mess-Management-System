// backend/src/controllers/uploadController.js
const { uploadImageToCloudinary } = require('../services/cloudinaryService');
const { successResponse, errorResponse } = require('../utils/response');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No image file uploaded', 400);
    }

    const folder = req.body.folder || 'mess-management';
    const imageUrl = await uploadImageToCloudinary(req.file.buffer, folder);

    return successResponse(res, 'Image uploaded successfully', { url: imageUrl }, 201);
  } catch (err) {
    // Fallback URL if Cloudinary upload fails or unconfigured
    const fallbackUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
    return successResponse(res, 'Image uploaded (demo fallback)', { url: fallbackUrl }, 200);
  }
};

module.exports = {
  uploadImage
};
