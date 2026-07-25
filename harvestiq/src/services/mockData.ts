export interface Product {
  id: string;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Dairy & Eggs' | 'Grains' | 'Honey & Preserves' | 'Herbs & Spices';
  price: number;
  unit: string;
  suggestedPrice?: number;
  farmerId: string;
  farmerName: string;
  farmName: string;
  location: string;
  distanceKm: number;
  harvestDate: string;
  expiryDate: string;
  freshnessScore: number; // 0 - 100
  isOrganic: boolean;
  isSurplus: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
}

export interface Recommendation {
  id: string;
  type: 'price' | 'buyer_match' | 'freshness_alert' | 'waste_reduction';
  title: string;
  description: string;
  impact: string;
  actionText: string;
  badgeText: string;
  productName?: string;
  currentPrice?: number;
  suggestedPrice?: number;
  buyerName?: string;
  buyerDemandKg?: number;
  expiryDays?: number;
  potentialWasteKg?: number;
  estimatedSavings?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  consumerName: string;
  consumerEmail: string;
  consumerPhone: string;
  shippingAddress: string;
  status: 'Pending' | 'Harvesting' | 'In Transit' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  ecoFee: number;
  items: {
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    unit: string;
    farmerName: string;
    image: string;
  }[];
  paymentMethod: string;
  deliveryType: 'Direct Local Delivery' | 'Farm Gate Pickup';
  wastePreventedKg: number;
  co2SavedKg: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'consumer' | 'admin';
  phone: string;
  avatar: string;
  location: string;
  farmDetails?: {
    farmName: string;
    sizeAcres: number;
    certifications: string[];
    bio: string;
    rating: number;
    totalSales: number;
  };
  consumerStats?: {
    totalOrders: number;
    foodSavedKg: number;
    co2ReducedKg: number;
    favoriteFarms: string[];
  };
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Organic Heirloom Tomatoes',
    category: 'Vegetables',
    price: 3.80,
    suggestedPrice: 4.20,
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
    description: 'Sun-ripened, pesticide-free heirloom tomatoes with rich flavor. Vine-harvested yesterday morning for peak freshness.',
  },
  {
    id: 'prod-2',
    name: 'Fresh Sweet Strawberries',
    category: 'Fruits',
    price: 5.50,
    suggestedPrice: 5.20,
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
    description: 'Juicy California berries picked at perfect ripeness. Bumper crop special pricing to ensure zero harvest waste!',
  },
  {
    id: 'prod-3',
    name: 'Creamy Hass Avocados',
    category: 'Fruits',
    price: 2.20,
    suggestedPrice: 2.50,
    unit: 'piece',
    farmerId: 'f-101',
    farmerName: 'John Miller',
    farmName: 'Green Valley Organics',
    location: 'Sonoma County, CA',
    distanceKm: 4.2,
    harvestDate: '2026-07-22',
    expiryDate: '2026-08-05',
    freshnessScore: 92,
    isOrganic: true,
    isSurplus: false,
    stock: 210,
    rating: 4.9,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
    description: 'High oil content, rich buttery texture. Perfect for guacamole or salad toppings directly from tree to table.',
  },
  {
    id: 'prod-4',
    name: 'Pure Raw Wildflower Honey',
    category: 'Honey & Preserves',
    price: 12.00,
    suggestedPrice: 12.00,
    unit: 'jar (450g)',
    farmerId: 'f-103',
    farmerName: 'Marcus Vance',
    farmName: 'MeadowBrook Apiaries',
    location: 'Petaluma, CA',
    distanceKm: 12.1,
    harvestDate: '2026-07-10',
    expiryDate: '2028-07-10',
    freshnessScore: 100,
    isOrganic: true,
    isSurplus: false,
    stock: 45,
    rating: 5.0,
    reviewCount: 91,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    description: 'Unfiltered, unpasteurized honey harvested from coastal wildflower meadows. Rich in natural enzymes and local pollen.',
  },
  {
    id: 'prod-5',
    name: 'Pasture-Raised Brown Eggs',
    category: 'Dairy & Eggs',
    price: 6.50,
    suggestedPrice: 6.80,
    unit: 'dozen',
    farmerId: 'f-102',
    farmerName: 'Elena Rostova',
    farmName: 'SunnyAcres Farm',
    location: 'Napa Valley, CA',
    distanceKm: 6.8,
    harvestDate: '2026-07-25',
    expiryDate: '2026-08-20',
    freshnessScore: 99,
    isOrganic: true,
    isSurplus: false,
    stock: 60,
    rating: 4.9,
    reviewCount: 43,
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    description: 'Farm-fresh eggs from free-roaming hens fed organic grains and pasture forage. Deep orange yolks.',
  },
  {
    id: 'prod-6',
    name: 'Golden Sweet Corn',
    category: 'Vegetables',
    price: 0.90,
    suggestedPrice: 1.10,
    unit: 'ear',
    farmerId: 'f-104',
    farmerName: 'Arthur Pendelton',
    farmName: 'HarvestHaven Fields',
    location: 'Santa Rosa, CA',
    distanceKm: 9.5,
    harvestDate: '2026-07-24',
    expiryDate: '2026-08-01',
    freshnessScore: 94,
    isOrganic: false,
    isSurplus: true,
    stock: 350,
    rating: 4.7,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    description: 'Sweet, crisp non-GMO corn ears picked early morning. Incredible raw or grilled with butter.',
  },
  {
    id: 'prod-7',
    name: 'Crisp Organic Gala Apples',
    category: 'Fruits',
    price: 3.20,
    suggestedPrice: 3.20,
    unit: 'kg',
    farmerId: 'f-101',
    farmerName: 'John Miller',
    farmName: 'Green Valley Organics',
    location: 'Sonoma County, CA',
    distanceKm: 4.2,
    harvestDate: '2026-07-21',
    expiryDate: '2026-08-20',
    freshnessScore: 96,
    isOrganic: true,
    isSurplus: false,
    stock: 180,
    rating: 4.8,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
    description: 'Naturally sweet and crunchy apples harvested from high-elevation family orchards.',
  },
  {
    id: 'prod-8',
    name: 'Aromatic Sweet Basil Bunch',
    category: 'Herbs & Spices',
    price: 2.50,
    suggestedPrice: 2.80,
    unit: 'bunch',
    farmerId: 'f-103',
    farmerName: 'Marcus Vance',
    farmName: 'MeadowBrook Greens',
    location: 'Petaluma, CA',
    distanceKm: 12.1,
    harvestDate: '2026-07-25',
    expiryDate: '2026-07-31',
    freshnessScore: 99,
    isOrganic: true,
    isSurplus: false,
    stock: 50,
    rating: 5.0,
    reviewCount: 19,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
    description: 'Fragrant Italian Genovese basil freshly cut. Essential for pesto, Caprese salads, and pasta sauces.',
  }
];

