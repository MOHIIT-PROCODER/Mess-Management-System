import React, { useState } from 'react';
import {
  Building2, Users, Utensils, Heart, Star, Calendar,
  ShieldCheck, ArrowUpRight, Sparkles, MessageSquare, Coffee,
  CheckCircle2, Clock, Flame, Award, QrCode, BarChart3, TrendingUp
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useAuth } from '../../hooks/useAuth';
import { WeeklyMenu } from '../../components/messAdmin/menu/WeeklyMenu';
import { FeedbackReviewExplorer } from '../../components/common/FeedbackReviewExplorer';
import { MessCounterQR } from '../../components/messAdmin/attendance/MessCounterQR';
import { LiveHostelTimetable } from '../../components/hostelAdmin/LiveHostelTimetable';
import { HostelProfile } from './HostelProfile';
import { getCurrentMeal } from '../../utils/dateUtils';
import { Link } from 'react-router-dom';

const DAILY_MEAL_DATA = [
  { meal: 'Breakfast', attended: 395, capacity: 450, rate: '87.7%', status: 'Completed', time: '07:30 - 09:30 AM' },
  { meal: 'Lunch', attended: 418, capacity: 450, rate: '92.8%', status: 'Serving Now', time: '12:00 - 02:30 PM' },
  { meal: 'Snacks', attended: 290, capacity: 450, rate: '64.4%', status: 'Upcoming', time: '05:00 - 06:15 PM' },
  { meal: 'Dinner', attended: 425, capacity: 450, rate: '94.4%', status: 'Upcoming', time: '07:30 - 09:45 PM' },
];

const WEEKLY_DATA = [
  { day: 'Mon', breakfast: 390, lunch: 410, snacks: 280, dinner: 420, total: 1500 },
  { day: 'Tue', breakfast: 395, lunch: 415, snacks: 295, dinner: 425, total: 1530 },
  { day: 'Wed', breakfast: 385, lunch: 420, snacks: 300, dinner: 418, total: 1523 },
  { day: 'Thu', breakfast: 400, lunch: 412, snacks: 275, dinner: 422, total: 1509 },
  { day: 'Fri', breakfast: 410, lunch: 435, snacks: 310, dinner: 430, total: 1585 },
  { day: 'Sat', breakfast: 375, lunch: 390, snacks: 260, dinner: 440, total: 1465 },
  { day: 'Sun', breakfast: 420, lunch: 445, snacks: 330, dinner: 435, total: 1630 },
];

export const HostelAdminDashboard = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';
  const activeMeal = getCurrentMeal() || 'lunch';

  const [activeTab, setActiveTab] = useState('attendance'); // 'attendance' | 'timetable' | 'profile' | 'feedback' | 'compliments'
  const [graphPeriod, setGraphPeriod] = useState('day'); // 'day' | 'week'

  const stats = [
    { title: "Today's Live Headcount", value: '418 / 450', subtitle: '92.8% Serving in Lunch', icon: Utensils, color: 'emerald' },
    { title: 'Total Registered Residents', value: '450', subtitle: `${hostelName} Residents`, icon: Users, color: 'indigo' },
    { title: 'Average Food Rating', value: '4.8 ★', subtitle: '320 Verified Reviews', icon: Star, color: 'amber' },
    { title: 'Chef Praises & Kudos', value: '48 ❤️', subtitle: 'Student Appreciations', icon: Heart, color: 'rose' },
  ];

  const recentCompliments = [
    { id: 1, student: 'Aarav Patel (Room 204-A)', dish: 'Paneer Butter Masala', comment: 'Restaurant quality gravy! Very fresh and hot.', likes: 14, time: 'Today Lunch' },
    { id: 2, student: 'Rohan Gupta (Room 205-B)', dish: 'Gulab Jamun', comment: 'Soft, melt-in-mouth sweetness. Loved Sunday feast!', likes: 19, time: 'Yesterday' },
    { id: 3, student: 'Aditya Mishra (Room 401-B)', dish: 'Aloo Paratha & Curd', comment: 'Crispy parathas and thick homemade curd. Great breakfast!', likes: 11, time: 'Today Breakfast' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner with Strict Hostel Scope */}
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
              Logged in as <span className="font-bold text-white">{user?.full_name || 'Hostel Warden'}</span> • Live Turnout, 7-Day Timetable, QR & Dining Feedback for {hostelName} only.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <Link
              to="/hostel-admin/profile"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Hostel Profile</span>
            </Link>
            <Link
              to="/hostel-admin/attendance"
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-900 text-xs font-extrabold hover:bg-indigo-50 shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              <QrCode className="w-3.5 h-3.5 text-indigo-600" />
              <span>Live QR Station</span>
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
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'attendance'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Live Attendance & Graphs</span>
          </button>

          <button
            onClick={() => setActiveTab('timetable')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'timetable'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Live Timetable & Weekly Menu (Editable)</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'profile'
                ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-300'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Hostel Profile & Warden Info</span>
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
          {hostelName} Strictly Isolated Data
        </span>
      </div>

      {/* Tab 0: Live Attendance & Graphs (NEW) */}
      {activeTab === 'attendance' && (
        <div className="space-y-6 animate-fade-in">
          {/* Daily 4-Meal Breakdown Grid */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-500" />
                  <span>Today's Meal-by-Meal Headcount in {hostelName}</span>
                </h3>
                <p className="text-xs text-slate-500">Live counts of students who ate in each meal period</p>
              </div>

              <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 text-xs">
                <button
                  onClick={() => setGraphPeriod('day')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    graphPeriod === 'day' ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  1-Day Meal Bars
                </button>
                <button
                  onClick={() => setGraphPeriod('week')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    graphPeriod === 'week' ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  7-Day Trend Area
                </button>
              </div>
            </div>

            {/* Attendance Chart */}
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                {graphPeriod === 'day' ? (
                  <BarChart data={DAILY_MEAL_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="meal" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                    <YAxis domain={[0, 480]} tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Bar dataKey="attended" fill="#10b981" radius={[8, 8, 0, 0]} name="Students Eaten" />
                    <Bar dataKey="capacity" fill="#cbd5e1" radius={[8, 8, 0, 0]} name="Total Capacity (450)" />
                  </BarChart>
                ) : (
                  <AreaChart data={WEEKLY_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="hostelGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                    <YAxis domain={[1200, 1800]} tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#hostelGrad)" name="Total Daily Meals" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* 4 Meal Cards Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {DAILY_MEAL_DATA.map((m) => (
                <div key={m.meal} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span className="text-slate-900 dark:text-white">{m.meal}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${m.status === 'Serving Now' ? 'bg-emerald-500 text-white font-bold animate-pulse' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                    {m.attended} <span className="text-xs text-slate-400 font-normal">/ 450 ate</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{m.time}</span>
                    <span className="font-bold text-emerald-500">{m.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/hostel-admin/attendance"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span>Open Dedicated Live QR & Attendance Station</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Tab 1: Live & 7-Day Timetable with Warden Edit Permissions */}
      {activeTab === 'timetable' && (
        <div className="space-y-6 animate-fade-in">
          {/* Live Active Meal Card */}
          <LiveHostelTimetable hostelName={hostelName} />

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

      {/* Tab 2: Hostel Profile & Warden Contacts (Editable) */}
      {activeTab === 'profile' && (
        <div className="space-y-4 animate-fade-in">
          <HostelProfile />
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
