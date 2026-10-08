import React, { useState, useEffect } from 'react';
import { complaintService } from '../../services/complaintService';
import { ChefHat, Heart, Sparkles, Send, CheckCircle2, RefreshCw, Award, Clock, Star, MessageSquare } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const ComplaintManagement = () => {
  const { user } = useAuth();
  const [compliments, setCompliments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const fetchCompliments = async () => {
    try {
      const data = await complaintService.getCompliments(user?.hostel_id);
      setCompliments(data || []);
    } catch (err) {
      console.warn('Failed to load compliments:', err);
    }
  };

  useEffect(() => {
    fetchCompliments();

    const handleUpdate = () => fetchCompliments();
    window.addEventListener('iterp_compliment_updated', handleUpdate);
    window.addEventListener('iterp_complaint_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('iterp_compliment_updated', handleUpdate);
      window.removeEventListener('iterp_complaint_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleSendResponse = async (id) => {
    if (!replyText.trim()) return;
    await complaintService.updateStatus(id, 'acknowledged', replyText.trim());
    setReplyText('');
    setReplyingId(null);
    fetchCompliments();
  };

  const filtered = selectedCategory === 'all'
    ? compliments
    : compliments.filter((c) => c.category === selectedCategory);

  const totalHearts = compliments.reduce((acc, c) => acc + (c.likes_count || 0), 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/20">
              <ChefHat className="w-6 h-6" />
            </div>
            <span>Chef Compliments & Kitchen Recognition</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
            Student praises, culinary appreciations, and dish shout-outs for {user?.hostel_name || 'BH-7 (Boys Hostel 7)'} mess crew
          </p>
        </div>

        <button
          type="button"
          onClick={fetchCompliments}
          className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Compliments</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl glass-card border border-rose-500/20 bg-rose-500/5 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase font-bold text-rose-600 dark:text-rose-400">Total Praises</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{compliments.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-amber-500/20 bg-amber-500/5 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase font-bold text-amber-600 dark:text-amber-400">Student Hearts</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{totalHearts} Likes</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Staff Morale Index</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">100% High</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {[
          { id: 'all', label: 'All Compliments' },
          { id: 'master_chef', label: 'Master Chef Flavor' },
          { id: 'signature_dish', label: 'Signature Dishes' },
          { id: 'fresh_hot', label: 'Hot & Fresh' },
          { id: 'clean_hygiene', label: 'Cleanliness' },
          { id: 'courteous_staff', label: 'Staff Hospitality' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors ${
              selectedCategory === tab.id
                ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Compliments List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl glass-card space-y-3.5 border border-slate-200 dark:border-slate-800 transition-all hover:border-rose-300 dark:hover:border-rose-500/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 text-[10px] font-bold flex items-center space-x-1">
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    <span>{item.category_label || item.category?.replace('_', ' ')}</span>
                  </span>

                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(item.created_at).toLocaleString()}</span>
                </div>
              </div>

              {item.impressed_with && (
                <div className="flex items-center space-x-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/30 px-2.5 py-1 rounded-lg border border-indigo-200/60 dark:border-indigo-800/40 w-fit">
                  <ChefHat className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Praised: <strong className="text-slate-900 dark:text-white">{item.impressed_with}</strong></span>
                </div>
              )}

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{item.title}</h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1 leading-relaxed">{item.description}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                <div className="space-x-1">
                  <span className="font-bold text-slate-900 dark:text-white">{item.student_name}</span>
                  {item.roll_number && <span className="font-mono">({item.roll_number})</span>}
                  {item.room_number && <span>• Room {item.room_number}</span>}
                  {item.hostel_name && <span className="text-indigo-600 dark:text-indigo-400">• {item.hostel_name}</span>}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center space-x-1">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{item.likes_count || 0} Likes</span>
                  </span>

                  <button
                    onClick={() => {
                      setReplyingId(replyingId === item.id ? null : item.id);
                      setReplyText(item.admin_response || 'Thank you! The kitchen & chef team appreciate your kind compliment!');
                    }}
                    className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-700 dark:text-slate-300 hover:text-rose-600 text-xs font-bold transition-colors flex items-center space-x-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>{item.admin_response ? 'Edit Thanks' : 'Acknowledge & Thank'}</span>
                  </button>
                </div>
              </div>

              {item.admin_response && replyingId !== item.id && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-300 text-xs space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Kitchen Response Sent</span>
                  </div>
                  <p className="font-medium pl-5">{item.admin_response}</p>
                </div>
              )}

              {replyingId === item.id && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 animate-fadeIn">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Send Kitchen & Chef Team's Gratitude to {item.student_name}:
                  </label>
                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-rose-500 resize-none"
                  />
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => setReplyingId(null)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSendResponse(item.id)}
                      className="gradient-btn px-4 py-1.5 rounded-xl text-xs font-bold text-white flex items-center space-x-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Post Thanks</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-500 glass-card rounded-2xl space-y-2">
            <Heart className="w-8 h-8 text-rose-300 mx-auto stroke-1" />
            <p className="text-xs font-medium">No compliments found under this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
