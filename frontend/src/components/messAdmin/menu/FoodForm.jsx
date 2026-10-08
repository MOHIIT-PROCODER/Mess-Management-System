import React, { useState } from 'react';
import { menuService } from '../../../services/menuService';
import { Save, CheckCircle2 } from 'lucide-react';

export const FoodForm = ({ onSaved }) => {
  const [dayOfWeek, setDayOfWeek] = useState(1); // Monday
  const [meal, setMeal] = useState('lunch');
  const [itemsText, setItemsText] = useState('Paneer Butter Masala, Dal Tadka, Jeera Rice, Roti, Gulab Jamun');
  const [calories, setCalories] = useState(850);
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('14:30');
  const [isSpecial, setIsSpecial] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const items = itemsText.split(',').map(s => s.trim()).filter(Boolean);
    await menuService.updateMenuItem({
      hostel_id: 'a1b2c3d4-0000-0000-0000-000000000001',
      day_of_week: Number(dayOfWeek),
      meal,
      items,
      calories: Number(calories),
      start_time: startTime,
      end_time: endTime,
      is_special: isSpecial
    });
    setSaving(false);
    if (onSaved) onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass-card space-y-4 max-w-2xl">
      <h3 className="font-bold text-slate-900 dark:text-white text-base">Edit Food Slot Details</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Day of Week</label>
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
            <option value={0}>Sunday</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Meal Slot</label>
          <select
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="snacks">Snacks</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Dish Items (Comma Separated)</label>
        <input
          type="text"
          value={itemsText}
          onChange={(e) => setItemsText(e.target.value)}
          placeholder="e.g. Aloo Paratha, Curd, Tea"
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Calories (kcal)</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <input
          type="checkbox"
          id="special"
          checked={isSpecial}
          onChange={(e) => setIsSpecial(e.target.checked)}
          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
        />
        <label htmlFor="special" className="text-xs text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">
          Mark as Special / Feast Menu
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full gradient-btn py-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 text-white"
      >
        <Save className="w-4 h-4" />
        <span>{saving ? 'Saving Menu...' : 'Save & Publish Menu Slot'}</span>
      </button>
    </form>
  );
};
