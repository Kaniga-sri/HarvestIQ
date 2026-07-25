import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sprout,
  TrendingUp,
  Store,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Users,
  Leaf,
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle2,
  DollarSign,
  HeartHandshake,
  Globe
} from 'lucide-react';
import { FAQ_ITEMS, TESTIMONIALS } from '../services/mockData';
import { Button } from '../components/common/Buttons';
import { Badge } from '../components/common/Badge';
import { MainLayout } from '../layouts/MainLayout';
import { useAuth } from '../hooks/useAuth';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { quickLogin } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <MainLayout>
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#F8FAF8] pt-12 pb-20 lg:pt-20 lg:pb-28">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Tagline Pill / Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-[#2E7D32] text-xs sm:text-sm font-bold rounded-md uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#2E7D32]" />
                <span>Smarter Harvests. Better Decisions.</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
                AI-powered agricultural decision intelligence for{' '}
                <span className="text-[#2E7D32]">Direct Farm Sales.</span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-lg">
                HarvestIQ helps farmers sell directly to consumers while providing intelligent recommendations for pricing, buyer matching, and reducing food waste.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/marketplace')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#2E7D32] hover:bg-green-800 text-white rounded-xl text-lg font-bold shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Store className="w-5 h-5" />
                  Browse Marketplace
                </button>

                <button
                  onClick={() => {
                    quickLogin('farmer');
                    navigate('/farmer-dashboard');
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-lg font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sprout className="w-5 h-5 text-[#2E7D32]" />
                  Farmer Dashboard
                </button>
              </div>

              {/* Stat Counters */}
              <div className="flex items-center gap-8 pt-6 border-t border-slate-200">
                <div>
                  <span className="text-2xl font-extrabold text-slate-900 block">$148k+</span>
                  <span className="text-sm font-medium text-slate-500">Farmer Revenue</span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-[#2E7D32] block">64 Tons</span>
                  <span className="text-sm font-medium text-slate-500">Food Waste Saved</span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-slate-900 block">340+</span>
                  <span className="text-sm font-medium text-slate-500">Family Farms</span>
                </div>
              </div>

            </div>

            {/* Hero Right Column - Interactive Dashboard Card Preview */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 text-[#2E7D32] flex items-center justify-center font-bold">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Sonoma Organic Farm</h3>
                      <p className="text-xs text-slate-500">Live AI Decision Feed</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-[#2E7D32] text-xs font-bold rounded-full">
                    Active
                  </span>
                </div>

                {/* AI Recommendation Highlight Box */}
                <div className="p-5 bg-green-50 border border-green-200 rounded-2xl flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#2E7D32] text-white rounded-full flex items-center justify-center font-bold">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-900 text-sm">Smart Pricing Recommendation</span>
                    </div>
                    <span className="text-xs text-[#2E7D32] font-extrabold bg-white px-2.5 py-1 rounded-full border border-green-200">
                      +18% Profit
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Regional heirloom tomato demand surged +22%. Suggested price adjustment from $4.50 to $5.20/lb based on weekend farmers market scarcity.
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-500 font-medium">Confidence: 96%</span>
                    <button
                      onClick={() => {
                        quickLogin('farmer');
                        navigate('/farmer-dashboard');
                      }}
                      className="px-4 py-1.5 bg-[#2E7D32] hover:bg-green-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Apply Dynamic Price
                    </button>
                  </div>
                </div>

                {/* Recent Activity Rows */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Live Farm Sales
                  </div>
                  
                  <div className="flex items-center justify-between p-3.5 bg-slate-50/80 border border-slate-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#2E7D32] flex items-center justify-center font-bold text-xs">
                        🌱
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">12x Organic Heirloom Tomatoes</p>
                        <p className="text-[10px] text-slate-500">Ordered by Bistro Grill (Local Buyer)</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#2E7D32]">$62.40</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50/80 border border-slate-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                        🥬
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">8x Fresh Butter lettuce</p>
                        <p className="text-[10px] text-slate-500">Pickup by Consumer Sarah</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#2E7D32]">$28.00</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ABOUT HARVESTIQ SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-5">
              <Badge variant="organic" size="md">
                About HarvestIQ
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Empowering Farmers with AI. Bringing Freshness to Families.
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Traditional agricultural supply chains lose up to 40% of fresh harvests to middleman markups and delayed logistics. HarvestIQ redesigns the local food economy using decision intelligence.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 text-[#2E7D32] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Direct-to-Consumer Selling</h4>
                    <p className="text-xs text-slate-500">Farmers set fair prices and sell directly without middleman cuts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 text-[#2E7D32] shrink-0 mt-0.5">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Smart Dynamic Price Guidance</h4>
                    <p className="text-xs text-slate-500">AI monitors weather forecasts, market rates, and local demand to suggest peak pricing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 text-[#2E7D32] shrink-0 mt-0.5">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Zero Food Waste Guarantee</h4>
                    <p className="text-xs text-slate-500">Surplus harvests are automatically redirected into local food co-ops & flash deals.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustrative Card Stack */}
            <div className="relative">
              <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80"
                  alt="Sunny Organic Farm"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating AI Recommendation Overlay */}
              <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl max-w-xs border border-slate-800 hidden sm:block">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                  <Sparkles className="w-4 h-4" /> AI Price Suggestion
                </div>
                <p className="text-xs text-slate-300">
                  Tomatoes in Sonoma County are trending +15% higher this weekend.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* FEATURES SECTION */}
      <section className="py-20 bg-slate-50/80 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="ai" size="md">
              Platform Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Built for Modern Agricultural Intelligence
            </h2>
            <p className="text-sm text-slate-600">
              Everything farmers and buyers need for transparent, profitable, and eco-friendly harvests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center font-bold mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Smart Pricing Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Algorithmic price suggestions calculated using real-time regional demand, crop scarcity, and weather impact.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">B2B Buyer Match</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instantly connect with regional farm-to-table restaurants, grocery co-ops, and bulk buyers for guaranteed orders.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Freshness Score Gauge</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every produce item displays a verified Freshness Score based on harvest timestamp and optimal storage life.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Surplus Clearance Deals</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Turn bumper crops into rapid revenue by publishing surplus deals to bargain-hunting local foodies.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Eco-Route Dispatch</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choice between zero-emission Farm Gate Pickup or batched local eco-delivery to minimize carbon miles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center font-bold mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Transparent Farm Profiles</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consumers see farm location, soil certifications, farmer bios, and verified customer reviews.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="neutral" size="md">
              Simple 3-Step Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              How HarvestIQ Operates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 relative">
              <div className="w-10 h-10 rounded-full bg-[#2E7D32] text-white font-black flex items-center justify-center mx-auto mb-4 text-base">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Farmers List Harvest</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add produce details, harvest date, and stock quantity. HarvestIQ AI automatically calculates optimal price.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 relative">
              <div className="w-10 h-10 rounded-full bg-[#2E7D32] text-white font-black flex items-center justify-center mx-auto mb-4 text-base">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">AI Matches Local Buyers</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consumers browse peak-fresh produce while restaurants match bulk orders in real-time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 relative">
              <div className="w-10 h-10 rounded-full bg-[#2E7D32] text-white font-black flex items-center justify-center mx-auto mb-4 text-base">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Direct Delivery & Zero Waste</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Orders are delivered or picked up at the farm. Spillage is eliminated and revenue goes directly to farmers.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* SDG SECTION */}
      <section className="py-16 bg-gradient-to-br from-emerald-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                United Nations Sustainable Development Goals
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Aligned with Global Food Sustainability & Climate Action
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                HarvestIQ directly contributes to UN SDG 2 (Zero Hunger), SDG 12 (Responsible Consumption & Production), and SDG 13 (Climate Action) by shortening supply chains and mitigating landfill food methane emissions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="bg-amber-600 text-white p-4 rounded-2xl font-black text-center w-28 shadow-lg">
                <span className="text-2xl block">SDG 2</span>
                <span className="text-[10px] uppercase font-bold text-amber-100">Zero Hunger</span>
              </div>
              <div className="bg-amber-700 text-white p-4 rounded-2xl font-black text-center w-28 shadow-lg">
                <span className="text-2xl block">SDG 12</span>
                <span className="text-[10px] uppercase font-bold text-amber-100">Responsible Use</span>
              </div>
              <div className="bg-emerald-700 text-white p-4 rounded-2xl font-black text-center w-28 shadow-lg">
                <span className="text-2xl block">SDG 13</span>
                <span className="text-[10px] uppercase font-bold text-emerald-100">Climate Action</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <Badge variant="organic" size="md">
              Community Voices
            </Badge>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Trusted by Farmers, Families & Chefs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(test.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed mb-6">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-500"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{test.name}</h4>
                    <p className="text-[11px] text-[#2E7D32] font-semibold">{test.role}</p>
                    <p className="text-[10px] text-slate-400">{test.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ SECTION */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <Badge variant="neutral" size="md">
              Got Questions?
            </Badge>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <span>{item.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#2E7D32] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </MainLayout>
  );
};
