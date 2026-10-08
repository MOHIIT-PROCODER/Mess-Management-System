import React, { useState, useMemo } from 'react';
import {
  BarChart3, TrendingUp, Users, Utensils, Calendar,
  ArrowUpDown, Clock, Filter, CheckCircle2, Award, PieChart
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const DAILY_MEAL_BREAKDOWN = [
  { meal: 'Breakfast', count: 395, target: 450, wastageKg: 4.2, satisfaction: '4.8 ★' },
  { meal: 'Lunch', count: 418, target: 450, wastageKg: 6.8, satisfaction: '4.6 ★' },
  { meal: 'Snacks', count: 290, target: 450, wastageKg: 2.1, satisfaction: '4.7 ★' },
  { meal: 'Dinner', count: 425, target: 450, wastageKg: 5.5, satisfaction: '4.9 ★' },
];

const WEEKLY_DATA = [
  { day: 'Mon', breakfast: 390, lunch: 415, snacks: 280, dinner: 420, total: 1505 },
  { day: 'Tue', breakfast: 395, lunch: 420, snacks: 290, dinner: 430, total: 1535 },
  { day: 'Wed', breakfast: 388, lunch: 412, snacks: 275, dinner: 422, total: 1497 },
  { day: 'Thu', breakfast: 392, lunch: 416, snacks: 285, dinner: 428, total: 1521 },
  { day: 'Fri', breakfast: 405, lunch: 430, snacks: 310, dinner: 440, total: 1585 },
  { day: 'Sat', breakfast: 370, lunch: 395, snacks: 260, dinner: 405, total: 1430 },
  { day: 'Sun', breakfast: 410, lunch: 440, snacks: 330, dinner: 450, total: 1630 },
];

// Past 12 Months
const YEARLY_MESS_DATA = [
  { month: 'Oct 2025', totalServed: 45200, avgTurnout: '94.2%', wastageKg: 165, topMeal: 'Special Dinner' },
  { month: 'Nov 2025', totalServed: 46100, avgTurnout: '94.8%', wastageKg: 152, topMeal: 'Sunday Lunch' },
  { month: 'Dec 2025', totalServed: 38900, avgTurnout: '91.2%', wastageKg: 130, topMeal: 'Christmas Feast' },
  { month: 'Jan 2026', totalServed: 45700, avgTurnout: '94.0%', wastageKg: 148, topMeal: 'Paneer Butter Masala' },
  { month: 'Feb 2026', totalServed: 44100, avgTurnout: '94.6%', wastageKg: 142, topMeal: 'Biryani Special' },
  { month: 'Mar 2026', totalServed: 47200, avgTurnout: '95.1%', wastageKg: 158, topMeal: 'Gulab Jamun Feast' },
  { month: 'Apr 2026', totalServed: 46800, avgTurnout: '94.7%', wastageKg: 150, topMeal: 'Chole Bhature' },
  { month: 'May 2026', totalServed: 41000, avgTurnout: '92.3%', wastageKg: 135, topMeal: 'Ice Cream Dinner' },
  { month: 'Jun 2026', totalServed: 37500, avgTurnout: '89.6%', wastageKg: 120, topMeal: 'Veg Pulao' },
  { month: 'Jul 2026', totalServed: 46200, avgTurnout: '94.5%', wastageKg: 149, topMeal: 'Masala Dosa' },
  { month: 'Aug 2026', totalServed: 47500, avgTurnout: '95.3%', wastageKg: 155, topMeal: 'Independence Day Special' },
  { month: 'Sep 2026', totalServed: 46900, avgTurnout: '94.9%', wastageKg: 147, topMeal: 'Kadhai Paneer' },
];

export const Analytics = () => {
  const [period, setPeriod] = useState('day'); // 'day' | 'week' | 'month' | 'year'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' | 'asc'

  const sortedYearly = useMemo(() => {
    const list = [...YEARLY_MESS_DATA];
    return sortOrder === 'desc' ? list.reverse() : list;
  }, [sortOrder]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-500" />
            <span>Mess Operational Analytics & Historical Logs</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track student meal turnouts, food consumption, kitchen waste, and date-sorted past year records.
          </p>
        </div>

        {/* Period Toggle */}
        <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setPeriod('day')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              period === 'day' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setPeriod('week')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              period === 'week' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              period === 'month' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              period === 'year' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            Past 1 Year (12M)
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500">Today's Total Headcount</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">1,528 Meals</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">93.8% Overall Attendance</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500">Avg Food Wastage</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">4.65 Kg / Meal</div>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">-18% below campus average</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500">Student Satisfaction Rating</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">4.75 / 5.0 ★</div>
          <p className="text-[11px] text-amber-500 font-semibold mt-1">Based on 640 verified reviews</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500">Past 1-Year Total Meals</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">531,100 Meals</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">12 Months Historical Data</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            <span>
              {period === 'day' && 'Today Meal Turnout Breakdown'}
              {period === 'week' && 'Past 7 Days Turnout Trend'}
              {period === 'month' && 'Past 30 Days Attendance Pattern'}
              {period === 'year' && 'Past 12 Months Historical Consumption & Wastage'}
            </span>
          </h2>

          {period === 'year' && (
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-500" />
              <span>Date Sorted: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
            </button>
          )}
        </div>

        {period === 'day' && (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DAILY_MEAL_BREAKDOWN} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="meal" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                <YAxis domain={[0, 500]} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', color: '#fff', fontSize: '12px' }} />
                <Legend />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} name="Students Attended" />
                <Bar dataKey="target" fill="#e2e8f0" radius={[6, 6, 0, 0]} name="Total Capacity (450)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {period === 'week' && (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEEKLY_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="messGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                <YAxis domain={[1200, 1800]} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#messGrad)" name="Total Daily Meals" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {period === 'month' && (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                <YAxis domain={[300, 480]} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Legend />
                <Line type="monotone" dataKey="lunch" stroke="#10b981" strokeWidth={3} name="Lunch Turnout" />
                <Line type="monotone" dataKey="dinner" stroke="#6366f1" strokeWidth={3} name="Dinner Turnout" />
                <Line type="monotone" dataKey="breakfast" stroke="#f59e0b" strokeWidth={3} name="Breakfast Turnout" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {period === 'year' && (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={YEARLY_MESS_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                <YAxis domain={[30000, 50000]} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Legend />
                <Bar dataKey="totalServed" fill="#4f46e5" radius={[6, 6, 0, 0]} name="Total Meals Served" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Historical Table */}
        <div className="pt-2">
          {period === 'year' ? (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Billing Month</th>
                    <th className="py-3 px-4">Total Meals Served</th>
                    <th className="py-3 px-4">Average Turnout</th>
                    <th className="py-3 px-4">Total Waste (Kg)</th>
                    <th className="py-3 px-4">Most Popular Meal</th>
                    <th className="py-3 px-4">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {sortedYearly.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{row.month}</span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {row.totalServed.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-semibold text-emerald-600">
                        {row.avgTurnout}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">
                        {row.wastageKg} kg
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                        {row.topMeal}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                          Audited
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Meal Session</th>
                    <th className="py-3 px-4">Headcount</th>
                    <th className="py-3 px-4">Capacity</th>
                    <th className="py-3 px-4">Turnout %</th>
                    <th className="py-3 px-4">Waste (Kg)</th>
                    <th className="py-3 px-4">Student Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {DAILY_MEAL_BREAKDOWN.map((m) => (
                    <tr key={m.meal} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{m.meal}</td>
                      <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{m.count}</td>
                      <td className="py-3 px-4 text-slate-500 font-mono">{m.target}</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">
                        {((m.count / m.target) * 100).toFixed(1)}%
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">{m.wastageKg} kg</td>
                      <td className="py-3 px-4 font-bold text-amber-500">{m.satisfaction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Analytics;

