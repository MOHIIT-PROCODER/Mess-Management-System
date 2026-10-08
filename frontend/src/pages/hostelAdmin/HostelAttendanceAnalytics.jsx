import React, { useState, useEffect } from 'react';
import {
  QrCode, Users, Utensils, Calendar, Clock, BarChart3, TrendingUp,
  ShieldCheck, RefreshCw, CheckCircle2, UserCheck, AlertCircle, Sparkles,
  Camera, ArrowUpRight
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useAuth } from '../../hooks/useAuth';
import { MessCounterQR } from '../../components/messAdmin/attendance/MessCounterQR';
import { getCurrentMeal } from '../../utils/dateUtils';

// ── Daily Breakdown Data for BH-7 ──────────────────────────
const DAILY_MEAL_DATA = [
  { meal: 'Breakfast', attended: 395, capacity: 450, rate: '87.7%', status: 'Completed', time: '07:30 - 09:30 AM' },
  { meal: 'Lunch', attended: 418, capacity: 450, rate: '92.8%', status: 'Serving Now', time: '12:00 - 02:30 PM' },
  { meal: 'Snacks', attended: 290, capacity: 450, rate: '64.4%', status: 'Upcoming', time: '05:00 - 06:15 PM' },
  { meal: 'Dinner', attended: 425, capacity: 450, rate: '94.4%', status: 'Upcoming', time: '07:30 - 09:45 PM' },
];

// ── Weekly 7-Day Trend for BH-7 ────────────────────────────
const WEEKLY_DATA = [
  { day: 'Mon', breakfast: 390, lunch: 410, snacks: 280, dinner: 420, total: 1500 },
  { day: 'Tue', breakfast: 395, lunch: 415, snacks: 295, dinner: 425, total: 1530 },
  { day: 'Wed', breakfast: 385, lunch: 420, snacks: 300, dinner: 418, total: 1523 },
  { day: 'Thu', breakfast: 400, lunch: 412, snacks: 275, dinner: 422, total: 1509 },
  { day: 'Fri', breakfast: 410, lunch: 435, snacks: 310, dinner: 430, total: 1585 },
  { day: 'Sat', breakfast: 375, lunch: 390, snacks: 260, dinner: 440, total: 1465 },
  { day: 'Sun', breakfast: 420, lunch: 445, snacks: 330, dinner: 435, total: 1630 },
];

// ── 30-Day Monthly Trend for BH-7 ──────────────────────────
const MONTHLY_DATA = Array.from({ length: 30 }, (_, i) => {
  const dayNum = i + 1;
  const isWeekend = dayNum % 7 === 0 || dayNum % 7 === 6;
  const baseAttended = isWeekend ? 1600 : 1520;
  const variance = Math.floor(Math.sin(i) * 60);
  return {
    date: `Day ${dayNum}`,
    totalMeals: baseAttended + variance,
    turnoutRate: Math.round(((baseAttended + variance) / 1800) * 100),
  };
});

