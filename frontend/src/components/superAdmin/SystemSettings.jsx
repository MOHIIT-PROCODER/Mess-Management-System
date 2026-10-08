import React from 'react';
import { Settings, Save } from 'lucide-react';

export const SystemSettings = () => {
  return (
    <div className="p-6 rounded-2xl glass-card space-y-6 max-w-xl">
      <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center space-x-2">
        <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <span>Global System Configuration</span>
      </h3>

      <div className="space-y-4 text-xs">
        <div className="space-y-1">
          <label className="font-bold text-slate-700 dark:text-slate-300">QR Code Auto-Expire Duration (Seconds)</label>
          <input type="number" defaultValue={60} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-slate-900 dark:text-white font-semibold" />
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-700 dark:text-slate-300">Max Allowed Meal Skipped Buffer</label>
          <input type="number" defaultValue={5} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-slate-900 dark:text-white font-semibold" />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <input type="checkbox" id="aiToggle" defaultChecked className="w-4 h-4 rounded text-indigo-600 bg-slate-100 dark:bg-slate-900" />
          <label htmlFor="aiToggle" className="text-slate-700 dark:text-slate-300 font-bold cursor-pointer">Enable Groq AI Waste Recommendation Engine</label>
        </div>

        <button className="w-full gradient-btn py-3 rounded-xl font-bold flex items-center justify-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save System Settings</span>
        </button>
      </div>
    </div>
  );
};

