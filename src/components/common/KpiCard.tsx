import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: 'blue' | 'emerald' | 'amber' | 'red' | 'violet';
  children?: ReactNode;
}

const colorMap = {
  blue: {
    gradient: 'gradient-primary',
    ring: 'ring-blue-100',
    text: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  emerald: {
    gradient: 'gradient-success',
    ring: 'ring-emerald-100',
    text: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  amber: {
    gradient: 'gradient-warning',
    ring: 'ring-amber-100',
    text: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  red: {
    gradient: 'gradient-danger',
    ring: 'ring-red-100',
    text: 'text-red-600',
    bg: 'bg-red-50',
  },
  violet: {
    gradient: 'bg-gradient-to-br from-violet-500 to-violet-700',
    ring: 'ring-violet-100',
    text: 'text-violet-600',
    bg: 'bg-violet-50',
  },
};

const KpiCard = ({ title, value, subtitle, icon: Icon, color }: KpiCardProps) => {
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${c.gradient} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
      {subtitle && (
        <p className={`text-xs font-medium mt-2 ${c.text}`}>{subtitle}</p>
      )}
    </motion.div>
  );
};

export default KpiCard;
