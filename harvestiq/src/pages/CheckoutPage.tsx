import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Truck, CreditCard, CheckCircle2, ShieldCheck, Home, Store } from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { Input } from '../components/common/Inputs';
import { Button } from '../components/common/Buttons';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { OrderService } from '../services/api';
import { Modal } from '../components/common/Modal';

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string().min(7, 'Phone number is required'),
  address: z.string().min(5, 'Full delivery address is required'),
  deliveryType: z.enum(['Direct Local Delivery', 'Farm Gate Pickup']),
  paymentMethod: z.string().min(1, 'Please select a payment method'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, ecoFee, totalAmount, clearCart } = useCart();
  const { user } = useAuth();

  const [orderConfirmed, setOrderConfirmed] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name || 'Sarah Jenkins',
      email: user?.email || 'sarah.j@example.com',
      phone: '(707) 555-0192',
      address: '412 Maple Street, Santa Rosa, CA 95404',
      deliveryType: 'Direct Local Delivery',
      paymentMethod: 'Credit Card',
    },
  });

  const watchDeliveryType = watch('deliveryType');
  const watchPaymentMethod = watch('paymentMethod');

  const onSubmit = async (data: CheckoutFormData) => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const toastId = toast.loading('Transmitting order to farm...');
    try {
      const createdOrder = await OrderService.createOrder({
        consumerName: data.fullName,
        consumerEmail: data.email,
        consumerPhone: data.phone,
        shippingAddress: data.address,
        totalAmount,
        ecoFee,
        paymentMethod: data.paymentMethod,
        deliveryType: data.deliveryType,
        items: cart.map((c) => ({
          productId: c.product.id,
          productName: c.product.name,
          unitPrice: c.product.price,
          quantity: c.quantity,
          unit: c.product.unit,
          farmerName: c.product.farmerName,
          image: c.product.image,
        })),
      });

      toast.success('Direct farm order confirmed!', { id: toastId });
      setOrderConfirmed(createdOrder);
      clearCart();
    } catch {
      toast.error('Failed to place order. Please try again.', { id: toastId });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-slate-900">Direct Farm Checkout</h1>
          <p className="text-xs text-slate-500">
            Connecting your kitchen directly with Sonoma & Napa local family orchards
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Form Details */}
          <div className="md:col-span-2 space-y-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            
            {/* Delivery Type Option */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Fulfillment Choice
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setValue('deliveryType', 'Direct Local Delivery')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                    watchDeliveryType === 'Direct Local Delivery'
                      ? 'bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32] ring-1 ring-[#2E7D32]'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#2E7D32] mb-1" />
                  <span className="block font-black text-sm">Eco Local Delivery</span>
                  <span className="text-[10px] text-slate-500 font-normal">Batch electric vehicle dispatch</span>
                </button>

                <button
                  type="button"
                  onClick={() => setValue('deliveryType', 'Farm Gate Pickup')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                    watchDeliveryType === 'Farm Gate Pickup'
                      ? 'bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32] ring-1 ring-[#2E7D32]'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Store className="w-5 h-5 text-[#2E7D32] mb-1" />
                  <span className="block font-black text-sm">Farm Gate Pickup</span>
                  <span className="text-[10px] text-slate-500 font-normal">Pick up directly at orchard</span>
                </button>
              </div>
            </div>

            {/* Address & Contact */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Home className="w-4 h-4 text-[#2E7D32]" /> Contact & Delivery Address
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  error={errors.fullName?.message}
                  {...register('fullName')}
                />

                <Input
                  label="Email Address"
                  type="email"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>

              <Input
                label="Full Shipping Address"
                error={errors.address?.message}
                {...register('address')}
              />

              <Input
                label="Phone Number"
                error={errors.phone?.message}
                {...register('phone')}
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#2E7D32]" /> Payment Method
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {['Credit Card', 'Apple Pay', 'Cash on Delivery'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setValue('paymentMethod', m)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      watchPaymentMethod === m
                        ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              {errors.paymentMethod && (
                <p className="text-xs font-medium text-rose-600">{errors.paymentMethod.message}</p>
              )}
            </div>

          </div>

          {/* Right Summary */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-5 h-fit">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Order Review
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items):</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Eco Dispatch Fee:</span>
                <span className="font-bold text-slate-900">${ecoFee.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-lg font-black text-slate-900">
                <span>Total:</span>
                <span className="text-[#2E7D32]">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting || cart.length === 0}
              className="w-full font-bold bg-[#2E7D32] hover:bg-[#236327]"
              icon={<ShieldCheck className="w-5 h-5" />}
            >
              {isSubmitting ? 'Processing Order...' : 'Place Direct Farm Order'}
            </Button>
          </div>

        </form>

        {/* Confirmation Modal */}
        {orderConfirmed && (
          <Modal
            isOpen={!!orderConfirmed}
            onClose={() => navigate('/consumer-dashboard')}
            title="Order Placed Successfully!"
          >
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 bg-emerald-100 text-[#2E7D32] rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-1">
                  Order #{orderConfirmed.orderNumber}
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Thank You for Supporting Local Farmers!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Your order has been transmitted directly to Sonoma orchards for peak harvest packing.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1 text-left">
                <p className="flex justify-between">
                  <span>Delivery Method:</span>
                  <strong className="text-slate-900">{orderConfirmed.deliveryType}</strong>
                </p>
                <p className="flex justify-between">
                  <span>Food Waste Prevented:</span>
                  <strong className="text-emerald-700">{orderConfirmed.wastePreventedKg} kg</strong>
                </p>
                <p className="flex justify-between">
                  <span>Estimated Arrival:</span>
                  <strong className="text-slate-900">Today around 3:30 PM</strong>
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/consumer-dashboard')}
                className="w-full font-bold bg-[#2E7D32]"
              >
                Go to Order Dashboard
              </Button>
            </div>
          </Modal>
        )}

      </div>
    </MainLayout>
  );
};
