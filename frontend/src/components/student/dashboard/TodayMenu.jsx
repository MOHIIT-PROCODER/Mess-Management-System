import React, { useState } from 'react';
import { Calendar, Clock, Flame, Sparkles, ChevronRight, LayoutGrid, CalendarDays, Utensils } from 'lucide-react';
import { MealCard } from './MealCard';
import { getCurrentMeal } from '../../../utils/dateUtils';
import { Link } from 'react-router-dom';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DEFAULT_WEEKLY_MENU = {
  Monday: [
    { meal: 'breakfast', time: '07:30 AM - 09:30 AM', items: ['Aloo Paratha', 'Curd', 'Butter', 'Tea/Coffee'], calories: 550, is_special: false },
    { meal: 'lunch', time: '12:00 PM - 02:30 PM', items: ['Jeera Rice', 'Dal Tadka', 'Paneer Butter Masala', 'Roti', 'Gulab Jamun'], calories: 850, is_special: true },
    { meal: 'snacks', time: '05:00 PM - 06:15 PM', items: ['Samosa', 'Mint Chutney', 'Masala Tea'], calories: 300, is_special: false },
    { meal: 'dinner', time: '07:30 PM - 09:45 PM', items: ['Butter Naan', 'Dal Makhani', 'Veg Pulao', 'Kheer'], calories: 780, is_special: false }
  ],
  Tuesday: [
    { meal: 'breakfast', time: '07:30 AM - 09:30 AM', items: ['Poha', 'Boiled Sprouts', 'Jalebi', 'Tea/Coffee'], calories: 520, is_special: false },
    { meal: 'lunch', time: '12:00 PM - 02:30 PM', items: ['Steamed Rice', 'Rajma Masala', 'Aloo Gobi', 'Roti', 'Salad'], calories: 790, is_special: false },
    { meal: 'snacks', time: '05:00 PM - 06:15 PM', items: ['Veg Sandwich', 'Green Chutney', 'Filter Coffee'], calories: 320, is_special: false },
    { meal: 'dinner', time: '07:30 PM - 09:45 PM', items: ['Tandoori Roti', 'Shahi Paneer', 'Veg Biryani', 'Raita', 'Rasgulla'], calories: 880, is_special: true }
  ],
  Wednesday: [
    { meal: 'breakfast', time: '07:30 AM - 09:30 AM', items: ['Idli Sambhar', 'Coconut Chutney', 'Medu Vada', 'Filter Coffee'], calories: 480, is_special: false },
    { meal: 'lunch', time: '12:00 PM - 02:30 PM', items: ['Lemon Rice', 'Chole Bhature', 'Boondi Raita', 'Pickle'], calories: 920, is_special: true },
    { meal: 'snacks', time: '05:00 PM - 06:15 PM', items: ['Kachori', 'Sweet Tamarind Dip', 'Ginger Tea'], calories: 340, is_special: false },
    { meal: 'dinner', time: '07:30 PM - 09:45 PM', items: ['Mixed Veg Curry', 'Tawa Paratha', 'Curd Rice', 'Fruit Custard'], calories: 750, is_special: false }
  ],
  Thursday: [
    { meal: 'breakfast', time: '07:30 AM - 09:30 AM', items: ['Masala Dosa', 'Sambhar', 'Tomato Chutney', 'Tea/Coffee'], calories: 560, is_special: false },
    { meal: 'lunch', time: '12:00 PM - 02:30 PM', items: ['Fried Rice', 'Chilli Paneer Gravy', 'Manchow Soup', 'Kimchi Salad'], calories: 840, is_special: true },
    { meal: 'snacks', time: '05:00 PM - 06:15 PM', items: ['Bhelpuri / Sev Puri', 'Nimbu Pani', 'Tea'], calories: 280, is_special: false },
    { meal: 'dinner', time: '07:30 PM - 09:45 PM', items: ['Palak Paneer', 'Missi Roti', 'Jeera Rice', 'Moong Dal Halwa'], calories: 810, is_special: false }
  ],
  Friday: [
    { meal: 'breakfast', time: '07:30 AM - 09:30 AM', items: ['Poori Bhaji', 'Halwa', 'Banana', 'Masala Chai'], calories: 610, is_special: false },
    { meal: 'lunch', time: '12:00 PM - 02:30 PM', items: ['Hyd Hyderabadi Veg Biryani', 'Mirchi Ka Salan', 'Onion Raita', 'Papad'], calories: 890, is_special: true },
    { meal: 'snacks', time: '05:00 PM - 06:15 PM', items: ['Corn Chaat', 'Cookies', 'Tea/Coffee'], calories: 290, is_special: false },
    { meal: 'dinner', time: '07:30 PM - 09:45 PM', items: ['Garlic Naan', 'Kadai Veggies', 'Dal Tadka', 'Ice Cream Cup'], calories: 830, is_special: false }
  ],
  Saturday: [
    { meal: 'breakfast', time: '07:30 AM - 09:30 AM', items: ['Uttapam', 'Sambhar', 'Peanut Chutney', 'Bournvita/Tea'], calories: 510, is_special: false },
    { meal: 'lunch', time: '12:00 PM - 02:30 PM', items: ['Kadhi Pakora', 'Khichdi / Plain Rice', 'Aloo Fry', 'Papad', 'Sweet Lassi'], calories: 820, is_special: false },
    { meal: 'snacks', time: '05:00 PM - 06:15 PM', items: ['Paneer Bread Roll', 'Tomato Sauce', 'Tea'], calories: 350, is_special: false },
    { meal: 'dinner', time: '07:30 PM - 09:45 PM', items: ['Pav Bhaji (Special)', 'Tawa Pulao', 'Gulab Jamun', 'Salad'], calories: 950, is_special: true }
  ],
  Sunday: [
    { meal: 'breakfast', time: '07:30 AM - 09:30 AM', items: ['Paneer Kulcha', 'Amritsari Chole', 'Sweet Lassi', 'Tea'], calories: 680, is_special: true },
    { meal: 'lunch', time: '12:00 PM - 02:30 PM', items: ['Grand Sunday Feast Thali', 'Paneer Tikka Masala', 'Dal Makhani', 'Jeera Rice', 'Rasmalai'], calories: 980, is_special: true },
    { meal: 'snacks', time: '05:00 PM - 06:15 PM', items: ['French Fries', 'Cold Coffee / Milkshake'], calories: 380, is_special: false },
    { meal: 'dinner', time: '07:30 PM - 09:45 PM', items: ['Dum Aloo Kashmiri', 'Laccha Paratha', 'Peas Pulao', 'Ice Cream'], calories: 820, is_special: false }
  ]
};

