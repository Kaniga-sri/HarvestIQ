import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../services/mockData';
import toast from 'react-hot-toast';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  ecoFee: number;
  totalAmount: number;
  totalWastePreventedKg: number;
  totalCo2SavedKg: number;
}

const DEFAULT_SAMPLE_CART: CartItem[] = [
  {
    product: {
      id: 'prod-1',
      name: 'Organic Heirloom Tomatoes',
      category: 'Vegetables',
      price: 3.80,
      unit: 'kg',
      farmerId: 'f-101',
      farmerName: 'John Miller',
      farmName: 'Green Valley Organics',
      location: 'Sonoma County, CA',
      distanceKm: 4.2,
      harvestDate: '2026-07-24',
      expiryDate: '2026-08-02',
      freshnessScore: 98,
      isOrganic: true,
      isSurplus: false,
      stock: 140,
      rating: 4.9,
      reviewCount: 38,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      description: 'Sun-ripened, pesticide-free heirloom tomatoes.',
    },
    quantity: 2,
  },
  {
    product: {
      id: 'prod-2',
      name: 'Fresh Sweet Strawberries',
      category: 'Fruits',
      price: 5.50,
      unit: 'box (500g)',
      farmerId: 'f-102',
      farmerName: 'Elena Rostova',
      farmName: 'SunnyAcres Berries',
      location: 'Napa Valley, CA',
      distanceKm: 6.8,
      harvestDate: '2026-07-25',
      expiryDate: '2026-07-29',
      freshnessScore: 95,
      isOrganic: true,
      isSurplus: true,
      stock: 85,
      rating: 4.8,
      reviewCount: 52,
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
      description: 'Juicy California berries picked at perfect ripeness.',
    },
    quantity: 1,
  }
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('harvestiq_cart');
      return saved ? JSON.parse(saved) : DEFAULT_SAMPLE_CART;
    } catch {
      return DEFAULT_SAMPLE_CART;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('harvestiq_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
    toast.success(`Added ${product.name} to cart`);
  };

  const removeFromCart = (productId: string) => {
    const itemToRemove = cart.find(i => i.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (itemToRemove) {
      toast.success(`Removed ${itemToRemove.product.name} from cart`);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = +cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);
  const ecoFee = subtotal > 0 ? 2.50 : 0;
  const totalAmount = +(subtotal + ecoFee).toFixed(2);
  const totalWastePreventedKg = +(totalItems * 1.2).toFixed(1);
  const totalCo2SavedKg = +(totalItems * 0.85).toFixed(1);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        ecoFee,
        totalAmount,
        totalWastePreventedKg,
        totalCo2SavedKg,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
