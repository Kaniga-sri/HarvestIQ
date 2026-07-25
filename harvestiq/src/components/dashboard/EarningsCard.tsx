import React from 'react';
import { DollarSign, TrendingUp, ShoppingBag, Sprout, Sparkles } from 'lucide-react';

export const EarningsCard: React.FC<{ totalSales?: number }> = ({ totalSales = 34800 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Earnings */}
      <div className="bg-gradient-to-br from-[#2E7D32] to-emerald-800 text-white p-5 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
            Total Revenue
          </span>
          <div className="p-2 bg-emerald-700/50 rounded-xl text-emerald-200">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl font-black text-white mb-1">
          ${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-xs text-emerald-200 flex items-center gap-1 font-semibold">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-300 inline" /> +18.4% from last harvest season
        </p>
      </div>

      {/* Active Harvest Volume */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Active Inventory
          </span>
          <div className="p-2 bg-emerald-50 rounded-xl text-[#2E7D32]">
            <Sprout className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl font-black text-slate-900 mb-1">1,020 kg</div>
        <p className="text-xs text-slate-500 font-medium">8 active product listings</p>
      </div>

      {/* Orders Fulfilled */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Monthly Orders
          </span>
          <div className="p-2 bg-sky-50 rounded-xl text-sky-600">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl font-black text-slate-900 mb-1">142</div>
        <p className="text-xs text-slate-500 font-medium">98.5% on-time delivery</p>
      </div>

      {/* AI Price Accuracy */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            AI Price Gain
          </span>
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl font-black text-slate-900 mb-1">+$420.50</div>
        <p className="text-xs text-indigo-600 font-semibold">Smart Pricing lift (+14.2%)</p>
      </div>
    </div>
  );
};
