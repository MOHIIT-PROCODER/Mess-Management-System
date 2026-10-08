import React, { useState, useEffect } from 'react';
import { ChefHat, Heart, Sparkles, ChevronRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { complaintService } from '../../../services/complaintService';

export const RecentComplaints = () => {
  const [compliments, setCompliments] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await complaintService.getCompliments();
      setCompliments(data.slice(0, 3));
    };
    load();
  }, []);

  return (
    <div className="p-6 rounded-2xl glass-card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center space-x-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <span>Recent Chef Compliments</span>
        </h3>
        <Link to="/admin/complaints" className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center">
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-2">
        {compliments.map((c) => (
          <div key={c.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex items-center justify-between text-xs transition-colors hover:border-rose-300 dark:hover:border-rose-500/30">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{c.title}</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                By {c.student_name} • <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{c.impressed_with || c.category_label}</span>
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 flex items-center space-x-1 shrink-0">
              <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
              <span>{c.likes_count || 1} Likes</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
