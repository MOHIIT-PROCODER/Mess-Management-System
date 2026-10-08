// backend/src/utils/qrGenerator.js
const QRCode = require('qrcode');

const generateMealQR = async (tokenPayload) => {
  try {
    const payloadString = JSON.stringify(tokenPayload);
    const qrDataUrl = await QRCode.toDataURL(payloadString, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 2,
      color: {
        dark: '#1e1b4b',
        light: '#ffffff'
      }
    });
    return qrDataUrl;
  } catch (error) {
    throw new Error('Failed to generate QR code: ' + error.message);
  }
};

module.exports = {
  generateMealQR
};
