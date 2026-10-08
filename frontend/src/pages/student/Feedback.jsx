import React, { useState } from 'react';
import { FeedbackForm } from '../../components/student/feedback/FeedbackForm';
import { FeedbackReviewExplorer } from '../../components/common/FeedbackReviewExplorer';
import { MessageSquare, Plus, Eye } from 'lucide-react';

export const Feedback = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Student Meal Reviews & Feedback</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
            Transparent dining reviews from all boarders categorized into Positive & Negative feedback sections
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
            showForm
              ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20'
          }`}
        >
          {showForm ? <Eye className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{showForm ? 'Hide Review Form' : 'Write a Review'}</span>
        </button>
      </div>

      {/* Conditionally Expanded Review Submission Form */}
      {showForm && (
        <div className="animate-fade-in max-w-2xl mx-auto">
          <FeedbackForm onFeedbackSubmitted={() => setShowForm(false)} />
        </div>
      )}

      {/* Full Two-Section Positive & Negative Review Explorer */}
      <FeedbackReviewExplorer role="student" />
    </div>
  );
};
