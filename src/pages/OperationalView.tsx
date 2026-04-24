import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePerformanceData } from '../hooks/usePerformanceData';
import OutlierAlerts from '../components/charts/OutlierAlerts';
import type { LocationKey, MonthKey } from '../types';

const ROWS_PER_PAGE = 15;

/** Truncate AHT like "00:02:10.813000" → "00:02:10" */
function formatAHT(raw: string): string {
  const dotIdx = raw.indexOf('.');
  return dotIdx >= 0 ? raw.substring(0, dotIdx) : raw;
}

function getScoreColor(score: number) {
  if (score >= 0.9) return { badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
  if (score >= 0.7) return { badge: 'bg-amber-100 text-amber-800 border-amber-200' };
  return { badge: 'bg-red-100 text-red-800 border-red-200' };
}

function getGradeColor(grade: string) {
  const g = grade.toLowerCase();
  if (g.includes('meet') || g.includes('exceed')) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  if (g.includes('average') && !g.includes('below')) return 'bg-amber-100 text-amber-800 border-amber-200';
  return 'bg-red-100 text-red-800 border-red-200';
}

function getRowBorder(score: number) {
  if (score >= 0.9) return 'border-l-4 border-l-emerald-500';
  if (score < 0.7) return 'border-l-4 border-l-red-400';
  return '';
}

type SortField = 'name' | 'month' | 'score' | 'booking_rate' | 'attend_rate' | 'abandon_rate' | 'inbound' | 'outbound';
type SortDir = 'asc' | 'desc';

const OperationalView = () => {
  const [searchParams] = useSearchParams();
  const month = (searchParams.get('month') || 'All') as MonthKey;
  const location = (searchParams.get('location') || 'all') as LocationKey;
  const { agents, outliers } = usePerformanceData(month, location);

  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(0);

  // Reset page when filters change
  useEffect(() => { setPage(0); }, [month, location]);

  const resetPage = () => setPage(0);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
    resetPage();
  };

  const filteredAgents = useMemo(() => {
    let result = agents;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((a) => a.identity.name.toLowerCase().includes(q));
    }
    result = [...result].sort((a, b) => {
      let av: number | string = 0;
      let bv: number | string = 0;
      switch (sortField) {
        case 'name': av = a.identity.name; bv = b.identity.name; break;
        case 'month': av = a.identity.month; bv = b.identity.month; break;
        case 'score': av = a.evaluation.score; bv = b.evaluation.score; break;
        case 'booking_rate': av = a.actual.booking_rate; bv = b.actual.booking_rate; break;
        case 'attend_rate': av = a.actual.attend_rate; bv = b.actual.attend_rate; break;
        case 'abandon_rate': av = a.actual.abandon_rate; bv = b.actual.abandon_rate; break;
        case 'inbound': av = a.calls.inbound; bv = b.calls.inbound; break;
        case 'outbound': av = a.calls.outbound; bv = b.calls.outbound; break;
      }
      if (typeof av === 'string' && typeof bv === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return result;
  }, [agents, search, sortField, sortDir]);

  const totalPages = Math.ceil(filteredAgents.length / ROWS_PER_PAGE);
  const paginatedAgents = filteredAgents.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th
      onClick={() => toggleSort(field)}
      className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-800 transition-colors select-none group"
    >
      <div className="flex items-center gap-1.5">
        {children}
        <ArrowUpDown className={`w-3.5 h-3.5 transition-colors ${sortField === field ? 'text-blue-500' : 'text-slate-300 group-hover:text-slate-400'}`} />
      </div>
    </th>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
<<<<<<< HEAD
      className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6"
=======
      className="p-6 xl:p-8 max-w-[1600px] mx-auto space-y-6"
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
    >
      {/* ── Outlier Alerts ── */}
      <OutlierAlerts
        highBookingLowAttend={outliers.highBookingLowAttend}
        highAHT={outliers.highAHT}
        highAbandon={outliers.highAbandon}
      />

      {/* ── Stats Bar + Search ── */}
<<<<<<< HEAD
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass p-4 rounded-2xl shadow-sm border border-slate-100/50">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Agents</span>
            <span className="text-base font-black text-slate-800">{filteredAgents.length}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Bookings</span>
            <span className="text-base font-black text-indigo-600">
              {filteredAgents.reduce((s, a) => s + a.locationBookings, 0).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Attended</span>
            <span className="text-base font-black text-violet-600">
              {filteredAgents.reduce((s, a) => s + a.locationAttended, 0).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Top (≥90%)</span>
            <span className="text-base font-black text-emerald-600">
              {filteredAgents.filter((a) => a.evaluation.score >= 0.9).length}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Low (&lt;70%)</span>
            <span className="text-base font-black text-red-600">
=======
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-slate-500">Agents:</span>
            <span className="font-bold text-slate-800">{filteredAgents.length}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-slate-500">Bookings:</span>
            <span className="font-bold text-indigo-600">
              {filteredAgents.reduce((s, a) => s + a.locationBookings, 0).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="text-slate-500">Attended:</span>
            <span className="font-bold text-violet-600">
              {filteredAgents.reduce((s, a) => s + a.locationAttended, 0).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-500">Top (≥90%):</span>
            <span className="font-bold text-emerald-600">
              {filteredAgents.filter((a) => a.evaluation.score >= 0.9).length}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-slate-500">Low (&lt;70%):</span>
            <span className="font-bold text-red-600">
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
              {filteredAgents.filter((a) => a.evaluation.score < 0.7).length}
            </span>
          </div>
        </div>

<<<<<<< HEAD
        <div className="relative w-full sm:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
=======
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
          <input
            id="agent-search"
            type="text"
            placeholder="Search agents by name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); resetPage(); }}
<<<<<<< HEAD
            className="w-full pl-11 pr-4 py-3 text-sm bg-white/60 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all placeholder:text-slate-400 shadow-sm hover:bg-white"
=======
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all placeholder:text-slate-400 shadow-sm"
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
          />
        </div>
      </div>

      {/* ── Agent Table ── */}
<<<<<<< HEAD
      <div className="overflow-hidden">
        <div className="overflow-x-auto pb-4">
          <table className="w-full border-separate border-spacing-y-2" id="agent-table">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider w-12">#</th>
                <SortHeader field="name">Name</SortHeader>
                <SortHeader field="month">Month</SortHeader>
                <SortHeader field="score">Score</SortHeader>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">Grade</th>
=======
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" id="agent-table">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">#</th>
                <SortHeader field="name">Name</SortHeader>
                <SortHeader field="month">Month</SortHeader>
                <SortHeader field="score">Score</SortHeader>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Grade</th>
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
                <SortHeader field="booking_rate">Booking %</SortHeader>
                <SortHeader field="attend_rate">Attend %</SortHeader>
                <SortHeader field="abandon_rate">Abandon %</SortHeader>
                <SortHeader field="inbound">Inbound</SortHeader>
                <SortHeader field="outbound">Outbound</SortHeader>
<<<<<<< HEAD
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">AHT</th>
              </tr>
            </thead>
            <tbody className="">
=======
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">AHT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
              <AnimatePresence mode="popLayout">
                {paginatedAgents.map((agent, i) => {
                  const rank = page * ROWS_PER_PAGE + i + 1;
                  const scoreColor = getScoreColor(agent.evaluation.score);
                  const gradeColor = getGradeColor(agent.evaluation.grade);
                  const rowBorder = getRowBorder(agent.evaluation.score);
                  return (
                    <motion.tr
                      key={`${agent.identity.name}-${agent.identity.month}`}
<<<<<<< HEAD
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: i * 0.03, ease: 'easeOut' }}
                      className={`table-row-card ${rowBorder}`}
                    >
                      <td className="px-4 py-4 text-sm font-bold text-slate-400 border-y border-l rounded-l-xl border-transparent">{rank}</td>
                      <td className="px-4 py-4 border-y border-transparent">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100/80 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0 border border-slate-200 shadow-sm">
                            {agent.identity.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                          </div>
                          <span className="text-sm font-extrabold text-slate-800 truncate max-w-[200px]">
=======
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, delay: i * 0.02 }}
                      className={`table-row-hover ${rowBorder}`}
                    >
                      <td className="px-4 py-3.5 text-sm font-medium text-slate-400">{rank}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                            {agent.identity.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                          </div>
                          <span className="text-sm font-medium text-slate-800 truncate max-w-[200px]">
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
                            {agent.identity.name}
                          </span>
                        </div>
                      </td>
<<<<<<< HEAD
                      <td className="px-4 py-4 text-sm font-medium text-slate-500 border-y border-transparent">{agent.identity.month}</td>
                      <td className="px-4 py-4 border-y border-transparent">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold border shadow-sm ${scoreColor.badge}`}>
                          <TrendingUp className="w-3.5 h-3.5" />
                          {(agent.evaluation.score * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-4 border-y border-transparent">
                        <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold border shadow-sm ${gradeColor}`}>
                          {agent.evaluation.grade}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-slate-700 border-y border-transparent">
                        {(agent.actual.booking_rate * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-slate-700 border-y border-transparent">
                        {(agent.actual.attend_rate * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-4 border-y border-transparent">
                        <span className={`text-sm font-bold ${agent.actual.abandon_rate > 0.01 ? 'text-red-600' : 'text-emerald-600'}`}>
                          {(agent.actual.abandon_rate * 100).toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 font-mono font-medium border-y border-transparent">
                        {agent.calls.inbound.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 font-mono font-medium border-y border-transparent">
                        {agent.calls.outbound.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-500 font-mono font-medium border-y border-r rounded-r-xl border-transparent">
=======
                      <td className="px-4 py-3.5 text-sm text-slate-600">{agent.identity.month}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${scoreColor.badge}`}>
                          <TrendingUp className="w-3 h-3" />
                          {(agent.evaluation.score * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold border ${gradeColor}`}>
                          {agent.evaluation.grade}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-sm font-medium text-slate-700">
                        {(agent.actual.booking_rate * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-3.5 text-sm font-medium text-slate-700">
                        {(agent.actual.attend_rate * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-sm font-medium ${agent.actual.abandon_rate > 0.01 ? 'text-red-600' : 'text-emerald-600'}`}>
                          {(agent.actual.abandon_rate * 100).toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-slate-700 font-mono">
                        {agent.calls.inbound.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-slate-700 font-mono">
                        {agent.calls.outbound.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-slate-500 font-mono">
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
                        {formatAHT(agent.calls.aht_raw)}
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
<<<<<<< HEAD
          <div className="flex items-center justify-between px-2 py-4 mt-2 border-t border-slate-200/50">
            <p className="text-sm text-slate-500 font-medium">
              Showing <span className="font-extrabold text-slate-700">{page * ROWS_PER_PAGE + 1}</span>
              {' – '}
              <span className="font-extrabold text-slate-700">
                {Math.min((page + 1) * ROWS_PER_PAGE, filteredAgents.length)}
              </span>{' '}
              of <span className="font-extrabold text-slate-700">{filteredAgents.length}</span> agents
=======
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-700">{page * ROWS_PER_PAGE + 1}</span>
              {' – '}
              <span className="font-semibold text-slate-700">
                {Math.min((page + 1) * ROWS_PER_PAGE, filteredAgents.length)}
              </span>{' '}
              of <span className="font-semibold text-slate-700">{filteredAgents.length}</span> agents
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
            </p>
            <div className="flex items-center gap-2">
              <button
                id="pagination-prev"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
<<<<<<< HEAD
                className="p-2 rounded-xl border border-slate-200/80 text-slate-500 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
=======
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
<<<<<<< HEAD
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                    page === i
                      ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                      : 'text-slate-500 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200/80'
=======
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    page === i
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                      : 'text-slate-500 hover:bg-slate-100'
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                id="pagination-next"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
<<<<<<< HEAD
                className="p-2 rounded-xl border border-slate-200/80 text-slate-500 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
=======
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OperationalView;
