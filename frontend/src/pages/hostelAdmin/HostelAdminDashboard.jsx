import React, { useState } from 'react';
import {
  Building2, Users, Utensils, Heart, Star, Calendar,
  ShieldCheck, ArrowUpRight, Sparkles, MessageSquare, Coffee,
  CheckCircle2, Clock, Flame, Award
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { WeeklyMenu } from '../../components/messAdmin/menu/WeeklyMenu';
import { FeedbackReviewExplorer } from '../../components/common/FeedbackReviewExplorer';
import { Link } from 'react-router-dom';

export const HostelAdminDashboard = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';
  const [activeTab, setActiveTab] = useState('timetable'); // 'timetable' | 'feedback' | 'compliments'

  const stats = [
    { title: 'Total Hostel Residents', value: '450', subtitle: '98% Room Occupancy', icon: Users, color: 'indigo' },
    { title: "Today's Mess Turnout", value: '412 / 450', subtitle: '91.5% Live Attendance', icon: Utensils, color: 'emerald' },
    { title: 'Average Food Rating', value: '4.8 ★', subtitle: 'Based on 320 reviews', icon: Star, color: 'amber' },
    { title: 'Chef Praises & Kudos', value: '48 ❤️', subtitle: 'High Student Satisfaction', icon: Heart, color: 'rose' },
  ];

  const recentCompliments = [
    { id: 1, student: 'Aarav Patel (Room 204-A)', dish: 'Paneer Butter Masala', comment: 'Restaurant quality gravy! Very fresh and hot.', likes: 14, time: 'Today Lunch' },
    { id: 2, student: 'Rohan Gupta (Room 205-B)', dish: 'Gulab Jamun', comment: 'Soft, melt-in-mouth sweetness. Loved Sunday feast!', likes: 19, time: 'Yesterday' },
    { id: 3, student: 'Aditya Mishra (Room 401-B)', dish: 'Aloo Paratha & Curd', comment: 'Crispy parathas and thick homemade curd. Great breakfast!', likes: 11, time: 'Today Breakfast' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Hostel Warden & Dining Governance</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {hostelName} Administration
            </h1>
            <p className="text-indigo-100 text-xs md:text-sm">
              Logged in as <span className="font-bold text-white">{user?.full_name || 'Hostel Warden'}</span> • Overseeing 7-day food timetable, dish reviews & resident satisfaction.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <Link
              to="/hostel-admin/students"
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-900 text-xs font-extrabold hover:bg-indigo-50 shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Residents Directory</span>
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
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</div>
              <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">{s.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Dashboard View Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('timetable')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'timetable'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>7-Day Menu Timetable (Editable)</span>
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'feedback'
                ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-purple-300'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Student Ratings & Reviews</span>
          </button>

          <button
            onClick={() => setActiveTab('compliments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'compliments'
                ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-300'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Chef Compliments</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-400 font-semibold px-2">
          {hostelName} Live Portal
        </span>
      </div>

      {/* Tab 1: 7-Day Timetable with Warden Edit Permissions */}
      {activeTab === 'timetable' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-indigo-900 dark:text-indigo-200 font-semibold">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Wardens have full permission to click any day/card below to edit dishes, timings, food photos & calories.</span>
            </div>
            <Link
              to="/hostel-admin/timetable"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
            >
              Full Screen Timetable →
            </Link>
          </div>

          <WeeklyMenu />
        </div>
      )}

      {/* Tab 2: Student Ratings & Reviews */}
      {activeTab === 'feedback' && (
        <div className="space-y-4 animate-fade-in">
          <FeedbackReviewExplorer initialHostel={hostelName} role="hostel_admin" />
        </div>
      )}

      {/* Tab 3: Chef Compliments & Student Praises */}
      {activeTab === 'compliments' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentCompliments.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-800/50 flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>Praised Dish</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{c.time}</span>
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{c.dish}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 italic">"{c.comment}"</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                  <span className="font-semibold text-slate-900 dark:text-white">{c.student}</span>
                  <span className="font-bold text-rose-500 flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-500" />
                    <span>{c.likes} Likes</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/hostel-admin/compliments"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors border border-rose-200 dark:border-rose-800/50"
            >
              <span>View All Praises & Send Staff Thanks</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default HostelAdminDashboard;
