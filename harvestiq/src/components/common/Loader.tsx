import React from 'react';
import { Sprout } from 'lucide-react';

export const Loader: React.FC<{ text?: string }> = ({ text = 'Loading HarvestIQ...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-[#2E7D32]">
        <Sprout className="w-6 h-6 animate-bounce" />
        <span className="absolute inset-0 rounded-full border-2 border-[#2E7D32]/30 border-t-[#2E7D32] animate-spin" />
      </div>
      <p className="text-sm font-medium text-slate-600 animate-pulse">{text}</p>
    </div>
  );
};
