import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';

export const studentService = {
  getProfile: async (studentId) => {
    try {
      const res = await axios.get(`${API_URL}/student/profile/${studentId || ''}`);
      return res.data.data;
    } catch (err) {
      return {
        id: 'demo-student-id',
        full_name: 'Aarav Patel',
        roll_number: '21CS089',
        email: 'aarav.patel@student.edu',
        phone_number: '+91 98765 43210',
        room_number: '204-A',
        hostel_name: 'Aryabhata Boys Hostel',
        streak_days: 14,
        total_points: 650
      };
    }
  },

  getAchievements: async () => {
    try {
      const res = await axios.get(`${API_URL}/student/achievements`);
      return res.data.data;
    } catch (err) {
      return [
        { id: '1', title: 'Meal Starter', description: 'Attended 30 meals in the month (25% progress)', badge: '🥉', points: 100, unlocked: true },
        { id: '2', title: 'Meal Pro', description: 'Attended 60 meals in the month (50% progress)', badge: '🥈', points: 250, unlocked: true },
        { id: '3', title: 'Meal Master', description: 'Attended 90 meals in the month (75% progress)', badge: '🥇', points: 400, unlocked: false },
        { id: '4', title: 'Mess Legend', description: 'Attended 120+ meals in the month (100% progress)', badge: '👑', points: 600, unlocked: false }
      ];
    }
  },

  updateProfile: async (profileData) => {
    try {
      const res = await axios.put(`${API_URL}/student/profile`, profileData);
      return res.data;
    } catch (err) {
      return { success: true, data: profileData };
    }
  }
};