export const HostelAttendanceAnalytics = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';
  const activeMeal = getCurrentMeal() || 'lunch';

  const [period, setPeriod] = useState('day'); // 'day' | 'week' | 'month'
  const [liveCount, setLiveCount] = useState(418);
  const [manualRoll, setManualRoll] = useState('');
  const [checkInMsg, setCheckInMsg] = useState(null);

  // Recent Live Check-in Stream for BH-7 Residents Only
  const [liveFeed, setLiveFeed] = useState([
    { id: 1, name: 'Aarav Patel', roll: '21CS089', room: '204-A', meal: 'Lunch', time: 'Just now', status: 'Verified' },
    { id: 2, name: 'Rohan Gupta', roll: '21CS112', room: '205-B', meal: 'Lunch', time: '1 min ago', status: 'Verified' },
    { id: 3, name: 'Siddharth Roy', roll: '22IT045', room: '302-A', meal: 'Lunch', time: '2 mins ago', status: 'Verified' },
    { id: 4, name: 'Aditya Mishra', roll: '23CS201', room: '401-B', meal: 'Lunch', time: '4 mins ago', status: 'Verified' },
    { id: 5, name: 'Vikram Singh', roll: '21ME019', room: '310-A', meal: 'Lunch', time: '5 mins ago', status: 'Verified' },
  ]);

  // Handle Manual Check-in by Warden
  const handleManualCheckIn = (e) => {
    e.preventDefault();
    if (!manualRoll.trim()) return;

    const newStudent = {
      id: Date.now(),
      name: `Student (${manualRoll.trim().toUpperCase()})`,
      roll: manualRoll.trim().toUpperCase(),
      room: 'BH-7 Resident',
      meal: activeMeal.charAt(0).toUpperCase() + activeMeal.slice(1),
      time: 'Just now',
      status: 'Manual Verified'
    };

    setLiveFeed((prev) => [newStudent, ...prev]);
    setLiveCount((c) => c + 1);
    setCheckInMsg(`✅ ${manualRoll.toUpperCase()} checked in for ${activeMeal.toUpperCase()} successfully!`);
    setManualRoll('');
    setTimeout(() => setCheckInMsg(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner with Strict Hostel Scope */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Strictly Scoped to {hostelName} Dining Hall</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {hostelName} Attendance & Live Headcount
            </h1>
            <p className="text-emerald-100 text-xs md:text-sm max-w-2xl">
              Track live student turnout per meal, scan student badges, generate entrance counter tokens, and view comprehensive daily, weekly, and monthly attendance graphs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shrink-0">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">Live {activeMeal.toUpperCase()} Headcount</span>
            </div>
            <div className="text-3xl font-black text-white mt-1">{liveCount} <span className="text-sm font-semibold text-emerald-200">/ 450</span></div>
            <div className="text-[10px] text-emerald-200 font-semibold mt-0.5">92.8% Capacity Turnout</div>
          </div>
        </div>
      </div>

      {/* Quick KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Active Serving Meal</span>
          <div className="text-xl font-extrabold capitalize text-slate-900 dark:text-white flex items-center gap-2">
            <Utensils className="w-5 h-5 text-emerald-500" />
            <span>{activeMeal}</span>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">Live</span>
          </div>
          <p className="text-[11px] text-slate-400">Cutoff: 02:30 PM</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Today's Total Meals Served</span>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            813 <span className="text-xs text-slate-400 font-normal">Meals</span>
          </div>
          <p className="text-[11px] font-bold text-emerald-500">Breakfast + Lunch</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Weekly Average Turnout</span>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            91.4% <span className="text-xs text-slate-400 font-normal">Pace</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">1,535 meals/day avg</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Resident Capacity</span>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            450 <span className="text-xs text-slate-400 font-normal">Students</span>
          </div>
          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">{hostelName} Only</p>
        </div>
      </div>

      {/* Interactive Time Period Selector for Attendance Graphs */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              <span>{hostelName} Attendance Analytics & Consumption Graphs</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Filter by <strong>1 Day (Per Meal)</strong>, <strong>7-Day Week</strong>, or <strong>30-Day Month</strong>
            </p>
          </div>

          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setPeriod('day')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                period === 'day'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Today (1 Day / 4 Meals)
            </button>
            <button
              onClick={() => setPeriod('week')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                period === 'week'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Weekly (7 Days)
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                period === 'month'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly (30 Days)
            </button>
          </div>
        </div>

        {/* Graph Render based on Selected Period */}
        {period === 'day' && (
          <div className="space-y-4">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DAILY_MEAL_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="meal" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                  <YAxis domain={[0, 480]} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', color: '#fff', fontSize: '12px' }}
                    formatter={(val, name) => [`${val} Students`, name === 'attended' ? 'Eaten / Attended' : 'Hostel Capacity']}
                  />
                  <Legend />
                  <Bar dataKey="attended" fill="#4f46e5" radius={[8, 8, 0, 0]} name="Attended / Eaten" />
                  <Bar dataKey="capacity" fill="#cbd5e1" radius={[8, 8, 0, 0]} name="Total Capacity (450)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Meal Cards Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {DAILY_MEAL_DATA.map((m) => (
                <div key={m.meal} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span className="text-slate-900 dark:text-white">{m.meal}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${m.status === 'Serving Now' ? 'bg-emerald-500 text-white font-bold animate-pulse' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
                    {m.attended} <span className="text-xs text-slate-400 font-normal">/ 450 ate</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{m.time}</span>
                    <span className="font-bold text-emerald-500">{m.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {period === 'week' && (
          <div className="space-y-4">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WEEKLY_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="totalMealGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                  <YAxis domain={[1200, 1800]} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', color: '#fff', fontSize: '12px' }}
                    formatter={(val) => [`${val} Total Meals`, 'Daily Total Served']}
                  />
                  <Area type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#totalMealGrad)" name="Total Daily Meals" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-slate-500">
              📊 7-Day Peak Turnout: <strong>Sunday Feast (1,630 meals)</strong> • Lowest: Saturday (1,465 meals)
            </p>
          </div>
        )}

        {period === 'month' && (
          <div className="space-y-4">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MONTHLY_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="date" interval={4} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis domain={[1300, 1800]} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', color: '#fff', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="totalMeals" stroke="#10b981" strokeWidth={3} dot={false} name="Total Meals Served" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-slate-500">
              📈 30-Day Total Meals Served in {hostelName}: <strong>45,820 Meals</strong> (Average 91.6% attendance)
            </p>
          </div>
        )}
      </div>

      {/* Lower Section: Live Mess QR Token Display & Manual Roll Check-in */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mess Counter QR Generator */}
        <MessCounterQR />

        {/* Live Student Check-in Feed & Manual Roll Number Entry */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-500" />
                <span>Live Student Meal Check-Ins</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                Live Feed
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time check-in stream of {hostelName} residents currently entering the mess hall.
            </p>
          </div>

          {/* Quick Manual Roll Check-in Form */}
          <form onSubmit={handleManualCheckIn} className="space-y-2 pt-1">
            {checkInMsg && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                {checkInMsg}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={manualRoll}
                onChange={(e) => setManualRoll(e.target.value)}
                placeholder="Enter Roll No (e.g. 21CS089) for manual check-in..."
                className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors shrink-0"
              >
                Check-In
              </button>
            </div>
          </form>

          {/* Live Check-in List */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {liveFeed.map((st) => (
              <div
                key={st.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{st.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({st.roll})</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{st.room} • {st.meal}</div>
                </div>

                <div className="text-right space-y-0.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{st.status}</span>
                  </span>
                  <div className="text-[10px] text-slate-400">{st.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HostelAttendanceAnalytics;
