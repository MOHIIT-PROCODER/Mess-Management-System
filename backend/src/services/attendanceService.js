// backend/src/services/attendanceService.js
const { generateMealQR } = require('../utils/qrGenerator');

const generateStudentMealToken = async (studentId, hostelId, meal) => {
  const payload = {
    student_id: studentId,
    hostel_id: hostelId,
    meal,
    timestamp: Date.now(),
    nonce: Math.random().toString(36).substring(7)
  };
  const qrCodeUrl = await generateMealQR(payload);
  return { payload, qrCodeUrl };
};

module.exports = {
  generateStudentMealToken
};
