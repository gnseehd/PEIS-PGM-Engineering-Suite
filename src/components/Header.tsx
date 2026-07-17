import { Shield, Bell, Settings, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <div className="bg-pgm-primary p-2 rounded-lg">
          <Shield className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight flex items-center gap-2">
            PEIS <span className="text-xs bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono font-normal">V1.0</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">PGM Engineering Integrated Suite</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          SOLVER ONLINE
        </div>
        
        <div className="h-8 w-px bg-slate-800 mx-2"></div>
        
        <button className="p-2 text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-2 text-slate-400 hover:text-white transition-colors">
          <Settings size={20} />
        </button>
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-800">
          <div className="text-right">
            <div className="text-xs font-bold">D. H. Kim</div>
            <div className="text-[10px] text-slate-500">Sr. Engineer</div>
          </div>
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-300">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
