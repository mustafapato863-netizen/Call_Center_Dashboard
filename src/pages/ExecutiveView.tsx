import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  UserCheck,
  Award,
  AlertOctagon,
  Clock
} from 'lucide-react';
import { usePerformanceData, formatSecondsToMMSS } from '../hooks/usePerformanceData';
import StatCard from '../components/common/StatCard';
import ConversionFunnel from '../components/charts/ConversionFunnel';
import KpiTargetChart from '../components/charts/KpiTargetChart';
import GrowthTrendChart from '../components/charts/GrowthTrendChart';
import LocationProfitabilityChart from '../components/charts/LocationProfitabilityChart';
import ValueLeakageChart from '../components/charts/ValueLeakageChart';
import ExecutiveInsights from '../components/charts/ExecutiveInsights';
import AgentRanking from '../components/charts/AgentRanking';
import type { LocationKey, MonthKey } from '../types';

function getGradeLabel(score: number): string {
  if (score >= 95) return 'Excellent';
  if (score >= 90) return 'Very Good';
  if (score >= 80) return 'Good';
  if (score >= 60) return 'Average';
  return 'Below Average';
}

const ExecutiveView = () => {
  const [searchParams] = useSearchParams();
  const month = (searchParams.get('month') || 'All') as MonthKey;
  const location = (searchParams.get('location') || 'all') as LocationKey;

  const {
    agents,
    trends,
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
      className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8"
    >
      {/* ── Section 1: Executive Summary KPIs ── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Dominant Performance Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-4 gradient-violet p-6 rounded-2xl shadow-lg border border-violet-400/30 flex flex-col sm:flex-row items-center justify-between relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
              <Award className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-violet-200 font-bold uppercase tracking-widest text-sm mb-1">Overall Performance Score</p>
              <div className="flex items-baseline gap-3">
                <h2 className="text-5xl font-black text-white tracking-tight">{strategicScore}%</h2>
                <span className="text-lg font-bold text-violet-200 bg-white/20 px-3 py-1 rounded-full">{getGradeLabel(strategicScore)}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-0 relative z-10 text-right">
            {trends && (
              <div className={`inline-flex items-center gap-2 border px-4 py-2 rounded-xl font-bold ${trends.scorePositive ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-100' : 'bg-red-500/20 border-red-400/30 text-red-100'}`}>
                <span className={`w-2 h-2 rounded-full ${trends.scorePositive ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`} />
                {trends.score} vs Last Month
              </div>
            )}
          </div>
        </motion.div>

        {/* 1. Attendance Rate (Highest Priority) */}
        <StatCard
          title="Patient Attendance Rate"
          value={`${(grandTotals.overallAttendRate * 100).toFixed(1)}%`}
          subtitle={`${grandTotals.totalAttended.toLocaleString()} total Volume`}
          icon={<UserCheck className="w-5 h-5" />}
          color="indigo"
          delay={0.1}
          comparison={trends?.attendRate}
          isPositive={trends?.attendRatePositive}
          status={(grandTotals.overallAttendRate * 100) >= 75 ? 'good' : 'bad'}
        />

        {/* 2. Booking Rate */}
        <StatCard
          title="Booking Conversion"
          value={`${(grandTotals.overallBookingRate * 100).toFixed(1)}%`}
          subtitle={`${grandTotals.totalBookings.toLocaleString()} total bookings`}
          icon={<CalendarCheck className="w-5 h-5" />}
          color="blue"
          delay={0.15}
          comparison={trends?.bookingRate}
          isPositive={trends?.bookingRatePositive}
          status={(grandTotals.overallBookingRate * 100) >= 45 ? 'good' : 'bad'}
        />

        {/* 3. AHT */}
        <StatCard
          title="Avg. Handle Time"
          value={formatSecondsToMMSS(avgAHTSeconds)}
          subtitle="Target: 2:30"
          icon={<Clock className="w-5 h-5" />}
          color="amber"
          delay={0.2}
          comparison={trends?.aht}
          isPositive={trends?.ahtPositive}
          status={avgAHTSeconds <= 150 ? 'good' : 'bad'}
        />

        {/* 4. Abandon Rate */}
        <StatCard
          title="Call Abandon Rate"
          value={`${(grandTotals.overallAbandonRate * 100).toFixed(1)}%`}
          subtitle={`${grandTotals.abandoned.toLocaleString()} missed opportunities`}
          icon={<AlertOctagon className="w-5 h-5" />}
          color="rose"
          delay={0.25}
          comparison={trends?.abandonRate}
          isPositive={trends?.abandonRatePositive}
          status={(grandTotals.overallAbandonRate * 100) <= 1 ? 'good' : 'bad'}
        />
      </div>

      {/* ── Section 2: Conversion Funnel ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="glass rounded-2xl shadow-sm border border-slate-100/50"
      >
        <ConversionFunnel data={funnelData} />
      </motion.div>

      {/* ── Section 3: KPI vs Target ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="glass rounded-2xl shadow-sm border border-slate-100/50"
      >
        <KpiTargetChart data={kpiVsTarget} />
      </motion.div>

      {/* ── Section 4: Growth Trend + Location Analysis ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="glass rounded-2xl shadow-sm border border-slate-100/50"
        >
          <GrowthTrendChart data={cumulativeData} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="glass rounded-2xl shadow-sm border border-slate-100/50"
        >
          <LocationProfitabilityChart data={locationSummaries} />
        </motion.div>
      </div>

      {/* ── Section 5: Value Leakage + Insights ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="glass rounded-2xl shadow-sm border border-slate-100/50"
        >
          <ValueLeakageChart data={valueLeakage} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="lg:col-span-2 glass rounded-2xl shadow-sm border border-slate-100/50"
        >
          <ExecutiveInsights
            monthSummaries={monthSummaries}
            locationSummaries={locationSummaries}
            noShowRate={valueLeakage.noShowRate}
          />
        </motion.div>
      </div>

      {/* ── Section 6: Agent Ranking ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        <AgentRanking agents={agents} />
      </motion.div>
    </motion.div>
  );
};

export default ExecutiveView;
