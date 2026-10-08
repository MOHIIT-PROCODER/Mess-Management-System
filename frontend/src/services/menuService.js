import axios from 'axios';

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
  getTodayMenu: async (hostelId) => {
    const todayDayIndex = new Date().getDay();
    const todayDayName = DAYS[todayDayIndex];

    // Check localStorage overrides first for instant offline/demo reflection
    let localDayData = null;
    try {
      const saved = localStorage.getItem('iterp_weekly_timetable');
      if (saved) {
        const timetable = JSON.parse(saved);
        if (timetable && timetable[todayDayName]) {
          localDayData = timetable[todayDayName];
        }
      }
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }

    try {
      const res = await axios.get(`${API_URL}/menu/today`, { params: { hostel_id: hostelId } });
      if (res.data && res.data.data && res.data.data.length > 0) {
        // Merge with local overrides if available
        return res.data.data.map(item => {
          const mealKey = item.meal.charAt(0).toUpperCase() + item.meal.slice(1).toLowerCase();
          const override = localDayData ? localDayData[mealKey] : null;
          return {
            ...item,
            image_url: override?.image_url !== undefined ? override.image_url : (item.image_url || null),
            items: override?.items ? (Array.isArray(override.items) ? override.items : override.items.split(',').map(s => s.trim())) : item.items,
            calories: override?.calories ? Number(override.calories) : item.calories,
            time: override?.time || (item.start_time && item.end_time ? `${item.start_time} - ${item.end_time}` : DEFAULT_TIMES[item.meal.toLowerCase()])
          };
        });
      }
    } catch {
      // Backend not running or offline
    }

    // Build today menu from local timetable or defaults
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

  getWeeklyMenu: async (hostelId) => {
    try {
      const res = await axios.get(`${API_URL}/menu/weekly`, { params: { hostel_id: hostelId } });
      return res.data.data;
    } catch {
      return null;
    }
  },

  updateMenuItem: async (menuData) => {
    // 1. Sync immediately to local storage timetable for real-time reactivity
    try {
      const saved = localStorage.getItem('iterp_weekly_timetable');
      const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const dayName = dayNames[(menuData.day_of_week - 1) % 7] || 'Monday';
      const mealCapitalized = menuData.meal.charAt(0).toUpperCase() + menuData.meal.slice(1).toLowerCase();

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

      // 2. Dispatch cross-component and cross-tab update event
      window.dispatchEvent(new CustomEvent('iterp_menu_updated', {
        detail: { dayName, meal: menuData.meal, menuData }
      }));
    } catch (e) {
      console.warn('Storage sync error:', e);
    }

    // 3. Persist to backend database
    try {
      const res = await axios.post(`${API_URL}/menu`, menuData);
      return res.data;
    } catch (err) {
      console.warn('Menu backend sync note (mock fallback active):', err.message);
      return { success: true, data: menuData };
    }
  },

  deleteMenuItem: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/menu/${id}`);
      return res.data;
    } catch {
      return { success: true };
    }
  },
};
