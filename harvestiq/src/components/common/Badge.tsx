import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'organic' | 'surplus' | 'ai' | 'freshness' | 'success' | 'warning' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase',
    md: 'px-3 py-1 text-xs font-bold tracking-wider uppercase',
  };

  const variantStyles = {
    organic: 'bg-green-100 text-[#2E7D32] border border-green-200/80',
    surplus: 'bg-amber-100 text-amber-800 border border-amber-200/80',
    ai: 'bg-green-100 text-[#2E7D32] border border-green-300',
    freshness: 'bg-teal-100 text-teal-800 border border-teal-200/80',
    success: 'bg-green-100 text-[#2E7D32] border border-green-200',
    warning: 'bg-orange-100 text-orange-800 border border-orange-200',
    info: 'bg-sky-100 text-sky-800 border border-sky-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full whitespace-nowrap tracking-tight ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
