import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  TrendingUp,
  ShoppingBag,
  Sparkles,
  Users,
  Settings,
  ShieldCheck,
  Sprout,
  BarChart2,
  PieChart
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'farmer';

  const farmerLinks = [
    { to: '/farmer-dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/add-product', label: 'Add Harvest Item', icon: PlusCircle },
    { to: '/manage-products', label: 'Manage Inventory', icon: Package },
    { to: '/farmer-dashboard#recommendations', label: 'AI Smart Insights', icon: Sparkles },
    { to: '/order-history', label: 'Received Orders', icon: ShoppingBag },
    { to: '/profile', label: 'Farm Settings', icon: Settings },
  ];

  const adminLinks = [
    { to: '/admin-dashboard', label: 'Executive Metrics', icon: BarChart2 },
    { to: '/admin-dashboard#users', label: 'User Directory', icon: Users },
    { to: '/admin-dashboard#products', label: 'All Listings', icon: Package },
    { to: '/admin-dashboard#impact', label: 'SDG Waste Impact', icon: PieChart },
  ];

  const links = role === 'admin' ? adminLinks : farmerLinks;

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 shrink-0 hidden md:block min-h-[calc(100vh-4.5rem)] p-4">
      
      {/* Profile Card Summary */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-3.5 mb-6">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
            alt={user?.name || 'User'}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#2E7D32]"
          />
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-slate-900 truncate">{user?.name}</h4>
            <p className="text-xs text-[#2E7D32] font-semibold flex items-center gap-1">
              {role === 'farmer' ? (
                <>
                  <Sprout className="w-3 h-3" />
                  {user?.farmDetails?.farmName || 'Sonoma Farm'}
                </>
              ) : role === 'admin' ? (
                <>
                  <ShieldCheck className="w-3 h-3 text-indigo-600" />
                  System Administrator
                </>
              ) : (
                'Consumer Member'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation list */}
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          {role === 'admin' ? 'Admin Controls' : 'Farmer Dashboard'}
        </p>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to + link.label}
              to={link.to}
              end={link.to === '/farmer-dashboard' || link.to === '/admin-dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#2E7D32] text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Smart Assistant Badge Widget */}
      {role === 'farmer' && (
        <div className="mt-8 bg-slate-900 text-white rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#2E7D32]/30 rounded-full blur-xl" />
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
            <Sparkles className="w-4 h-4" /> HarvestIQ Engine
          </div>
          <p className="text-xs text-slate-300 mb-3 leading-snug">
            3 smart pricing & buyer match recommendations available.
          </p>
          <NavLink
            to="/farmer-dashboard"
            className="inline-block text-xs font-bold text-white bg-[#2E7D32] hover:bg-emerald-600 px-3 py-1.5 rounded-lg transition-colors"
          >
            Review AI Cards
          </NavLink>
        </div>
      )}
    </aside>
  );
};
