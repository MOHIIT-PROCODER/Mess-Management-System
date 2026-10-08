import React, { useState } from 'react';
import {
  BarChart3, TrendingUp, Users, Utensils, Building, Calendar,
  ShieldCheck, ArrowUpRight, Flame, CheckCircle2, Filter
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

// ── Multi-Hostel Campus Comparison Data ───────────────────
const ALL_HOSTELS_DATA = [
  { hostel: 'BH-1', breakfast: 370, lunch: 395, snacks: 260, dinner: 405, total: 1430, capacity: 420, rate: '94%' },
  { hostel: 'BH-2', breakfast: 350, lunch: 380, snacks: 240, dinner: 390, total: 1360, capacity: 400, rate: '95%' },
  { hostel: 'BH-3', breakfast: 395, lunch: 425, snacks: 280, dinner: 430, total: 1530, capacity: 450, rate: '94%' },
  { hostel: 'BH-4', breakfast: 380, lunch: 410, snacks: 270, dinner: 415, total: 1475, capacity: 430, rate: '95%' },
  { hostel: 'BH-5', breakfast: 360, lunch: 385, snacks: 250, dinner: 395, total: 1390, capacity: 410, rate: '93%' },
  { hostel: 'BH-6', breakfast: 390, lunch: 420, snacks: 290, dinner: 435, total: 1535, capacity: 450, rate: '93%' },
  { hostel: 'BH-7', breakfast: 395, lunch: 418, snacks: 290, dinner: 425, total: 1528, capacity: 450, rate: '93%' },
  { hostel: 'GH-1', breakfast: 430, lunch: 460, snacks: 340, dinner: 470, total: 1700, capacity: 480, rate: '96%' },
  { hostel: 'GH-2', breakfast: 410, lunch: 440, snacks: 320, dinner: 450, total: 1620, capacity: 460, rate: '96%' },
  { hostel: 'GH-3', breakfast: 450, lunch: 480, snacks: 360, dinner: 490, total: 1780, capacity: 500, rate: '96%' },
];

const WEEKLY_CAMPUS_TREND = [
  { day: 'Mon', 'BH-7': 1500, 'BH-1': 1410, 'GH-1': 1680, campusTotal: 15100 },
  { day: 'Tue', 'BH-7': 1530, 'BH-1': 1430, 'GH-1': 1700, campusTotal: 15350 },
  { day: 'Wed', 'BH-7': 1523, 'BH-1': 1420, 'GH-1': 1690, campusTotal: 15280 },
  { day: 'Thu', 'BH-7': 1509, 'BH-1': 1405, 'GH-1': 1675, campusTotal: 15150 },
  { day: 'Fri', 'BH-7': 1585, 'BH-1': 1460, 'GH-1': 1740, campusTotal: 15720 },
  { day: 'Sat', 'BH-7': 1465, 'BH-1': 1360, 'GH-1': 1610, campusTotal: 14600 },
  { day: 'Sun', 'BH-7': 1630, 'BH-1': 1510, 'GH-1': 1790, campusTotal: 16400 },
];

export const CampusAttendanceAnalytics = () => {
  const [period, setPeriod] = useState('day'); // 'day' | 'week' | 'month'
  const [selectedHostel, setSelectedHostel] = useState('ALL');

  const totalCampusStudents = ALL_HOSTELS_DATA.reduce((acc, h) => acc + h.capacity, 0);
  const totalStudentsEatingToday = ALL_HOSTELS_DATA.reduce((acc, h) => acc + h.lunch, 0);
  const totalMealsServedToday = ALL_HOSTELS_DATA.reduce((acc, h) => acc + h.total, 0);

  const displayedHostels = selectedHostel === 'ALL'
    ? ALL_HOSTELS_DATA
    : ALL_HOSTELS_DATA.filter((h) => h.hostel === selectedHostel);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Campus-Wide Dining Intelligence</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              All Hostels Meal Turnout & Graphs
            </h1>
            <p className="text-orange-100 text-xs md:text-sm max-w-2xl">
              Real-time attendance analytics across all 10 hostels (BH-1 to BH-7, GH-1 to GH-3) in Day, Week, and Month views.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200">Campus Live Lunch Headcount</span>
            <div className="text-3xl font-black text-white mt-1">
              {totalStudentsEatingToday} <span className="text-sm font-semibold text-amber-200">/ {totalCampusStudents}</span>
            </div>
            <span className="text-[10px] text-amber-200 font-semibold">94.8% Active Attendance</span>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Total Hostels Monitored</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">10 Hostels</div>
          <p className="text-[11px] text-emerald-600 font-semibold">7 Boys + 3 Girls Hostels</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Total Resident Capacity</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalCampusStudents} Students</div>
          <p className="text-[11px] text-indigo-600 font-semibold">100% Subscribed to Mess</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Today's Total Meals Served</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalMealsServedToday.toLocaleString()} Meals</div>
          <p className="text-[11px] text-emerald-600 font-semibold">Across Breakfast, Lunch, Snacks, Dinner</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Top Performing Hostel</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">GH-3 (96%)</div>
          <p className="text-[11px] text-amber-500 font-semibold">Highest Turnout & Satisfaction</p>
        </div>
      </div>

      {/* Main Graphs Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Controls Bar: Period Toggle & Hostel Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Hostel Attendance Breakdown ({selectedHostel === 'ALL' ? 'All 10 Hostels' : selectedHostel})
              </h2>
              <p className="text-xs text-slate-500">Switch between 1 Day, 7 Days, or 30 Days and drill down into any hostel.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Hostel Selector Dropdown */}
            <select
              value={selectedHostel}
              onChange={(e) => setSelectedHostel(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All 10 Hostels</option>
              {ALL_HOSTELS_DATA.map((h) => (
                <option key={h.hostel} value={h.hostel}>{h.hostel} (Capacity: {h.capacity})</option>
              ))}
            </select>

            {/* Time Period Tabs */}
            <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 text-xs font-bold">
              <button
                onClick={() => setPeriod('day')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  period === 'day' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-500'
                }`}
              >
                1 Day
              </button>
              <button
                onClick={() => setPeriod('week')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  period === 'week' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-500'
                }`}
              >
                7-Day Week
              </button>
              <button
                onClick={() => setPeriod('month')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  period === 'month' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-500'
                }`}
              >
                30-Day Month
              </button>
            </div>
          </div>
        </div>

        {/* Chart View */}
        {period === 'day' && (
          <div className="space-y-4">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayedHostels} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="hostel" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', color: '#fff', fontSize: '12px' }} />
                  <Legend />
                  <Bar dataKey="breakfast" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Breakfast" />
                  <Bar dataKey="lunch" fill="#10b981" radius={[4, 4, 0, 0]} name="Lunch" />
                  <Bar dataKey="snacks" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Snacks" />
                  <Bar dataKey="dinner" fill="#6366f1" radius={[4, 4, 0, 0]} name="Dinner" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {period === 'week' && (
          <div className="space-y-4">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WEEKLY_CAMPUS_TREND} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="campusGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                  <YAxis domain={[12000, 18000]} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="campusTotal" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#campusGrad)" name="Total Meals across Campus" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {period === 'month' && (
          <div className="space-y-4">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ALL_HOSTELS_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="hostel" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                  <Bar dataKey="total" fill="#4f46e5" radius={[6, 6, 0, 0]} name="Total Daily Meals Consumed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Detailed Table for Every Hostel */}
        <div className="pt-2">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-sm mb-3">
            Every Hostel Dining Headcount Breakdown (Day)
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Hostel Name</th>
                  <th className="py-3 px-4">Capacity</th>
                  <th className="py-3 px-4">Breakfast</th>
                  <th className="py-3 px-4">Lunch (Live)</th>
                  <th className="py-3 px-4">Snacks</th>
                  <th className="py-3 px-4">Dinner</th>
                  <th className="py-3 px-4">Daily Total</th>
                  <th className="py-3 px-4">Turnout %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {ALL_HOSTELS_DATA.map((h) => (
                  <tr key={h.hostel} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${h.hostel === 'BH-7' ? 'bg-indigo-50/40 dark:bg-indigo-950/20 font-semibold' : ''}`}>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{h.hostel}</span>
                      {h.hostel === 'BH-7' && <span className="text-[9px] px-1.5 bg-indigo-600 text-white rounded font-bold">BH-7</span>}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-mono">{h.capacity}</td>
                    <td className="py-3 px-4 text-amber-600 font-mono">{h.breakfast}</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold font-mono">{h.lunch}</td>
                    <td className="py-3 px-4 text-purple-600 font-mono">{h.snacks}</td>
                    <td className="py-3 px-4 text-indigo-600 font-mono">{h.dinner}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white font-mono">{h.total}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-[10px] font-bold">
                        {h.rate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CampusAttendanceAnalytics;
