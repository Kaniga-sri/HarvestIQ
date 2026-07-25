import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MapPin, Sparkles, Star, Calendar, Check } from 'lucide-react';
import { Product } from '../../services/mockData';
import { Badge } from '../common/Badge';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, cart } = useCart();
  const isInCart = cart.some((item) => item.product.id === product.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            {product.isOrganic && (
              <Badge variant="organic" size="sm">
                Organic
              </Badge>
            )}
            {product.isSurplus && (
              <Badge variant="surplus" size="sm">
                Surplus Deal
              </Badge>
            )}
          </div>

          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            {product.freshnessScore}% Fresh
          </span>
        </div>

        {/* Distance Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-700 text-[11px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <MapPin className="w-3 h-3 text-[#2E7D32]" />
          {product.distanceKm} mi away
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-[#2E7D32]">{product.farmName}</span>
            <div className="flex items-center gap-1 font-bold text-slate-700">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {product.rating} ({product.reviewCount})
            </div>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="block text-base font-bold text-slate-900 hover:text-[#2E7D32] transition-colors line-clamp-1 mb-1"
          >
            {product.name}
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Harvested {product.harvestDate.split('-').slice(1).join('/')}
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-black text-slate-900 flex items-baseline gap-1">
              ${product.price.toFixed(2)}
              <span className="text-xs font-semibold text-slate-500">/{product.unit}</span>
            </div>
            {product.suggestedPrice && product.suggestedPrice > product.price && (
              <span className="text-[10px] text-emerald-700 font-semibold block">
                Save ${ (product.suggestedPrice - product.price).toFixed(2) } vs market
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className={`p-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
              isInCart
                ? 'bg-emerald-100 text-[#2E7D32] border border-emerald-300'
                : 'bg-[#2E7D32] hover:bg-[#236327] text-white hover:shadow-md active:scale-95'
            }`}
            title={isInCart ? 'In Cart' : 'Add to Cart'}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
