import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone,
  CalendarCheck,
  UserCheck,
  Percent,
  Award,
} from 'lucide-react';
import { usePerformanceData, formatSecondsToMMSS } from '../hooks/usePerformanceData';
import StatCard from '../components/common/StatCard';
import ConversionFunnel from '../components/charts/ConversionFunnel';
import KpiTargetChart from '../components/charts/KpiTargetChart';
import GrowthTrendChart from '../components/charts/GrowthTrendChart';
import LocationProfitabilityChart from '../components/charts/LocationProfitabilityChart';
import ValueLeakageChart from '../components/charts/ValueLeakageChart';
import ExecutiveInsights from '../components/charts/ExecutiveInsights';
import type { LocationKey, MonthKey } from '../types';

function getGradeLabel(score: number): string {
  if (score >= 95) return 'Excellent';
  if (score >= 85) return 'Very Good';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Average';
  return 'Below Average';
}

const ExecutiveView = () => {
  const [searchParams] = useSearchParams();
  const month = (searchParams.get('month') || 'All') as MonthKey;
  const location = (searchParams.get('location') || 'all') as LocationKey;

  const {
    grandTotals,
    funnelData,
    kpiVsTarget,
    cumulativeData,
    locationSummaries,
    valueLeakage,
    monthSummaries,
    strategicScore,
    avgAHTSeconds,
  } = usePerformanceData(month, location);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 xl:p-8 max-w-[1600px] mx-auto space-y-6"
    >
      {/* ── Section 1: Executive Summary KPIs ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Calls"
          value={grandTotals.totalHandled.toLocaleString()}
          subtitle={`${grandTotals.inbound.toLocaleString()} inbound`}
          icon={<Phone className="w-5 h-5" />}
          color="blue"
          delay={0}
        />
        <StatCard
          title="Total Bookings"
          value={grandTotals.totalBookings.toLocaleString()}
          subtitle={`${(grandTotals.overallBookingRate * 100).toFixed(1)}% conversion`}
          icon={<CalendarCheck className="w-5 h-5" />}
          color="emerald"
          delay={0.05}
        />
        <StatCard
          title="Patients Attended"
          value={grandTotals.totalAttended.toLocaleString()}
          subtitle={`${(grandTotals.overallAttendRate * 100).toFixed(1)}% show-up`}
          icon={<UserCheck className="w-5 h-5" />}
          color="indigo"
          delay={0.1}
        />
        <StatCard
          title="Avg. Handle Time"
          value={formatSecondsToMMSS(avgAHTSeconds)}
          subtitle="Target: 2:30"
          icon={<Percent className="w-5 h-5" />}
          color="amber"
          delay={0.15}
        />
        <StatCard
          title="Performance Score"
          value={`${strategicScore}/100`}
          subtitle={getGradeLabel(strategicScore)}
          icon={<Award className="w-5 h-5" />}
          color="violet"
          delay={0.2}
        />
      </div>

      {/* ── Section 2: Conversion Funnel ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <ConversionFunnel data={funnelData} />
      </motion.div>

      {/* ── Section 3: KPI vs Target ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <KpiTargetChart data={kpiVsTarget} />
      </motion.div>

      {/* ── Section 4: Growth Trend + Location Analysis ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <GrowthTrendChart data={cumulativeData} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <LocationProfitabilityChart data={locationSummaries} />
        </motion.div>
      </div>

      {/* ── Section 5: Value Leakage + Insights ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <ValueLeakageChart data={valueLeakage} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="lg:col-span-2"
        >
          <ExecutiveInsights
            monthSummaries={monthSummaries}
            locationSummaries={locationSummaries}
            noShowRate={valueLeakage.noShowRate}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExecutiveView;
