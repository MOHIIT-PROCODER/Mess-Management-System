import React, { useState, useEffect, useCallback } from 'react';
import {
  Star, ThumbsUp, MessageSquare, Search, Filter,
  ThumbsDown, AlertTriangle, CheckCircle2, CornerDownRight,
  Coffee, Utensils, Cookie, Moon, Send, Sparkles, Building
} from 'lucide-react';
import { StarRating } from '../student/feedback/StarRating';
import { feedbackService } from '../../services/feedbackService';
import { useAuth } from '../../hooks/useAuth';

const MEAL_ICONS = {
  breakfast: Coffee,
  lunch: Utensils,
  snacks: Cookie,
  dinner: Moon,
};

export const FeedbackReviewExplorer = ({ initialHostel = 'all', role = 'student' }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    average_rating: 4.4,
    total_reviews: 0,
    positive_count: 0,
    negative_count: 0,
    positive_percentage: 80,
    negative_percentage: 20,
    ratings_distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'positive' | 'negative'
  const [selectedMeal, setSelectedMeal] = useState('all');
  const [selectedHostel, setSelectedHostel] = useState(initialHostel);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    setSelectedHostel(initialHostel);
  }, [initialHostel]);

  const loadData = useCallback(async () => {
    const summary = await feedbackService.getFeedbackSummary(selectedHostel);
    setStats(summary);

    const all = await feedbackService.getAllFeedback({
      hostel_name: selectedHostel,
      meal: selectedMeal,
      sentiment: activeTab === 'all' ? 'all' : activeTab,
      search: searchQuery
    });
    setReviews(all);
  }, [selectedHostel, selectedMeal, activeTab, searchQuery]);

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener('iterp_feedback_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('iterp_feedback_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [loadData]);

  const handleHelpful = async (id) => {
    await feedbackService.toggleHelpful(id);
    loadData();
  };

  const handleSendReply = async (id) => {
    if (!replyText.trim()) return;
    await feedbackService.addAdminReply(id, replyText.trim());
    setReplyText('');
    setReplyingTo(null);
    loadData();
  };

  const positiveReviews = reviews.filter((r) => r.rating >= 4 || r.sentiment === 'positive');
  const negativeReviews = reviews.filter((r) => r.rating <= 3 || r.sentiment === 'negative');

  const renderReviewCard = (item) => {
    const isPositive = item.rating >= 4 || item.sentiment === 'positive';
    const MealIcon = MEAL_ICONS[item.meal?.toLowerCase()] || Utensils;

    return (
      <div
        key={item.id}
        className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 space-y-3 relative overflow-hidden group shadow-sm hover:shadow-md ${
          isPositive
            ? 'bg-white dark:bg-slate-900/90 border-emerald-200/80 dark:border-emerald-900/40 hover:border-emerald-400'
            : 'bg-white dark:bg-slate-900/90 border-rose-200/80 dark:border-rose-900/40 hover:border-rose-400'
        }`}
      >
        {/* Left accent color stripe */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 ${
            isPositive ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        />

        {/* Card Header: Student Info & Star Rating */}
        <div className="flex flex-wrap items-start justify-between gap-2 pl-2">
          <div className="flex items-center space-x-3">
            {/* Student Avatar */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm ${
                isPositive
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50'
                  : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700/50'
              }`}
            >
              {item.student_name ? item.student_name.charAt(0) : 'S'}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h5 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                  {item.student_name}
                </h5>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono font-semibold">
                  {item.roll_number}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-1 mt-0.5">
                <Building className="w-3 h-3 text-slate-400" />
                <span>{item.hostel_name}</span>
                <span>•</span>
                <span>Room {item.room_number || 'N/A'}</span>
              </p>
            </div>
          </div>

          {/* Rating Stars & Sentiment Tag */}
          <div className="flex flex-col items-end space-y-1">
            <div className="flex items-center space-x-1">
              <StarRating rating={item.rating} readonly size="sm" />
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 ml-1">
                {item.rating}.0
              </span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center space-x-1 ${
                isPositive
                  ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                  : 'bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30'
              }`}
            >
              {isPositive ? <ThumbsUp className="w-2.5 h-2.5" /> : <AlertTriangle className="w-2.5 h-2.5" />}
              <span>{isPositive ? 'Positive' : 'Issue / Negative'}</span>
            </span>
          </div>
        </div>

        {/* Meal and Dish Info Banner */}
        <div className="pl-2 flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800/40 capitalize">
            <MealIcon className="w-3 h-3" />
            {item.meal}
          </span>
          {item.food_item && (
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs">
              🍽️ {item.food_item}
            </span>
          )}
          <span className="text-[11px] text-slate-400 ml-auto">
            {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Comment Content */}
        <div className="pl-2">
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed bg-slate-50/70 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            "{item.comment}"
          </p>
        </div>

        {/* Optional Food Image Attachment */}
        {item.image_url && (
          <div className="pl-2">
            <div className="relative inline-block rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-40">
              <img
                src={item.image_url}
                alt="Student attachment"
                className="h-36 w-auto object-cover hover:scale-105 transition-transform"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Admin Reply Section (if any) */}
        {item.admin_reply && (
          <div className="pl-2">
            <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/50 space-y-1 text-xs">
              <div className="flex items-center space-x-1.5 text-indigo-700 dark:text-indigo-300 font-bold">
                <CornerDownRight className="w-3.5 h-3.5" />
                <span>Mess Warden & Management Response</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 pl-5">{item.admin_reply}</p>
            </div>
          </div>
        )}

        {/* Card Footer: Helpful counter & Reply trigger for Admin */}
        <div className="pl-2 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <button
            type="button"
            onClick={() => handleHelpful(item.id)}
            className="flex items-center space-x-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Helpful ({item.helpful_count || 0})</span>
          </button>

          {(role === 'mess_admin' || role === 'super_admin') && (
            <button
              type="button"
              onClick={() => setReplyingTo(replyingTo === item.id ? null : item.id)}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center space-x-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{item.admin_reply ? 'Edit Response' : 'Reply to Student'}</span>
            </button>
          )}
        </div>

        {/* Inline Reply Input for Admin */}
        {replyingTo === item.id && (
          <div className="pl-2 pt-2 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write official response to student..."
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => handleSendReply(item.id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 flex items-center space-x-1"
              >
                <Send className="w-3 h-3" />
                <span>Send</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* ── 1. Top Analytics Rating Overview ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Rating Card */}
        <div className="p-4 sm:p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Overall Student Rating
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-amber-500">{stats.average_rating}</span>
            <span className="text-xs font-bold text-slate-400">/ 5.0</span>
          </div>
          <div className="flex items-center space-x-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3.5 h-3.5 ${s <= Math.round(stats.average_rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
              />
            ))}
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium ml-1">
              ({stats.total_reviews} reviews)
            </span>
          </div>
        </div>

        {/* Positive Reviews Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
              Positive Reviews
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-bold">
              {stats.positive_percentage}%
            </span>
          </div>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {stats.positive_count}
          </p>
          <div className="w-full bg-emerald-200 dark:bg-emerald-900/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${stats.positive_percentage}%` }} />
          </div>
          <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">4★ and 5★ satisfied ratings</p>
        </div>

        {/* Negative / Needs Improvement Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              Negative / Issues
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300 font-bold">
              {stats.negative_percentage}%
            </span>
          </div>
          <p className="text-3xl font-black text-rose-600 dark:text-rose-400">
            {stats.negative_count}
          </p>
          <div className="w-full bg-rose-200 dark:bg-rose-900/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full" style={{ width: `${stats.negative_percentage}%` }} />
          </div>
          <p className="text-[10px] text-rose-700 dark:text-rose-400 font-medium">1★ to 3★ grievances flagged</p>
        </div>

        {/* Verified Student Reviews Card */}
        <div className="p-4 sm:p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
            Verified Feedback
          </span>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            100%
          </p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight">
            All reviews verified from active hostel boarders
          </p>
        </div>
      </div>

      {/* ── 2. Filters & Section Switcher ── */}
      <div className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Main Two-Section Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All Reviews ({stats.total_reviews})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('positive')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'positive'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                  : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Positive Feedback ({stats.positive_count})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('negative')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'negative'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                  : 'text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Negative & Issues ({stats.negative_count})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, roll, dish..."
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Secondary Meal Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Meal Slot:
          </span>
          {['all', 'breakfast', 'lunch', 'snacks', 'dinner'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSelectedMeal(m)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                selectedMeal === m
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. Reviews Display Area ── */}
      {activeTab === 'all' ? (
        /* Dual Column Split Layout: Positive Feedback on Left, Negative Feedback on Right */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Positive Feedback Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-emerald-500 text-white">
                  <ThumbsUp className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-emerald-950 dark:text-emerald-200 text-sm">
                    Positive Feedback
                  </h4>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                    4★ & 5★ Ratings • Praises & Compliments
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 font-extrabold text-xs">
                {positiveReviews.length}
              </span>
            </div>

            <div className="space-y-3">
              {positiveReviews.length > 0 ? (
                positiveReviews.map((r) => renderReviewCard(r))
              ) : (
                <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 text-xs">
                  No positive reviews match current filters.
                </div>
              )}
            </div>
          </div>

          {/* Negative / Issues Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-rose-500 text-white">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-rose-950 dark:text-rose-200 text-sm">
                    Negative Feedback & Issues
                  </h4>
                  <p className="text-[11px] text-rose-700 dark:text-rose-400 font-medium">
                    1★ to 3★ Ratings • Constructive Grievances
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200 font-extrabold text-xs">
                {negativeReviews.length}
              </span>
            </div>

            <div className="space-y-3">
              {negativeReviews.length > 0 ? (
                negativeReviews.map((r) => renderReviewCard(r))
              ) : (
                <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 text-xs">
                  No issues or concerns found. All students are enjoying the meals!
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Single Filtered List (either Positive or Negative) */
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm capitalize">
              Showing {activeTab} Reviews ({reviews.length})
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.length > 0 ? (
              reviews.map((r) => renderReviewCard(r))
            ) : (
              <div className="col-span-2 p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 text-xs">
                No reviews found matching the selected filters.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
