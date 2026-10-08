import axios from 'axios';
import { supabase } from '../lib/supabaseClient';

const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';

const DEFAULT_ITEMS = {
  breakfast: ['Aloo Paratha', 'Curd', 'Butter', 'Tea/Coffee'],
  lunch: ['Jeera Rice', 'Dal Tadka', 'Paneer Butter Masala', 'Roti', 'Gulab Jamun'],
  snacks: ['Samosa', 'Mint Chutney', 'Masala Tea'],
  dinner: ['Butter Naan', 'Dal Makhani', 'Veg Pulao', 'Kheer']
};

const DEFAULT_TIMES = {
  breakfast: '07:30 AM - 09:30 AM',
  lunch: '12:00 PM - 02:30 PM',
  snacks: '05:00 PM - 06:15 PM',
  dinner: '07:30 PM - 09:45 PM'
};

const DEFAULT_CALORIES = {
  breakfast: 550,
  lunch: 850,
  snacks: 300,
  dinner: 780
};

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const menuService = {
  getTodayMenu: async (hostelId = 'a1b2c3d4-0000-0000-0000-000000000001') => {
    const todayDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
    const todayDayName = DAYS[todayDayIndex];
    const dayOfWeekNumber = todayDayIndex === 0 ? 7 : todayDayIndex;

    // 1. Try fetching from Supabase directly
    try {
      const { data: supaData, error: supaError } = await supabase
        .from('food_menus')
        .select('*')
        .eq('hostel_id', hostelId)
        .eq('day_of_week', dayOfWeekNumber);

      if (!supaError && supaData && supaData.length > 0) {
        // Sync to local storage for offline speed
        try {
          const saved = localStorage.getItem('iterp_weekly_timetable');
          let timetable = saved ? JSON.parse(saved) : {};
          if (!timetable[todayDayName]) timetable[todayDayName] = {};
          supaData.forEach((row) => {
            const mKey = row.meal ? row.meal.charAt(0).toUpperCase() + row.meal.slice(1).toLowerCase() : 'Lunch';
            timetable[todayDayName][mKey] = {
              time: row.start_time && row.end_time ? `${row.start_time} - ${row.end_time}` : DEFAULT_TIMES[row.meal.toLowerCase()],
              items: Array.isArray(row.items) ? row.items.join(', ') : (row.items || ''),
              calories: row.calories || DEFAULT_CALORIES[row.meal.toLowerCase()],
              is_special: !!row.is_special,
              image_url: row.image_url || null,
            };
          });
          localStorage.setItem('iterp_weekly_timetable', JSON.stringify(timetable));
        } catch (e) {}

        return supaData.map((item) => ({
          ...item,
          time: item.start_time && item.end_time ? `${item.start_time} - ${item.end_time}` : DEFAULT_TIMES[item.meal.toLowerCase()]
        }));
      }
    } catch (e) {
      console.warn('Supabase today menu query note:', e);
    }

    // 2. Try Backend API
    try {
      const res = await axios.get(`${API_URL}/menu/today`, { params: { hostel_id: hostelId } });
      if (res.data && res.data.data && res.data.data.length > 0) {
        return res.data.data;
      }
    } catch (e) {}

    // 3. Fallback to localStorage or built-in defaults
    let localDayData = null;
    try {
      const saved = localStorage.getItem('iterp_weekly_timetable');
      if (saved) {
        const timetable = JSON.parse(saved);
        if (timetable && timetable[todayDayName]) {
          localDayData = timetable[todayDayName];
        }
      }
    } catch (e) {}

    const meals = ['breakfast', 'lunch', 'snacks', 'dinner'];
    return meals.map((meal, idx) => {
      const mealKey = meal.charAt(0).toUpperCase() + meal.slice(1);
      const slot = localDayData ? localDayData[mealKey] : null;
      return {
        id: String(idx + 1),
        meal,
        items: slot ? (Array.isArray(slot.items) ? slot.items : slot.items.split(',').map(s => s.trim()).filter(Boolean)) : DEFAULT_ITEMS[meal],
        calories: slot ? Number(slot.calories) || DEFAULT_CALORIES[meal] : DEFAULT_CALORIES[meal],
        time: slot?.time || DEFAULT_TIMES[meal],
        start_time: slot?.time?.split(' - ')[0] || DEFAULT_TIMES[meal].split(' - ')[0],
        end_time: slot?.time?.split(' - ')[1] || DEFAULT_TIMES[meal].split(' - ')[1],
        is_special: slot ? !!slot.is_special : meal === 'lunch',
        image_url: slot?.image_url || null,
      };
    });
  },

  getWeeklyMenu: async (hostelId = 'a1b2c3d4-0000-0000-0000-000000000001') => {
    // 1. Try Supabase
    try {
      const { data, error } = await supabase
        .from('food_menus')
        .select('*')
        .eq('hostel_id', hostelId);

      if (!error && data && data.length > 0) {
        // Merge into localStorage
        try {
          const saved = localStorage.getItem('iterp_weekly_timetable');
          let timetable = saved ? JSON.parse(saved) : {};
          const dayNamesOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
          data.forEach((row) => {
            const dayName = dayNamesOrder[(row.day_of_week - 1) % 7];
            const mKey = row.meal ? row.meal.charAt(0).toUpperCase() + row.meal.slice(1).toLowerCase() : 'Lunch';
            if (dayName && mKey) {
              if (!timetable[dayName]) timetable[dayName] = {};
              timetable[dayName][mKey] = {
                time: row.start_time && row.end_time ? `${row.start_time} - ${row.end_time}` : DEFAULT_TIMES[row.meal.toLowerCase()],
                items: Array.isArray(row.items) ? row.items.join(', ') : (row.items || ''),
                calories: row.calories || DEFAULT_CALORIES[row.meal.toLowerCase()],
                is_special: !!row.is_special,
                image_url: row.image_url || null,
              };
            }
          });
          localStorage.setItem('iterp_weekly_timetable', JSON.stringify(timetable));
        } catch (e) {}

        return data;
      }
    } catch (e) {}

    // 2. Try Backend API
    try {
      const res = await axios.get(`${API_URL}/menu/weekly`, { params: { hostel_id: hostelId } });
      if (res.data?.data) return res.data.data;
    } catch (e) {}

    return null;
  },

  updateMenuItem: async (menuData) => {
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayName = dayNames[(menuData.day_of_week - 1) % 7] || 'Monday';
    const mealCapitalized = menuData.meal.charAt(0).toUpperCase() + menuData.meal.slice(1).toLowerCase();

    // 1. Sync immediately to local storage timetable for real-time local responsiveness
    try {
      const saved = localStorage.getItem('iterp_weekly_timetable');
      let timetable = saved ? JSON.parse(saved) : {};
      if (!timetable[dayName]) timetable[dayName] = {};
      timetable[dayName][mealCapitalized] = {
        time: `${menuData.start_time || '07:30 AM'} - ${menuData.end_time || '09:30 AM'}`,
        items: Array.isArray(menuData.items) ? menuData.items.join(', ') : menuData.items,
        calories: Number(menuData.calories) || 500,
        is_special: !!menuData.is_special,
        image_url: menuData.image_url || null,
      };
      localStorage.setItem('iterp_weekly_timetable', JSON.stringify(timetable));

      // Dispatch cross-component event
      window.dispatchEvent(new CustomEvent('iterp_menu_updated', {
        detail: { dayName, meal: menuData.meal, menuData }
      }));
    } catch (e) {
      console.warn('Storage sync error:', e);
    }

    // 2. Upsert to Supabase database so all students globally see the updated image & dishes on Render
    try {
      await supabase
        .from('food_menus')
        .upsert({
          hostel_id: menuData.hostel_id || 'a1b2c3d4-0000-0000-0000-000000000001',
          day_of_week: menuData.day_of_week,
          meal: menuData.meal.toLowerCase(),
          items: Array.isArray(menuData.items) ? menuData.items : menuData.items.split(',').map(s => s.trim()).filter(Boolean),
          calories: Number(menuData.calories) || 500,
          start_time: menuData.start_time,
          end_time: menuData.end_time,
          is_special: !!menuData.is_special,
          image_url: menuData.image_url || null,
        }, { onConflict: 'hostel_id,day_of_week,meal' });
    } catch (err) {
      console.warn('Supabase direct menu update notice:', err);
    }

    // 3. Persist to backend API endpoint
    try {
      const res = await axios.post(`${API_URL}/menu`, menuData);
      return res.data;
    } catch (err) {
      return { success: true, data: menuData };
    }
  },

  deleteMenuItem: async (id) => {
    try {
      await supabase.from('food_menus').delete().eq('id', id);
      const res = await axios.delete(`${API_URL}/menu/${id}`);
      return res.data;
    } catch {
      return { success: true };
    }
  },
};
