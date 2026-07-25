import React from 'react';
import { Link } from 'react-router-dom';
import { Package, PlusCircle, ArrowUpRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Product } from '../../services/mockData';
import { Badge } from '../common/Badge';

export const ProductSummary: React.FC<{ products: Product[] }> = ({ products }) => {
  const farmerProducts = products.filter((p) => p.farmerId === 'f-101');

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#2E7D32]" /> Farm Inventory Summary
          </h3>
          <p className="text-xs text-slate-500">Live stock levels & freshness tracking</p>
        </div>
        <Link
          to="/add-product"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2E7D32] hover:bg-[#236327] text-white text-xs font-bold transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" /> Add Harvest Item
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-2.5 px-2">Item</th>
              <th className="py-2.5 px-2">Price</th>
              <th className="py-2.5 px-2">Stock</th>
              <th className="py-2.5 px-2">Freshness</th>
              <th className="py-2.5 px-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {farmerProducts.slice(0, 4).map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">{item.name}</span>
                      <span className="text-[10px] text-slate-500">{item.category}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 font-bold text-slate-800">
                  ${item.price.toFixed(2)}/{item.unit}
                </td>
                <td className="py-3 px-2 font-semibold text-slate-700">
                  {item.stock} {item.unit}s
                </td>
                <td className="py-3 px-2">
                  <Badge variant="freshness" size="sm">
                    {item.freshnessScore}% Fresh
                  </Badge>
                </td>
                <td className="py-3 px-2">
                  {item.stock > 20 ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" /> In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                      <AlertTriangle className="w-3 h-3" /> Low Stock
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-right">
        <Link
          to="/manage-products"
          className="text-xs font-bold text-[#2E7D32] hover:underline inline-flex items-center gap-1"
        >
          View & Edit All Inventory <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
