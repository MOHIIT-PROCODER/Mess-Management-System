import React from 'react';
import { MessageSquare, Star, ShieldCheck } from 'lucide-react';
import { FeedbackReviewExplorer } from '../../components/common/FeedbackReviewExplorer';
import { useAuth } from '../../hooks/useAuth';

export const HostelFeedback = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span>{hostelName} Student Ratings & Meal Feedback</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time meal ratings, dish feedback, and student reviews for {hostelName} dining hall.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Hostel Warden Oversight</span>
          </span>
        </div>
      </div>

      {/* Reusable Feedback Explorer with Warden Reply & Filtering */}
      <FeedbackReviewExplorer initialHostel={hostelName} role="hostel_admin" />
    </div>
  );
};
export default HostelFeedback;
