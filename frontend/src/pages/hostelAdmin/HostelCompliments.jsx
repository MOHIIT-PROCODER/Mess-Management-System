import React from 'react';
import { ChefHat, Heart, Sparkles } from 'lucide-react';
import { ComplaintManagement } from '../messAdmin/ComplaintManagement';
import { useAuth } from '../../hooks/useAuth';

export const HostelCompliments = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <span>{hostelName} Chef & Food Compliments</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Student praises, culinary appreciations, and dish commendations for the {hostelName} mess team.
          </p>
        </div>
      </div>

      {/* Reuse ComplaintManagement (which is the Chef Compliments desk) */}
      <ComplaintManagement />
    </div>
  );
};
export default HostelCompliments;
