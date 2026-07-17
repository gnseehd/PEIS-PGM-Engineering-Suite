import { useState } from 'react';
import { LogEntry, TestEvent, TestSignal } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Zap, Search, Download } from 'lucide-react';
import { motion } from 'motion/react';

interface TestModuleProps {
  onAddLog: (message: string, level: LogEntry['level']) => void;
}

export default function TestModule({ onAddLog }: TestModuleProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [data, setData] = useState<TestSignal[]>([]);
  const [events, setEvents] = useState<TestEvent[]>([]);

  const generateMockData = () => {
    setIsAnalyzing(true);
    onAddLog('Importing Telemetry Data (T+0 to T+60s)...', 'info');
    
    setTimeout(() => {
      onAddLog('Executing Signal Pre-processing: Noise Filtering...', 'info');
      
      const newData: TestSignal[] = Array.from({ length: 50 }, (_, i) => ({
        id: i.toString(),
        timestamp: i,
        value: 10 + Math.random() * 20 + Math.sin(i / 5) * 10
      }));

      setTimeout(() => {
        onAddLog('Running Peak & Event Detection Algorithm...', 'info');
        
        const newEvents: TestEvent[] = [
          { id: 'e1', type: 'Ignition', timestamp: 2, magnitude: 12.5, description: 'First stage ignition confirmed' },
          { id: 'e2', type: 'Max Q', timestamp: 24, magnitude: 45.8, description: 'Maximum dynamic pressure reached' },
          { id: 'e3', type: 'Shock Event', timestamp: 35, magnitude: 18.2, description: 'Separation shock detected' }
        ];

        setData(newData);
        setEvents(newEvents);
        onAddLog('FFT Analysis completed. Dominant frequency: 4.2Hz', 'success');
        setIsAnalyzing(false);
      }, 1200);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Intelligent Test Data Analyzer</h2>
          <p className="text-slate-400">Time-series signal processing and event detection.</p>
        </div>
        <div className="flex gap-2">
          <button 
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition-all font-medium border border-slate-700"
          >
            <Download size={18} />
            Export CSV
          </button>
          <button 
            onClick={generateMockData}
            disabled={isAnalyzing}
            className="flex items-center gap-2 bg-pgm-primary hover:bg-sky-400 text-white px-4 py-2 rounded-md transition-all disabled:opacity-50 font-medium"
          >
            <Search size={18} />
            Analyze Telemetry
          </button>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-inner">
        <h3 className="text-sm font-mono text-slate-500 mb-6 uppercase tracking-widest flex items-center gap-2">
          <Activity size={14} className="text-pgm-primary" />
          Vibration & Strain Signal (Real-time)
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="timestamp" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ color: '#0ea5e9' }}
              />
              <Area type="monotone" dataKey="value" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 p-4 rounded-lg relative overflow-hidden group hover:border-pgm-primary/50 transition-all"
          >
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
              <Zap size={48} className="text-pgm-primary" />
            </div>
            <div className="text-xs font-mono text-slate-500 mb-1">T + {event.timestamp}s</div>
            <div className="text-lg font-bold text-pgm-primary mb-2">{event.type}</div>
            <p className="text-sm text-slate-400 mb-4">{event.description}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs font-bold bg-slate-800 px-2 py-1 rounded text-slate-300">MAG: {event.magnitude}g</span>
              <button className="text-[10px] uppercase font-bold text-slate-500 hover:text-white transition-colors">Details</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
