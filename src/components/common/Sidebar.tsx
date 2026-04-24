import { NavLink, useSearchParams } from 'react-router-dom';
import { HeartPulse, Users, Settings, Activity, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [searchParams] = useSearchParams();
  const qs = searchParams.toString();

  const menuItems = [
    { name: 'Strategic View', path: '/executive', icon: <Activity size={20} /> },
    { name: 'Operational View', path: '/operational', icon: <Users size={20} /> },
  ];

  return (
    <aside 
      className={`w-64 gradient-dark-sidebar h-screen fixed top-0 left-0 text-white flex flex-col border-r border-sidebar-border shrink-0 z-40 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >
      <div className="p-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="gradient-primary p-2.5 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-400/20">
            <HeartPulse size={24} className="text-white animate-pulse-glow" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              SGH Hub
            </h1>
            <span className="text-blue-400 text-xs block font-semibold tracking-wider uppercase">Intelligence</span>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-1 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 mt-8 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={`${item.path}${qs ? `?${qs}` : ''}`}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.05)]'
                  : 'text-slate-400 border border-transparent hover:bg-white/5 hover:text-slate-100'
              }`
            }
          >
            <div className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>
               {item.icon}
            </div>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white w-full rounded-xl transition-colors font-medium hover:bg-white/5">
          <Settings size={20} className="text-slate-500" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;