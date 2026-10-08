import React, { useState } from 'react';
import { FeedbackReviewExplorer } from '../../components/common/FeedbackReviewExplorer';
import { MessageSquare, Building2, Layers, Sparkles } from 'lucide-react';

const HOSTELS = [
  { id: 'all', name: 'Mix All Hostels (Campus-Wide)', short: 'Mix All' },
  { id: 'BH-1', name: 'BH-1 (Boys Hostel 1)', short: 'BH-1' },
  { id: 'BH-2', name: 'BH-2 (Boys Hostel 2)', short: 'BH-2' },
  { id: 'BH-3', name: 'BH-3 (Boys Hostel 3)', short: 'BH-3' },
  { id: 'BH-4', name: 'BH-4 (Boys Hostel 4)', short: 'BH-4' },
  { id: 'BH-5', name: 'BH-5 (Boys Hostel 5)', short: 'BH-5' },
  { id: 'BH-6', name: 'BH-6 (Boys Hostel 6)', short: 'BH-6' },
  { id: 'BH-7', name: 'BH-7 (Boys Hostel 7)', short: 'BH-7' },
  { id: 'GH-1', name: 'GH-1 (Girls Hostel 1)', short: 'GH-1' },
  { id: 'GH-2', name: 'GH-2 (Girls Hostel 2)', short: 'GH-2' },
  { id: 'GH-3', name: 'GH-3 (Girls Hostel 3)', short: 'GH-3' },
];

export const SuperAdminFeedback = () => {
  const [selectedHostel, setSelectedHostel] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-amber-500" />
            <span>Campus-Wide Student Feedback & Audit</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
            Audit student feedback sorted by individual hostel or mixed across all 10 campus dining halls
          </p>
        </div>

        {/* Dropdown Selector */}
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-slate-400" />
          <select
            value={selectedHostel}
            onChange={(e) => setSelectedHostel(e.target.value)}
            aria-label="Filter Feedback by Hostel"
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 shadow-sm"
          >
            {HOSTELS.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Hostel Filter Pills */}
      <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <Layers className="w-3.5 h-3.5 text-indigo-500" />
          <span>Quick Hostel Filter:</span>
          <span className="text-[11px] text-slate-400 font-normal">
            ({selectedHostel === 'all' ? 'Showing Mixed Feedback from All Hostels' : `Sorted by ${selectedHostel}`})
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {HOSTELS.map((h) => {
            const isActive = selectedHostel === h.id;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setSelectedHostel(h.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25 scale-[1.02]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{h.short}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Two-Section Positive & Negative Review Explorer */}
      <FeedbackReviewExplorer
        key={selectedHostel}
        initialHostel={selectedHostel}
        role="super_admin"
      />
    </div>
  );
};

