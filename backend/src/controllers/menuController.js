// backend/src/controllers/menuController.js
const supabaseAdmin = require('../config/supabase');
const { successResponse, errorResponse } = require('../utils/response');
const { getTodayDayOfWeek } = require('../utils/dateUtils');

const getTodayMenu = async (req, res) => {
  try {
    const hostelId = req.query.hostel_id || 'a1b2c3d4-0000-0000-0000-000000000001';
    const dayOfWeek = getTodayDayOfWeek();

    const { data, error } = await supabaseAdmin
      .from('food_menus')
      .select('*')
      .eq('hostel_id', hostelId)
      .eq('day_of_week', dayOfWeek);

    if (error || !data || data.length === 0) {
      // Return mock today menu if DB empty
      const mockMenu = [
        { id: '1', meal: 'breakfast', items: ['Aloo Paratha', 'Curd', 'Tea/Coffee'], calories: 550, start_time: '07:30', end_time: '09:30', is_special: false },
        { id: '2', meal: 'lunch', items: ['Jeera Rice', 'Dal Tadka', 'Paneer Butter Masala', 'Roti', 'Gulab Jamun'], calories: 850, start_time: '12:00', end_time: '14:30', is_special: true },
        { id: '3', meal: 'snacks', items: ['Vegetable Samosa', 'Mint Chutney', 'Tea'], calories: 300, start_time: '17:00', end_time: '18:15', is_special: false },
        { id: '4', meal: 'dinner', items: ['Butter Naan', 'Dal Makhani', 'Veg Pulao', 'Ice Cream'], calories: 780, start_time: '19:30', end_time: '21:45', is_special: false }
      ];
      return successResponse(res, "Today's food menu fetched", mockMenu);
    }

    return successResponse(res, "Today's food menu fetched", data);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch today menu: ' + err.message, 500);
  }
};

const getWeeklyMenu = async (req, res) => {
  try {
    const hostelId = req.query.hostel_id || 'a1b2c3d4-0000-0000-0000-000000000001';
    const { data, error } = await supabaseAdmin
      .from('food_menus')
      .select('*')
      .eq('hostel_id', hostelId);

    return successResponse(res, 'Weekly food menu fetched', data || []);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch weekly menu: ' + err.message, 500);
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { hostel_id, day_of_week, meal, items, calories, dietary_tags, image_url, start_time, end_time, is_special } = req.body;

    const { data, error } = await supabaseAdmin
      .from('food_menus')
      .upsert({
        hostel_id,
        day_of_week,
        meal,
        items,
        calories: calories || 500,
        dietary_tags: dietary_tags || ['veg'],
        image_url: image_url || null,
        start_time,
        end_time,
        is_special: is_special || false
      }, { onConflict: 'hostel_id,day_of_week,meal' })
      .select();

    if (error) return errorResponse(res, error.message, 400);

    return successResponse(res, 'Food menu updated successfully', data);
  } catch (err) {
    return errorResponse(res, 'Failed to update food menu: ' + err.message, 500);
  }
};

module.exports = {
  getTodayMenu,
  getWeeklyMenu,
  updateMenuItem
};
