import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, PlusCircle, Search, Trash2, Edit3, Sparkles, Check, ArrowLeft, RefreshCw } from 'lucide-react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProductService } from '../services/api';
import { Product } from '../services/mockData';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Buttons';

export const ManageProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const all = await ProductService.getProducts();
    setProducts(all);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Package className="w-6 h-6 text-[#2E7D32]" /> Manage Farm Inventory
            </h1>
            <p className="text-xs text-slate-500">
              Update stock quantities, adjust pricing, and toggle flash sales
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/add-product')}
            icon={<PlusCircle className="w-4 h-4" />}
            className="bg-[#2E7D32] hover:bg-[#236327] font-bold"
          >
            Add New Produce
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search farm products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2E7D32]"
          />
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Produce</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Current Price</th>
                  <th className="py-3 px-4">AI Suggested</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Freshness</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{item.name}</span>
                          <span className="text-[10px] text-slate-400">
                            Harvested {item.harvestDate}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-600">
                      {item.category}
                    </td>

                    <td className="py-3.5 px-4 font-black text-slate-900">
                      ${item.price.toFixed(2)} / {item.unit}
                    </td>

                    <td className="py-3.5 px-4">
                      {item.suggestedPrice ? (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md text-[11px]">
                          <Sparkles className="w-3 h-3 text-[#2E7D32]" />
                          ${item.suggestedPrice.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {item.stock} {item.unit}s
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant="freshness" size="sm">
                        {item.freshnessScore}% Fresh
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => navigate('/add-product')}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        title="Edit Produce"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete Produce"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
