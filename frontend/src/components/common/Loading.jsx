import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading = ({ text = "Loading data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3 min-h-[200px]">
      <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      <p className="text-xs text-slate-400 font-medium">{text}</p>
    </div>
  );
};
