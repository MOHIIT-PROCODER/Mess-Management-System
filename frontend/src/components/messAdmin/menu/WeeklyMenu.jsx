import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, Pencil, Save, X, Flame, Star, ChevronDown,
  Loader2, CheckCircle2, Utensils, Coffee, Cookie, Moon
} from 'lucide-react';
import { menuService } from '../../../services/menuService';
import { FoodImageUploader } from './FoodImageUploader';

// ── Default weekly timetable data ─────────────────────────
const DEFAULT_MENU = {
  Breakfast: { time: '07:30 - 09:30 AM', items: 'Aloo Paratha, Curd, Butter, Tea/Coffee', calories: 550, is_special: false, image_url: null },
  Lunch:     { time: '12:00 - 02:30 PM', items: 'Jeera Rice, Dal Tadka, Paneer Butter Masala, Roti, Gulab Jamun', calories: 850, is_special: true,  image_url: null },
  Snacks:    { time: '05:00 - 06:15 PM', items: 'Samosa, Mint Chutney, Masala Tea', calories: 300, is_special: false, image_url: null },
  Dinner:    { time: '07:30 - 09:45 PM', items: 'Butter Naan, Dal Makhani, Veg Pulao, Kheer', calories: 780, is_special: false, image_url: null },
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];

const MEAL_ICONS = {
  Breakfast: <Coffee className="w-3.5 h-3.5" />,
  Lunch:     <Utensils className="w-3.5 h-3.5" />,
  Snacks:    <Cookie className="w-3.5 h-3.5" />,
  Dinner:    <Moon className="w-3.5 h-3.5" />,
};

const MEAL_COLORS = {
  Breakfast: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50',
  Lunch:     'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50',
  Snacks:    'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/50',
  Dinner:    'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/50',
};

// Build initial state: {Monday: {Breakfast: {...}, Lunch: {...}}, ...}
const buildInitialWeek = () => {
  const week = {};
  DAYS.forEach((day) => {
    week[day] = {};
    MEALS.forEach((meal) => {
      week[day][meal] = { ...DEFAULT_MENU[meal] };
    });
  });

  try {
    const saved = localStorage.getItem('iterp_weekly_timetable');
    if (saved) {
      const parsed = JSON.parse(saved);
      DAYS.forEach((day) => {
        if (parsed[day]) {
          MEALS.forEach((meal) => {
            if (parsed[day][meal]) {
              week[day][meal] = { ...week[day][meal], ...parsed[day][meal] };
            }
          });
        }
      });
    }
  } catch (err) {
    console.warn('LocalStorage timetable read error:', err);
  }

  return week;
};

