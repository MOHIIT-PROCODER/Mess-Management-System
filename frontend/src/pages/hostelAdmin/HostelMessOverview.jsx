import React from 'react';
import { Utensils, Award, ShieldCheck, CheckCircle2, Phone, Mail, Calendar, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { WeeklyMenu } from '../../components/messAdmin/menu/WeeklyMenu';

export const HostelMessOverview = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Utensils className="w-6 h-6 text-indigo-500" />
          <span>{hostelName} Mess Operations & Contractor Oversight</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor the assigned mess catering agency, inspect 7-day food menu quality, and manage dining standards.
        </p>
      </div>

      {/* Contractor Information Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Catering Agency</span>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Annapurna Hospitality Services</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Contract Period: July 2026 - June 2027</p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active Contract & Valid Food License</span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Head Caterer & Supervisor</span>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Alok Verma (Mess Admin / Head Chef)</h4>
          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-indigo-500" />
              <span>+91 94370 12345</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
              <span>bh7admin@mess.edu</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300">Hygiene & Audit Score</span>
            <span className="text-xs font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">Grade A</span>
          </div>
          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">4.8 / 5.0</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Last inspected on 1st October by Campus Food Safety Officer.</p>
        </div>
      </div>

      {/* 7-Day Weekly Menu Management for this Mess */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              <span>{hostelName} 7-Day Timetable & Special Menus</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Wardens can directly view, update, or approve daily meals cooked by the contractor.
            </p>
          </div>
        </div>

        <WeeklyMenu />
      </div>
    </div>
  );
};
export default HostelMessOverview;
