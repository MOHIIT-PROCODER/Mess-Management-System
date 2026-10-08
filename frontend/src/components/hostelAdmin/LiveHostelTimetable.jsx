import React, { useState, useEffect } from 'react';
import {
  Clock, Utensils, Flame, Sparkles, Star, Edit3, Save,
  CheckCircle2, Coffee, Cookie, Moon, AlertCircle, Eye, Users
} from 'lucide-react';
import { getCurrentMeal } from '../../utils/dateUtils';
import { menuService } from '../../services/menuService';

const MEAL_TIMES = {
  breakfast: { name: 'Breakfast', slot: '07:30 - 09:30 AM', startH: 7.5, endH: 9.5 },
  lunch:     { name: 'Lunch',     slot: '12:00 - 02:30 PM', startH: 12,   endH: 14.5 },
  snacks:    { name: 'Snacks',    slot: '05:00 - 06:15 PM', startH: 17,   endH: 18.25 },
  dinner:    { name: 'Dinner',    slot: '07:30 - 09:45 PM', startH: 19.5, endH: 21.75 },
};

const MEAL_ICONS = {
  breakfast: <Coffee className="w-5 h-5 text-amber-500" />,
  lunch:     <Utensils className="w-5 h-5 text-emerald-500" />,
  snacks:    <Cookie className="w-5 h-5 text-purple-500" />,
  dinner:    <Moon className="w-5 h-5 text-indigo-500" />,
};

