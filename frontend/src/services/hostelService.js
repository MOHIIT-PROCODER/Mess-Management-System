import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';

export const hostelService = {
  getHostels: async () => {
    try {
      const res = await axios.get(`${API_URL}/hostels`);
      return res.data.data;
    } catch (err) {
      return [
        { id: 'a1b2c3d4-0000-0000-0000-000000000007', name: 'BH-7 (Boys Hostel 7)', code: 'BH-7', capacity: 550, mess_capacity: 220 },
        { id: 'a1b2c3d4-0000-0000-0000-000000000001', name: 'Aryabhata Boys Hostel', code: 'ABH-1', capacity: 450, mess_capacity: 180 },
        { id: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Gargi Girls Hostel', code: 'GGH-1', capacity: 400, mess_capacity: 160 },
        { id: 'a1b2c3d4-0000-0000-0000-000000000003', name: 'Tagore International Hostel', code: 'TIH-1', capacity: 250, mess_capacity: 100 }
      ];
    }
  },

  createHostel: async (hostelData) => {
    const res = await axios.post(`${API_URL}/hostels`, hostelData);
    return res.data;
  }
};
