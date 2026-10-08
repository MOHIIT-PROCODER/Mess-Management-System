import React, { useState, useMemo } from 'react';
import {
  FileText, Download, CheckCircle2, Filter, ArrowUpDown,
  Building, Users, Calendar, Table, Search, Sparkles
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const SAMPLE_HOSTEL_STUDENTS = [
  { id: 1, name: 'Aarav Patel', roll: '21CS089', room: '204-A', mealsAttended: 118, totalMeals: 120, turnout: '98.3%', lastMeal: 'Lunch (Today)', status: 'Active' },
  { id: 2, name: 'Rohan Gupta', roll: '21CS045', room: '312-B', mealsAttended: 112, totalMeals: 120, turnout: '93.3%', lastMeal: 'Lunch (Today)', status: 'Active' },
  { id: 3, name: 'Aditya Mishra', roll: '21EC012', room: '401-B', mealsAttended: 115, totalMeals: 120, turnout: '95.8%', lastMeal: 'Breakfast (Today)', status: 'Active' },
  { id: 4, name: 'Priyanshu Verma', roll: '21ME078', room: '405-A', mealsAttended: 108, totalMeals: 120, turnout: '90.0%', lastMeal: 'Lunch (Today)', status: 'Active' },
  { id: 5, name: 'Siddharth Roy', roll: '21EE034', room: '102-A', mealsAttended: 119, totalMeals: 120, turnout: '99.1%', lastMeal: 'Lunch (Today)', status: 'Active' },
  { id: 6, name: 'Kunal Nayak', roll: '21CS112', room: '208-B', mealsAttended: 95, totalMeals: 120, turnout: '79.2%', lastMeal: 'Yesterday Dinner', status: 'Warning' },
  { id: 7, name: 'Deepak Sahu', roll: '21IT056', room: '304-A', mealsAttended: 114, totalMeals: 120, turnout: '95.0%', lastMeal: 'Lunch (Today)', status: 'Active' },
  { id: 8, name: 'Manish Mohanty', roll: '21CS143', room: '115-B', mealsAttended: 116, totalMeals: 120, turnout: '96.6%', lastMeal: 'Lunch (Today)', status: 'Active' },
];

export const HostelReports = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';

  const [reportType, setReportType] = useState('student_attendance'); // 'student_attendance' | 'monthly_headcount' | 'food_ratings' | 'rebates'
  const [format, setFormat] = useState('csv'); // 'csv' | 'excel' | 'pdf'
  const [sortBy, setSortBy] = useState('roll'); // 'roll' | 'name' | 'room' | 'turnout'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'
  const [filterMeal, setFilterMeal] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [generating, setGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Sorted and filtered students
  const sortedStudents = useMemo(() => {
    let list = [...SAMPLE_HOSTEL_STUDENTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q) || s.room.toLowerCase().includes(q));
    }

    list.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === 'turnout') {
        valA = parseFloat(a.turnout);
        valB = parseFloat(b.turnout);
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [sortBy, sortDirection, searchQuery]);

  const handleDownload = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);

      let content = '';
      if (reportType === 'student_attendance') {
        content = `Hostel: ${hostelName}\nGenerated On: ${new Date().toLocaleString()}\nSorted By: ${sortBy.toUpperCase()} (${sortDirection.toUpperCase()})\n\nRoll Number,Student Name,Room Number,Meals Attended,Total Meals,Turnout %,Status\n` +
          sortedStudents.map((s) => `${s.roll},"${s.name}",${s.room},${s.mealsAttended},${s.totalMeals},${s.turnout},${s.status}`).join('\n');
      } else if (reportType === 'monthly_headcount') {
        content = `Hostel: ${hostelName}\nMonth,Breakfast Count,Lunch Count,Snacks Count,Dinner Count,Total Served,Avg Turnout\n` +
          `October 2026,11850,12540,8700,12750,45840,94.2%\nSeptember 2026,11700,12400,8650,12600,45350,93.8%\nAugust 2026,11900,12600,8800,12800,46100,94.9%`;
      } else {
        content = `Hostel: ${hostelName}\nDish Name,Meal Slot,Average Rating,Total Reviews,Sentiment\n` +
          `Paneer Butter Masala,Lunch,4.8 ★,340,96% Positive\nDal Makhani,Dinner,4.6 ★,280,94% Positive\nAloo Paratha,Breakfast,4.7 ★,310,95% Positive`;
      }

      const mimeType = format === 'csv' ? 'text/csv' : format === 'excel' ? 'application/vnd.ms-excel' : 'text/plain';
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${hostelName.replace(/[^a-zA-Z0-9]/g, '_')}_${reportType}_Report.${format === 'excel' ? 'xls' : format === 'pdf' ? 'txt' : 'csv'}`;
      a.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-900 text-white shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold">
            <FileText className="w-3.5 h-3.5 text-amber-300" />
            <span>Official Reporting & Data Export Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            {hostelName} Reports & Exports
          </h1>
          <p className="text-indigo-100 text-xs md:text-sm">
            Generate and export sorted student dining records, monthly turnouts, and meal consumption audits in CSV, Excel, or PDF.
          </p>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center gap-3 text-xs font-bold animate-fade-in shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Report compiled and downloaded successfully!</span>
        </div>
      )}

      {/* Main Generator Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <span>Configure Export Parameters</span>
        </h2>

        {/* 1. Report Category */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
            Report Category
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'student_attendance', title: 'Student Dining Attendance', subtitle: 'Sorted individual meal scans & turnouts' },
              { id: 'monthly_headcount', title: 'Monthly Turnout Summary', subtitle: 'Breakfast, Lunch, Snacks, Dinner totals' },
              { id: 'food_ratings', title: 'Food Ratings & Reviews', subtitle: 'Dish satisfaction and student feedback' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setReportType(c.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  reportType === c.id
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-600 text-indigo-950 dark:text-white shadow-md shadow-indigo-500/10'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:border-indigo-300'
                }`}
              >
                <p className="font-extrabold text-xs text-slate-900 dark:text-white">{c.title}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{c.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Sort Students By & Filter Controls */}
        {reportType === 'student_attendance' && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-indigo-500" />
                <span>Sort Students In Report By:</span>
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {/* Sort Field Selector */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="roll">Roll Number</option>
                  <option value="name">Student Name</option>
                  <option value="room">Room Number</option>
                  <option value="turnout">Turnout Rate %</option>
                </select>

                {/* Sort Direction Toggle */}
                <button
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-400 transition-colors"
                >
                  {sortDirection === 'asc' ? '↑ Ascending' : '↓ Descending'}
                </button>
              </div>
            </div>

            {/* Live Search inside report */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter preview by student name, roll number, or room..."
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* 3. Export Format */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
            Export Format
          </label>
          <div className="flex items-center gap-3">
            {['csv', 'excel', 'pdf'].map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-5 py-2.5 rounded-xl uppercase font-extrabold text-xs border transition-all ${
                  format === f
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Download Action Button */}
        <button
          onClick={handleDownload}
          disabled={generating}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-75"
        >
          <Download className="w-4 h-4" />
          <span>
            {generating
              ? 'Generating & Formatting Report...'
              : `Download ${reportType.replace('_', ' ').toUpperCase()} Report (${format.toUpperCase()})`}
          </span>
        </button>

        {/* Preview Table of Sorted Students */}
        {reportType === 'student_attendance' && (
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <Table className="w-4 h-4 text-indigo-500" />
                <span>Live Data Preview (Sorted by {sortBy.toUpperCase()})</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-semibold">{sortedStudents.length} Records ready for export</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Roll Number</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Room No</th>
                    <th className="py-3 px-4">Attended Meals</th>
                    <th className="py-3 px-4">Turnout %</th>
                    <th className="py-3 px-4">Last Meal Scanned</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {sortedStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{s.roll}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{s.name}</td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">{s.room}</td>
                      <td className="py-3 px-4 font-mono">{s.mealsAttended} / {s.totalMeals}</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">{s.turnout}</td>
                      <td className="py-3 px-4 text-slate-500">{s.lastMeal}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          s.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default HostelReports;
