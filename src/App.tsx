/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { EngineeringModule, LogEntry } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StatusLogger from './components/StatusLogger';
import DesignModule from './components/DesignModule';
import AnalysisModule from './components/AnalysisModule';
import TestModule from './components/TestModule';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeModule, setActiveModule] = useState<EngineeringModule>('design');
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((message: string, level: LogEntry['level'] = 'info') => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message,
      level
    };
    setLogs(prev => [...prev, newLog]);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] text-slate-100 selection:bg-pgm-primary/30">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-6xl mx-auto space-y-8 pb-40">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeModule === 'design' && <DesignModule onAddLog={addLog} />}
                {activeModule === 'analysis' && <AnalysisModule onAddLog={addLog} />}
                {activeModule === 'test' && <TestModule onAddLog={addLog} />}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Status Logger Fixed Bottom */}
          <div className="fixed bottom-6 right-6 w-96 h-64 z-50">
            <StatusLogger logs={logs} />
          </div>
        </main>
      </div>
    </div>
  );
}
