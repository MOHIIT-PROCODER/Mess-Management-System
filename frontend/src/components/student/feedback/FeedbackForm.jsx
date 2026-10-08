import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { FeedbackImageUpload } from './FeedbackImageUpload';
import { feedbackService } from '../../../services/feedbackService';
import { useAuth } from '../../../hooks/useAuth';
import { Send, CheckCircle2, Utensils } from 'lucide-react';

export const FeedbackForm = ({ onFeedbackSubmitted }) => {
  const { user } = useAuth();
  const [meal, setMeal] = useState('lunch');
  const [foodItem, setFoodItem] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);

    await feedbackService.submitFeedback({
      student_name: user?.full_name || 'Aarav Patel',
      roll_number: user?.roll_number || '21CS089',
      room_number: user?.room_number || '204-A',
      hostel_name: user?.hostel_name || 'BH-7 (Boys Hostel 7)',
      meal,
      food_item: foodItem.trim() || `${meal.charAt(0).toUpperCase() + meal.slice(1)} Dish`,
      rating,
      comment: comment.trim(),
      image_url: imageUrl || null,
    });

    setSubmitting(false);
    setSubmitted(true);
    setComment('');
    setFoodItem('');
    setImageUrl('');
    if (onFeedbackSubmitted) onFeedbackSubmitted();
  };

  if (submitted) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl glass-card text-center space-y-3 border border-emerald-500/30">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
        <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Thank You for Your Feedback!</h4>
        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium max-w-md mx-auto">
          Your review has been recorded with positive / negative sentiment categorization and is now live across student & mess admin boards.
        </p>
        <button onClick={() => setSubmitted(false)} className="gradient-btn px-5 py-2 rounded-xl text-xs font-bold mt-2 text-white">
          Submit Another Review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
      <div>
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Submit Meal Feedback & Rating</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">Share your genuine experience to help improve food quality</p>
      </div>

      {/* Select Meal Slot */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Meal Slot</label>
        <div className="grid grid-cols-4 gap-2">
          {['breakfast', 'lunch', 'snacks', 'dinner'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMeal(m)}
              className={`py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                meal === m
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Food Item Name */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Specific Dish or Food Item (Optional)</label>
        <div className="relative">
          <Utensils className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            placeholder="e.g. Paneer Butter Masala, Rotis, Dal Tadka..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Rating Stars */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Meal Rating</label>
          <span className={`text-xs font-bold ${rating >= 4 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {rating >= 4 ? '🌟 Positive Feedback' : '⚠️ Issue / Improvement'}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <StarRating rating={rating} onRate={setRating} size="lg" />
          <span className="text-sm font-black text-slate-800 dark:text-white">{rating} of 5 Stars</span>
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Review & Comments</label>
        <textarea
          rows={3}
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Describe the taste, freshness, quantity, temperature, or any suggestions..."
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 font-medium focus:outline-none focus:border-indigo-500 resize-none"
        />
      </div>

      {/* Image Upload */}
      <FeedbackImageUpload onImageUploaded={setImageUrl} />

      <button
        type="submit"
        disabled={submitting}
        className="w-full gradient-btn py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 text-white shadow-lg shadow-indigo-500/20"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{submitting ? 'Submitting Review...' : 'Post Student Review'}</span>
      </button>
    </form>
  );
};
