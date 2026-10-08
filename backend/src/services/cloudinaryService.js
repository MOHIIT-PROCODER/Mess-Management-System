// backend/src/services/cloudinaryService.js
const cloudinary = require('../config/cloudinary');

const uploadImageToCloudinary = async (fileBuffer, folder = 'mess-management') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

module.exports = {
  uploadImageToCloudinary
};
