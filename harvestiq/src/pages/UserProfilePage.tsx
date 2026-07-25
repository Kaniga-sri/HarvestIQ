import React, { useState } from 'react';
import { User, ShieldCheck, Sprout, MapPin, Mail, Phone, Award, Save } from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/common/Inputs';
import { Button } from '../components/common/Buttons';
import { Badge } from '../components/common/Badge';

export const UserProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'John Miller');
  const [email, setEmail] = useState(user?.email || 'john@greenvalleyorganics.com');
  const [phone, setPhone] = useState(user?.phone || '(707) 555-0142');
  const [location, setLocation] = useState(user?.location || 'Sonoma County, CA');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Profile Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-[#2E7D32] shadow-md"
          />
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-slate-900">{user?.name}</h1>
              <Badge variant="organic" size="sm">
                <ShieldCheck className="w-3 h-3 inline mr-1 text-[#2E7D32]" />
                {user?.role.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-[#2E7D32] font-semibold flex items-center justify-center sm:justify-start gap-1">
              <Sprout className="w-3.5 h-3.5" /> {user?.farmDetails?.farmName || 'Sonoma Valley Family Farm'}
            </p>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {user?.location}
            </p>
          </div>
        </div>

        {/* Eco Badges Achievements */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <Award className="w-5 h-5 text-emerald-300" />
            Sustainability Badges
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-emerald-800/60 p-3 rounded-2xl border border-emerald-700">
              <span className="font-bold text-emerald-200 block">Zero Waste Hero</span>
              <span className="text-[10px] text-emerald-300">Prevented &gt;25kg Spoilage</span>
            </div>
            <div className="bg-emerald-800/60 p-3 rounded-2xl border border-emerald-700">
              <span className="font-bold text-emerald-200 block">Local Food Champion</span>
              <span className="text-[10px] text-emerald-300">Supported 4 Local Farms</span>
            </div>
            <div className="bg-emerald-800/60 p-3 rounded-2xl border border-emerald-700">
              <span className="font-bold text-emerald-200 block">Smart Pricing Pioneer</span>
              <span className="text-[10px] text-emerald-300">100% AI Rate Compliance</span>
            </div>
          </div>
        </div>

        {/* Profile Settings Form */}
        <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Account & Farm Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            {saved ? (
              <span className="text-xs font-bold text-[#2E7D32]">Profile updated successfully!</span>
            ) : (
              <span />
            )}
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="bg-[#2E7D32] font-bold"
              icon={<Save className="w-4 h-4" />}
            >
              Save Profile Changes
            </Button>
          </div>
        </form>

      </div>
    </MainLayout>
  );
};
