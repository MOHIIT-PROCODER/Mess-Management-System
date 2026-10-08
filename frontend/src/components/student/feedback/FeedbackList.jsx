import React from 'react';
import { FeedbackCard } from './FeedbackCard';

export const FeedbackList = ({ reviews = [] }) => {
  const sampleReviews = [
    { id: '1', rating: 5, comment: 'Paneer Butter Masala was rich and perfectly spiced!', meal: 'lunch', created_at: new Date().toISOString(), sentiment: 'positive' },
    { id: '2', rating: 4, comment: 'Rotis were hot and soft. Good service.', meal: 'dinner', created_at: new Date().toISOString(), sentiment: 'positive' },
    { id: '3', rating: 2, comment: 'Tea served during evening snacks was lukewarm.', meal: 'snacks', created_at: new Date().toISOString(), sentiment: 'negative' }
  ];

  const displayList = reviews.length > 0 ? reviews : sampleReviews;

  return (
    <div className="space-y-3">
      <h4 className="font-bold text-slate-900 dark:text-white text-sm">Recent Student Reviews</h4>
      <div className="space-y-3">
        {displayList.map((item, idx) => (
          <FeedbackCard key={item.id || idx} feedback={item} />
        ))}
      </div>
    </div>
  );
};
