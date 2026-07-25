import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Heart, Globe, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 text-slate-600 shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white font-bold shadow-xs">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-[#2E7D32] tracking-tight">
                HarvestIQ
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              AI-powered decision intelligence connecting farmers directly with consumers and reducing food waste.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link to="/marketplace" className="hover:text-[#2E7D32] transition-colors">
                  Local Marketplace
                </Link>
              </li>
              <li>
                <Link to="/farmer-dashboard" className="hover:text-[#2E7D32] transition-colors">
                  Farmer Portal
                </Link>
              </li>
              <li>
                <Link to="/consumer-dashboard" className="hover:text-[#2E7D32] transition-colors">
                  Consumer Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* UN SDGs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Impact & Sustainability
            </h4>
            <div className="space-y-1.5 text-xs text-slate-500">
              <p className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" /> Direct-to-Consumer
              </p>
              <p className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Globe className="w-4 h-4 text-[#2E7D32]" /> Zero Crop Waste
              </p>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Newsletter
            </h4>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2E7D32]"
              />
              <button
                type="submit"
                className="bg-[#2E7D32] hover:bg-green-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 transition-colors cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} HarvestIQ. Smarter Harvests. Better Decisions.</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-[#2E7D32] transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-[#2E7D32] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
