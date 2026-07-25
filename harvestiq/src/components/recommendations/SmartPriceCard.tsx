import React, { useState } from 'react';
import { TrendingUp, Sparkles, Check, ArrowRight, DollarSign } from 'lucide-react';
import { Recommendation } from '../../services/mockData';
import { Badge } from '../common/Badge';

export const SmartPriceCard: React.FC<{ recommendation: Recommendation }> = ({ recommendation }) => {
  const [applied, setApplied] = useState(false);

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden group border border-emerald-700/50">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl group-hover:scale-125 transition-transform" />

      <div className="flex items-start justify-between gap-2 mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              AI Market Pricing
            </span>
            <h4 className="text-base font-bold text-white">{recommendation.title}</h4>
          </div>
        </div>
        <Badge variant="ai" size="sm" className="bg-emerald-400/20 text-emerald-200 border-emerald-400/30">
          <Sparkles className="w-3 h-3 text-emerald-300 inline mr-1" />
          {recommendation.badgeText}
        </Badge>
      </div>

      <p className="text-xs text-slate-200 mb-4 leading-relaxed relative z-10">
        {recommendation.description}
      </p>

      {/* Price comparison widget */}
      <div className="bg-emerald-950/60 rounded-xl p-3 mb-4 border border-emerald-800/60 grid grid-cols-2 gap-3 relative z-10">
        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Current Rate</span>
          <span className="text-sm font-bold text-slate-300 line-through">
            ${recommendation.currentPrice?.toFixed(2)}/kg
          </span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">AI Recommended</span>
          <span className="text-lg font-black text-emerald-300 flex items-center gap-0.5">
            ${recommendation.suggestedPrice?.toFixed(2)}
            <span className="text-[11px] font-medium text-emerald-400/80">/kg</span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 relative z-10">
        <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
          <DollarSign className="w-3.5 h-3.5" /> {recommendation.impact}
        </span>

        <button
          onClick={() => setApplied(true)}
          disabled={applied}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
            applied
              ? 'bg-emerald-500 text-slate-950 font-black cursor-default'
              : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 hover:shadow-md cursor-pointer'
          }`}
        >
          {applied ? (
            <>
              <Check className="w-4 h-4" /> Price Applied!
            </>
          ) : (
            <>
              {recommendation.actionText} <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
