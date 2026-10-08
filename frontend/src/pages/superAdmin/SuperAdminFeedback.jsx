import React, { useState } from 'react';
import { FeedbackReviewExplorer } from '../../components/common/FeedbackReviewExplorer';
import { MessageSquare, ShieldAlert, Building2, Download } from 'lucide-react';

export const SuperAdminFeedback = () => {
  const [selectedHostel, setSelectedHostel] = useState('all');

  const hostels = [
    { id: 'all', name: 'All Campus Hostels' },
    { id: 'BH-7', name: 'BH-7 (Boys Hostel 7)' },
    { id: 'Aryabhata Boys Hostel', name: 'Aryabhata Boys Hostel' },
    { id: 'Gargi Girls Hostel', name: 'Gargi Girls Hostel' },
    { id: 'Ramanujan Hall of Residence', name: 'Ramanujan Hall of Residence' },
    { id: 'Sarojini Naidu Girls Hostel', name: 'Sarojini Naidu Girls Hostel' }
  ];

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
            Super Administrator audit of all positive praises and negative issues across all dining halls
          </p>
        </div>

        {/* Hostel Selector Filter */}
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-slate-400" />
          <select
            value={selectedHostel}
            onChange={(e) => setSelectedHostel(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
          >
            {hostels.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
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
