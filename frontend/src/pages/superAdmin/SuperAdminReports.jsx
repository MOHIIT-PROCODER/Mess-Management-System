import React, { useState, useMemo } from 'react';
import {
  FileText, Download, CheckCircle2, Filter, ArrowUpDown,
  Building, Users, Calendar, Table, Search, ShieldCheck
} from 'lucide-react';

const CAMPUS_STUDENT_DATA = [
  { id: 1, name: 'Aarav Patel', roll: '21CS089', hostel: 'BH-7', room: '204-A', turnout: '98.3%', meals: '118/120', rating: '4.8 ★', status: 'Active' },
  { id: 2, name: 'Ananya Verma', roll: '21EC012', hostel: 'GH-1', room: '102-B', turnout: '99.2%', meals: '119/120', rating: '4.9 ★', status: 'Active' },
  { id: 3, name: 'Rohan Gupta', roll: '21CS045', hostel: 'BH-7', room: '312-B', turnout: '93.3%', meals: '112/120', rating: '4.6 ★', status: 'Active' },
  { id: 4, name: 'Pooja Nayak', roll: '21EE067', hostel: 'GH-2', room: '205-A', turnout: '97.5%', meals: '117/120', rating: '4.7 ★', status: 'Active' },
  { id: 5, name: 'Siddharth Roy', roll: '21CS112', hostel: 'BH-1', room: '401-A', turnout: '95.0%', meals: '114/120', rating: '4.5 ★', status: 'Active' },
  { id: 6, name: 'Megha Sahu', roll: '21IT034', hostel: 'GH-3', room: '308-B', turnout: '98.8%', meals: '118/120', rating: '4.9 ★', status: 'Active' },
  { id: 7, name: 'Kunal Nayak', roll: '21ME090', hostel: 'BH-2', room: '110-A', turnout: '78.5%', meals: '94/120', rating: '4.1 ★', status: 'Warning' },
  { id: 8, name: 'Deepak Mohanty', roll: '21CS156', hostel: 'BH-3', room: '215-B', turnout: '94.2%', meals: '113/120', rating: '4.6 ★', status: 'Active' },
  { id: 9, name: 'Sneha Mishra', roll: '21EC088', hostel: 'GH-1', room: '404-A', turnout: '96.6%', meals: '116/120', rating: '4.8 ★', status: 'Active' },
  { id: 10, name: 'Aditya Das', roll: '21CE023', hostel: 'BH-6', room: '105-B', turnout: '92.5%', meals: '111/120', rating: '4.4 ★', status: 'Active' },
];

