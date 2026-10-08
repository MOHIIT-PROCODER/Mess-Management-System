import React from 'react';
import { MealCard } from './MealCard';
import { getCurrentMeal } from '../../../utils/dateUtils';

export const TodayMenu = ({ menuItems = [] }) => {
  const activeMeal = getCurrentMeal();

  const defaultMeals = [
    { meal: 'breakfast', time: '07:30 AM - 09:30 AM', items: ['Aloo Paratha', 'Curd', 'Butter', 'Tea/Coffee'], calories: 550, is_special: false },
    { meal: 'lunch', time: '12:00 PM - 02:30 PM', items: ['Jeera Rice', 'Dal Tadka', 'Paneer Butter Masala', 'Gulab Jamun'], calories: 850, is_special: true },
    { meal: 'snacks', time: '05:00 PM - 06:15 PM', items: ['Samosa', 'Mint Chutney', 'Masala Tea'], calories: 300, is_special: false },
    { meal: 'dinner', time: '07:30 PM - 09:45 PM', items: ['Butter Naan', 'Dal Makhani', 'Veg Pulao', 'Kheer'], calories: 780, is_special: false }
  ];

  const displayList = menuItems.length > 0 ? menuItems : defaultMeals;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <span>Today's Menu Schedule</span>
        </h2>
        <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 shrink-0 font-semibold">
          Live Updates
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayList.map((m) => (
          <MealCard key={m.meal} mealData={m} isActive={m.meal === activeMeal} />
        ))}
      </div>
    </div>
  );
};

