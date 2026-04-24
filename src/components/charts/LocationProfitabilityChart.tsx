import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import type { LocationSummary } from '../../hooks/usePerformanceData';

interface LocationProfitabilityChartProps {
  data: LocationSummary[];
}

const LocationProfitabilityChart = ({ data }: LocationProfitabilityChartProps) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
          Location Profitability Matrix
        </h3>
        <div className="flex items-center gap-4 mt-1.5 text-[11px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
            <span className="text-slate-500 font-medium">Booking Volume</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-500 font-medium">Conversion Rate (%)</span>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={data} margin={{ top: 20, right: 25, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="location"
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
              label={{ value: 'Branch', position: 'insideBottomRight', offset: -5, fontSize: 10, fill: '#94a3b8' }}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              label={{
                value: 'Booking Volume',
                angle: -90,
                position: 'insideLeft',
                offset: 10,
                fontSize: 10,
                fill: '#94a3b8',
                style: { textAnchor: 'middle' },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v}`}
              label={{
                value: 'Conversion Rate (%)',
                angle: 90,
                position: 'insideRight',
                offset: 10,
                fontSize: 10,
                fill: '#94a3b8',
                style: { textAnchor: 'middle' },
              }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                padding: '10px 14px',
                fontSize: '12px',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'showUpRate') return [`${value}%`, 'Conversion Rate'];
                return [value.toLocaleString(), 'Booking Volume'];
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="bookings"
              name="bookings"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              maxBarSize={45}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="showUpRate"
              name="showUpRate"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ r: 6, fill: '#10b981', strokeWidth: 3, stroke: '#fff' }}
            >
              <LabelList
                dataKey="showUpRate"
                position="top"
                formatter={(v: number) => `${v}%`}
                style={{ fontSize: 11, fontWeight: 700, fill: '#059669' }}
              />
            </Line>
            <Legend content={() => null} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LocationProfitabilityChart;
