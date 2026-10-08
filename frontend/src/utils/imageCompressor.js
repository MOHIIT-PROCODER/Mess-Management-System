/**
 * imageCompressor.js
 * Client-side image compression using the Canvas API.
 * No external libraries needed — pure browser APIs.
 */

/**
 * Compress an image File to a smaller Blob.
 * @param {File} file - Original image file
 * @param {Object} options
 * @param {number} options.maxWidth  - Max width in px (default 800)
 * @param {number} options.maxHeight - Max height in px (default 800)
 * @param {number} options.quality   - JPEG quality 0-1 (default 0.75)
 * @param {string} options.mimeType  - Output MIME (default 'image/jpeg')
 * @returns {Promise<{ blob: Blob, dataUrl: string, sizeKB: number, originalSizeKB: number }>}
 */
export const compressImage = (file, options = {}) => {
  const {
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.75,
    mimeType = 'image/jpeg',
  } = options;

  return new Promise((resolve, reject) => {
    const originalSizeKB = Math.round(file.size / 1024);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Calculate new dimensions keeping aspect ratio
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        // White background for transparent PNGs
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas compression failed'));
              return;
            }
            const dataUrl = canvas.toDataURL(mimeType, quality);
            resolve({
              blob,
              dataUrl,
              sizeKB: Math.round(blob.size / 1024),
              originalSizeKB,
              width,
              height,
            });
          },
          mimeType,
          quality
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Convert a Blob to a File object
 */
export const blobToFile = (blob, fileName, mimeType = 'image/jpeg') => {
  return new File([blob], fileName, { type: mimeType, lastModified: Date.now() });
};
