import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, ShoppingCart, User, Menu, X, Sparkles, ChevronDown, LogOut, LayoutDashboard, Store, PlusCircle, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { Button } from './Buttons';

export const Navbar: React.FC = () => {
  const { user, logout, quickLogin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);

  const isCurrentPath = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white shadow-md shadow-green-900/10 group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#2E7D32]">
                HarvestIQ
              </span>
              <span className="bg-green-100 text-[#2E7D32] text-[10px] font-bold px-2 py-0.5 rounded-md border border-green-200">
                AI Powered
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
              Smarter Harvests. Better Decisions.
            </p>
          </div>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link
            to="/marketplace"
            className={`transition-colors hover:text-[#2E7D32] ${
              isCurrentPath('/marketplace')
                ? 'text-[#2E7D32] font-bold'
                : 'text-slate-600'
            }`}
          >
            Marketplace
          </Link>
          <Link
            to="/"
            className="transition-colors hover:text-[#2E7D32] text-slate-600"
          >
            How It Works
          </Link>

          {/* Quick Dashboard link based on role */}
          {user && user.role === 'farmer' && (
            <Link
              to="/farmer-dashboard"
              className={`flex items-center gap-1.5 transition-colors hover:text-[#2E7D32] ${
                isCurrentPath('/farmer-dashboard')
                  ? 'text-[#2E7D32] font-bold'
                  : 'text-slate-600'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#2E7D32]" />
              Farmer Hub
            </Link>
          )}

          {user && user.role === 'consumer' && (
            <Link
              to="/consumer-dashboard"
              className={`flex items-center gap-1.5 transition-colors hover:text-[#2E7D32] ${
                isCurrentPath('/consumer-dashboard')
                  ? 'text-[#2E7D32] font-bold'
                  : 'text-slate-600'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#2E7D32]" />
              Consumer Hub
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link
              to="/admin-dashboard"
              className={`flex items-center gap-1.5 transition-colors hover:text-[#2E7D32] ${
                isCurrentPath('/admin-dashboard')
                  ? 'text-[#2E7D32] font-bold'
                  : 'text-slate-600'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-[#2E7D32]" />
              Admin Portal
            </Link>
          )}
        </nav>

        {/* Right Section Actions */}
        <div className="flex items-center gap-3">
          
          {/* Quick Demo Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-green-50 hover:bg-green-100 text-[#2E7D32] transition-colors border border-green-200 cursor-pointer"
              title="Switch demo persona"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>
                Demo As: <strong className="capitalize text-slate-900">{user?.role || 'Guest'}</strong>
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#2E7D32]" />
            </button>

            {personaDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-2xl border border-slate-100 z-50 text-xs">
                <div className="px-2 py-1.5 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Switch Quick Demo Role
                </div>
                <button
                  onClick={() => {
                    quickLogin('farmer');
                    setPersonaDropdownOpen(false);
                    navigate('/farmer-dashboard');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${
                    user?.role === 'farmer' ? 'bg-green-100 text-[#2E7D32] font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Sprout className="w-4 h-4 text-[#2E7D32]" />
                  Farmer John (Sonoma Farm)
                </button>
                <button
                  onClick={() => {
                    quickLogin('consumer');
                    setPersonaDropdownOpen(false);
                    navigate('/marketplace');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${
                    user?.role === 'consumer' ? 'bg-green-100 text-[#2E7D32] font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Store className="w-4 h-4 text-[#2E7D32]" />
                  Consumer Sarah (Santa Rosa)
                </button>
                <button
                  onClick={() => {
                    quickLogin('admin');
                    setPersonaDropdownOpen(false);
                    navigate('/admin-dashboard');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${
                    user?.role === 'admin' ? 'bg-green-100 text-[#2E7D32] font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-[#2E7D32]" />
                  Platform Admin Alex
                </button>
              </div>
            )}
          </div>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative p-2.5 text-slate-700 hover:text-[#2E7D32] hover:bg-green-50 rounded-xl transition-all"
            title="View Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2E7D32] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User Profile / Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#2E7D32]"
                />
                <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                  {user.name.split(' ')[0]}
                </span>
              </Link>

              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                Log In
              </Button>
              <Button variant="primary" size="sm" className="rounded-full px-5 font-semibold bg-[#2E7D32] hover:bg-green-800" onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/marketplace"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-[#2E7D32]"
          >
            Marketplace
          </Link>
          <Link
            to="/farmer-dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-[#2E7D32]"
          >
            Farmer Dashboard
          </Link>
          <Link
            to="/consumer-dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-[#2E7D32]"
          >
            Consumer Dashboard
          </Link>
          <Link
            to="/admin-dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-[#2E7D32]"
          >
            Admin Dashboard
          </Link>
          
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase">Quick Demo Persona</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  quickLogin('farmer');
                  setMobileMenuOpen(false);
                  navigate('/farmer-dashboard');
                }}
                className="text-xs bg-emerald-50 text-[#2E7D32] font-semibold py-2 rounded-lg"
              >
                Farmer
              </button>
              <button
                onClick={() => {
                  quickLogin('consumer');
                  setMobileMenuOpen(false);
                  navigate('/marketplace');
                }}
                className="text-xs bg-emerald-50 text-emerald-800 font-semibold py-2 rounded-lg"
              >
                Consumer
              </button>
              <button
                onClick={() => {
                  quickLogin('admin');
                  setMobileMenuOpen(false);
                  navigate('/admin-dashboard');
                }}
                className="text-xs bg-indigo-50 text-indigo-700 font-semibold py-2 rounded-lg"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
