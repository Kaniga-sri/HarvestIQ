import React from 'react';
import { ShoppingBag, Truck, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { Order } from '../../services/mockData';
import { Badge } from '../common/Badge';

export const OrdersCard: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2E7D32]" /> Recent Orders
          </h3>
          <p className="text-xs text-slate-500">Live order fulfillment & local delivery dispatch</p>
        </div>
      </div>

      <div className="space-y-3">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm">{ord.orderNumber}</span>
                <span className="text-[11px] text-slate-500">• {ord.date}</span>
                <Badge
                  variant={
                    ord.status === 'Delivered'
                      ? 'success'
                      : ord.status === 'In Transit'
                      ? 'info'
                      : 'warning'
                  }
                  size="sm"
                >
                  {ord.status === 'In Transit' && <Truck className="w-3 h-3 inline mr-1" />}
                  {ord.status === 'Delivered' && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                  {ord.status === 'Harvesting' && <Clock className="w-3 h-3 inline mr-1" />}
                  {ord.status}
                </Badge>
              </div>

              <p className="text-slate-700 font-medium">
                Customer: <strong className="text-slate-900">{ord.consumerName}</strong> ({ord.deliveryType})
              </p>
              <p className="text-slate-500 text-[11px] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" /> {ord.shippingAddress}
              </p>
            </div>

            <div className="text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/60">
              <span className="text-base font-black text-slate-900 block">
                ${ord.totalAmount.toFixed(2)}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                Saved {ord.wastePreventedKg}kg food waste
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
