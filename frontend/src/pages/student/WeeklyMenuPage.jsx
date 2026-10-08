import React, { useState, useMemo } from 'react';
import {
  Calendar, Clock, Flame, Search, Sparkles, Filter,
  Coffee, Utensils, Cookie, Moon, Star, CheckCircle, Info
} from 'lucide-react';
import { MealCard } from '../../components/student/dashboard/MealCard';
import { getCurrentMeal } from '../../utils/dateUtils';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];

const DEFAULT_WEEKLY_TIMETABLE = {
  Monday: {
    Breakfast: { time: '07:30 AM - 09:30 AM', items: ['Aloo Paratha', 'Curd', 'Butter', 'Tea/Coffee'], calories: 550, is_special: false, image_url: null },
    Lunch:     { time: '12:00 PM - 02:30 PM', items: ['Jeera Rice', 'Dal Tadka', 'Paneer Butter Masala', 'Roti', 'Gulab Jamun'], calories: 850, is_special: true, image_url: null },
    Snacks:    { time: '05:00 PM - 06:15 PM', items: ['Samosa', 'Mint Chutney', 'Masala Tea'], calories: 300, is_special: false, image_url: null },
    Dinner:    { time: '07:30 PM - 09:45 PM', items: ['Butter Naan', 'Dal Makhani', 'Veg Pulao', 'Kheer'], calories: 780, is_special: false, image_url: null },
  },
  Tuesday: {
    Breakfast: { time: '07:30 AM - 09:30 AM', items: ['Poha', 'Boiled Sprouts', 'Jalebi', 'Tea/Coffee'], calories: 520, is_special: false, image_url: null },
    Lunch:     { time: '12:00 PM - 02:30 PM', items: ['Steamed Rice', 'Rajma Masala', 'Aloo Gobi', 'Roti', 'Salad'], calories: 790, is_special: false, image_url: null },
    Snacks:    { time: '05:00 PM - 06:15 PM', items: ['Veg Sandwich', 'Green Chutney', 'Filter Coffee'], calories: 320, is_special: false, image_url: null },
    Dinner:    { time: '07:30 PM - 09:45 PM', items: ['Tandoori Roti', 'Shahi Paneer', 'Veg Biryani', 'Raita', 'Rasgulla'], calories: 880, is_special: true, image_url: null },
  },
  Wednesday: {
    Breakfast: { time: '07:30 AM - 09:30 AM', items: ['Idli Sambhar', 'Coconut Chutney', 'Medu Vada', 'Filter Coffee'], calories: 480, is_special: false, image_url: null },
    Lunch:     { time: '12:00 PM - 02:30 PM', items: ['Lemon Rice', 'Chole Bhature', 'Boondi Raita', 'Pickle'], calories: 920, is_special: true, image_url: null },
    Snacks:    { time: '05:00 PM - 06:15 PM', items: ['Kachori', 'Sweet Tamarind Dip', 'Ginger Tea'], calories: 340, is_special: false, image_url: null },
    Dinner:    { time: '07:30 PM - 09:45 PM', items: ['Mixed Veg Curry', 'Tawa Paratha', 'Curd Rice', 'Fruit Custard'], calories: 750, is_special: false, image_url: null },
  },
  Thursday: {
    Breakfast: { time: '07:30 AM - 09:30 AM', items: ['Masala Dosa', 'Sambhar', 'Tomato Chutney', 'Tea/Coffee'], calories: 560, is_special: false, image_url: null },
    Lunch:     { time: '12:00 PM - 02:30 PM', items: ['Fried Rice', 'Chilli Paneer Gravy', 'Manchow Soup', 'Kimchi Salad'], calories: 840, is_special: true, image_url: null },
    Snacks:    { time: '05:00 PM - 06:15 PM', items: ['Bhelpuri / Sev Puri', 'Nimbu Pani', 'Tea'], calories: 280, is_special: false, image_url: null },
    Dinner:    { time: '07:30 PM - 09:45 PM', items: ['Palak Paneer', 'Missi Roti', 'Jeera Rice', 'Moong Dal Halwa'], calories: 810, is_special: false, image_url: null },
  },
  Friday: {
    Breakfast: { time: '07:30 AM - 09:30 AM', items: ['Poori Bhaji', 'Halwa', 'Banana', 'Masala Chai'], calories: 610, is_special: false, image_url: null },
    Lunch:     { time: '12:00 PM - 02:30 PM', items: ['Hyd Hyderabadi Veg Biryani', 'Mirchi Ka Salan', 'Onion Raita', 'Papad'], calories: 890, is_special: true, image_url: null },
    Snacks:    { time: '05:00 PM - 06:15 PM', items: ['Corn Chaat', 'Cookies', 'Tea/Coffee'], calories: 290, is_special: false, image_url: null },
    Dinner:    { time: '07:30 PM - 09:45 PM', items: ['Garlic Naan', 'Kadai Veggies', 'Dal Tadka', 'Ice Cream Cup'], calories: 830, is_special: false, image_url: null },
  },
  Saturday: {
    Breakfast: { time: '07:30 AM - 09:30 AM', items: ['Uttapam', 'Sambhar', 'Peanut Chutney', 'Bournvita/Tea'], calories: 510, is_special: false, image_url: null },
    Lunch:     { time: '12:00 PM - 02:30 PM', items: ['Kadhi Pakora', 'Khichdi / Plain Rice', 'Aloo Fry', 'Papad', 'Sweet Lassi'], calories: 820, is_special: false, image_url: null },
    Snacks:    { time: '05:00 PM - 06:15 PM', items: ['Paneer Bread Roll', 'Tomato Sauce', 'Tea'], calories: 350, is_special: false, image_url: null },
    Dinner:    { time: '07:30 PM - 09:45 PM', items: ['Pav Bhaji (Special)', 'Tawa Pulao', 'Gulab Jamun', 'Salad'], calories: 950, is_special: true, image_url: null },
  },
  Sunday: {
    Breakfast: { time: '07:30 AM - 09:30 AM', items: ['Paneer Kulcha', 'Amritsari Chole', 'Sweet Lassi', 'Tea'], calories: 680, is_special: true, image_url: null },
    Lunch:     { time: '12:00 PM - 02:30 PM', items: ['Grand Sunday Feast Thali', 'Paneer Tikka Masala', 'Dal Makhani', 'Jeera Rice', 'Rasmalai'], calories: 980, is_special: true, image_url: null },
    Snacks:    { time: '05:00 PM - 06:15 PM', items: ['French Fries', 'Cold Coffee / Milkshake'], calories: 380, is_special: false, image_url: null },
    Dinner:    { time: '07:30 PM - 09:45 PM', items: ['Dum Aloo Kashmiri', 'Laccha Paratha', 'Peas Pulao', 'Ice Cream'], calories: 820, is_special: false, image_url: null },
  },
};

