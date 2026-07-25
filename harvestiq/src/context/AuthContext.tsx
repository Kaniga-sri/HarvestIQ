import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../services/mockData';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, role: 'farmer' | 'consumer' | 'admin') => void;
  register: (userData: Partial<UserProfile>) => void;
  logout: () => void;
  quickLogin: (role: 'farmer' | 'consumer' | 'admin') => void;
}

const MOCK_USERS: Record<string, UserProfile> = {
  farmer: {
    id: 'usr-farmer-1',
    name: 'John Miller',
    email: 'john@greenvalleyorganics.com',
    role: 'farmer',
    phone: '(707) 555-0142',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    location: 'Sonoma County, CA',
    farmDetails: {
      farmName: 'Green Valley Organics',
      sizeAcres: 45,
      certifications: ['USDA Certified Organic', 'Regenerative Organic Alliance'],
      bio: 'Family-owned pesticide-free farm specializing in heirloom vegetables, berries, and stone fruits.',
      rating: 4.9,
      totalSales: 34800,
    }
  },
  consumer: {
    id: 'usr-consumer-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    role: 'consumer',
    phone: '(707) 555-0192',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    location: 'Santa Rosa, CA',
    consumerStats: {
      totalOrders: 14,
      foodSavedKg: 28.5,
      co2ReducedKg: 19.2,
      favoriteFarms: ['Green Valley Organics', 'SunnyAcres Farm'],
    }
  },
  admin: {
    id: 'usr-admin-1',
    name: 'Alex Rivera (Admin)',
    email: 'admin@harvestiq.ai',
    role: 'admin',
    phone: '(800) 555-HIQ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    location: 'HarvestIQ HQ - San Francisco, CA',
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const savedUser = localStorage.getItem('harvestiq_user');
      return savedUser ? JSON.parse(savedUser) : MOCK_USERS.farmer;
    } catch {
      return MOCK_USERS.farmer;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('harvestiq_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('harvestiq_user');
      }
    } catch (e) {
      console.error('Failed to save user to localStorage', e);
    }
  }, [user]);

  const login = (email: string, role: 'farmer' | 'consumer' | 'admin') => {
    quickLogin(role);
  };

  const register = (userData: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: userData.name || 'HarvestIQ User',
      email: userData.email || 'user@example.com',
      role: userData.role || 'consumer',
      phone: userData.phone || '(555) 000-0000',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      location: userData.location || 'California, USA',
      farmDetails: userData.role === 'farmer' ? {
        farmName: userData.farmDetails?.farmName || 'Sunny Harvest Farm',
        sizeAcres: 20,
        certifications: ['Locally Grown'],
        bio: 'Fresh farm produce.',
        rating: 5.0,
        totalSales: 0,
      } : undefined,
      consumerStats: userData.role === 'consumer' ? {
        totalOrders: 0,
        foodSavedKg: 0,
        co2ReducedKg: 0,
        favoriteFarms: [],
      } : undefined
    };
    setUser(newUser);
    toast.success(`Welcome to HarvestIQ, ${newUser.name}!`);
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  const quickLogin = (role: 'farmer' | 'consumer' | 'admin') => {
    const targetUser = MOCK_USERS[role] || MOCK_USERS.consumer;
    setUser(targetUser);
    toast.success(`Logged in as ${targetUser.name} (${role})`);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, quickLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