export const SuperAdminReports = () => {
  const [reportCategory, setReportCategory] = useState('attendance_turnout'); // 'attendance_turnout' | 'campus_summary' | 'food_ratings'
  const [selectedHostel, setSelectedHostel] = useState('ALL');
  const [sortBy, setSortBy] = useState('roll'); // 'roll' | 'name' | 'hostel' | 'room' | 'turnout'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'
  const [format, setFormat] = useState('csv'); // 'csv' | 'excel' | 'pdf'
  const [searchQuery, setSearchQuery] = useState('');
  const [generating, setGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Sorted and filtered students
  const filteredStudents = useMemo(() => {
    let list = [...CAMPUS_STUDENT_DATA];

    if (selectedHostel !== 'ALL') {
      list = list.filter((s) => s.hostel === selectedHostel);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q) || s.hostel.toLowerCase().includes(q) || s.room.toLowerCase().includes(q));
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
  }, [selectedHostel, sortBy, sortDirection, searchQuery]);

  const handleDownload = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);

      let content = '';
      if (reportCategory === 'attendance_turnout') {
        content = `Campus-Wide Dining Attendance Report\nScope: ${selectedHostel === 'ALL' ? 'All 10 Hostels' : selectedHostel}\nGenerated On: ${new Date().toLocaleString()}\nSorted By: ${sortBy.toUpperCase()} (${sortDirection.toUpperCase()})\n\nRoll No,Student Name,Hostel,Room No,Turnout %,Meals Attended,Rating,Status\n` +
          filteredStudents.map((s) => `${s.roll},"${s.name}",${s.hostel},${s.room},${s.turnout},${s.meals},${s.rating},${s.status}`).join('\n');
      } else if (reportCategory === 'campus_summary') {
        content = `Campus Total Turnout Summary (10 Hostels)\nMonth,Total Meals Served,Boys Hostels Turnout,Girls Hostels Turnout,Overall Turnout\n` +
          `October 2026,458400,94.2%,96.4%,95.1%\nSeptember 2026,453500,93.8%,96.0%,94.7%\nAugust 2026,461000,94.9%,96.8%,95.6%`;
      } else {
        content = `Campus Food Quality & Feedback Audit\nHostel,Top Rated Dish,Average Rating,Total Reviews,Sentiment\n` +
          `BH-7,Paneer Butter Masala,4.8 ★,640,96% Positive\nGH-1,Royal Biryani,4.9 ★,720,98% Positive\nGH-3,Gulab Jamun,4.9 ★,680,98% Positive\nBH-1,Dal Makhani,4.6 ★,590,94% Positive`;
      }

      const mimeType = format === 'csv' ? 'text/csv' : format === 'excel' ? 'application/vnd.ms-excel' : 'text/plain';
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Campus_${reportCategory}_${selectedHostel}_Report.${format === 'excel' ? 'xls' : format === 'pdf' ? 'txt' : 'csv'}`;
      a.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-900 text-white shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Campus Intelligence & Central Reporting</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Campus-Wide Reports & Data Export Engine
          </h1>
          <p className="text-orange-100 text-xs md:text-sm">
            Generate and export consolidated dining analytics, student turnouts, and meal consumption audits across all 10 hostels in CSV, Excel, or PDF.
          </p>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center gap-3 text-xs font-bold animate-fade-in shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Campus Report successfully generated and downloaded!</span>
        </div>
      )}

      {/* Main Generator Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <span>Configure Campus Export Parameters</span>
        </h2>

        {/* 1. Report Category */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
            Report Category
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'attendance_turnout', title: 'Student Dining Attendance', subtitle: 'Sorted individual meal scans & turnouts' },
              { id: 'campus_summary', title: 'Campus Turnout & Headcounts', subtitle: 'Multi-hostel monthly dining totals' },
              { id: 'food_ratings', title: 'Campus Food Quality & Feedback', subtitle: 'Dish ratings and student sentiment' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setReportCategory(c.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  reportCategory === c.id
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

        {/* 2. Hostel & Student Sorting Filter Controls */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Hostel Selector */}
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-indigo-500 shrink-0" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">Filter by Hostel:</span>
              <select
                value={selectedHostel}
                onChange={(e) => setSelectedHostel(e.target.value)}
                className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="ALL">All 10 Hostels (BH-1 to BH-7, GH-1 to GH-3)</option>
                <option value="BH-1">BH-1 (Aryabhata)</option>
                <option value="BH-2">BH-2 (Varahamihira)</option>
                <option value="BH-3">BH-3 (Charaka)</option>
                <option value="BH-4">BH-4 (Sushruta)</option>
                <option value="BH-5">BH-5 (Bhaskara)</option>
                <option value="BH-6">BH-6 (Brahmagupta)</option>
                <option value="BH-7">BH-7 (Boys Hostel 7)</option>
                <option value="GH-1">GH-1 (Gargi)</option>
                <option value="GH-2">GH-2 (Maitreyi)</option>
                <option value="GH-3">GH-3 (Kalpana Chawla)</option>
              </select>
            </div>

            {/* Sort Field & Direction */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-indigo-500" />
                <span>Sort Students By:</span>
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="roll">Roll Number</option>
                <option value="name">Student Name</option>
                <option value="hostel">Hostel Name</option>
                <option value="room">Room Number</option>
                <option value="turnout">Turnout Rate %</option>
              </select>

              <button
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-400 transition-colors"
              >
                {sortDirection === 'asc' ? '↑ Ascending' : '↓ Descending'}
              </button>
            </div>
          </div>

          {/* Live Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, roll number, hostel, or room number..."
              className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

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

        {/* 4. Action Button */}
        <button
          onClick={handleDownload}
          disabled={generating}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-700 hover:opacity-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all disabled:opacity-75"
        >
          <Download className="w-4 h-4" />
          <span>
            {generating
              ? 'Compiling Campus Report...'
              : `Download ${reportCategory.replace('_', ' ').toUpperCase()} Report (${format.toUpperCase()})`}
          </span>
        </button>

        {/* Preview Table */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
              <Table className="w-4 h-4 text-indigo-500" />
              <span>Campus Data Preview (Sorted by {sortBy.toUpperCase()} • {selectedHostel === 'ALL' ? 'All Hostels' : selectedHostel})</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-semibold">{filteredStudents.length} Records ready for export</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Roll Number</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Hostel</th>
                  <th className="py-3 px-4">Room No</th>
                  <th className="py-3 px-4">Meals Attended</th>
                  <th className="py-3 px-4">Turnout %</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{s.roll}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{s.name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold text-[10px]">
                        {s.hostel}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">{s.room}</td>
                    <td className="py-3 px-4 font-mono">{s.meals}</td>
                    <td className="py-3 px-4 font-bold text-emerald-600">{s.turnout}</td>
                    <td className="py-3 px-4 text-amber-500 font-bold">{s.rating}</td>
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
      </div>
    </div>
  );
};
export default SuperAdminReports;
