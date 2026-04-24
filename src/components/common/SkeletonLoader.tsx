// Skeleton shimmer building blocks
const Shimmer = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:400%_100%] animate-shimmer rounded-xl ${className}`} />
);

// Skeleton for a single StatCard
export const StatCardSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/60">
    <div className="flex justify-between items-start mb-4">
      <Shimmer className="w-11 h-11 rounded-xl" />
      <Shimmer className="w-20 h-5 rounded-md" />
    </div>
    <Shimmer className="w-24 h-3 mb-3 rounded" />
    <Shimmer className="w-28 h-9 mb-2 rounded" />
    <Shimmer className="w-36 h-3 mb-4 rounded" />
    <div className="pt-3 border-t border-slate-100/60">
      <Shimmer className="w-32 h-3 rounded" />
    </div>
  </div>
);

// Skeleton for a Hero/Score card
export const HeroSkeleton = () => (
  <div className="lg:col-span-4 bg-gradient-to-r from-violet-200 to-violet-300 p-6 rounded-2xl animate-pulse">
    <div className="flex items-center gap-6">
      <div className="w-20 h-20 rounded-full bg-white/30" />
      <div className="space-y-3">
        <Shimmer className="w-48 h-3 rounded bg-white/50" />
        <Shimmer className="w-32 h-12 rounded bg-white/50" />
      </div>
    </div>
  </div>
);

// Skeleton for a chart panel
export const ChartSkeleton = ({ height = 280 }: { height?: number }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
    <Shimmer className="w-40 h-4 mb-1 rounded" />
    <Shimmer className="w-56 h-3 mb-6 rounded" />
    <div className="flex items-end gap-3" style={{ height }}>
      {[60, 85, 55, 90, 70, 95, 65].map((h, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end">
          <Shimmer className="w-full rounded-t-lg animate-pulse" style={{ height: `${h}%` } as React.CSSProperties} />
        </div>
      ))}
    </div>
  </div>
);

// Skeleton for a table row
export const TableRowSkeleton = () => (
  <div className="flex items-center gap-4 px-4 py-4 bg-white rounded-xl border border-slate-100 shadow-sm">
    <Shimmer className="w-6 h-4 rounded" />
    <div className="flex items-center gap-3 flex-1">
      <Shimmer className="w-9 h-9 rounded-full shrink-0" />
      <Shimmer className="w-36 h-4 rounded" />
    </div>
    <Shimmer className="w-16 h-4 rounded" />
    <Shimmer className="w-20 h-6 rounded-lg" />
    <Shimmer className="w-20 h-6 rounded-lg" />
    <Shimmer className="w-14 h-4 rounded" />
    <Shimmer className="w-14 h-4 rounded" />
    <Shimmer className="w-14 h-4 rounded" />
    <Shimmer className="w-16 h-4 rounded font-mono" />
    <Shimmer className="w-16 h-4 rounded font-mono" />
    <Shimmer className="w-14 h-4 rounded" />
  </div>
);

// Full Executive View Skeleton
export const ExecutiveViewSkeleton = () => (
  <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8">
    {/* Hero + Stats */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <HeroSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>

    {/* Funnel */}
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <Shimmer className="w-40 h-4 mb-1 rounded" />
      <Shimmer className="w-56 h-3 mb-6 rounded" />
      <div className="flex flex-col lg:flex-row gap-4">
        {[1,2,3].map(i => (
          <div key={i} className="flex-1">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Shimmer className="w-9 h-9 rounded-xl" />
                <Shimmer className="w-28 h-3 rounded" />
              </div>
              <Shimmer className="w-24 h-9 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* KPI Chart */}
    <ChartSkeleton height={180} />

    {/* Two charts side by side */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartSkeleton height={220} />
      <ChartSkeleton height={220} />
    </div>

    {/* Leakage + Insights */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <Shimmer className="w-40 h-4 mb-4 rounded" />
        <div className="flex justify-center gap-6 mt-4">
          {[1, 2].map(i => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Shimmer className="w-28 h-28 rounded-full" />
              <Shimmer className="w-20 h-3 rounded" />
              <Shimmer className="w-24 h-5 rounded-md" />
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-6">
        <Shimmer className="w-48 h-4 mb-5 rounded bg-white/20" />
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white/5 rounded-xl p-4 mb-4">
            <Shimmer className="w-56 h-3 mb-3 rounded bg-white/20" />
            <Shimmer className="w-full h-3 mb-2 rounded bg-white/10" />
            <Shimmer className="w-4/5 h-3 mb-2 rounded bg-white/10" />
            <Shimmer className="w-3/5 h-3 rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>

    {/* Agent Ranking */}
    <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/60">
      <Shimmer className="w-48 h-4 mb-5 rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[0, 1].map(col => (
          <div key={col} className="space-y-3">
            <Shimmer className="w-32 h-3 mb-3 rounded" />
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100">
                <div className="flex items-center gap-3">
                  <Shimmer className="w-10 h-10 rounded-full" />
                  <div>
                    <Shimmer className="w-28 h-3 mb-1.5 rounded" />
                    <Shimmer className="w-16 h-2.5 rounded" />
                  </div>
                </div>
                <Shimmer className="w-20 h-5 rounded-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Full Operational View Skeleton
export const OperationalViewSkeleton = () => (
  <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
    {/* Alert bar */}
    <div className="bg-white rounded-2xl p-4 border border-slate-100">
      <Shimmer className="w-56 h-4 rounded" />
    </div>
    {/* Search bar */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100">
      <div className="flex items-center gap-6 flex-wrap">
        {[1,2,3,4,5].map(i => <Shimmer key={i} className="w-24 h-4 rounded" />)}
      </div>
      <Shimmer className="w-full sm:w-80 h-10 rounded-xl" />
    </div>
    {/* Table rows */}
    <div className="space-y-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <TableRowSkeleton key={i} />
      ))}
    </div>
  </div>
);
