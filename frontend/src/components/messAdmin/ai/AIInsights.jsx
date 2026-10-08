import React, { useState, useEffect } from 'react';
import { Cpu, Sparkles, TrendingDown, RefreshCw } from 'lucide-react';
import { aiService } from '../../../services/aiService';

export const AIInsights = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAI = async () => {
    setLoading(true);
    const result = await aiService.getAIInsights([]);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchAI();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Groq AI Waste & Diet Analytics</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">LLM-powered recommendations based on student reviews and consumption history.</p>
        </div>
        <button onClick={fetchAI} className="gradient-btn px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 text-white self-start">
          <RefreshCw className={`w-4 h-4 ${loading && 'animate-spin'}`} />
          <span>Re-Run AI Analysis</span>
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 animate-pulse">Running Groq LLM model analysis...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-6 rounded-2xl glass-card space-y-4 border border-indigo-500/20">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>AI Executive Summary</span>
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{data?.summary}</p>

            <div className="pt-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-2">Smart Actionable Recommendations:</h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {data?.recommendations?.map((rec, i) => (
                  <li key={i} className="flex items-start space-x-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 font-medium">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card text-center space-y-4 border border-emerald-500/20 bg-emerald-500/5 flex flex-col justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <TrendingDown className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase">Predicted Waste Reduction</p>
              <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{data?.predictedWasteReduction}</p>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
              Optimizing ingredient procurement based on AI turnout forecasts saves ~45 kg food waste weekly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
