import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Store, Sparkles, MapPin, X } from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { ProductCard } from '../components/marketplace/ProductCard';
import { CategoryFilter } from '../components/marketplace/CategoryFilter';
import { ProductService } from '../services/api';
import { Product } from '../services/mockData';
import { Modal } from '../components/common/Modal';
import { Loader } from '../components/common/Loader';

export const MarketplacePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'freshness' | 'price' | 'distance' | 'rating'>('freshness');
  const [loading, setLoading] = useState(true);

  // Farmer info modal state
  const [selectedFarmerProduct, setSelectedFarmerProduct] = useState<Product | null>(null);

  useEffect(() => {
    setLoading(true);
    ProductService.getProducts(activeCategory, search).then((res) => {
      let sorted = [...res];
      if (sortBy === 'freshness') {
        sorted.sort((a, b) => b.freshnessScore - a.freshnessScore);
      } else if (sortBy === 'price') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'distance') {
        sorted.sort((a, b) => a.distanceKm - b.distanceKm);
      } else if (sortBy === 'rating') {
        sorted.sort((a, b) => b.rating - a.rating);
      }
      setProducts(sorted);
      setLoading(false);
    });
  }, [activeCategory, search, sortBy]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Marketplace Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-md relative overflow-hidden">
          <div className="max-w-2xl space-y-3 z-10 relative">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3 h-3 text-emerald-400" /> Peak Freshness Marketplace
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Direct Local Harvests. Unmatched Freshness.
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Order pesticide-free organic produce directly from Sonoma & Napa family farms. Every order supports zero-waste local agriculture.
            </p>
          </div>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search tomatoes, berries, honey, farms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2E7D32] shadow-xs"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-600">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#2E7D32]"
            >
              <option value="freshness">Freshness Index (Highest)</option>
              <option value="price">Price: Low to High</option>
              <option value="distance">Distance: Nearest First</option>
              <option value="rating">Rating: Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Products Grid */}
        {loading ? (
          <Loader text="Fetching fresh farm produce..." />
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <Store className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No produce matches your search</h3>
            <p className="text-xs text-slate-500">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setSelectedFarmerProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Farmer Information Modal */}
        {selectedFarmerProduct && (
          <Modal
            isOpen={!!selectedFarmerProduct}
            onClose={() => setSelectedFarmerProduct(null)}
            title="Farmer Profile & Farm Info"
          >
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                <div className="w-12 h-12 rounded-full bg-[#2E7D32] text-white font-black flex items-center justify-center text-lg shrink-0">
                  {selectedFarmerProduct.farmName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{selectedFarmerProduct.farmName}</h4>
                  <p className="text-emerald-700 font-semibold">{selectedFarmerProduct.farmerName}</p>
                  <p className="text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#2E7D32]" /> {selectedFarmerProduct.location} ({selectedFarmerProduct.distanceKm} mi)
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800 block uppercase tracking-wider text-[10px]">
                  Farming Practices
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Pesticide-free organic soil regeneration. Harvested on demand to guarantee zero waste.
                </p>
              </div>
            </div>
          </Modal>
        )}

      </div>
    </MainLayout>
  );
};
