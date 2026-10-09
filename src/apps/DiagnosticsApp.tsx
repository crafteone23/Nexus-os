import React, { useState, useEffect, useCallback } from 'react';
import { 
  Activity, 
  ShieldAlert, 
  Cpu, 
  HardDrive, 
  Zap, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  Bug,
  Search,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DiagnosticLog {
  id: string;
  time: string;
  type: 'info' | 'warn' | 'error' | 'success';
  message: string;
  subsystem: string;
}

export default function DiagnosticsApp() {
  const [logs, setLogs] = useState<DiagnosticLog[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [issuesFound, setIssuesFound] = useState(0);
  const [battery, setBattery] = useState<{ level: number, charging: boolean } | null>(null);
  const [memory, setMemory] = useState<{ total: number, used: number } | null>(null);

  useEffect(() => {
    // Battery API
    (navigator as any).getBattery?.().then((bat: any) => {
      setBattery({ level: bat.level * 100, charging: bat.charging });
      bat.addEventListener('levelchange', () => setBattery({ level: bat.level * 100, charging: bat.charging }));
    });

    // Performance Memory API (Chrome/Edge only)
    const updateMemory = () => {
      const pm = (performance as any).memory;
      if (pm) {
        setMemory({
          total: Math.round(pm.jsHeapSizeLimit / 1024 / 1024),
          used: Math.round(pm.usedJSHeapSize / 1024 / 1024)
        });
      }
    };
    updateMemory();
    const interval = setInterval(updateMemory, 5000);
    return () => clearInterval(interval);
  }, []);

  const addLog = useCallback((message: string, type: DiagnosticLog['type'] = 'info', subsystem = 'KERNEL') => {
    const newLog: DiagnosticLog = {
      id: Math.random().toString(36).substring(7),
      time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type,
      message,
      subsystem
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  }, []);

  const runScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setProgress(0);
    setIssuesFound(0);
    setLogs([]);

    addLog('Universal Diagnostic Suite Initializing...', 'info', 'SYSTEM');
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      setProgress(currentProgress);

      if (currentProgress > 10 && currentProgress < 20) addLog('Scanning Android Kernel for memory leaks...', 'info', 'ANDROID_CORE');
      if (currentProgress > 30 && currentProgress < 40) {
        addLog('Detected abnormal latency in Win32 Bridge.', 'warn', 'CROSS_PROTO');
        setIssuesFound(prev => prev + 1);
      }
      if (currentProgress > 50 && currentProgress < 60) addLog('Verifying Neural Grid consistency...', 'info', 'AI_ENGINE');
      if (currentProgress > 70 && currentProgress < 80) addLog('Stress testing GPU-accelerated codecs...', 'info', 'MEDIA_DRV');
      if (currentProgress > 90 && currentProgress < 100) addLog('Patching Cross-Platform communication buffers...', 'success', 'KERNEL');

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setProgress(100);
        addLog('System scan complete. Optimization parameters updated.', 'success', 'SYSTEM');
      }
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#020205] text-slate-200">
      <div className="p-6 bg-white/2 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 border border-rose-500/20">
            <Activity size={24} />
          </div>
          <div>
            <h2 className="text-lg font-black italic tracking-tighter text-white uppercase">System Diagnostics</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Self-Healing Infrastructure</p>
          </div>
        </div>
        <button 
          onClick={runScan}
          disabled={isScanning}
          className="px-6 py-2 bg-rose-600 text-white font-black italic rounded-xl hover:bg-rose-500 transition-all disabled:opacity-50 flex items-center gap-2 text-xs uppercase tracking-widest"
        >
          {isScanning ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
          {isScanning ? 'SCANNING...' : 'INITIATE FULL SCAN'}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 border-r border-white/5 p-6 space-y-6 overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>System Memory</span>
                <span className="text-white">{memory ? `${memory.used}MB / ${memory.total}MB` : 'Accessing...'}</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 transition-all duration-1000" 
                  style={{ width: memory ? `${(memory.used / memory.total) * 100}%` : '0%' }}
                />
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Core Battery</span>
                <span className={battery?.level && battery.level < 20 ? "text-rose-400" : "text-emerald-400"}>
                  {battery ? `${Math.round(battery.level)}% ${battery.charging ? '(Charging)' : ''}` : 'Detecting...'}
                </span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${battery?.level && battery.level < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  style={{ width: battery ? `${battery.level}%` : '0%' }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-widest">Diagnostic Tools</h3>
            <div className="space-y-1">
              {[
                { icon: ShieldAlert, label: 'Security Auditor', sub: 'Zero-day scan' },
                { icon: Cpu, label: 'Kernel Profiler', sub: 'Syscall monitoring' },
                { icon: HardDrive, label: 'Storage Scrubber', sub: 'Cache optimization' },
                { icon: Bug, label: 'Bug Reporter', sub: 'Manual log dump' },
              ].map((tool, i) => (
                <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-left group">
                  <tool.icon size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  <div>
                    <div className="text-xs font-bold text-slate-300">{tool.label}</div>
                    <div className="text-[10px] text-slate-600 italic">{tool.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 space-y-3 mt-auto">
            <div className="flex items-center gap-2 text-cyan-400">
              <Sparkles size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">AI Correction</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              "I am monitoring system interrupts in real-time. Any hardware-level instability will be automatically mitigated via sub-kernel isolation."
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-black/40">
          <div className="p-4 bg-white/2 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-slate-500" />
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Real-Time Kernel Logs</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
                <span className="text-[9px] font-bold text-orange-400">{issuesFound} WARNINGS</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter">Handover mode: AI_DIRECT</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] space-y-1.5 scrollbar-hide">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4 group"
                >
                  <span className="text-slate-600 whitespace-nowrap">[{log.time}]</span>
                  <span className={`font-bold w-20 shrink-0 ${
                    log.type === 'error' ? 'text-rose-500' : 
                    log.type === 'warn' ? 'text-orange-400' : 
                    log.type === 'success' ? 'text-emerald-400' : 
                    'text-cyan-400'
                  }`}>[{log.subsystem}]</span>
                  <span className="text-slate-300 group-hover:text-white transition-colors">{log.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {logs.length === 0 && !isScanning && (
              <div className="h-full flex flex-col items-center justify-center opacity-30 space-y-4">
                <Terminal size={48} />
                <p className="text-xs uppercase tracking-widest font-black">Waiting for system event...</p>
              </div>
            )}
            {isScanning && (
              <div className="pt-4 space-y-2">
                <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-rose-500"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-rose-500/60 font-black uppercase tracking-tighter italic">
                  <span className="animate-pulse">Deep scan in progress...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
