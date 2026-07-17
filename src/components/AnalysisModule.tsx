import { useState } from 'react';
import { AnalysisResult, LogEntry } from '../types';
import { Play, ShieldCheck, Activity, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface AnalysisModuleProps {
  onAddLog: (message: string, level: LogEntry['level']) => void;
}

export default function AnalysisModule({ onAddLog }: AnalysisModuleProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);

  const runAnalysis = () => {
    setIsProcessing(true);
    onAddLog('Batch Analysis Triggered: ANSYS Mechanical Solver...', 'info');
    
    setTimeout(() => {
      onAddLog('Loading Load Case 01: Max Acceleration (15G)...', 'info');
      setTimeout(() => {
        onAddLog('Loading Load Case 02: Thermal Expansion (70C)...', 'info');
        setTimeout(() => {
          const mockResults: AnalysisResult[] = [
            { id: 'c1', caseName: 'Max Accel (15G)', maxStress: 450, safetyFactor: 1.8, status: 'safe' },
            { id: 'c2', caseName: 'Vibration (Modal)', maxStress: 210, safetyFactor: 3.2, status: 'safe' },
            { id: 'c3', caseName: 'Impact (Drop)', maxStress: 780, safetyFactor: 1.1, status: 'critical' },
          ];
          setResults(mockResults);
          onAddLog('Analysis complete. Post-processing reports...', 'success');
          onAddLog('Safety Factor calculation finished. 1 critical node detected.', 'warn');
          setIsProcessing(false);
        }, 1000);
      }, 700);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Automated Analysis Post-Processor</h2>
          <p className="text-slate-400">Structural integrity and safety factor automation.</p>
        </div>
        <button 
          onClick={runAnalysis}
          disabled={isProcessing}
          className="flex items-center gap-2 bg-pgm-primary hover:bg-sky-400 text-white px-4 py-2 rounded-md transition-all disabled:opacity-50 font-medium"
        >
          <Play size={18} fill="currentColor" />
          Run Solver
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-300 flex items-center gap-2">
            <Activity size={20} className="text-pgm-primary" />
            Current Load Cases
          </h3>
          <div className="space-y-3">
            {results.length > 0 ? results.map((res) => (
              <motion.div 
                key={res.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="font-bold">{res.caseName}</div>
                  <div className="text-xs text-slate-500 font-mono">Max Stress: {res.maxStress} MPa</div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-display font-bold ${
                    res.status === 'safe' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    SF: {res.safetyFactor}
                  </div>
                  <div className={`text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded border ${
                    res.status === 'safe' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 'text-amber-500 border-amber-500/20 bg-amber-500/5'
                  }`}>
                    {res.status}
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="h-48 border-2 border-dashed border-slate-800 rounded-lg flex items-center justify-center text-slate-600 italic">
                No active analysis results
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-300 flex items-center gap-2">
              <FileText size={20} className="text-pgm-primary" />
              Report Generation
            </h3>
            <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-mono">AUTO-GEN V1.2</span>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-center gap-4">
              <div className="bg-orange-500/20 p-2 rounded text-orange-400">
                <ShieldCheck size={20} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Safety Factor Audit</div>
                <div className="text-xs text-slate-500">Margin of safety validation against MIL-STD-1540.</div>
              </div>
              <button className="text-xs text-pgm-primary font-bold hover:underline">CONFIG</button>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Draft Status</span>
                <span className="text-sm font-mono">{results.length > 0 ? 'READY' : 'WAITING'}</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: results.length > 0 ? '100%' : '0%' }}
                  className="bg-pgm-primary h-full"
                />
              </div>
            </div>

            <button 
              disabled={results.length === 0}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:bg-slate-900 border border-slate-700 rounded-lg font-bold text-sm transition-all"
            >
              GENERATE PPT REPORT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
