import React, { useState } from 'react';
import { ChefHat, Heart, Sparkles, Send, CheckCircle2, Award, Flame, Utensils, Star, Smile } from 'lucide-react';
import { complaintService } from '../../../services/complaintService';
import { useAuth } from '../../../hooks/useAuth';

const COMPLIMENT_CATEGORIES = [
  { id: 'master_chef', label: 'Master Chef Cooking & Taste', icon: ChefHat, badge: 'Master Chef Kudos 👨‍🍳' },
  { id: 'signature_dish', label: 'Special Dish Appreciation', icon: Star, badge: '5-Star Flavor ⭐' },
  { id: 'fresh_hot', label: 'Hot & Fresh Serving Quality', icon: Flame, badge: 'Hot & Fresh 🔥' },
  { id: 'clean_hygiene', label: 'Cleanliness & Spotless Dining', icon: Sparkles, badge: 'Spotless Clean ✨' },
  { id: 'courteous_staff', label: 'Courteous & Smiling Staff', icon: Heart, badge: 'Wonderful Hospitality 💖' },
  { id: 'general_kudos', label: 'Overall Outstanding Experience', icon: Award, badge: 'Golden Dining Award 🏆' }
];

export const ComplaintForm = ({ onComplaintLogged }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(COMPLIMENT_CATEGORIES[0].id);
  const [impressedWith, setImpressedWith] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const activeCategoryObj = COMPLIMENT_CATEGORIES.find(c => c.id === selectedCategory) || COMPLIMENT_CATEGORIES[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setSubmitting(true);
    await complaintService.createCompliment({
      hostel_id: user?.hostel_id || 'a1b2c3d4-0000-0000-0000-000000000007',
      hostel_name: user?.hostel_name || 'BH-7 (Boys Hostel 7)',
      student_name: user?.full_name || 'Aarav Patel',
      roll_number: user?.roll_number || '21CS089',
      room_number: user?.room_number || '204-A',
      category: selectedCategory,
      category_label: activeCategoryObj.label,
      badge: activeCategoryObj.badge,
      impressed_with: impressedWith.trim() || 'Kitchen Team & Cooks',
      title: title.trim() || `Praise for ${activeCategoryObj.label}`,
      description: description.trim()
    });

    setSubmitting(false);
    setSuccess(true);
    setTitle('');
    setImpressedWith('');
    setDescription('');
    if (onComplaintLogged) onComplaintLogged();
  };

  if (success) {
    return (
      <div className="p-6 rounded-2xl glass-card text-center space-y-4 border border-rose-500/30 bg-gradient-to-b from-rose-500/5 to-amber-500/5 animate-fadeIn">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/20 border border-rose-500/30">
          <Heart className="w-8 h-8 fill-rose-500" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-slate-900 dark:text-white text-lg">Compliment Delivered to the Kitchen! 👨‍🍳💖</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium max-w-sm mx-auto">
            Your appreciation has been broadcast to the head cook and dining team. Thank you for making our staff feel valued!
          </p>
        </div>
        <button
          onClick={() => setSuccess(false)}
          className="gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md shadow-indigo-500/20"
        >
          Send Another Compliment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass-card space-y-4 border border-rose-500/20 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/20">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Send a Compliment to Cook or Food</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Impressed by today's meal, special curry, hot chai, or friendly cook? Share the love!
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">What are you impressed with?</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {COMPLIMENT_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold shadow-sm ring-2 ring-rose-500/20'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-4 h-4 mb-1" />
                  {isSelected && <Sparkles className="w-3 h-3 text-amber-500" />}
                </div>
                <span className="text-[11px] leading-tight line-clamp-2">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Impressed Dish / Cook Name */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Chef / Cook or Specific Dish Name <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          value={impressedWith}
          onChange={(e) => setImpressedWith(e.target.value)}
          placeholder="e.g. Head Chef Ramesh, Paneer Butter Masala, Crispy Dosa, Evening Tea Staff"
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-rose-500"
        />
      </div>

      {/* Compliment Headline */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Compliment Headline</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Delicious lunch today! Gravy was flavorful and rotis were super soft"
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-rose-500"
        />
      </div>

      {/* Message Textarea */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Your Words of Appreciation <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a heartfelt compliment to the cooks and mess team. What made this dish or experience special to you?"
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-rose-500 resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 text-xs text-white bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 shadow-lg shadow-rose-500/25 hover:opacity-95 active:scale-95 transition-all"
      >
        {submitting ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            <span>Delivering Compliment...</span>
          </>
        ) : (
          <>
            <Heart className="w-4 h-4 fill-white" />
            <span>Send Compliment & Kudos to Kitchen</span>
          </>
        )}
      </button>
    </form>
  );
};