import { menuService } from '../../services/menuService';

export const WeeklyMenuPage = () => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDayName = dayNames[new Date().getDay()];
  const activeMeal = getCurrentMeal();

  const [selectedDay, setSelectedDay] = useState('ALL'); // 'ALL' or day name
  const [mealFilter, setMealFilter] = useState('ALL'); // 'ALL' | 'breakfast' | 'lunch' | 'snacks' | 'dinner'
  const [searchQuery, setSearchQuery] = useState('');
  const [menuDataVersion, setMenuDataVersion] = useState(0);

  // Fetch live menu from server/database on load
  useEffect(() => {
    menuService.getWeeklyMenu().then(() => {
      setMenuDataVersion((v) => v + 1);
    });

    const handleUpdate = () => setMenuDataVersion((v) => v + 1);
    window.addEventListener('iterp_menu_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('iterp_menu_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Load latest timetable (with localStorage / Supabase overrides)
  const timetable = useMemo(() => {
    const base = JSON.parse(JSON.stringify(DEFAULT_WEEKLY_TIMETABLE));
    try {
      const saved = localStorage.getItem('iterp_weekly_timetable');
      if (saved) {
        const parsed = JSON.parse(saved);
        DAYS.forEach((day) => {
          if (parsed[day]) {
            MEALS.forEach((m) => {
              if (parsed[day][m]) {
                const itemData = parsed[day][m];
                base[day][m] = {
                  ...base[day][m],
                  items: Array.isArray(itemData.items) ? itemData.items : itemData.items.split(',').map((s) => s.trim()),
                  calories: Number(itemData.calories) || base[day][m].calories,
                  time: itemData.time || base[day][m].time,
                  is_special: !!itemData.is_special,
                  image_url: itemData.image_url || null,
                };
              }
            });
          }
        });
      }
    } catch (e) {
      console.warn('Weekly timetable read error:', e);
    }
    return base;
  }, [menuDataVersion]);

  const activeDaysToRender = selectedDay === 'ALL' ? DAYS : [selectedDay];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Weekly Mess Food Timetable</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            7-Day Comprehensive Menu
          </h1>
          <p className="text-indigo-100 text-xs md:text-sm max-w-2xl">
            Explore complete meal schedules, calorie counts, special feast menus, and timings for every day of the week.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Controls Bar: Day Selector & Search */}
      <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search & Filter Row */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dish (e.g., Paneer, Biryani, Dosa)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Meal Category Filters */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {['ALL', 'breakfast', 'lunch', 'snacks', 'dinner'].map((m) => (
              <button
                key={m}
                onClick={() => setMealFilter(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border ${
                  mealFilter === m
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                }`}
              >
                {m === 'ALL' ? 'All Meals' : m}
              </button>
            ))}
          </div>
        </div>

        {/* Day Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 no-scrollbar border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setSelectedDay('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
              selectedDay === 'ALL'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            All 7 Days
          </button>

          {DAYS.map((day) => {
            const isToday = day === todayDayName;
            const isSelected = selectedDay === day;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                    : isToday
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{day}</span>
                {isToday && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-indigo-600 text-white'
                    }`}
                  >
                    TODAY
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Days & Meals */}
      <div className="space-y-8">
        {activeDaysToRender.map((day) => {
          const isToday = day === todayDayName;
          const dayData = timetable[day];

          // Filter meals based on selected meal category and search query
          const filteredMeals = MEALS.filter((m) => {
            if (mealFilter !== 'ALL' && m.toLowerCase() !== mealFilter) return false;
            if (searchQuery.trim()) {
              const query = searchQuery.toLowerCase();
              const itemsMatch = dayData[m].items.some((dish) => dish.toLowerCase().includes(query));
              const mealMatch = m.toLowerCase().includes(query);
              return itemsMatch || mealMatch;
            }
            return true;
          });

          if (filteredMeals.length === 0) return null;

          // Calculate total calories for the day
          const totalCalories = MEALS.reduce((acc, m) => acc + (dayData[m]?.calories || 0), 0);

          return (
            <div
              key={day}
              className={`p-5 rounded-3xl border transition-all ${
                isToday
                  ? 'bg-indigo-50/20 dark:bg-slate-900/90 border-indigo-300 dark:border-indigo-600/50 shadow-lg shadow-indigo-500/5'
                  : 'bg-white dark:bg-slate-900/90 border-slate-200/80 dark:border-slate-800/80 shadow-sm'
              }`}
            >
              {/* Day Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2.5 rounded-2xl ${isToday ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                        {day}
                      </h2>
                      {isToday && (
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-bold tracking-wide shadow-sm">
                          TODAY
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      4 Scheduled Meals • Complete Nutrition Overview
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-300 text-xs font-bold">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>Total {totalCalories} kcal</span>
                  </span>
                </div>
              </div>

              {/* 4 Meal Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredMeals.map((mealName) => {
                  const m = dayData[mealName];
                  const mealDataFormatted = {
                    meal: mealName.toLowerCase(),
                    time: m.time,
                    items: m.items,
                    calories: m.calories,
                    is_special: m.is_special,
                    image_url: m.image_url,
                  };

                  return (
                    <MealCard
                      key={`${day}-${mealName}`}
                      mealData={mealDataFormatted}
                      isActive={isToday && mealName.toLowerCase() === activeMeal}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default WeeklyMenuPage;
