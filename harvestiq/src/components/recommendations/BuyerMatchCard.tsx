import React, { useState } from 'react';
import { Users, Store, Check, ArrowRight, MapPin, PackageCheck } from 'lucide-react';
import { Recommendation } from '../../services/mockData';
import { Badge } from '../common/Badge';

export const BuyerMatchCard: React.FC<{ recommendation: Recommendation }> = ({ recommendation }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
              Direct B2B Buyer Match
            </span>
            <h4 className="text-base font-bold text-slate-900">{recommendation.title}</h4>
          </div>
        </div>
        <Badge variant="info" size="sm">
          {recommendation.badgeText}
        </Badge>
      </div>

      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
        {recommendation.description}
      </p>

      {/* Buyer info highlight */}
      <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-500" />
          <span className="font-semibold text-slate-800">{recommendation.buyerName}</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-indigo-700 bg-indigo-100/60 px-2 py-1 rounded-md">
          <PackageCheck className="w-3.5 h-3.5" /> {recommendation.buyerDemandKg}kg Demand
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-800">
          {recommendation.impact}
        </span>

        <button
          onClick={() => setAccepted(true)}
          disabled={accepted}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            accepted
              ? 'bg-indigo-600 text-white cursor-default'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 cursor-pointer'
          }`}
        >
          {accepted ? (
            <>
              <Check className="w-4 h-4" /> Match Connected!
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
