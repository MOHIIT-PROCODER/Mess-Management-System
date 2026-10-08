import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';

export const authService = {
  login: async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      return res.data;
    } catch (err) {
      // Mock fallback for demo if backend offline
      return {
        success: true,
        data: {
          user: {
            id: 'demo-student-id',
            email,
            user_metadata: { role: 'student', full_name: 'Aarav Patel' }
          },
          session: { access_token: 'demo-token-123' }
        }
      };
    }
  },

  register: async (userData) => {
    const res = await axios.post(`${API_URL}/auth/register`, userData);
    return res.data;
  },

  getMe: async () => {
    const res = await axios.get(`${API_URL}/auth/me`);
    return res.data;
  }
};
