// backend/src/controllers/hostelController.js
const supabaseAdmin = require('../config/supabase');
const { successResponse, errorResponse } = require('../utils/response');

const getHostels = async (req, res) => {
  try {
    const { data } = await supabaseAdmin.from('hostels').select('*');
    return successResponse(res, 'Hostels list retrieved', data || [
      { id: 'a1b2c3d4-0000-0000-0000-000000000007', name: 'BH-7 (Boys Hostel 7)', code: 'BH-7', capacity: 550, mess_capacity: 220 },
      { id: 'a1b2c3d4-0000-0000-0000-000000000001', name: 'Aryabhata Boys Hostel', code: 'ABH-1', capacity: 450, mess_capacity: 180 },
      { id: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Gargi Girls Hostel', code: 'GGH-1', capacity: 400, mess_capacity: 160 },
      { id: 'a1b2c3d4-0000-0000-0000-000000000003', name: 'Tagore International Hostel', code: 'TIH-1', capacity: 250, mess_capacity: 100 }
    ]);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch hostels: ' + err.message, 500);
  }
};

const createHostel = async (req, res) => {
  try {
    const { name, code, capacity, mess_capacity, description } = req.body;
    const { data, error } = await supabaseAdmin.from('hostels').insert({
      name, code, capacity, mess_capacity, description
    }).select();

    if (error) return errorResponse(res, error.message, 400);
    return successResponse(res, 'Hostel created successfully', data ? data[0] : null, 201);
  } catch (err) {
    return errorResponse(res, 'Failed to create hostel: ' + err.message, 500);
  }
};

module.exports = {
  getHostels,
  createHostel
};
