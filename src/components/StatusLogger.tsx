import { useEffect, useRef } from 'react';
import { LogEntry } from '../types';
import { Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StatusLoggerProps {
  logs: LogEntry[];
}

export default function StatusLogger({ logs }: StatusLoggerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col h-full shadow-2xl">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
        <Terminal size={16} className="text-pgm-primary" />
        <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">Execution Logs</span>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1.5 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3 items-start"
            >
              <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
              <span className={`
                ${log.level === 'info' ? 'text-blue-400' : ''}
                ${log.level === 'warn' ? 'text-amber-400' : ''}
                ${log.level === 'error' ? 'text-red-400' : ''}
                ${log.level === 'success' ? 'text-emerald-400' : ''}
              `}>
                {log.level === 'error' ? '✖ ' : log.level === 'success' ? '✔ ' : '· '}
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {logs.length === 0 && (
          <div className="text-slate-700 italic">Waiting for process start...</div>
        )}
      </div>
    </div>
  );
}
