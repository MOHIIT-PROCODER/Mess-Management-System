import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, ArrowLeft, Mail, Lock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ForgotPassword = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Theme Toggle (Light / Dark Mode) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme mode"
          className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group ring-1 ring-slate-900/5 dark:ring-white/10"
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              <span className="text-xs font-semibold">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
              <span className="text-xs font-semibold">Dark Mode</span>
            </>
          )}
        </button>
      </div>

      <div className="w-full max-w-md p-8 rounded-3xl glass-card space-y-5 text-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-2xl relative z-10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Reset Password</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Enter your campus email to receive a password reset link.</p>
        <div className="relative text-left">
          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input type="email" placeholder="student@campus.edu" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500" />
        </div>
        <button className="w-full gradient-btn py-3 rounded-xl text-xs font-semibold text-white shadow-lg shadow-indigo-500/25">Send Reset Link</button>
        <Link to="/login" className="inline-flex items-center space-x-1 text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline pt-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export const ResetPassword = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Theme Toggle (Light / Dark Mode) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme mode"
          className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group ring-1 ring-slate-900/5 dark:ring-white/10"
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              <span className="text-xs font-semibold">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
              <span className="text-xs font-semibold">Dark Mode</span>
            </>
          )}
        </button>
      </div>

      <div className="w-full max-w-md p-8 rounded-3xl glass-card space-y-5 text-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-2xl relative z-10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Set New Password</h2>
        <div className="relative text-left">
          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input type="password" placeholder="New Password" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500" />
        </div>
        <button className="w-full gradient-btn py-3 rounded-xl text-xs font-semibold text-white shadow-lg shadow-indigo-500/25">Update Password</button>
      </div>
    </div>
  );
};
