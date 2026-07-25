import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, ShoppingBag, Leaf, MapPin, Truck, CheckCircle2, Clock, Heart, Sparkles } from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { OrderService } from '../services/api';
import { Order } from '../services/mockData';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Buttons';
import { useAuth } from '../hooks/useAuth';

export const ConsumerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    OrderService.getOrders().then(setOrders);
  }, []);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-br from-[#2E7D32] to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 text-xs font-bold border border-emerald-700/60">
              <Leaf className="w-3.5 h-3.5" /> Local Food Champion
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Hello, {user?.name.split(' ')[0] || 'Sarah'}!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Track active direct farm shipments and view your zero-waste food impact.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/marketplace')}
            icon={<Store className="w-4 h-4" />}
            className="bg-white text-[#2E7D32] hover:bg-emerald-50 font-extrabold shadow-md shrink-0"
          >
            Explore Marketplace
          </Button>
        </div>

        {/* Eco-Impact Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase">Food Waste Prevented</span>
              <div className="text-2xl font-black text-slate-900">28.5 kg</div>
              <span className="text-[10px] text-emerald-700 font-bold">14 orders completed</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase">Carbon Footprint Saved</span>
              <div className="text-2xl font-black text-slate-900">19.2 kg CO₂e</div>
              <span className="text-[10px] text-teal-700 font-bold">Direct local dispatch</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase">Farms Supported</span>
              <div className="text-2xl font-black text-slate-900">4 Local Farms</div>
              <span className="text-[10px] text-amber-800 font-bold">Sonoma & Napa Counties</span>
            </div>
          </div>
        </div>

        {/* Active Order Tracker */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#2E7D32]" /> Active Direct Shipment Tracking
            </h2>
            <Link to="/order-history" className="text-xs font-bold text-[#2E7D32] hover:underline">
              View Order History
            </Link>
          </div>

          {orders.slice(0, 1).map((ord) => (
            <div key={ord.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-slate-200/60 pb-4">
                <div>
                  <span className="text-base font-black text-slate-900">{ord.orderNumber}</span>
                  <p className="text-slate-500">{ord.date} • {ord.deliveryType}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-slate-900">${ord.totalAmount.toFixed(2)}</span>
                  <Badge variant="info" size="sm" className="block mt-1">
                    Status: {ord.status}
                  </Badge>
                </div>
              </div>

              {/* Timeline Progress */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-[#2E7D32] text-white font-bold flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 block text-[11px]">Harvested</span>
                  <span className="text-[10px] text-slate-400">Sonoma Farm</span>
                </div>

                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-[#2E7D32] text-white font-bold flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 block text-[11px]">Packed</span>
                  <span className="text-[10px] text-slate-400">Pesticide Free</span>
                </div>

                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center mx-auto animate-pulse">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-emerald-700 block text-[11px]">On the Way</span>
                  <span className="text-[10px] text-slate-400">ETA 25 mins</span>
                </div>

                <div className="space-y-1 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 font-bold flex items-center justify-center mx-auto">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-700 block text-[11px]">Delivered</span>
                  <span className="text-[10px] text-slate-400">Santa Rosa</span>
                </div>
              </div>

              {/* Item list inside shipment */}
              <div className="space-y-2 pt-2 border-t border-slate-200/60">
                {ord.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center gap-2">
                      <img src={item.image} alt={item.productName} className="w-8 h-8 rounded-lg object-cover" />
                      <span className="font-bold text-slate-800">{item.productName}</span>
                    </div>
                    <span className="font-semibold text-slate-600">
                      {item.quantity} x ${item.unitPrice.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
};
