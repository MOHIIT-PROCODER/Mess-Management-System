import React, { useState } from 'react';
import { ChefHat, Heart, Sparkles, Clock, MessageSquare, Award, CheckCircle2, User, Building } from 'lucide-react';
import { complaintService } from '../../../services/complaintService';

export const ComplaintCard = ({ complaint }) => {
  const {
    id,
    title,
    category,
    category_label,
    impressed_with,
    badge,
    description,
    student_name,
    roll_number,
    room_number,
    hostel_name,
    likes_count = 0,
    created_at,
    admin_response
  } = complaint;

  const [likes, setLikes] = useState(likes_count);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) return;
    setHasLiked(true);
    setLikes((prev) => prev + 1);
    complaintService.likeCompliment(id);
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl glass-card space-y-3.5 text-xs border border-slate-200 dark:border-slate-700/60 transition-all duration-200 hover:border-rose-300 dark:hover:border-rose-500/40 relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 text-[10px] font-bold flex items-center space-x-1">
            <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
            <span>{category_label || category?.replace('_', ' ') || 'Chef Compliment'}</span>
          </span>

          {badge && (
            <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 text-[10px] font-bold">
              {badge}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1 text-[11px] text-slate-400 dark:text-slate-500">
          <Clock className="w-3 h-3" />
          <span>{new Date(created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Impressed Target Badge */}
      {impressed_with && (
        <div className="flex items-center space-x-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/30 px-2.5 py-1 rounded-lg border border-indigo-200/60 dark:border-indigo-800/40 w-fit">
          <ChefHat className="w-3.5 h-3.5 text-indigo-500" />
          <span>Praised: <strong className="text-slate-900 dark:text-white">{impressed_with}</strong></span>
        </div>
      )}

      {/* Title & Description */}
      <div className="space-y-1">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-snug">{title}</h4>
        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{description}</p>
      </div>

      {/* Student Resident Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-900 dark:text-slate-200">{student_name || 'Resident Student'}</span>
          {roll_number && <span className="font-mono text-slate-400">({roll_number})</span>}
          {hostel_name && (
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">• {hostel_name}</span>
          )}
        </div>

        {/* Heart / Like Button */}
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
            hasLiked
              ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30 scale-105'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-white' : 'hover:fill-rose-500'}`} />
          <span>{likes}</span>
        </button>
      </div>

      {/* Kitchen Team / Chef Acknowledgment */}
      {admin_response && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-300 text-[11px] space-y-1 animate-fadeIn">
          <div className="flex items-center space-x-1.5 font-bold text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Kitchen & Chef Team Response</span>
          </div>
          <p className="font-medium text-slate-800 dark:text-slate-200 pl-5">{admin_response}</p>
        </div>
      )}
    </div>
  );
};
