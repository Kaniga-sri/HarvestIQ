import React, { useState } from 'react';
import { AlertCircle, Zap, Check, ArrowRight, Clock } from 'lucide-react';
import { Recommendation } from '../../services/mockData';
import { Badge } from '../common/Badge';

export const FreshnessAlertCard: React.FC<{ recommendation: Recommendation }> = ({ recommendation }) => {
  const [launched, setLaunched] = useState(false);

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50/80 rounded-2xl p-5 shadow-sm border border-amber-200/80 hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-800 border border-amber-300/50">
            <Clock className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Freshness & Ripeness Monitor
            </span>
            <h4 className="text-base font-bold text-slate-900">{recommendation.title}</h4>
          </div>
        </div>
        <Badge variant="warning" size="sm">
          <AlertCircle className="w-3 h-3 inline mr-1 text-amber-700" />
          {recommendation.badgeText}
        </Badge>
      </div>

      <p className="text-xs text-slate-700 mb-4 leading-relaxed">
        {recommendation.description}
      </p>

      <div className="flex items-center justify-between gap-3 pt-2 border-t border-amber-200/60">
        <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-600" /> {recommendation.impact}
        </span>

        <button
          onClick={() => setLaunched(true)}
          disabled={launched}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            launched
              ? 'bg-amber-600 text-white cursor-default'
              : 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs hover:shadow-sm cursor-pointer'
          }`}
        >
          {launched ? (
            <>
              <Check className="w-4 h-4" /> Flash Sale Live!
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
