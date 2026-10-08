import { useState, useEffect } from 'react';
import { feedbackService } from '../services/feedbackService';

export const useFeedback = (hostelId) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    feedbackService.getFeedbackSummary(hostelId).then(data => {
      setSummary(data);
      setLoading(false);
    });
  }, [hostelId]);

  return { summary, loading };
};
