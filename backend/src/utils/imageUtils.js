// backend/src/utils/imageUtils.js

const sanitizeImageFileName = (originalName) => {
  return originalName
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-');
};

module.exports = {
  sanitizeImageFileName
};
