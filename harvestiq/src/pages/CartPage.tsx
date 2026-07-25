import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft, Plus, Minus, Leaf, Sparkles } from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/common/Buttons';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, subtotal, ecoFee, totalAmount, totalWastePreventedKg, totalCo2SavedKg } = useCart();

  if (cart.length === 0) {
    return (
      <MainLayout>
        <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#2E7D32] flex items-center justify-center mx-auto">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Your Harvest Basket is Empty</h2>
          <p className="text-xs text-slate-500">
            Browse local family farms to add peak-fresh organic produce to your order.
          </p>
          <Button variant="primary" onClick={() => navigate('/marketplace')}>
            Explore Marketplace
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-[#2E7D32]" /> Your Direct Farm Cart
          </h1>
          <button
            onClick={() => navigate('/marketplace')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Itemized List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{product.name}</h3>
                    <p className="text-xs text-[#2E7D32] font-semibold">{product.farmName}</p>
                    <p className="text-xs text-slate-500">
                      ${product.price.toFixed(2)} / {product.unit}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1 hover:bg-white rounded-lg text-slate-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1 hover:bg-white rounded-lg text-slate-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-slate-900 block">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-[11px] text-rose-600 hover:underline inline-flex items-center gap-0.5 mt-0.5"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Box */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-5 h-fit">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h3>

            {/* Impact Badge */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#2E7D32]">
                <Leaf className="w-4 h-4" /> Zero-Waste Impact
              </div>
              <p className="text-[11px] leading-tight text-emerald-800">
                This order prevents <strong>{totalWastePreventedKg} kg</strong> of harvest spillage & reduces <strong>{totalCo2SavedKg} kg</strong> CO₂.
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Produce Subtotal:</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Eco Local Dispatch Fee:</span>
                <span className="font-bold text-slate-900">${ecoFee.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-base font-black text-slate-900">
                <span>Total Amount:</span>
                <span className="text-[#2E7D32]">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/checkout')}
              className="w-full font-bold bg-[#2E7D32] hover:bg-[#236327]"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Checkout
            </Button>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};
