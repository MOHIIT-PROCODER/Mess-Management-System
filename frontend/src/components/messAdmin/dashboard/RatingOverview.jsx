import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, AlertTriangle } from 'lucide-react';
import { feedbackService } from '../../../services/feedbackService';

export const RatingOverview = () => {
  const [stats, setStats] = useState({
    average_rating: 4.4,
    total_reviews: 240,
    positive_percentage: 82,
    negative_percentage: 18,
    ratings_distribution: { 5: 140, 4: 70, 3: 20, 2: 7, 1: 3 }
  });

  useEffect(() => {
    const fetchStats = () => feedbackService.getFeedbackSummary().then(setStats);
    fetchStats();

    window.addEventListener('iterp_feedback_updated', fetchStats);
    window.addEventListener('storage', fetchStats);
    return () => {
      window.removeEventListener('iterp_feedback_updated', fetchStats);
      window.removeEventListener('storage', fetchStats);
    };
  }, []);

  return (
    <div className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Student Satisfaction & Rating Breakdown</h3>
        <span className="text-xs text-slate-500 font-semibold">{stats.total_reviews} Reviews Analyzed</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Rating Score */}
        <div className="text-center p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <p className="text-3xl sm:text-4xl font-black text-amber-500 dark:text-amber-400">{stats.average_rating}</p>
          <div className="flex justify-center text-amber-400 my-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${s <= Math.round(stats.average_rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`}
              />
            ))}
          </div>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Average Dining Score</p>
        </div>

        {/* Positive vs Negative split */}
        <div className="space-y-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold">
          <div className="space-y-1">
            <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
              <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> Positive Feedback</span>
              <span className="font-bold">{stats.positive_percentage}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${stats.positive_percentage}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-rose-700 dark:text-rose-400">
              <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Negative & Issues</span>
              <span className="font-bold">{stats.negative_percentage}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: `${stats.negative_percentage}%` }} />
            </div>
          </div>
        </div>

        {/* Stars Breakdown */}
        <div className="space-y-1.5 text-xs font-semibold">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = stats.ratings_distribution?.[stars] || 0;
            const pct = stats.total_reviews ? Math.round((count / stats.total_reviews) * 100) : 0;
            return (
              <div key={stars} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <span className="w-10 text-[11px] font-bold text-slate-500">{stars} Stars</span>
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-6 text-right text-[10px] text-slate-400">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
