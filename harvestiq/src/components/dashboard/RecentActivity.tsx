import React from 'react';
import { Activity, Sparkles, DollarSign, Store, CheckCircle } from 'lucide-react';

export const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 'act-1',
      time: '12 mins ago',
      title: 'AI Smart Pricing Applied',
      desc: 'Organic Heirloom Tomatoes price updated to $4.20/kg based on regional market demand query.',
      icon: Sparkles,
      color: 'bg-emerald-100 text-[#2E7D32]',
    },
    {
      id: 'act-2',
      time: '1 hour ago',
      title: 'New Consumer Order Received',
      desc: 'Sarah Jenkins placed order HIQ-9842 (3 items) for Direct Local Delivery.',
      icon: DollarSign,
      color: 'bg-sky-100 text-sky-700',
    },
    {
      id: 'act-3',
      time: '3 hours ago',
      title: 'B2B Match Inquiry',
      desc: 'Bistro 21 Restaurant saved your Sweet Strawberries harvest batch to interest list.',
      icon: Store,
      color: 'bg-indigo-100 text-indigo-700',
    },
    {
      id: 'act-4',
      time: 'Yesterday',
      title: 'Order Delivered Successfully',
      desc: 'Order HIQ-9841 picked up at Farm Gate by David Miller. Zero emission pickup!',
      icon: CheckCircle,
      color: 'bg-emerald-100 text-[#2E7D32]',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#2E7D32]" /> Farm Activity Feed
        </h3>
        <span className="text-xs text-slate-400 font-medium">Real-Time</span>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="relative group">
              <div
                className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs ${act.color}`}
              >
                <Icon className="w-3 h-3" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span className="font-bold text-slate-900">{act.title}</span>
                  <span className="text-[10px] text-slate-400">{act.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-snug">{act.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
