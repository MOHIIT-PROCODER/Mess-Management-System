import React from 'react';
import { Clock, Flame, Coffee, Utensils, Cookie, Moon } from 'lucide-react';
import { getPlaceholderFoodImage } from '../../../utils/imageUtils';

const MEAL_ICONS = {
  breakfast: Coffee,
  lunch: Utensils,
  snacks: Cookie,
  dinner: Moon,
};

const MEAL_THEMES = {
  breakfast: {
    accent: 'text-amber-500',
    tagBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800/50',
    dot: 'bg-amber-500',
  },
  lunch: {
    accent: 'text-emerald-500',
    tagBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800/50',
    dot: 'bg-emerald-500',
  },
  snacks: {
    accent: 'text-orange-500',
    tagBg: 'bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200 border-orange-200 dark:border-orange-800/50',
    dot: 'bg-orange-500',
  },
  dinner: {
    accent: 'text-indigo-500',
    tagBg: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800/50',
    dot: 'bg-indigo-500',
  },
};

export const MealCard = ({ mealData, isActive }) => {
  const {
    meal = 'meal',
    time,
    items = [],
    calories = 500,
    image_url,
    imageUrl: fallbackImg,
    image: fallbackImg2,
  } = mealData;

  const mealKey = meal?.toLowerCase() || 'lunch';
  const currentImageUrl = image_url || fallbackImg || fallbackImg2 || getPlaceholderFoodImage(mealKey);
  const theme = MEAL_THEMES[mealKey] || MEAL_THEMES.lunch;
  const MealIcon = MEAL_ICONS[mealKey] || Utensils;
  const formattedTime = time || (mealData.start_time && mealData.end_time ? `${mealData.start_time} - ${mealData.end_time}` : '07:30 AM - 09:30 AM');

  return (
    <div
      className={`rounded-2xl bg-white dark:bg-slate-900/90 border transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-lg ${
        isActive
          ? 'ring-2 ring-emerald-500 border-emerald-500/50 shadow-emerald-500/10 shadow-md'
          : 'border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-700/60'
      }`}
    >
      {/* ── Top Hero Image ── */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={currentImageUrl}
          alt={meal}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getPlaceholderFoodImage(mealKey);
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discreet Serving Now Badge - Minimal size to keep image visible */}
        {isActive && (
          <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/95 text-white text-[10px] font-bold tracking-wide shadow-md backdrop-blur-sm border border-emerald-300/40">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Serving Now
            </span>
          </div>
        )}

        {/* Subtle Bottom Vignette Only */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

        {/* Bottom Image Label */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5">
            <MealIcon className="w-4 h-4 text-white drop-shadow" />
            <h3 className="font-extrabold capitalize text-base text-white drop-shadow-md tracking-tight">
              {meal}
            </h3>
          </div>

          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-amber-300 text-[11px] font-semibold shadow-sm">
            <Flame className="w-3 h-3 text-amber-400" />
            <span>{calories} kcal</span>
          </span>
        </div>
      </div>

      {/* ── Card Content Body ── */}
      <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
        {/* Time Slot Banner */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 font-medium">
          <Clock className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
          <span>{formattedTime}</span>
        </div>

        {/* Dishes List / Chips */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Items ({items.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {items.map((item, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold border transition-all ${theme.tagBg}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} shrink-0`} />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
