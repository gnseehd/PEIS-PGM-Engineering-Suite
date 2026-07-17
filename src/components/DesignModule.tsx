import { useState } from 'react';
import { BOMItem, LogEntry } from '../types';
import { Upload, FileCheck, Table, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface DesignModuleProps {
  onAddLog: (message: string, level: LogEntry['level']) => void;
}

export default function DesignModule({ onAddLog }: DesignModuleProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [bomData, setBomData] = useState<BOMItem[]>([]);

  const simulateProcessing = () => {
    setIsProcessing(true);
    onAddLog('Initiating CATIA V5 Assembly Analysis...', 'info');
    
    setTimeout(() => {
      onAddLog('Scanning Product Tree structure...', 'info');
      setTimeout(() => {
        onAddLog('Extracting Part Numbers and Materials...', 'info');
        setTimeout(() => {
          const mockBOM: BOMItem[] = [
            { id: '1', partNumber: 'PGM-FR-001', name: 'Forward Fuselage', material: 'AL7075-T6', weight: 4.5, quantity: 1, status: 'valid' },
            { id: '2', partNumber: 'PGM-WN-012', name: 'Main Wing L/R', material: 'CFRP', weight: 1.2, quantity: 2, status: 'valid' },
            { id: '3', partNumber: 'STD-BLT-M6', name: 'Hex Bolt M6', material: 'SUS304', weight: 0.05, quantity: 24, status: 'warning' },
            { id: '4', partNumber: 'PGM-EL-999', name: 'Battery Housing', material: 'TBD', weight: 0.8, quantity: 1, status: 'invalid' },
          ];
          setBomData(mockBOM);
          onAddLog('BOM Extraction complete. Found 4 line items.', 'success');
          onAddLog('Drawing Integrity Check: 1 discrepancy found in PGM-EL-999 (Material TBD)', 'warn');
          setIsProcessing(false);
        }, 800);
      }, 600);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Smart BOM & Drawing Validator</h2>
          <p className="text-slate-400">Automated CATIA assembly analysis and ERP sync.</p>
        </div>
        <button 
          onClick={simulateProcessing}
          disabled={isProcessing}
          className="flex items-center gap-2 bg-pgm-primary hover:bg-sky-400 text-white px-4 py-2 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isProcessing ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Upload size={18} />
            </motion.div>
          ) : <Upload size={18} />}
          Start Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg flex items-center gap-4">
          <div className="bg-blue-500/20 p-3 rounded-full text-blue-400">
            <FileCheck size={24} />
          </div>
          <div>
            <div className="text-sm text-slate-400">Drawing Status</div>
            <div className="text-xl font-bold">94% Compliant</div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg flex items-center gap-4">
          <div className="bg-emerald-500/20 p-3 rounded-full text-emerald-400">
            <Table size={24} />
          </div>
          <div>
            <div className="text-sm text-slate-400">Total Items</div>
            <div className="text-xl font-bold">{bomData.length || '--'} Items</div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg flex items-center gap-4">
          <div className="bg-amber-500/20 p-3 rounded-full text-amber-400">
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="text-sm text-slate-400">Issues Flagged</div>
            <div className="text-xl font-bold">{bomData.filter(i => i.status !== 'valid').length || '--'} Critical</div>
          </div>
        </div>
      </div>

      {bomData.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-xl"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-300 text-sm uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Part Number</th>
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium">Material</th>
                <th className="px-6 py-3 font-medium text-right">Qty</th>
                <th className="px-6 py-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {bomData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">{item.partNumber}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4 text-slate-400">{item.material}</td>
                  <td className="px-6 py-4 text-right font-mono">{item.quantity}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      item.status === 'valid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      item.status === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
