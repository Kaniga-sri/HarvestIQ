import React, { useState, useEffect } from 'react';
import { Sparkles, PlusCircle, Sprout, TrendingUp, RefreshCw } from 'lucide-react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { EarningsCard } from '../components/dashboard/EarningsCard';
import { ProductSummary } from '../components/dashboard/ProductSummary';
import { OrdersCard } from '../components/dashboard/OrdersCard';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { SmartPriceCard } from '../components/recommendations/SmartPriceCard';
import { BuyerMatchCard } from '../components/recommendations/BuyerMatchCard';
import { FreshnessAlertCard } from '../components/recommendations/FreshnessAlertCard';
import { WasteReductionCard } from '../components/recommendations/WasteReductionCard';
import { ProductService, RecommendationService, OrderService } from '../services/api';
import { Product, Recommendation, Order } from '../services/mockData';
import { Button } from '../components/common/Buttons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const FarmerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [p, r, o] = await Promise.all([
      ProductService.getProducts(),
      RecommendationService.getRecommendations(),
      OrderService.getOrders(),
    ]);
    setProducts(p);
    setRecommendations(r);
    setOrders(o);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#2E7D32] to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 text-xs font-bold border border-emerald-700/60">
              <Sprout className="w-3.5 h-3.5" /> {user?.farmDetails?.farmName || 'Green Valley Organics'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Welcome back, {user?.name.split(' ')[0] || 'Farmer'}!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              HarvestIQ AI has identified 4 high-impact market opportunities for your Sonoma farm today.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 z-10">
            <Button
              variant="secondary"
              size="md"
              onClick={loadData}
              icon={<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              Refresh Insights
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/add-product')}
              icon={<PlusCircle className="w-4 h-4" />}
              className="bg-white text-[#2E7D32] hover:bg-emerald-50 font-extrabold shadow-md"
            >
              Add Harvest Item
            </Button>
          </div>
        </div>

        {/* Earnings & Stats Overview */}
        <EarningsCard totalSales={user?.farmDetails?.totalSales || 34800} />

        {/* SMART RECOMMENDATION CARDS SECTION */}
        <div id="recommendations" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#2E7D32]" />
                Smart AI Recommendation Intelligence
              </h2>
              <p className="text-xs text-slate-500">
                Actionable AI decision cards to optimize pricing, match buyers, and prevent crop spillage.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recommendations.map((rec) => {
              if (rec.type === 'price') {
                return <SmartPriceCard key={rec.id} recommendation={rec} />;
              }
              if (rec.type === 'buyer_match') {
                return <BuyerMatchCard key={rec.id} recommendation={rec} />;
              }
              if (rec.type === 'freshness_alert') {
                return <FreshnessAlertCard key={rec.id} recommendation={rec} />;
              }
              if (rec.type === 'waste_reduction') {
                return <WasteReductionCard key={rec.id} recommendation={rec} />;
              }
              return null;
            })}
          </div>
        </div>

        {/* Product Inventory & Recent Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductSummary products={products} />
          <OrdersCard orders={orders} />
        </div>

        {/* Recent Farm Activity */}
        <RecentActivity />

      </div>
    </DashboardLayout>
  );
};
