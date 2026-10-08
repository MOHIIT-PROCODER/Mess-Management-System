import React from 'react';
import { FeedbackReviewExplorer } from '../../components/common/FeedbackReviewExplorer';
import { MessageSquare, ShieldCheck, Download } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const FeedbackManagement = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span>Student Feedback & Ratings Management</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
            Monitor positive commendations and address negative dining issues for {hostelName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Mess Admin Portal</span>
          </span>
        </div>
      </div>

      {/* Two-Section Positive & Negative Explorer with Admin Reply Enabled */}
      <FeedbackReviewExplorer initialHostel={hostelName} role="mess_admin" />
    </div>
  );
};
