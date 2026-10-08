import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="p-6 rounded-2xl glass-card space-y-4 max-w-xl">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
        <SettingsIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <span>Mess Admin Settings</span>
      </h2>
      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Configure dining hall scanner devices and local mess parameters.</p>
    </div>
  );
};

