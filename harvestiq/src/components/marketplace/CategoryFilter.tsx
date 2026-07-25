import React from 'react';
import { Sprout, Apple, Carrot, Milk, Wheat, Flame, Percent } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  { id: 'All', label: 'All Items', icon: Sprout },
  { id: 'Vegetables', label: 'Vegetables', icon: Carrot },
  { id: 'Fruits', label: 'Fresh Fruits', icon: Apple },
  { id: 'Dairy & Eggs', label: 'Dairy & Eggs', icon: Milk },
  { id: 'Honey & Preserves', label: 'Honey & Jams', icon: Wheat },
  { id: 'Herbs & Spices', label: 'Fresh Herbs', icon: Flame },
  { id: 'Surplus Clearance', label: 'Surplus Clearance', icon: Percent },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
              isActive
                ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#2E7D32]'}`} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
