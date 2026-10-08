import React, { useState } from 'react';
import {
  Building2, Users, Utensils, AlertTriangle, CheckCircle2,
  TrendingUp, Clock, Calendar, ShieldCheck, ArrowUpRight,
  Sparkles, Coffee, DollarSign
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

export const HostelAdminDashboard = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';

  const stats = [
    { title: 'Total Registered Residents', value: '450', subtitle: '98% Room Occupancy', icon: Users, color: 'indigo' },
    { title: "Today's Mess Turnout", value: '412 / 450', subtitle: '91.5% Live Attendance', icon: Utensils, color: 'emerald' },
    { title: 'Pending Grievances', value: '3', subtitle: '2 High Priority', icon: AlertTriangle, color: 'amber' },
    { title: 'Rebate Requests', value: '8', subtitle: 'Awaiting Warden Approval', icon: DollarSign, color: 'purple' },
  ];

  const recentIncidents = [
    { id: 1, student: 'Siddharth Roy (Room 302)', type: 'Hygiene Concern', status: 'Pending Review', time: '1 hour ago', priority: 'High' },
    { id: 2, student: 'Ananya Verma (Room 114)', type: 'Special Diet Request', status: 'Approved', time: '3 hours ago', priority: 'Normal' },
    { id: 3, student: 'Rohit Sharma (Room 205)', type: 'Mess Rebate 4 Days Leave', status: 'Under Review', time: '5 hours ago', priority: 'Normal' },
  ];

  const liveMeals = [
    { name: 'Breakfast', status: 'Completed', count: 395, avgRating: '4.4 / 5.0' },
    { name: 'Lunch', status: 'Serving Now', count: 412, avgRating: '4.6 / 5.0' },
    { name: 'Snacks', status: 'Upcoming (5:00 PM)', count: 0, avgRating: '-' },
    { name: 'Dinner', status: 'Upcoming (7:30 PM)', count: 0, avgRating: '-' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Hostel Warden & Governance Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {hostelName} Administration
            </h1>
            <p className="text-indigo-100 text-xs md:text-sm">
              Logged in as <span className="font-bold text-white">{user?.full_name || 'Hostel Warden'}</span> • Complete oversight of {hostelName} residents, mess contractor & facility discipline.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/hostel-admin/students"
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-900 text-xs font-extrabold hover:bg-indigo-50 shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>View Residents</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{s.title}</span>
                <div className={`p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</div>
              <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">{s.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Live Mess Operations & Contractor Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Meal Health for this Hostel */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-indigo-500" />
                <span>Today's {hostelName} Mess Activity</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Operated by Assigned Mess Caterer • Real-time Headcount & Feedback
              </p>
            </div>
            <Link to="/hostel-admin/mess-overview" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              Manage Caterer →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {liveMeals.map((meal, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${
                  meal.status.includes('Serving')
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700/60'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900 dark:text-white">{meal.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      meal.status.includes('Serving')
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {meal.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Headcount: <strong className="text-slate-900 dark:text-white">{meal.count}</strong></span>
                  <span>Rating: <strong className="text-amber-500">{meal.avgRating}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Quick Warden Actions & Escalations */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Grievance Escalations</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Issues requiring Warden intervention
            </p>
          </div>

          <div className="space-y-2.5">
            {recentIncidents.map((inc) => (
              <div key={inc.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>{inc.type}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${inc.priority === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'}`}>
                    {inc.priority}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{inc.student}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>{inc.time}</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">{inc.status}</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/hostel-admin/complaints"
            className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold text-center hover:bg-indigo-700 transition-colors shadow-sm block"
          >
            Open Grievance Desk
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HostelAdminDashboard;
