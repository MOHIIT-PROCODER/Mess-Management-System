import React from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AttendanceSuccess = ({ data }) => {
  return (
    <div className="p-8 rounded-3xl glass-card text-center space-y-4 border border-emerald-500/30 bg-emerald-500/5 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Attendance Recorded!</h3>
      <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
        Enjoy your meal! Your dining log has been synchronized with the mess database.
      </p>
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1 font-medium">
        <p>Meal: <span className="font-bold text-slate-900 dark:text-white capitalize">{data?.meal || 'Lunch'}</span></p>
        <p>Time: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{new Date().toLocaleTimeString()}</span></p>
      </div>
      <Link to="/student" className="gradient-btn inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white">
        <span>Back to Dashboard</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
