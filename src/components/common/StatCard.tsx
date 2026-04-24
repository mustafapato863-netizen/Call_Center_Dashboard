import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  isUp?: boolean;
  icon: React.ReactNode;
  color?: 'blue' | 'emerald' | 'amber' | 'indigo' | 'violet' | 'rose';
  delay?: number;
}

const colorMap: Record<string, string> = {
  blue: 'text-blue-600 bg-blue-50 border-blue-100',
  emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  amber: 'text-amber-600 bg-amber-50 border-amber-100',
  indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  violet: 'text-violet-600 bg-violet-50 border-violet-100',
  rose: 'text-rose-600 bg-rose-50 border-rose-100',
};

const StatCard = ({ title, value, subtitle, trend, isUp, icon, color = 'blue', delay = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay }}
    className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start mb-3">
      <div className={`p-2.5 rounded-xl border ${colorMap[color]}`}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-emerald-500' : 'text-red-500'}`}>
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      )}
    </div>
    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
    <h3 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h3>
    {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
  </motion.div>
);

export default StatCard;