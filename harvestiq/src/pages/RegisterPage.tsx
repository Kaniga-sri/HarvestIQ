import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sprout, Store, ArrowRight } from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { Input } from '../components/common/Inputs';
import { Button } from '../components/common/Buttons';
import { useAuth } from '../hooks/useAuth';

const registerSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters long'),
  email: z.string().min(1, 'Email address is required').email('Please enter a valid email address'),
  role: z.enum(['farmer', 'consumer']),
  farmName: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
}).refine((data) => {
  if (data.role === 'farmer' && (!data.farmName || data.farmName.trim().length < 2)) {
    return false;
  }
  return true;
}, {
  message: 'Farm or Orchard name is required for farmer registration',
  path: ['farmName'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerAuth } = useAuth();
  const [role, setRole] = useState<'farmer' | 'consumer'>('farmer');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'farmer',
      name: '',
      email: '',
      farmName: '',
      location: 'Sonoma County, CA',
      phone: '(707) 555-0199',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerAuth({
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      location: data.location,
      farmDetails: data.role === 'farmer' ? {
        farmName: data.farmName || 'Valley Green Fields',
        sizeAcres: 15,
        certifications: ['Organically Grown'],
        bio: 'Local family farm committed to zero food waste.',
        rating: 5.0,
        totalSales: 0,
      } : undefined,
    });

    if (data.role === 'farmer') navigate('/farmer-dashboard');
    else navigate('/marketplace');
  };

  const handleRoleToggle = (selectedRole: 'farmer' | 'consumer') => {
    setRole(selectedRole);
    setValue('role', selectedRole);
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
              Join the HarvestIQ Ecosystem
            </h2>
            <p className="text-xs text-slate-500">
              Start direct farm sales or order peak-fresh local harvests
            </p>
          </div>

          {/* Account Type Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => handleRoleToggle('farmer')}
              className={`py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                role === 'farmer'
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sprout className="w-4 h-4" />
              I am a Farmer
            </button>

            <button
              type="button"
              onClick={() => handleRoleToggle('consumer')}
              className={`py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                role === 'consumer'
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-4 h-4" />
              I am a Buyer
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            <Input
              label="Full Name"
              placeholder="e.g. Eleanor Vance"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="eleanor@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            {role === 'farmer' && (
              <Input
                label="Farm or Orchard Name"
                placeholder="e.g. Sun Valley Organic Orchards"
                error={errors.farmName?.message}
                {...register('farmName')}
              />
            )}

            <Input
              label="Location (City, County or Zip)"
              placeholder="e.g. Sonoma County, CA"
              error={errors.location?.message}
              {...register('location')}
            />

            <Input
              label="Phone Number"
              placeholder="(707) 555-0199"
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-bold bg-[#2E7D32] hover:bg-[#236327] mt-2"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Create {role === 'farmer' ? 'Farmer' : 'Buyer'} Account
            </Button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2E7D32] font-bold hover:underline">
              Log In Here
            </Link>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};
