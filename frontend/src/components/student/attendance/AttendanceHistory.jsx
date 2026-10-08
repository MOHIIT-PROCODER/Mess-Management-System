import React, { useState, useMemo } from 'react';
import { Calendar, CheckCircle, Clock, Filter, ArrowUpDown, Search, ChevronDown, Sparkles, Utensils } from 'lucide-react';
import { getMealBadgeColor } from '../../../utils/attendanceUtils';

// Helper to generate realistic historical logs going back 365 days
const generateYearlyLogs = () => {
  const logs = [];
  const meals = ['breakfast', 'lunch', 'snacks', 'dinner'];
  const times = {
    breakfast: '08:15 AM',
    lunch: '01:10 PM',
    snacks: '05:30 PM',
    dinner: '08:20 PM'
  };

  const now = new Date();
  for (let d = 0; d < 365; d++) {
    const logDate = new Date(now.getTime() - d * 24 * 60 * 60 * 1000);
    const dateStr = logDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const isWeekend = logDate.getDay() === 0 || logDate.getDay() === 6;

    const dayMeals = isWeekend ? ['breakfast', 'lunch', 'dinner'] : meals;
    dayMeals.forEach((meal, idx) => {
      logs.push({
        id: `att-${d}-${meal}`,
        timestamp: logDate.getTime() - idx * 3600000 * 4,
        date: dateStr,
        rawDate: logDate,
        meal,
        status: 'present',
        time: times[meal] || '01:00 PM',
        hostel: 'BH-7'
      });
    });
  }
  return logs;
};

const ALL_PAST_YEAR_LOGS = generateYearlyLogs();

export const AttendanceHistory = () => {
  const [dateRange, setDateRange] = useState('30d'); // 'today' | '7d' | '30d' | '90d' | '180d' | '365d'
  const [selectedMeal, setSelectedMeal] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' | 'asc'

  const RANGE_OPTIONS = [
    { id: 'today', label: 'Today' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '3 Months' },
    { id: '180d', label: '6 Months' },
    { id: '365d', label: '1 Year' },
  ];

  const filteredLogs = useMemo(() => {
    const now = new Date().getTime();
    let daysLimit = 30;
    if (dateRange === 'today') daysLimit = 1;
    else if (dateRange === '7d') daysLimit = 7;
    else if (dateRange === '30d') daysLimit = 30;
    else if (dateRange === '90d') daysLimit = 90;
    else if (dateRange === '180d') daysLimit = 180;
    else if (dateRange === '365d') daysLimit = 365;

    const cutoff = now - daysLimit * 24 * 60 * 60 * 1000;

    let result = ALL_PAST_YEAR_LOGS.filter((l) => l.timestamp >= cutoff);

    if (selectedMeal !== 'all') {
      result = result.filter((l) => l.meal === selectedMeal);
    }

    result.sort((a, b) => (sortOrder === 'desc' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp));

    return result;
  }, [dateRange, selectedMeal, sortOrder]);

  return (
    <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Dining Attendance History</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Verified scan records up to 1 Year past
          </p>
        </div>

        {/* Sort Button */}
        <button
          onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          title="Toggle sort order"
          className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold flex items-center gap-1 transition-colors shrink-0"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-indigo-500" />
          <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
        </button>
      </div>

      {/* Row 1: Compact Date Range Segmented Bar */}
      <div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs font-bold text-center">
          {RANGE_OPTIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setDateRange(r.id)}
              className={`py-1.5 rounded-xl transition-all ${
                dateRange === r.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: Filter Dropdown & Record Count */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 flex-1">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={selectedMeal}
            onChange={(e) => setSelectedMeal(e.target.value)}
            className="w-full max-w-[200px] px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Meals</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="snacks">Snacks</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800/40 shrink-0">
          {filteredLogs.length} Records
        </span>
      </div>

      {/* Attendance Logs List */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs font-semibold">
            No meal attendance records found in this range.
          </div>
        ) : (
          filteredLogs.slice(0, 100).map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/50 flex items-center justify-between text-xs hover:border-indigo-400 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold capitalize border ${getMealBadgeColor(log.meal)}`}>
                  {log.meal}
                </span>
                <div>
                  <p className="font-extrabold text-slate-900 dark:text-slate-100 text-xs">{log.date}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center space-x-1 mt-0.5">
                    <Clock className="w-2.5 h-2.5 text-slate-400" />
                    <span>{log.time}</span>
                  </p>
                </div>
              </div>
              <span className="flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-800/40">
                <CheckCircle className="w-3 h-3" />
                <span>Verified</span>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default AttendanceHistory;