export const SMART_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-1',
    type: 'price',
    title: 'Smart Price Recommendation',
    description: 'Local demand for Organic Heirloom Tomatoes is up 28% this weekend due to regional farmer market shortages.',
    impact: '+$112 estimated extra revenue',
    actionText: 'Apply AI Price ($4.20/kg)',
    badgeText: 'Optimal Pricing',
    productName: 'Organic Heirloom Tomatoes',
    currentPrice: 3.80,
    suggestedPrice: 4.20,
  },
  {
    id: 'rec-2',
    type: 'buyer_match',
    title: 'B2B Buyer Match Found',
    description: 'Bistro 21 (4 miles away) submitted a bulk inquiry for 120kg of ripe Strawberries for seasonal desserts.',
    impact: 'Direct Sale - Guaranteed $624',
    actionText: 'Connect & Accept Order',
    badgeText: 'Instant Buyer Match',
    buyerName: 'Bistro 21 Farm-to-Table',
    buyerDemandKg: 120,
  },
  {
    id: 'rec-3',
    type: 'freshness_alert',
    title: 'Freshness Alert & Flash Sale',
    description: 'Sweet Strawberries batch #24 will reach optimal ripeness window in 3 days.',
    impact: 'Avoid 35kg potential spoilage',
    actionText: 'Launch 15% Surplus Flash Sale',
    badgeText: 'Action Recommended',
    productName: 'Fresh Sweet Strawberries',
    expiryDays: 3,
  },
  {
    id: 'rec-4',
    type: 'waste_reduction',
    title: 'Waste Reduction Suggestion',
    description: 'Combine surplus Sweet Corn & Basil into a "Summer Harvest Bundle" for local consumer boxes.',
    impact: 'Saves 65kg food waste / +$140 profit',
    actionText: 'Create Smart Bundle',
    badgeText: 'SDG 12 Impact',
    potentialWasteKg: 65,
    estimatedSavings: 140,
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'HIQ-9842',
    date: '2026-07-25 09:15 AM',
    consumerName: 'Sarah Jenkins',
    consumerEmail: 'sarah.j@example.com',
    consumerPhone: '(707) 555-0192',
    shippingAddress: '412 Maple Street, Santa Rosa, CA 95404',
    status: 'In Transit',
    totalAmount: 28.40,
    ecoFee: 2.50,
    items: [
      {
        productId: 'prod-1',
        productName: 'Organic Heirloom Tomatoes',
        unitPrice: 3.80,
        quantity: 2,
        unit: 'kg',
        farmerName: 'John Miller',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      },
      {
        productId: 'prod-5',
        productName: 'Pasture-Raised Brown Eggs',
        unitPrice: 6.50,
        quantity: 2,
        unit: 'dozen',
        farmerName: 'Elena Rostova',
        image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
      },
      {
        productId: 'prod-8',
        productName: 'Aromatic Sweet Basil Bunch',
        unitPrice: 2.50,
        quantity: 3,
        unit: 'bunch',
        farmerName: 'Marcus Vance',
        image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
      }
    ],
    paymentMethod: 'Credit Card (•••• 4242)',
    deliveryType: 'Direct Local Delivery',
    wastePreventedKg: 3.8,
    co2SavedKg: 2.4,
  },
  {
    id: 'ord-1002',
    orderNumber: 'HIQ-9841',
    date: '2026-07-24 02:40 PM',
    consumerName: 'David Miller',
    consumerEmail: 'david.m@example.com',
    consumerPhone: '(707) 555-0844',
    shippingAddress: '18 Birch Lane, Petaluma, CA 94952',
    status: 'Delivered',
    totalAmount: 18.20,
    ecoFee: 1.50,
    items: [
      {
        productId: 'prod-2',
        productName: 'Fresh Sweet Strawberries',
        unitPrice: 5.50,
        quantity: 2,
        unit: 'box (500g)',
        farmerName: 'Elena Rostova',
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
      },
      {
        productId: 'prod-3',
        productName: 'Creamy Hass Avocados',
        unitPrice: 2.20,
        quantity: 3,
        unit: 'piece',
        farmerName: 'John Miller',
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
      }
    ],
    paymentMethod: 'Apple Pay',
    deliveryType: 'Farm Gate Pickup',
    wastePreventedKg: 2.1,
    co2SavedKg: 1.8,
  }
];

