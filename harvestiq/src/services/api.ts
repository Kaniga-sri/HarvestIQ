import axios from 'axios';
import { INITIAL_PRODUCTS, SMART_RECOMMENDATIONS, MOCK_ORDERS, MOCK_ADMIN_STATS, Product, Order, Recommendation } from './mockData';

// Axios instance configured for future backend integration
export const apiClient = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper for simulated network delay
const delay = (ms: number = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const ProductService = {
  async getProducts(category?: string, search?: string): Promise<Product[]> {
    await delay(150);
    let items = [...INITIAL_PRODUCTS];
    if (category && category !== 'All') {
      if (category === 'Surplus Clearance') {
        items = items.filter((p) => p.isSurplus);
      } else {
        items = items.filter((p) => p.category === category);
      }
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.farmName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return items;
  },

  async getProductById(id: string): Promise<Product | undefined> {
    await delay(100);
    return INITIAL_PRODUCTS.find((p) => p.id === id);
  },

  async addProduct(newProduct: Partial<Product>): Promise<Product> {
    await delay(250);
    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name || 'Harvest Item',
      category: newProduct.category || 'Vegetables',
      price: Number(newProduct.price) || 3.0,
      suggestedPrice: Number(newProduct.price) ? Number(newProduct.price) * 1.1 : 3.3,
      unit: newProduct.unit || 'kg',
      farmerId: 'f-101',
      farmerName: 'John Miller',
      farmName: 'Green Valley Organics',
      location: newProduct.location || 'Sonoma County, CA',
      distanceKm: 4.2,
      harvestDate: newProduct.harvestDate || new Date().toISOString().split('T')[0],
      expiryDate: newProduct.expiryDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      freshnessScore: 98,
      isOrganic: newProduct.isOrganic ?? true,
      isSurplus: newProduct.isSurplus ?? false,
      stock: Number(newProduct.stock) || 50,
      rating: 5.0,
      reviewCount: 1,
      image: newProduct.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      description: newProduct.description || 'Farm fresh harvest directly from our fields.',
    };
    INITIAL_PRODUCTS.unshift(created);
    return created;
  },

  async calculateSmartPrice(productDetails: { name: string; category: string; harvestDate: string; stock: number }): Promise<{ suggestedPrice: number; marketDemand: string; confidence: number }> {
    await delay(300);
    const basePrice = 3.50;
    const demandMultiplier = productDetails.category === 'Fruits' || productDetails.category === 'Vegetables' ? 1.15 : 1.05;
    const calculated = +(basePrice * demandMultiplier).toFixed(2);
    return {
      suggestedPrice: calculated,
      marketDemand: 'High Demand (+24% local queries)',
      confidence: 94,
    };
  }
};

export const RecommendationService = {
  async getRecommendations(): Promise<Recommendation[]> {
    await delay(150);
    return SMART_RECOMMENDATIONS;
  }
};

export const OrderService = {
  async getOrders(): Promise<Order[]> {
    await delay(150);
    return MOCK_ORDERS;
  },

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    await delay(350);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `HIQ-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString(),
      consumerName: orderData.consumerName || 'Valued Buyer',
      consumerEmail: orderData.consumerEmail || 'buyer@example.com',
      consumerPhone: orderData.consumerPhone || '(555) 019-2831',
      shippingAddress: orderData.shippingAddress || '123 Main St, Local Town, CA',
      status: 'Harvesting',
      totalAmount: orderData.totalAmount || 0,
      ecoFee: orderData.ecoFee || 2.50,
      items: orderData.items || [],
      paymentMethod: orderData.paymentMethod || 'Credit Card',
      deliveryType: orderData.deliveryType || 'Direct Local Delivery',
      wastePreventedKg: +( (orderData.totalAmount || 10) * 0.2 ).toFixed(1),
      co2SavedKg: +( (orderData.totalAmount || 10) * 0.15 ).toFixed(1),
    };
    MOCK_ORDERS.unshift(newOrder);
    return newOrder;
  }
};

export const AdminService = {
  async getStats() {
    await delay(150);
    return MOCK_ADMIN_STATS;
  }
};
