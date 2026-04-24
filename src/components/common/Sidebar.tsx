import { NavLink, useSearchParams } from 'react-router-dom';
import { HeartPulse, Users, Settings, Activity } from 'lucide-react';

const Sidebar = () => {
  const [searchParams] = useSearchParams();
  const qs = searchParams.toString();

  const menuItems = [
    { name: 'Strategic View', path: '/executive', icon: <Activity size={20} /> },
    { name: 'Operational View', path: '/operational', icon: <Users size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 h-screen sticky top-0 text-white flex flex-col border-r border-slate-800 shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/30">
          <HeartPulse size={24} className="text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">
          Saudi German Hospital
          <span className="text-blue-400 text-sm block font-normal">Intelligence Hub</span>
        </h1>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={`${item.path}${qs ? `?${qs}` : ''}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white w-full rounded-xl transition-colors">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;