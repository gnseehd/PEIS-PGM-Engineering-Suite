import { EngineeringModule } from '../types';
import { LayoutDashboard, Compass, Cpu, Database, Info, LogOut } from 'lucide-react';

interface SidebarProps {
  activeModule: EngineeringModule;
  onModuleChange: (module: EngineeringModule) => void;
}

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const menuItems = [
    { id: 'design', label: 'Design & BOM', icon: LayoutDashboard },
    { id: 'analysis', label: 'Analysis Suite', icon: Cpu },
    { id: 'test', label: 'Test & Telemetry', icon: Compass },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
      <nav className="flex-1 p-4 space-y-2">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">Core Modules</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onModuleChange(item.id as EngineeringModule)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              activeModule === item.id 
                ? 'bg-pgm-primary/10 text-pgm-primary border border-pgm-primary/20 shadow-lg shadow-pgm-primary/5' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <item.icon size={20} className={activeModule === item.id ? 'text-pgm-primary' : 'group-hover:text-slate-200'} />
            <span className="font-medium text-sm">{item.label}</span>
            {activeModule === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-pgm-primary shadow-[0_0_8px_rgba(14,165,233,0.8)]"></div>
            )}
          </button>
        ))}

        <div className="pt-8 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">Resources</div>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all group">
          <Database size={20} />
          <span className="font-medium text-sm">ERP Database</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all group">
          <Info size={20} />
          <span className="font-medium text-sm">Standard Library</span>
        </button>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/5 transition-all">
          <LogOut size={20} />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
