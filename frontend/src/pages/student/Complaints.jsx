import React, { useState, useEffect } from 'react';
import { ComplaintForm } from '../../components/student/complaints/ComplaintForm';
import { ComplaintCard } from '../../components/student/complaints/ComplaintCard';
import { complaintService } from '../../services/complaintService';
import { ChefHat, Heart, Sparkles, RefreshCw, Award, Flame, ThumbsUp } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Complaints = () => {
  const { user } = useAuth();
  const [compliments, setCompliments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompliments = async () => {
    try {
      const data = await complaintService.getCompliments(user?.hostel_id);
      setCompliments(data || []);
    } catch (err) {
      console.warn('Failed to load compliments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompliments();

    const handleUpdate = () => fetchCompliments();
    window.addEventListener('iterp_compliment_updated', handleUpdate);
    window.addEventListener('iterp_complaint_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('iterp_compliment_updated', handleUpdate);
      window.removeEventListener('iterp_complaint_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const totalLikes = compliments.reduce((acc, c) => acc + (c.likes_count || 0), 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/20">
              <ChefHat className="w-6 h-6" />
            </div>
            <span>Chef Compliments & Dining Kudos</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
            Impressed with today's food, special cooking, or courteous mess helpers? Send your appreciation directly to the cooks!
          </p>
        </div>

        <button
          type="button"
          onClick={fetchCompliments}
          className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync Feed</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl glass-card border border-rose-500/20 bg-rose-500/5 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase font-bold text-rose-600 dark:text-rose-400">Total Compliments</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{compliments.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-amber-500/20 bg-amber-500/5 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase font-bold text-amber-600 dark:text-amber-400">Community Hearts</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{totalLikes} Likes</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Cook Satisfaction</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">99.2% Happy</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <ComplaintForm onComplaintLogged={fetchCompliments} />
        
        <div className="p-5 sm:p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <ChefHat className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Recent Chef & Food Praises ({compliments.length})
              </h3>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              <span>Live Wall</span>
            </span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {compliments.length > 0 ? (
              compliments.map((c) => (
                <ComplaintCard key={c.id} complaint={c} />
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 space-y-2">
                <Heart className="w-8 h-8 text-rose-300 mx-auto stroke-1" />
                <p className="font-medium">Be the first to praise the cook or a delicious dish today!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
