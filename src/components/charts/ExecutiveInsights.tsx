import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb } from 'lucide-react';
import type { MonthSummary, LocationSummary } from '../../hooks/usePerformanceData';

interface ExecutiveInsightsProps {
  monthSummaries: MonthSummary[];
  locationSummaries: LocationSummary[];
  noShowRate: number;
}

const ExecutiveInsights = ({ monthSummaries, locationSummaries, noShowRate }: ExecutiveInsightsProps) => {
  // Compute growth from first to last month
  const firstMonth = monthSummaries[0];
  const lastMonth = monthSummaries[monthSummaries.length - 1];
  const attendGrowth =
    firstMonth && lastMonth && firstMonth.totalAttended > 0
      ? Math.round(((lastMonth.totalAttended - firstMonth.totalAttended) / firstMonth.totalAttended) * 100)
      : 0;

  const isPositiveGrowth = attendGrowth >= 0;

  // Find highest conversion location (by show-up rate)
  const sortedByRate = [...locationSummaries].sort((a, b) => b.showUpRate - a.showUpRate);
  const highestConversion = sortedByRate[0];
  const lowestVolume = [...locationSummaries].sort((a, b) => a.bookings - b.bookings)[0];

  // Potential additional visits if no-show reduced to 20%
  const totalBookings = locationSummaries.reduce((s, l) => s + l.bookings, 0);
  const targetNoShow = 0.20;
  const additionalVisits =
    noShowRate > targetNoShow
      ? Math.round(totalBookings * (noShowRate - targetNoShow))
      : 0;

  return (
    <div className="bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-800 h-full flex flex-col">
      <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-4">
        Executive Insights
      </h3>
      <div className="space-y-4 flex-1">
        {/* Growth Trajectory */}
        <div className="flex gap-3">
          <div className={`w-8 h-8 rounded-lg ${isPositiveGrowth ? 'bg-emerald-500/20' : 'bg-red-500/20'} flex items-center justify-center shrink-0 mt-0.5`}>
            {isPositiveGrowth
              ? <TrendingUp className="w-4 h-4 text-emerald-400" />
              : <TrendingDown className="w-4 h-4 text-red-400" />
            }
          </div>
          <div>
            <p className={`text-xs font-bold ${isPositiveGrowth ? 'text-emerald-400' : 'text-red-400'} uppercase tracking-wider`}>
              {isPositiveGrowth ? 'Growth Trajectory' : 'Decline Alert'}
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
              Attendance {isPositiveGrowth ? 'grew' : 'declined'} by{' '}
              <span className={`font-semibold ${isPositiveGrowth ? 'text-emerald-400' : 'text-red-400'}`}>
                {attendGrowth}%
              </span>{' '}
              from {firstMonth?.monthFull || 'January'} to {lastMonth?.monthFull || 'March'}
              {isPositiveGrowth
                ? ', exceeding the projected quarterly target.'
                : '. Immediate intervention is recommended to reverse this trend.'}
            </p>
          </div>
        </div>

        {/* Critical Gap */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Critical Gap
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
              The <span className="text-white font-semibold">'{highestConversion?.location}'</span> location
              has the highest conversion ({highestConversion?.showUpRate}%) but{' '}
              {lowestVolume?.location === highestConversion?.location
                ? 'the lowest volume. Expansion recommended.'
                : `'${lowestVolume?.location}' has lowest volume. Rebalancing recommended.`}
            </p>
          </div>
        </div>

        {/* Efficiency Opportunity */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Efficiency Opportunity
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
              Reducing no-show rate to 20% can generate an additional{' '}
              <span className="text-white font-semibold">{additionalVisits.toLocaleString()}</span>{' '}
              patient visits annually.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveInsights;