export const TodayMenu = ({ menuItems = [] }) => {
  const activeMeal = getCurrentMeal();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDayName = dayNames[new Date().getDay()];

  const [selectedDay, setSelectedDay] = useState(todayDayName);
  const [viewMode, setViewMode] = useState('day'); // 'day' | 'week'

  // Read any custom weekly menu edits from localStorage
  const getDayMeals = (dayName) => {
    try {
      const saved = localStorage.getItem('iterp_weekly_timetable');
      if (saved) {
        const timetable = JSON.parse(saved);
        if (timetable && timetable[dayName]) {
          const meals = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
          return meals.map((m, idx) => {
            const slot = timetable[dayName][m];
            const defaultSlot = DEFAULT_WEEKLY_MENU[dayName]?.[idx];
            if (slot) {
              return {
                meal: m.toLowerCase(),
                time: slot.time || defaultSlot?.time,
                items: Array.isArray(slot.items) ? slot.items : (slot.items ? slot.items.split(',').map(s => s.trim()) : defaultSlot?.items),
                calories: Number(slot.calories) || defaultSlot?.calories || 500,
                is_special: !!slot.is_special,
                image_url: slot.image_url || null,
              };
            }
            return defaultSlot;
          }).filter(Boolean);
        }
      }
    } catch (e) {
      console.warn('LocalStorage weekly menu error:', e);
    }

    if (dayName === todayDayName && menuItems.length > 0) {
      return menuItems;
    }
    return DEFAULT_WEEKLY_MENU[dayName] || DEFAULT_WEEKLY_MENU.Monday;
  };

  const currentDisplayMeals = getDayMeals(selectedDay);
  const isSelectedToday = selectedDay === todayDayName;

  return (
    <div className="space-y-4">
      {/* Header with Title, Day Picker and View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shrink-0">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                7-Day Mess Menu Schedule
              </h2>
              {isSelectedToday && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30 whitespace-nowrap shrink-0 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Today</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Viewing menu schedule for <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedDay}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons: Day vs 7-Day Full View */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'day'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Day View
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'week'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Full 7-Day Grid
            </button>
          </div>

          <Link
            to="/student/menu"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors border border-indigo-200 dark:border-indigo-800/40 shrink-0"
          >
            <span>Full Table</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 7-Day Pills Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
        {DAYS.map((day) => {
          const isToday = day === todayDayName;
          const isSelected = day === selectedDay;

          return (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day);
                setViewMode('day');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 border shrink-0 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 scale-[1.02]'
                  : isToday
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:border-indigo-400'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{day}</span>
              {isToday && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold tracking-wide ${
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

      {/* Day View: 4 Meals of the Selected Day */}
      {viewMode === 'day' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          {currentDisplayMeals.map((m) => (
            <MealCard
              key={`${selectedDay}-${m.meal}`}
              mealData={m}
              isActive={isSelectedToday && m.meal === activeMeal}
            />
          ))}
        </div>
      ) : (
        /* Full 7-Day Grid View */
        <div className="space-y-4 animate-fade-in">
          {DAYS.map((day) => {
            const dayMeals = getDayMeals(day);
            const isToday = day === todayDayName;

            return (
              <div
                key={day}
                className={`p-4 rounded-2xl border transition-all ${
                  isToday
                    ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-300 dark:border-indigo-700/60 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span>{day}</span>
                    {isToday && (
                      <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">
                        Today's Menu
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDay(day);
                      setViewMode('day');
                    }}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View Cards →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {dayMeals.map((meal) => (
                    <div
                      key={`${day}-${meal.meal}`}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs font-bold capitalize text-slate-900 dark:text-white">
                        <span className="flex items-center gap-1">
                          <Utensils className="w-3 h-3 text-indigo-500" />
                          {meal.meal}
                        </span>
                        {meal.is_special && (
                          <span className="text-[9px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">
                            Special
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-2">
                        {Array.isArray(meal.items) ? meal.items.join(', ') : meal.items}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-200/50 dark:border-slate-700/40">
                        <span>{meal.time}</span>
                        <span>{meal.calories} kcal</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};


