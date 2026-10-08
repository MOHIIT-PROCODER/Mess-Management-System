import React, { useState } from 'react';
import { FileText, Download, CheckCircle2 } from 'lucide-react';

export const ReportGenerator = () => {
  const [reportType, setReportType] = useState('attendance');
  const [format, setFormat] = useState('csv');
  const [generating, setGenerating] = useState(false);

  const handleDownload = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      // Create mock CSV blob download
      const content = reportType === 'attendance' 
        ? "Student ID,Name,Roll No,Meal,Date,Status\n1,Rahul Sharma,21CS045,Lunch,2026-10-07,Present\n2,Ananya Verma,21EC012,Lunch,2026-10-07,Present"
        : "Day,Meal,Items,Calories,Rating\nMonday,Lunch,Paneer Butter Masala,850,4.5\nMonday,Dinner,Dal Makhani,780,4.2";

      const blob = new Blob([content], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Mess_${reportType}_report.${format}`;
      a.click();
    }, 1000);
  };

  return (
    <div className="p-6 rounded-2xl glass-card space-y-6 max-w-xl">
      <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center space-x-2">
        <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <span>Export Mess Reports</span>
      </h3>

      <div className="space-y-4 text-xs">
        <div className="space-y-1">
          <label className="font-semibold text-slate-700 dark:text-slate-300">Report Category</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setReportType('attendance')}
              className={`p-3 rounded-xl border text-left font-semibold transition-colors ${
                reportType === 'attendance'
                  ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-500 text-indigo-700 dark:text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Attendance & Turnout
            </button>
            <button
              onClick={() => setReportType('food')}
              className={`p-3 rounded-xl border text-left font-semibold transition-colors ${
                reportType === 'food'
                  ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-500 text-indigo-700 dark:text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Food Rating & Consumption
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-slate-700 dark:text-slate-300">Export Format</label>
          <div className="flex space-x-3">
            {['csv', 'excel', 'pdf'].map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-4 py-2 rounded-xl uppercase font-bold text-[10px] border transition-colors ${
                  format === f
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={generating}
          className="w-full gradient-btn py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 text-white"
        >
          <Download className="w-4 h-4" />
          <span>{generating ? 'Compiling Report...' : `Download ${reportType.toUpperCase()} Report (${format.toUpperCase()})`}</span>
        </button>
      </div>
    </div>
  );
};
