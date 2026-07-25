import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Sparkles, PlusCircle, ArrowLeft, Check, Calculator } from 'lucide-react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Input, Select, TextArea } from '../components/common/Inputs';
import { Button } from '../components/common/Buttons';
import { ProductService } from '../services/api';

const SAMPLE_IMAGES = [
  { label: 'Tomatoes', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' },
  { label: 'Berries', url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80' },
  { label: 'Avocados', url: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80' },
  { label: 'Corn', url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80' },
  { label: 'Apples', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80' },
  { label: 'Basil', url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80' },
];

const addProductSchema = z.object({
  name: z.string().min(2, 'Produce name must be at least 2 characters long'),
  category: z.enum([
    'Vegetables',
    'Fruits',
    'Dairy & Eggs',
    'Honey & Preserves',
    'Herbs & Spices',
    'Grains',
  ]),
  price: z.number().min(0.01, 'Price must be greater than $0'),
  unit: z.string().min(1, 'Unit measurement is required'),
  stock: z.number().min(1, 'Stock quantity must be at least 1'),
  harvestDate: z.string().min(1, 'Harvest date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  isOrganic: z.boolean(),
  isSurplus: z.boolean(),
  description: z.string().min(5, 'Harvest notes must be at least 5 characters long'),
});

type AddProductFormData = z.infer<typeof addProductSchema>;

export const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(SAMPLE_IMAGES[0].url);

  // Live AI Price Suggestion state
  const [aiPrice, setAiPrice] = useState<number | null>(4.10);
  const [calculating, setCalculating] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddProductFormData>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: '',
      category: 'Vegetables',
      price: 3.50,
      unit: 'kg',
      stock: 100,
      harvestDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      isOrganic: true,
      isSurplus: false,
      description: 'Sun-ripened pesticide-free harvest directly from our fields.',
    },
  });

  const watchName = watch('name');
  const watchCategory = watch('category');
  const watchHarvestDate = watch('harvestDate');
  const watchStock = watch('stock');
  const watchUnit = watch('unit');

  const handleCalculateAiPrice = async () => {
    setCalculating(true);
    const toastId = toast.loading('Calculating optimal market price...');
    try {
      const res = await ProductService.calculateSmartPrice({
        name: watchName || 'Fresh Harvest',
        category: watchCategory,
        harvestDate: watchHarvestDate,
        stock: Number(watchStock) || 100,
      });
      setAiPrice(res.suggestedPrice);
      toast.success(`AI suggested market rate: $${res.suggestedPrice.toFixed(2)}/${watchUnit}`, { id: toastId });
    } catch {
      toast.error('Failed to calculate price', { id: toastId });
    } finally {
      setCalculating(false);
    }
  };

  const onSubmit = async (data: AddProductFormData) => {
    const toastId = toast.loading('Publishing harvest listing...');
    try {
      await ProductService.addProduct({
        name: data.name,
        category: data.category,
        price: data.price,
        unit: data.unit,
        stock: data.stock,
        harvestDate: data.harvestDate,
        expiryDate: data.expiryDate,
        isOrganic: data.isOrganic,
        isSurplus: data.isSurplus,
        location: 'Sonoma County, CA',
        description: data.description,
        image: selectedImage,
      });

      toast.success('Harvest listing published successfully!', { id: toastId });
      navigate('/manage-products');
    } catch {
      toast.error('Failed to publish product', { id: toastId });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Breadcrumb Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <span className="text-xs font-bold text-[#2E7D32] bg-[#2E7D32]/10 px-3 py-1 rounded-full border border-[#2E7D32]/20">
            AI Price Assistant Active
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="p-3 rounded-2xl bg-emerald-100 text-[#2E7D32]">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">List New Harvest Produce</h1>
              <p className="text-xs text-slate-500">
                Publish fresh harvest produce to the HarvestIQ local marketplace
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Produce / Crop Name"
                placeholder="e.g. Heirloom Organic Tomatoes"
                error={errors.name?.message}
                {...register('name')}
              />

              <Select
                label="Category"
                error={errors.category?.message}
                {...register('category')}
                options={[
                  { value: 'Vegetables', label: 'Vegetables' },
                  { value: 'Fruits', label: 'Fruits' },
                  { value: 'Dairy & Eggs', label: 'Dairy & Eggs' },
                  { value: 'Honey & Preserves', label: 'Honey & Preserves' },
                  { value: 'Herbs & Spices', label: 'Herbs & Spices' },
                  { value: 'Grains', label: 'Grains & Seeds' },
                ]}
              />
            </div>

            {/* AI PRICE ASSISTANT WIDGET */}
            <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-5 border border-emerald-700/60 shadow-inner">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    HarvestIQ AI Pricing Engine
                  </div>
                  <h4 className="text-base font-bold text-white">Recommended Market Rate</h4>
                  <p className="text-xs text-slate-300">
                    Calculated using local weather forecasts, consumer search trends, and Sonoma County stock data.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleCalculateAiPrice}
                    className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-200 text-xs font-bold flex items-center gap-1.5 border border-emerald-600 cursor-pointer"
                  >
                    <Calculator className={`w-3.5 h-3.5 ${calculating ? 'animate-spin' : ''}`} />
                    Recalculate
                  </button>

                  {aiPrice && (
                    <button
                      type="button"
                      onClick={() => {
                        setValue('price', Number(aiPrice.toFixed(2)));
                        toast.success(`Applied AI recommended price $${aiPrice.toFixed(2)}`);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-black flex items-center gap-1 cursor-pointer"
                    >
                      Apply ${aiPrice.toFixed(2)}/{watchUnit}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Price & Quantity Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label={`Price per ${watchUnit} ($)`}
                type="number"
                step="0.10"
                error={errors.price?.message}
                {...register('price', { valueAsNumber: true })}
              />

              <Select
                label="Unit Measurement"
                error={errors.unit?.message}
                {...register('unit')}
                options={[
                  { value: 'kg', label: 'Kilogram (kg)' },
                  { value: 'box (500g)', label: 'Box (500g)' },
                  { value: 'piece', label: 'Piece / Item' },
                  { value: 'dozen', label: 'Dozen' },
                  { value: 'jar (450g)', label: 'Jar (450g)' },
                  { value: 'bunch', label: 'Bunch' },
                ]}
              />

              <Input
                label="Available Harvest Stock"
                type="number"
                error={errors.stock?.message}
                {...register('stock', { valueAsNumber: true })}
              />
            </div>

            {/* Harvest & Expiry Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Harvest Date"
                type="date"
                error={errors.harvestDate?.message}
                {...register('harvestDate')}
              />

              <Input
                label="Best Before / Expiry Date"
                type="date"
                error={errors.expiryDate?.message}
                {...register('expiryDate')}
              />
            </div>

            {/* Farming Badges Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
              <label className="flex items-center gap-2.5 font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('isOrganic')}
                  className="w-4 h-4 rounded text-[#2E7D32] focus:ring-[#2E7D32]"
                />
                USDA / Regenerative Organic Verified
              </label>

              <label className="flex items-center gap-2.5 font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('isSurplus')}
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                />
                List as Surplus Deal (Bumper Crop Clearance)
              </label>
            </div>

            {/* Preset Photo Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Select High-Res Produce Photo
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {SAMPLE_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img.url)}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                      selectedImage === img.url
                        ? 'border-[#2E7D32] ring-2 ring-[#2E7D32]/20 scale-105'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    {selectedImage === img.url && (
                      <div className="absolute inset-0 bg-[#2E7D32]/40 flex items-center justify-center text-white">
                        <Check className="w-5 h-5 font-bold" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <TextArea
              label="Harvest Notes & Description"
              rows={3}
              placeholder="Describe flavor notes, soil practices, recipe tips..."
              error={errors.description?.message}
              {...register('description')}
            />

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="bg-[#2E7D32] hover:bg-[#236327] font-bold"
                icon={<PlusCircle className="w-5 h-5" />}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Harvest Listing'}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};
