import React, { useState, useEffect } from 'react';
import { ShoppingBag, Truck, CheckCircle2, Clock, RefreshCw, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { MainLayout } from '../layouts/MainLayout';
import { OrderService } from '../services/api';
import { Order } from '../services/mockData';
import { Badge } from '../components/common/Badge';

export const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    OrderService.getOrders().then(setOrders);
  }, []);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#2E7D32]" /> Order History & Receipts
          </h1>
          <p className="text-xs text-slate-500">
            View all past direct farm produce purchases and download carbon impact statements
          </p>
        </div>

        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{ord.orderNumber}</span>
                    <Badge variant="success" size="sm">{ord.status}</Badge>
                  </div>
                  <span className="text-slate-500 text-[11px]">{ord.date} • {ord.deliveryType}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toast.success(`Downloading receipt PDF for ${ord.orderNumber}...`)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Receipt
                  </button>
                  <span className="text-base font-black text-slate-900">
                    ${ord.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {ord.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.productName} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <span className="font-bold text-slate-900 block">{item.productName}</span>
                        <span className="text-[10px] text-[#2E7D32] font-semibold">{item.farmerName}</span>
                      </div>
                    </div>
                    <span className="font-bold text-slate-800">
                      {item.quantity} x ${item.unitPrice.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50/60 p-2.5 rounded-xl text-xs text-emerald-900 font-bold flex items-center justify-between">
                <span>Zero Waste Achievement: Saved {ord.wastePreventedKg} kg produce</span>
                <span className="text-[#2E7D32]">{ord.co2SavedKg} kg CO₂ Offset</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
};
