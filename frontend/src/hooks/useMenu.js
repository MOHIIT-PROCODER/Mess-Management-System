import { useState, useEffect, useCallback } from 'react';
import { menuService } from '../services/menuService';
import { supabase } from '../lib/supabaseClient';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const useMenu = (hostelId = 'a1b2c3d4-0000-0000-0000-000000000001') => {
  const [todayMenu, setTodayMenu] = useState([]);
  const [weeklyTimetable, setWeeklyTimetable] = useState(null);
  const [selectedDay, setSelectedDay] = useState(() => {
    const todayIndex = new Date().getDay();
    return DAYS[todayIndex];
  });
  const [loading, setLoading] = useState(true);

  const fetchMenu = useCallback(async () => {
    try {
      const [todayData, weeklyData] = await Promise.all([
        menuService.getTodayMenu(hostelId),
        menuService.getWeeklyMenu(hostelId)
      ]);
      setTodayMenu(todayData || []);

      // Load full 7-day timetable from local storage or server
      let timetable = {};
      const saved = localStorage.getItem('iterp_weekly_timetable');
      if (saved) {
        try {
          timetable = JSON.parse(saved);
        } catch (e) {
          console.warn('Timetable parse error:', e);
        }
      }
      setWeeklyTimetable(timetable);
    } catch (err) {
      console.warn('Failed to load menu data:', err);
    } finally {
      setLoading(false);
    }
  }, [hostelId]);

  useEffect(() => {
    let isMounted = true;

    // Initial fetch
    fetchMenu();

    // 1. Listen for local custom events (same-window instant admin update)
    const handleLocalUpdate = () => {
      if (isMounted) fetchMenu();
    };
    window.addEventListener('iterp_menu_updated', handleLocalUpdate);

    // 2. Listen for cross-tab storage changes (multi-tab sync)
    const handleStorage = (e) => {
      if (e.key === 'iterp_weekly_timetable' && isMounted) {
        fetchMenu();
      }
    };
    window.addEventListener('storage', handleStorage);

    // 3. Supabase Realtime Subscription for database changes
    let channel = null;
    try {
      channel = supabase
        .channel('food_menus_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'food_menus' },
          () => {
            if (isMounted) fetchMenu();
          }
        )
        .subscribe();
    } catch (err) {
      console.warn('Supabase realtime channel error:', err);
    }

    return () => {
      isMounted = false;
      window.removeEventListener('iterp_menu_updated', handleLocalUpdate);
      window.removeEventListener('storage', handleStorage);
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [fetchMenu]);

  return {
    todayMenu,
    weeklyTimetable,
    selectedDay,
    setSelectedDay,
    loading,
    refetch: fetchMenu
  };
};