export const LiveHostelTimetable = ({ hostelName = 'BH-7 (Boys Hostel 7)', onTimetableChanged }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMealKey, setActiveMealKey] = useState('lunch');
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Live Slot state
  const [slotData, setSlotData] = useState({
    items: 'Jeera Rice, Dal Tadka, Paneer Butter Masala, Roti, Gulab Jamun, Fresh Salad',
    calories: 850,
    time: '12:00 - 02:30 PM',
    is_special: true,
    live_eaten: 418,
    total_capacity: 450,
    chef_on_duty: 'Chef Santosh & Team',
  });

  // Keep clock running
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const calculated = getCurrentMeal();
      if (calculated) {
        setActiveMealKey(calculated);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load from local storage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('iterp_weekly_timetable');
      if (saved) {
        const parsed = JSON.parse(saved);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayName = days[new Date().getDay()];
        const capMeal = activeMealKey.charAt(0).toUpperCase() + activeMealKey.slice(1).toLowerCase();
        if (parsed[todayName] && parsed[todayName][capMeal]) {
          const m = parsed[todayName][capMeal];
          setSlotData((prev) => ({
            ...prev,
            items: m.items || prev.items,
            calories: m.calories || prev.calories,
            time: m.time || prev.time,
            is_special: !!m.is_special,
          }));
        }
      }
    } catch (e) {}
  }, [activeMealKey]);

  const handleSaveLiveSlot = async () => {
    try {
      const saved = localStorage.getItem('iterp_weekly_timetable');
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const todayName = days[new Date().getDay()];
      const capMeal = activeMealKey.charAt(0).toUpperCase() + activeMealKey.slice(1).toLowerCase();
      let fullWeek = saved ? JSON.parse(saved) : {};
      if (!fullWeek[todayName]) fullWeek[todayName] = {};
      fullWeek[todayName][capMeal] = {
        ...fullWeek[todayName][capMeal],
        items: slotData.items,
        calories: Number(slotData.calories),
        time: slotData.time,
        is_special: slotData.is_special,
      };
      localStorage.setItem('iterp_weekly_timetable', JSON.stringify(fullWeek));
      
      const dayIdx = new Date().getDay() === 0 ? 7 : new Date().getDay();
      const [start, end] = slotData.time.split(' - ');
      await menuService.updateMenuItem({
        hostel_id: 'a1b2c3d4-0000-0000-0000-000000000001',
        day_of_week: dayIdx,
        meal: activeMealKey,
        items: slotData.items.split(',').map((s) => s.trim()).filter(Boolean),
        calories: Number(slotData.calories),
        start_time: start?.trim(),
        end_time: end?.trim() || start?.trim(),
        is_special: slotData.is_special,
      });
    } catch (e) {
      console.warn('Save live menu error:', e);
    }

    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    if (onTimetableChanged) onTimetableChanged();
  };

  const dishes = slotData.items.split(',').map((s) => s.trim()).filter(Boolean);

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-2xl relative overflow-hidden space-y-5">
      {/* Glow decorative blobs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar with Live Clock */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 animate-pulse">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                Live Mess Session
              </span>
              <span className="text-xs font-bold text-slate-300">{hostelName}</span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold tracking-tight mt-0.5">
              Current Active Dining Timetable
            </h2>
          </div>
        </div>

        {/* Live digital clock */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-right font-mono">
            <span className="text-[10px] uppercase font-bold text-indigo-200 block">Live Campus Time</span>
            <span className="text-base font-extrabold text-white">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>

          {isEditing ? (
            <button
              onClick={handleSaveLiveSlot}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Slot</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Live Slot</span>
            </button>
          )}
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 flex items-center gap-2 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Live meal timetable updated! Reflected on student apps and digital dining hall boards.</span>
        </div>
      )}

      {/* Main Active Meal Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
        {/* Left 2 Cols: Meal & Dishes */}
        <div className="lg:col-span-2 space-y-4">
          {/* Meal Selector Tabs (for previewing or editing other slots) */}
          <div className="inline-flex rounded-2xl bg-black/30 p-1 border border-white/10 text-xs font-bold gap-1">
            {Object.keys(MEAL_TIMES).map((mKey) => (
              <button
                key={mKey}
                onClick={() => setActiveMealKey(mKey)}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeMealKey === mKey
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {MEAL_TIMES[mKey].name}
                {mKey === getCurrentMeal() && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </button>
            ))}
          </div>

          {/* Edit Form OR Display View */}
          {isEditing ? (
            <div className="space-y-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 animate-fade-in">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">Dishes Being Cooked & Served</label>
                <textarea
                  rows={2}
                  value={slotData.items}
                  onChange={(e) => setSlotData({ ...slotData, items: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-slate-900/80 border border-indigo-400/50 rounded-xl text-xs text-white font-medium focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">Time Window</label>
                  <input
                    type="text"
                    value={slotData.time}
                    onChange={(e) => setSlotData({ ...slotData, time: e.target.value })}
                    className="w-full mt-1 p-2 bg-slate-900/80 border border-indigo-400/50 rounded-xl text-xs text-white font-medium"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">Estimated Calories (kcal)</label>
                  <input
                    type="number"
                    value={slotData.calories}
                    onChange={(e) => setSlotData({ ...slotData, calories: Number(e.target.value) })}
                    className="w-full mt-1 p-2 bg-slate-900/80 border border-indigo-400/50 rounded-xl text-xs text-white font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="liveSpecialToggle"
                  checked={slotData.is_special}
                  onChange={(e) => setSlotData({ ...slotData, is_special: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600"
                />
                <label htmlFor="liveSpecialToggle" className="text-xs font-semibold text-amber-300 cursor-pointer">
                  Tag as Chef Special Feast Session
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black text-white capitalize flex items-center gap-2">
                  {MEAL_ICONS[activeMealKey]}
                  <span>{MEAL_TIMES[activeMealKey]?.name || activeMealKey}</span>
                </h3>
                {slotData.is_special && (
                  <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold flex items-center gap-1 shadow">
                    <Star className="w-3 h-3 fill-current" />
                    Special Feast
                  </span>
                )}
              </div>

              {/* Dish Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {dishes.map((dish, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 text-xs font-semibold text-slate-100 transition-colors"
                  >
                    {dish}
                  </span>
                ))}
              </div>

              {/* Meta stats */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 font-medium">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-indigo-400" />{slotData.time}</span>
                <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-orange-400" />{slotData.calories} kcal/serving</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold"><Sparkles className="w-3.5 h-3.5" />{slotData.chef_on_duty}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Live Headcount Turnout Meter */}
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
            {MEAL_TIMES[activeMealKey]?.name} Live Attendance
          </span>
          <div className="text-3xl font-black text-white">
            {slotData.live_eaten} <span className="text-sm font-semibold text-slate-400">/ {slotData.total_capacity}</span>
          </div>

          {/* Turnout Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(slotData.live_eaten / slotData.total_capacity) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1">
            <span className="text-emerald-400 font-bold">{((slotData.live_eaten / slotData.total_capacity) * 100).toFixed(1)}% Turnout</span>
            <span>{slotData.total_capacity - slotData.live_eaten} Remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LiveHostelTimetable;
