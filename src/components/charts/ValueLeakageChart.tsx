import { PieChart, Pie, Cell } from 'recharts';
import type { ValueLeakageData } from '../../hooks/usePerformanceData';

interface ValueLeakageChartProps {
  data: ValueLeakageData;
}

const DonutGauge = ({
  value,
  label,
  description,
  color,
}: {
  value: number;
  label: string;
  description: string;
  color: string;
}) => {
  const pct = Math.round(value * 1000) / 10;
  const pieData = [
    { name: 'value', val: pct },
    { name: 'rest', val: 100 - pct },
  ];
  const colors = [color, '#f1f5f9'];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <PieChart width={112} height={112}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={34}
            outerRadius={48}
            startAngle={90}
            endAngle={-270}
            dataKey="val"
            strokeWidth={0}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-extrabold text-slate-800">{pct}%</span>
        </div>
      </div>
      <p className="text-xs font-bold text-slate-700 mt-2 text-center">{label}</p>
      <p className="text-[10px] text-slate-400 mt-1 text-center max-w-[140px] leading-tight">
        {description}
      </p>
    </div>
  );
};

const ValueLeakageChart = ({ data }: ValueLeakageChartProps) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 h-full flex flex-col">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-1">
        Value Leakage
      </h3>
      <div className="flex items-center gap-4 mb-4 text-[11px]">
        <span className="text-slate-500">
          <span className="font-bold text-slate-700">No-Show Loss:</span>{' '}
          {(data.noShowRate * 100).toFixed(1)}%
        </span>
        <span className="text-slate-500">
          <span className="font-bold text-slate-700">Unconverted Calls:</span>{' '}
          {(data.unconvertedRate * 100).toFixed(1)}%
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-6">
        <DonutGauge
          value={data.noShowRate}
          label="No-Show Loss"
          description="Patients who booked but did not attend their appointment"
          color="#ef4444"
        />
        <DonutGauge
          value={data.unconvertedRate}
          label="Unconverted Calls"
          description="Handled calls that were not converted to patient bookings"
          color="#3b82f6"
        />
      </div>
    </div>
  );
};

export default ValueLeakageChart;