// ── Inline Slot Editor ─────────────────────────────────────
const SlotEditor = ({ day, meal, data, onSave, onCancel }) => {
  const [form, setForm] = useState({ ...data });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    const dayIdx = DAYS.indexOf(day) + 1;
    const [startTime, rawEnd] = form.time.split(' - ');
    const endTime = rawEnd?.replace(' AM', '').replace(' PM', '') || startTime;
    await menuService.updateMenuItem({
      hostel_id: 'a1b2c3d4-0000-0000-0000-000000000001',
      day_of_week: dayIdx,
      meal: meal.toLowerCase(),
      items: form.items.split(',').map((s) => s.trim()).filter(Boolean),
      calories: Number(form.calories),
      start_time: startTime?.trim(),
      end_time: endTime?.trim(),
      is_special: form.is_special,
      image_url: form.image_url || null,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); onSave(form); }, 800);
  };

  return (
    <div className="space-y-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-500/50 shadow-lg shadow-indigo-500/10">
      {/* Food Image */}
      <div>
        <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Food Photo</label>
        <FoodImageUploader
          currentImage={form.image_url}
          mealLabel={`${day}-${meal}`}
          onImageSaved={(url) => set('image_url', url)}
        />
      </div>

      {/* Dish Items */}
      <div>
        <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Dishes (comma-separated)</label>
        <textarea
          value={form.items}
          onChange={(e) => set('items', e.target.value)}
          rows={2}
          className="w-full mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500 resize-none"
        />
      </div>

      {/* Time + Calories */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Time Slot</label>
          <input
            type="text"
            value={form.time}
            onChange={(e) => set('time', e.target.value)}
            placeholder="07:30 - 09:30 AM"
            className="w-full mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Calories (kcal)</label>
          <input
            type="number"
            value={form.calories}
            onChange={(e) => set('calories', e.target.value)}
            className="w-full mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Special toggle */}
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <div
          onClick={() => set('is_special', !form.is_special)}
          className={`relative w-8 h-4 rounded-full transition-colors ${form.is_special ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}
        >
          <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform shadow ${form.is_special ? 'translate-x-4' : 'translate-x-0.5'}`} />
        </div>
        <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Mark as Special / Feast</span>
      </label>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || saved}
          className="flex-1 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-indigo-700 disabled:opacity-70 transition-colors"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// ── Meal Slot Card ─────────────────────────────────────────
const MealSlotCard = ({ day, meal, data, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const colorClass = MEAL_COLORS[meal];
  const dishes = data.items.split(',').map((s) => s.trim()).filter(Boolean);

  if (editing) {
    return (
      <SlotEditor
        day={day}
        meal={meal}
        data={data}
        onSave={(updated) => { onUpdate(updated); setEditing(false); }}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <div className={`rounded-xl border overflow-hidden group cursor-pointer transition-all hover:shadow-md hover:shadow-indigo-500/10 ${colorClass}`}>
      {/* Food Image */}
      {data.image_url && (
        <div className="relative h-28 overflow-hidden">
          <img
            src={data.image_url}
            alt={meal}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {data.is_special && (
            <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
              <Star className="w-2.5 h-2.5 fill-current" />
              Special
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-2.5 space-y-1.5 bg-white dark:bg-slate-900/60">
        {/* Meal header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-xs">
            <span>{MEAL_ICONS[meal]}</span>
            <span>{meal}</span>
            {data.is_special && !data.image_url && (
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            )}
          </div>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 transition-all"
          >
            <Pencil className="w-3 h-3" />
          </button>
        </div>

        {/* Dishes */}
        <div className="flex flex-wrap gap-1">
          {dishes.slice(0, 3).map((dish, i) => (
            <span key={i} className="text-[10px] bg-white/70 dark:bg-slate-800/60 border border-current/20 rounded px-1.5 py-0.5 font-medium text-slate-700 dark:text-slate-300">
              {dish}
            </span>
          ))}
          {dishes.length > 3 && (
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">+{dishes.length - 3} more</span>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-0.5">
          <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{data.time}</span>
          <span className="flex items-center gap-1"><Flame className="w-2.5 h-2.5 text-orange-400" />{data.calories} kcal</span>
        </div>
      </div>
    </div>
  );
};

// ── Main WeeklyMenu Component ─────────────────────────────
export const WeeklyMenu = () => {
  const [week, setWeek] = useState(buildInitialWeek);
  const [expandedDay, setExpandedDay] = useState('Monday');

  useEffect(() => {
    menuService.getWeeklyMenu('a1b2c3d4-0000-0000-0000-000000000001').then((data) => {
      if (data && Array.isArray(data) && data.length > 0) {
        setWeek((prev) => {
          const updatedWeek = { ...prev };
          data.forEach((row) => {
            const dayName = DAYS[(row.day_of_week - 1) % 7];
            const mealKey = row.meal ? row.meal.charAt(0).toUpperCase() + row.meal.slice(1).toLowerCase() : null;
            if (dayName && mealKey && updatedWeek[dayName] && updatedWeek[dayName][mealKey]) {
              updatedWeek[dayName][mealKey] = {
                ...updatedWeek[dayName][mealKey],
                items: Array.isArray(row.items) ? row.items.join(', ') : (row.items || ''),
                calories: row.calories || updatedWeek[dayName][mealKey].calories,
                time: row.start_time && row.end_time ? `${row.start_time} - ${row.end_time}` : updatedWeek[dayName][mealKey].time,
                is_special: !!row.is_special,
                image_url: row.image_url || updatedWeek[dayName][mealKey].image_url || null,
              };
            }
          });
          try {
            localStorage.setItem('iterp_weekly_timetable', JSON.stringify(updatedWeek));
          } catch (e) {}
          return updatedWeek;
        });
      }
    });
  }, []);

  const updateSlot = (day, meal, updated) => {
    setWeek((prev) => {
      const next = {
        ...prev,
        [day]: { ...prev[day], [meal]: { ...prev[day][meal], ...updated } },
      };
      try {
        localStorage.setItem('iterp_weekly_timetable', JSON.stringify(next));
      } catch (err) {
        console.warn('LocalStorage save error:', err);
      }
      return next;
    });
  };

  const today = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  return (
    <div className="space-y-3">
      {/* Day pills */}
      <div className="flex flex-wrap gap-2">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setExpandedDay(expandedDay === day ? null : day)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              expandedDay === day
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25'
                : day === today
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
            }`}
          >
            <Calendar className="w-3 h-3" />
            {day}
            {day === today && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${expandedDay === day ? 'bg-white/20' : 'bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300'}`}>
                Today
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Expanded day timetable */}
      {DAYS.map((day) =>
        expandedDay === day ? (
          <div key={day} className="p-4 rounded-2xl glass-card space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                {day}
                {day === today && (
                  <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">Today</span>
                )}
              </h3>
              <span className="text-xs text-slate-400 dark:text-slate-500">Click a card to edit • Hover to reveal edit button</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {MEALS.map((meal) => (
                <MealSlotCard
                  key={meal}
                  day={day}
                  meal={meal}
                  data={week[day][meal]}
                  onUpdate={(updated) => updateSlot(day, meal, updated)}
                />
              ))}
            </div>
          </div>
        ) : null
      )}

      {/* All days compact view when none selected */}
      {!expandedDay && (
        <div className="space-y-3">
          {DAYS.map((day) => (
            <div
              key={day}
              className="p-4 rounded-2xl glass-card cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
              onClick={() => setExpandedDay(day)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  {day}
                  {day === today && <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full">Today</span>}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {MEALS.map((meal) => (
                      week[day][meal].image_url ? (
                        <img key={meal} src={week[day][meal].image_url} alt={meal} className="w-6 h-6 rounded-md object-cover border border-slate-200 dark:border-slate-700" loading="lazy" />
                      ) : (
                        <div key={meal} className={`w-6 h-6 rounded-md flex items-center justify-center border text-[9px] ${MEAL_COLORS[meal]}`}>
                          {MEAL_ICONS[meal]}
                        </div>
                      )
                    ))}
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                {MEALS.map((m) => week[day][m].items.split(',')[0].trim()).join(' · ')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
