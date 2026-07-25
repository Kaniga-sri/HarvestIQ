import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sprout, Store, ShieldAlert, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { Input } from '../components/common/Inputs';
import { Button } from '../components/common/Buttons';
import { useAuth } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().min(1, 'Email address is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['farmer', 'consumer', 'admin']),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { quickLogin } = useAuth();
  const [role, setRole] = useState<'farmer' | 'consumer' | 'admin'>('farmer');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'john@greenvalleyorganics.com',
      password: 'password123',
      role: 'farmer',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    quickLogin(data.role);
    if (data.role === 'farmer') navigate('/farmer-dashboard');
    else if (data.role === 'admin') navigate('/admin-dashboard');
    else navigate('/marketplace');
  };

  const handleRoleSelect = (selectedRole: 'farmer' | 'consumer' | 'admin') => {
    setRole(selectedRole);
    setValue('role', selectedRole);
    if (selectedRole === 'farmer') {
      setValue('email', 'john@greenvalleyorganics.com');
    } else if (selectedRole === 'consumer') {
      setValue('email', 'sarah.j@example.com');
    } else {
      setValue('email', 'admin@harvestiq.ai');
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200/80 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#2E7D32] text-white font-bold flex items-center justify-center mx-auto shadow-md">
              <Sprout className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Welcome Back to HarvestIQ
            </h2>
            <p className="text-xs text-slate-500">
              Sign in to access your agricultural intelligence portal
            </p>
          </div>

          {/* Persona Role Selection Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => handleRoleSelect('farmer')}
              className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer ${
                role === 'farmer'
                  ? 'bg-white text-[#2E7D32] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              Farmer
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('consumer')}
              className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer ${
                role === 'consumer'
                  ? 'bg-white text-[#2E7D32] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              Consumer
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer ${
                role === 'admin'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Admin
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#2E7D32]" />
                Remember me
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[#2E7D32] font-semibold hover:underline">
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-bold bg-[#2E7D32] hover:bg-[#236327]"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In as {role.toUpperCase()}
            </Button>
          </form>

          {/* Quick One-Click Demo Box */}
          <div className="p-3.5 bg-green-50 rounded-2xl border border-green-100 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#2E7D32]">
              <Sparkles className="w-4 h-4" /> Quick One-Click Demo Credentials:
            </div>
            <button
              type="button"
              onClick={() => {
                quickLogin('farmer');
                navigate('/farmer-dashboard');
              }}
              className="w-full text-left bg-white p-2 rounded-xl border border-green-200 text-[#2E7D32] font-bold hover:bg-green-100/50 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Instant Farmer Login (John)</span>
              <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
            </button>
          </div>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-[#2E7D32] font-bold hover:underline">
              Create Free Account
            </Link>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};
