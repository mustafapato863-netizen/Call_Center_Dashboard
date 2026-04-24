import { useMemo } from 'react';
import rawData from '../data/all_months_performance.json';
import type { AgentRecord, LocationKey, MonthKey, GeoBreakdown } from '../types';

const allData = rawData as AgentRecord[];

/* ── Helpers ── */

function getGeoValue(geo: GeoBreakdown, location: LocationKey): number {
  if (location === 'all') {
    return geo.dubai + geo.sharjah + geo.ajman + geo.clinics;
  }
  return geo[location];
}

/** Parse "HH:MM:SS" → total seconds */
export function parseAHTtoSeconds(aht: string): number {
  const parts = aht.split(':').map(Number);
  return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
}

/** Seconds → "M:SS" display */
export function formatSecondsToMMSS(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ── Exported Interfaces ── */

export interface MonthSummary {
  month: string;
  monthFull: string;
  totalBookings: number;
  totalAttended: number;
  totalInbound: number;
  totalAbandoned: number;
  totalHandled: number;
  avgBookingRate: number;
  avgAttendRate: number;
  avgAbandonRate: number;
  agentCount: number;
}

export interface CumulativeMonthPoint {
  month: string;
  attended: number;
  target: number;
}

export interface LocationSummary {
  location: string;
  bookings: number;
  attended: number;
  showUpRate: number;
  noShowRate: number;
}

export interface ValueLeakageData {
  noShowRate: number;
  unconvertedRate: number;
}

export interface FunnelData {
  calls: number;
  bookings: number;
  attended: number;
  callToBookingRate: number;
  bookingToAttendRate: number;
}

export interface KpiVsTarget {
  label: string;
  actual: number;
  target: number;
  unit: string;
  isLowerBetter: boolean;
  isMet: boolean;
}

export interface AgentWithLocation extends AgentRecord {
  locationBookings: number;
  locationAttended: number;
  locationAttendRate: number;
}

/* ── Main Hook ── */

export function usePerformanceData(month: MonthKey, location: LocationKey) {
  return useMemo(() => {
    // Step 1: Filter by month
    let filtered = allData;
    if (month !== 'All') {
      filtered = filtered.filter((r) => r.identity.month === month);
    }

    // Step 2: Separate agents from "Total" rows
    const agents = filtered.filter(
      (r) => r.identity.name.toLowerCase() !== 'total'
    );
    const totalRows = filtered.filter(
      (r) => r.identity.name.toLowerCase() === 'total'
    );

    // Step 3: Compute agent-level display values adjusted by location
    const agentsWithLocationData: AgentWithLocation[] = agents.map((agent) => {
      const bookings = getGeoValue(agent.geo.bookings, location);
      const attended = getGeoValue(agent.geo.attended, location);
      return {
        ...agent,
        locationBookings: bookings,
        locationAttended: attended,
        locationAttendRate: bookings > 0 ? attended / bookings : 0,
      };
    });

    // Step 4: Build monthly summaries for charts
    const months = ['January', 'February', 'March'];
    const monthSummaries: MonthSummary[] = months.map((m) => {
      const monthAgents = allData.filter(
        (r) => r.identity.month === m && r.identity.name.toLowerCase() !== 'total'
      );

      let totalBookings = 0;
      let totalAttended = 0;
      let totalInbound = 0;
      let totalAbandoned = 0;
      let totalHandled = 0;

      monthAgents.forEach((a) => {
        totalBookings += getGeoValue(a.geo.bookings, location);
        totalAttended += getGeoValue(a.geo.attended, location);
        totalInbound += a.calls.inbound;
        totalAbandoned += a.calls.abandoned;
        totalHandled += a.calls.total_handled;
      });

      return {
        month: m.substring(0, 3),
        monthFull: m,
        totalBookings,
        totalAttended,
        totalInbound,
        totalAbandoned,
        totalHandled,
        avgBookingRate:
          monthAgents.length > 0
            ? monthAgents.reduce((s, a) => s + a.actual.booking_rate, 0) / monthAgents.length
            : 0,
        avgAttendRate:
          monthAgents.length > 0
            ? monthAgents.reduce((s, a) => s + a.actual.attend_rate, 0) / monthAgents.length
            : 0,
        avgAbandonRate:
          monthAgents.length > 0
            ? monthAgents.reduce((s, a) => s + a.actual.abandon_rate, 0) / monthAgents.length
            : 0,
        agentCount: monthAgents.length,
      };
    });

    // Step 5: Build per-month data for growth trend chart
    const cumulativeData: CumulativeMonthPoint[] = monthSummaries.map((ms) => ({
      month: `${ms.monthFull} 2026`,
      attended: ms.totalAttended,
      target: Math.round(ms.totalBookings * 0.75),
    }));

    // Step 6: Build location summaries with show-up & no-show rates
    const locationKeys: { key: keyof GeoBreakdown; label: string }[] = [
      { key: 'dubai', label: 'Dubai' },
      { key: 'sharjah', label: 'Sharjah' },
      { key: 'ajman', label: 'Ajman' },
      { key: 'clinics', label: 'Clinics' },
    ];

    const locationSummaries: LocationSummary[] = locationKeys.map(({ key, label }) => {
      let bookings = 0;
      let attended = 0;
      agents.forEach((a) => {
        bookings += a.geo.bookings[key];
        attended += a.geo.attended[key];
      });
      const showUpRate = bookings > 0 ? Math.round((attended / bookings) * 1000) / 10 : 0;
      return {
        location: label,
        bookings,
        attended,
        showUpRate,
        noShowRate: Math.round((100 - showUpRate) * 10) / 10,
      };
    });

    // Step 7: Compute grand totals
    const grandTotals = {
      inbound: agents.reduce((s, a) => s + a.calls.inbound, 0),
      outbound: agents.reduce((s, a) => s + a.calls.outbound, 0),
      totalHandled: agents.reduce((s, a) => s + a.calls.total_handled, 0),
      abandoned: agents.reduce((s, a) => s + a.calls.abandoned, 0),
      totalBookings: agents.reduce((s, a) => s + getGeoValue(a.geo.bookings, location), 0),
      totalAttended: agents.reduce((s, a) => s + getGeoValue(a.geo.attended, location), 0),
    };

    const overallBookingRate =
      grandTotals.totalHandled > 0 ? grandTotals.totalBookings / grandTotals.totalHandled : 0;
    const overallAttendRate =
      grandTotals.totalBookings > 0 ? grandTotals.totalAttended / grandTotals.totalBookings : 0;
    const overallAbandonRate =
      grandTotals.inbound > 0 ? grandTotals.abandoned / grandTotals.inbound : 0;

    // Step 8: Value leakage metrics
    const valueLeakage: ValueLeakageData = {
      noShowRate: 1 - overallAttendRate,
      unconvertedRate: 1 - overallBookingRate,
    };

    // Step 9: Strategic score
    const avgScore =
      agents.length > 0
        ? agents.reduce((s, a) => s + a.evaluation.score, 0) / agents.length
        : 0;

    // Step 10: Conversion funnel data
    const funnelData: FunnelData = {
      calls: grandTotals.totalHandled,
      bookings: grandTotals.totalBookings,
      attended: grandTotals.totalAttended,
      callToBookingRate: overallBookingRate,
      bookingToAttendRate: overallAttendRate,
    };

    // Step 11: Average AHT
    const totalAHTSeconds = agents.reduce(
      (s, a) => s + parseAHTtoSeconds(a.calls.aht_raw),
      0
    );
    const avgAHTSeconds = agents.length > 0 ? totalAHTSeconds / agents.length : 0;

    // Step 12: KPI vs Target
    const kpiVsTarget: KpiVsTarget[] = [
      {
        label: 'Booking Rate',
        actual: overallBookingRate * 100,
        target: 45,
        unit: '%',
        isLowerBetter: false,
        isMet: overallBookingRate * 100 >= 45,
      },
      {
        label: 'Attendance Rate',
        actual: overallAttendRate * 100,
        target: 75,
        unit: '%',
        isLowerBetter: false,
        isMet: overallAttendRate * 100 >= 75,
      },
      {
        label: 'Avg. Handle Time',
        actual: avgAHTSeconds,
        target: 150, // 2:30
        unit: 'time',
        isLowerBetter: true,
        isMet: avgAHTSeconds <= 150,
      },
      {
        label: 'Abandon Rate',
        actual: overallAbandonRate * 100,
        target: 1,
        unit: '%',
        isLowerBetter: true,
        isMet: overallAbandonRate * 100 <= 1,
      },
    ];

    // Step 13: Outlier detection
    const outliers = {
      highBookingLowAttend: agentsWithLocationData.filter(
        (a) => a.actual.booking_rate >= 0.5 && a.actual.attend_rate < 0.5
      ),
      highAHT: agentsWithLocationData.filter(
        (a) => parseAHTtoSeconds(a.calls.aht_raw) > 150
      ),
      highAbandon: agentsWithLocationData.filter(
        (a) => a.actual.abandon_rate > 0.02
      ),
    };

    return {
      agents: agentsWithLocationData,
      totalRows,
      monthSummaries,
      cumulativeData,
      locationSummaries,
      valueLeakage,
      strategicScore: Math.round(avgScore * 100),
      grandTotals: {
        ...grandTotals,
        overallBookingRate,
        overallAttendRate,
        overallAbandonRate,
      },
      funnelData,
      avgAHTSeconds,
      kpiVsTarget,
      outliers,
    };
  }, [month, location]);
}
