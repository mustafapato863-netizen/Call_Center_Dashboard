import { useLocation, useSearchParams } from 'react-router-dom';
<<<<<<< HEAD
import { Bell, CalendarDays, MapPin, ChevronDown, Menu } from 'lucide-react';
=======
import { Bell, CalendarDays, MapPin, ChevronDown } from 'lucide-react';
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
import { LOCATION_OPTIONS, MONTH_OPTIONS } from '../../types';
import type { LocationKey, MonthKey } from '../../types';

const routeTitles: Record<string, { title: string; subtitle: string }> = {
<<<<<<< HEAD
  '/executive': { title: 'Call Center Performance', subtitle: 'Patient Conversion & Leakage Analysis' },
  '/operational': { title: 'Agent Performance', subtitle: 'Individual metrics & rankings' },
};

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
=======
  '/executive': { title: 'Strategic Dashboard', subtitle: 'Executive performance overview' },
  '/operational': { title: 'Agent Performance', subtitle: 'Individual metrics & rankings' },
};

const Header = () => {
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
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
<<<<<<< HEAD
    <header className="h-auto min-h-[76px] py-4 lg:py-0 lg:h-[76px] fixed top-0 right-0 left-0 lg:left-64 z-30 px-4 md:px-8 flex flex-col lg:flex-row lg:items-center justify-between glass gap-4 lg:gap-0 border-b border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-blue-500 transition-colors"
        >
          <Menu size={24} />
        </button>
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:gap-5">
        {/* Month Filter */}
        <div className="relative group flex-1 min-w-[120px]">
          <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" />
=======
    <header className="h-[72px] fixed top-0 right-0 left-64 z-30 px-8 flex items-center justify-between border-b border-white/20 bg-white/60 backdrop-blur-xl shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
        <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Month Filter */}
        <div className="relative">
          <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
          <select
            id="filter-month"
            value={currentMonth}
            onChange={(e) => updateFilter('month', e.target.value)}
<<<<<<< HEAD
            className="w-full appearance-none bg-white/50 border border-slate-200/60 text-slate-700 text-xs md:text-sm font-semibold rounded-xl pl-9 pr-8 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all cursor-pointer hover:bg-white hover:shadow-sm"
=======
            className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all cursor-pointer hover:bg-slate-100"
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
          >
            {MONTH_OPTIONS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
<<<<<<< HEAD
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" />
        </div>

        {/* Location Filter */}
        <div className="relative group flex-1 min-w-[120px]">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" />
=======
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Location Filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
          <select
            id="filter-location"
            value={currentLocation}
            onChange={(e) => updateFilter('location', e.target.value)}
<<<<<<< HEAD
            className="w-full appearance-none bg-white/50 border border-slate-200/60 text-slate-700 text-xs md:text-sm font-semibold rounded-xl pl-9 pr-8 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all cursor-pointer hover:bg-white hover:shadow-sm"
=======
            className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all cursor-pointer hover:bg-slate-100"
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
          >
            {LOCATION_OPTIONS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
<<<<<<< HEAD
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" />
        </div>

        {/* Divider + User */}
        <div className="flex items-center gap-3 md:gap-5 border-l pl-3 md:pl-5 border-slate-200/60 ml-auto">
          <button className="text-slate-400 hover:text-blue-500 relative transition-all duration-300 hover:scale-110 shrink-0" aria-label="Notifications">
            <Bell size={20} />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
          </button>
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden md:block group-hover:opacity-80 transition-opacity">
              <p className="text-sm font-bold text-slate-800 leading-tight">Mustafa-Zain</p>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Data Analyst</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 gradient-primary rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-shadow border border-blue-400/20 shrink-0">
=======
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
>>>>>>> 75b9f21d9db03d84bcebf32513cbcaca2a35aa6c
              Z
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;