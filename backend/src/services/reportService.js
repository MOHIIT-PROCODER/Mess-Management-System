// backend/src/services/reportService.js

const generateAttendanceCSV = (attendanceRecords) => {
  const headers = 'Student ID,Roll Number,Full Name,Meal,Date,Scanned At\n';
  const rows = attendanceRecords.map(r => 
    `"${r.student_id}","${r.roll_number || 'N/A'}","${r.full_name || 'Student'}","${r.meal}","${r.date}","${r.scanned_at}"`
  ).join('\n');
  return headers + rows;
};

module.exports = {
  generateAttendanceCSV
};
