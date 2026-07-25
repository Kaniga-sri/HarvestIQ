import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingCart,
  Sparkles,
  MapPin,
  Calendar,
  Star,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  Truck,
  Leaf
} from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { ProductService } from '../services/api';
import { Product } from '../services/mockData';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Buttons';
import { useCart } from '../hooks/useCart';
import { Loader } from '../components/common/Loader';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      ProductService.getProductById(id).then((p) => {
        setProduct(p || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="py-20">
          <Loader text="Loading produce details..." />
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="max-w-md mx-auto py-20 text-center space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Produce item not found</h2>
          <Button variant="primary" onClick={() => navigate('/marketplace')}>
            Return to Marketplace
          </Button>
        </div>
      </MainLayout>
    );
  }

  const isInCart = cart.some((item) => item.product.id === product.id);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Breadcrumb Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Image Display & Badges */}
          <div className="space-y-4">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute top-4 left-4 flex gap-2">
                {product.isOrganic && <Badge variant="organic" size="md">USDA Organic</Badge>}
                {product.isSurplus && <Badge variant="surplus" size="md">Bumper Crop Deal</Badge>}
              </div>

              {/* Freshness Gauge */}
              <div className="absolute bottom-4 right-4 bg-slate-900/85 backdrop-blur-md text-white p-3 rounded-2xl border border-slate-700/60 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-sm flex items-center justify-center border border-emerald-400/30">
                  {product.freshnessScore}%
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">AI Freshness Index</span>
                  <span className="text-xs font-semibold text-slate-200">Peak Harvest Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="space-y-6">
            
            {/* Title & Category */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#2E7D32] mb-1">
                <span>{product.category}</span>
                <div className="flex items-center gap-1 text-slate-700">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  {product.rating} ({product.reviewCount} farm reviews)
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm font-bold text-slate-500">per {product.unit}</span>
              {product.suggestedPrice && product.suggestedPrice > product.price && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                  Save ${ (product.suggestedPrice - product.price).toFixed(2) } vs supermarket
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Farm Profile Highlight */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/60 rounded-2xl p-4 border border-emerald-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2E7D32] text-white font-black text-lg flex items-center justify-center shrink-0">
                  {product.farmName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{product.farmName}</h4>
                  <p className="text-xs text-slate-600 font-medium">{product.farmerName}</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#2E7D32]" /> {product.location} ({product.distanceKm} mi away)
                  </p>
                </div>
              </div>

              <Badge variant="organic" size="sm">
                <ShieldCheck className="w-3 h-3 inline mr-1 text-[#2E7D32]" /> Verified
              </Badge>
            </div>

            {/* Quantity Selector & Add to Cart Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase text-slate-600">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-slate-400">
                  ({product.stock} {product.unit}s available)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 font-bold bg-[#2E7D32] hover:bg-[#236327]"
                  icon={<ShoppingCart className="w-5 h-5" />}
                >
                  {isInCart ? 'Add More to Cart' : `Add ${quantity} to Cart ($${(product.price * quantity).toFixed(2)})`}
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    addToCart(product, quantity);
                    navigate('/checkout');
                  }}
                  className="font-bold border-slate-300"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Delivery Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#2E7D32]" />
                <span>Same-day Eco Delivery Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#2E7D32]" />
                <span>Pesticide-Free Guarantee</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
};
