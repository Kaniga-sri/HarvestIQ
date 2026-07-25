import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, Package, DollarSign, TrendingUp, BarChart2, PieChart as PieChartIcon, Leaf, Sparkles } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AdminService } from '../services/api';
import { Badge } from '../components/common/Badge';

const PIE_COLORS = ['#2E7D32', '#10B981', '#0D9488', '#0284C7', '#6366F1'];

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    AdminService.getStats().then(setStats);
  }, []);

  if (!stats) return null;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 text-xs font-bold border border-indigo-700">
              <ShieldCheck className="w-3.5 h-3.5" /> Platform Intelligence Admin
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-2">Executive Overview & Impact</h1>
            <p className="text-xs text-slate-300">
              Monitoring platform revenue, regional farmer onboarding, and UN SDG food waste metrics.
            </p>
          </div>
        </div>

        {/* Executive Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Gross Revenue</span>
              <div className="p-2 bg-emerald-50 text-[#2E7D32] rounded-xl">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">${stats.totalRevenue.toLocaleString()}</div>
            <span className="text-xs text-emerald-700 font-bold">+24.5% MoM Growth</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Active Farmers</span>
              <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.activeFarmers} Farms</div>
            <span className="text-xs text-indigo-700 font-bold">Sonoma & Napa Counties</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Active Consumers</span>
              <div className="p-2 bg-sky-50 text-sky-700 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.activeConsumers.toLocaleString()}</div>
            <span className="text-xs text-sky-700 font-bold">Community Buyers</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Food Waste Saved</span>
              <div className="p-2 bg-teal-50 text-teal-700 rounded-xl">
                <Leaf className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.wasteSavedTons} Tons</div>
            <span className="text-xs text-teal-700 font-bold">SDG 12 Goal Benchmark</span>
          </div>
        </div>

        {/* RECHARTS VISUALIZATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Revenue & Harvest Sales Trend Area Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-[#2E7D32]" /> Harvest Revenue Growth ($)
                </h3>
                <p className="text-xs text-slate-500">Monthly gross volume processed via HarvestIQ</p>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.monthlySalesData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#2E7D32" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Produce Category Distribution Pie Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-[#2E7D32]" /> Harvest Distribution
              </h3>
              <p className="text-xs text-slate-500">Produce share by category</p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {stats.categoryDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* User Directory Table Overview */}
        <div id="users" className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Platform User Oversight</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase font-bold text-slate-500">
                  <th className="py-2.5 px-3">User</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Location</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900">John Miller (Green Valley Organics)</td>
                  <td className="py-3 px-3 font-semibold text-[#2E7D32]">Farmer</td>
                  <td className="py-3 px-3 text-slate-500">Sonoma County, CA</td>
                  <td className="py-3 px-3"><Badge variant="success" size="sm">Verified Organic</Badge></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900">Sarah Jenkins</td>
                  <td className="py-3 px-3 font-semibold text-sky-700">Consumer</td>
                  <td className="py-3 px-3 text-slate-500">Santa Rosa, CA</td>
                  <td className="py-3 px-3"><Badge variant="info" size="sm">Active Buyer</Badge></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900">Bistro 21 Farm-to-Table</td>
                  <td className="py-3 px-3 font-semibold text-indigo-700">B2B Restaurant</td>
                  <td className="py-3 px-3 text-slate-500">Napa Valley, CA</td>
                  <td className="py-3 px-3"><Badge variant="ai" size="sm">B2B Verified</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
