import React, { useState } from 'react';
import { CalendarDays, Plus, LayoutGrid } from 'lucide-react';
import { FoodForm } from './FoodForm';
import { WeeklyMenu } from './WeeklyMenu';

export const FoodMenuManager = () => {
  const [activeTab, setActiveTab] = useState('weekly');

  const tabs = [
    { id: 'weekly', label: 'Weekly Timetable', icon: <CalendarDays className="w-3.5 h-3.5" /> },
    { id: 'add',    label: 'Add / Edit Meal', icon: <Plus className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Food Menu & Timetable</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage weekly meals, timings, and food photos for your hostel
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs self-start">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'weekly' ? (
        <WeeklyMenu />
      ) : (
        <FoodForm onSaved={() => setActiveTab('weekly')} />
      )}
    </div>
  );
};