export const MOCK_ADMIN_STATS = {
  totalRevenue: 148920,
  activeFarmers: 342,
  activeConsumers: 4890,
  wasteSavedTons: 64.2,
  co2PreventedTons: 41.8,
  averagePriceAccuracyPercent: 96.4,
  monthlySalesData: [
    { month: 'Jan', revenue: 8400, wastePreventedKg: 3200 },
    { month: 'Feb', revenue: 9800, wastePreventedKg: 3900 },
    { month: 'Mar', revenue: 12400, wastePreventedKg: 4800 },
    { month: 'Apr', revenue: 14200, wastePreventedKg: 5600 },
    { month: 'May', revenue: 18900, wastePreventedKg: 7100 },
    { month: 'Jun', revenue: 22400, wastePreventedKg: 8900 },
    { month: 'Jul', revenue: 26800, wastePreventedKg: 10400 },
  ],
  categoryDistribution: [
    { name: 'Vegetables', value: 38 },
    { name: 'Fruits', value: 28 },
    { name: 'Dairy & Eggs', value: 16 },
    { name: 'Honey & Preserves', value: 10 },
    { name: 'Herbs & Spices', value: 8 },
  ]
};

export const FAQ_ITEMS = [
  {
    q: 'How does HarvestIQ help farmers increase profits?',
    a: 'HarvestIQ eliminates middleman markups by connecting farmers directly with local consumers and restaurants. Our AI analyzes real-time market trends, weather forecasts, and local demand to recommend the optimal selling price for every harvest.'
  },
  {
    q: 'How does HarvestIQ reduce food waste?',
    a: 'Our Freshness Index algorithms predict crop expiration dates and automatically match surplus or near-peak produce with local buyers, food co-ops, and flash sales before spillage occurs.'
  },
  {
    q: 'Are all products certified organic?',
    a: 'We host both USDA Certified Organic farms and regenerative, pesticide-free family farms. Every product listing displays clear farming practice badges and harvest date transparency.'
  },
  {
    q: 'How does direct delivery or pickup work?',
    a: 'When placing an order, consumers can choose between eco-friendly batch local delivery or direct Farm Gate Pickup for a zero-emission farm tour experience.'
  },
  {
    q: 'Is HarvestIQ free for consumers?',
    a: 'Yes! Consumers browse the marketplace for free and enjoy farm-fresh produce at up to 25% lower prices than traditional supermarket chains.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'John Miller',
    role: 'Organic Heirloom Farmer',
    location: 'Sonoma County, CA',
    quote: 'HarvestIQ AI price recommendations boosted our farm net margin by 32%. No more rotting crops or guessing market rates at 5 AM.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    stars: 5,
  },
  {
    name: 'Sarah Jenkins',
    role: 'Home Chef & Community Buyer',
    location: 'Santa Rosa, CA',
    quote: 'The produce arrives hours after harvest. Knowing my grocery money goes directly to local families while saving food waste is deeply fulfilling.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    stars: 5,
  },
  {
    name: 'Chef Marco Rossi',
    role: 'Executive Chef at Bistro 21',
    location: 'Napa Valley, CA',
    quote: 'HarvestIQs B2B Buyer Match feature connects our kitchen directly with regional bumper crops. Freshness is unmatched!',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80',
    stars: 5,
  }
];
