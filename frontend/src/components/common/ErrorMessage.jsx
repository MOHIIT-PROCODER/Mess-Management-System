import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-center space-x-3 my-3">
      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
      <span>{message}</span>
    </div>
  );
};
