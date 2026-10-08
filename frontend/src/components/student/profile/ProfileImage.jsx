import React from 'react';
import { Camera } from 'lucide-react';

export const ProfileImage = ({ name = 'Student', avatarUrl }) => {
  return (
    <div className="relative group">
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-2xl flex items-center justify-center shadow-xl border-2 border-indigo-200 dark:border-slate-700">
        {name.charAt(0)}
      </div>
      <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white shadow-sm transition-colors">
        <Camera className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
