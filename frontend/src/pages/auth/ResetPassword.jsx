import React from 'react';
import { Link } from 'react-router-dom';

export const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-md p-8 rounded-3xl glass-card space-y-4 text-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-2xl">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Set New Password</h2>
        <input type="password" placeholder="New Password" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500" />
        <button className="w-full gradient-btn py-3 rounded-xl text-xs font-semibold text-white">Update Password</button>
        <Link to="/login" className="block text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline pt-2">Back to Sign In</Link>
      </div>
    </div>
  );
};
