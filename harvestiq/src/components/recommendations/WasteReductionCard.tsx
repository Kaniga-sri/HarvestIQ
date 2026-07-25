import React, { useState } from 'react';
import { Sprout, Shield, Check, ArrowRight, Leaf, HeartHandshake } from 'lucide-react';
import { Recommendation } from '../../services/mockData';
import { Badge } from '../common/Badge';

export const WasteReductionCard: React.FC<{ recommendation: Recommendation }> = ({ recommendation }) => {
  const [created, setCreated] = useState(false);

  return (
    <div className="bg-emerald-50/70 rounded-2xl p-5 shadow-sm border border-emerald-200 hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-emerald-200/60 text-emerald-900 border border-emerald-300">
            <Leaf className="w-5 h-5 text-[#2E7D32]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Zero Waste Optimization
            </span>
            <h4 className="text-base font-bold text-slate-900">{recommendation.title}</h4>
          </div>
        </div>
        <Badge variant="organic" size="sm">
          <HeartHandshake className="w-3 h-3 inline mr-1 text-[#2E7D32]" />
          {recommendation.badgeText}
        </Badge>
      </div>

      <p className="text-xs text-slate-700 mb-4 leading-relaxed">
        {recommendation.description}
      </p>

      <div className="flex items-center justify-between gap-3 pt-2 border-t border-emerald-200/80">
        <span className="text-xs font-bold text-[#2E7D32]">
          {recommendation.impact}
        </span>

        <button
          onClick={() => setCreated(true)}
          disabled={created}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            created
              ? 'bg-[#2E7D32] text-white cursor-default'
              : 'bg-[#2E7D32] hover:bg-[#236327] text-white shadow-xs cursor-pointer'
          }`}
        >
          {created ? (
            <>
              <Check className="w-4 h-4" /> Bundle Published!
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
