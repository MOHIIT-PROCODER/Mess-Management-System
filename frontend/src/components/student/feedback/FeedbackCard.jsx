import React from 'react';
import { StarRating } from './StarRating';
import { MessageSquare, ThumbsUp } from 'lucide-react';

export const FeedbackCard = ({ feedback }) => {
  const { rating = 5, comment, meal = 'lunch', created_at, sentiment = 'positive' } = feedback;

  return (
    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="capitalize font-bold text-indigo-700 dark:text-white bg-indigo-50 dark:bg-indigo-500/20 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-500/30 text-[10px]">
            {meal}
          </span>
          <StarRating rating={rating} readonly />
        </div>
        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{new Date(created_at).toLocaleDateString()}</span>
      </div>

      {comment && <p className="text-slate-700 dark:text-slate-300 italic font-medium">"{comment}"</p>}

      <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 dark:text-slate-400">
        <span className="capitalize text-emerald-600 dark:text-emerald-400 font-bold">{sentiment} Sentiment</span>
        <button className="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
          <ThumbsUp className="w-3 h-3" />
          <span>Helpful</span>
        </button>
      </div>
    </div>
  );
};
