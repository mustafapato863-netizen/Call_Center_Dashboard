import { useLocation, useSearchParams } from 'react-router-dom';
import { Bell, CalendarDays, MapPin, ChevronDown } from 'lucide-react';
import { LOCATION_OPTIONS, MONTH_OPTIONS } from '../../types';
import type { LocationKey, MonthKey } from '../../types';

const routeTitles: Record<string, { title: string; subtitle: string }> = {
  '/executive': { title: 'Strategic Dashboard', subtitle: 'Executive performance overview' },
  '/operational': { title: 'Agent Performance', subtitle: 'Individual metrics & rankings' },
};

const Header = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { title, subtitle } = routeTitles[pathname] || routeTitles['/executive'];
  const currentMonth = (searchParams.get('month') || 'All') as MonthKey;
  const currentLocation = (searchParams.get('location') || 'all') as LocationKey;

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return (
    <header className="h-[72px] fixed top-0 right-0 left-64 z-30 px-8 flex items-center justify-between border-b border-white/20 bg-white/60 backdrop-blur-xl shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
        <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Month Filter */}
        <div className="relative">
          <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            id="filter-month"
            value={currentMonth}
            onChange={(e) => updateFilter('month', e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all cursor-pointer hover:bg-slate-100"
          >
            {MONTH_OPTIONS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Location Filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            id="filter-location"
            value={currentLocation}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all cursor-pointer hover:bg-slate-100"
          >
            {LOCATION_OPTIONS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Divider + User */}
        <div className="flex items-center gap-4 border-l pl-4 border-slate-200">
          <button className="text-slate-400 hover:text-slate-600 relative transition-colors" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 w-2 h-2 rounded-full border-2 border-white" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-700 leading-tight">Mustafa-Zain</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Data Analyst</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md shadow-blue-200">
              Z
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;