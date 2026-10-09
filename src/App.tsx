/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Settings, 
  Globe, 
  Play, 
  Phone, 
  Download,
  Activity,
  Battery, 
  Wifi, 
  Signal,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Image,
  Volume2 as VolumeIcon,
  Maximize,
  TrendingUp,
  ChevronRight,
  Fingerprint,
  Users,
  Clock,
  Cpu as CpuIcon,
  Mic,
  X
} from 'lucide-react';
import { AppId, WindowState } from './types';
import AIAssistant from './apps/AIAssistant';
import SettingsApp from './apps/SettingsApp';
import BrowserApp from './apps/BrowserApp';
import MediaApp from './apps/MediaApp';
import PhoneApp from './apps/PhoneApp';
import InstallerApp from './apps/InstallerApp';
import DiagnosticsApp from './apps/DiagnosticsApp';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootStatus, setBootStatus] = useState('Initializing Kernel...');
  const [memUsage, setMemUsage] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      const pm = (performance as any).memory;
      if (pm) {
        setMemUsage(Math.round((pm.usedJSHeapSize / pm.jsHeapSizeLimit) * 100));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Persistent Settings
  const [bgImage, setBgImage] = useState<string | null>(() => localStorage.getItem('nexus_bg') || null);
  const [performanceMode, setPerformanceMode] = useState(() => {
    const saved = localStorage.getItem('nexus_perf');
    return saved ? parseInt(saved) : 85;
  });
  const [volMaster, setVolMaster] = useState(() => {
    const saved = localStorage.getItem('nexus_vol_master');
    return saved ? parseInt(saved) : 80;
  });
  const [volMedia, setVolMedia] = useState(() => {
    const saved = localStorage.getItem('nexus_vol_media');
    return saved ? parseInt(saved) : 100;
  });
  
  useEffect(() => {
    if (bgImage) localStorage.setItem('nexus_bg', bgImage);
    else localStorage.removeItem('nexus_bg');
  }, [bgImage]);

  useEffect(() => {
    localStorage.setItem('nexus_perf', performanceMode.toString());
  }, [performanceMode]);

  useEffect(() => {
    localStorage.setItem('nexus_vol_master', volMaster.toString());
  }, [volMaster]);

  useEffect(() => {
    localStorage.setItem('nexus_vol_media', volMedia.toString());
  }, [volMedia]);

  const [themeColor, setThemeColor] = useState('cyan');
  
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'ai', title: 'Nexus AI', isOpen: true, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'settings', title: 'System Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'browser', title: 'Chrome Search', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'media', title: 'Media Hub', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'phone', title: 'Phone & Network', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'installer', title: 'Universal Installer', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'diagnostics', title: 'System Diagnostics', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  ]);

  const [activeId, setActiveId] = useState<AppId | null>('ai');

  // Audio Engine Context
  useEffect(() => {
    if (isBooting || isLocked) return;
    
    let audioCtx: AudioContext | null = null;
    let oscillator: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;

    const startAudio = () => {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      oscillator = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      // Pitch shifts based on performance mode
      oscillator.frequency.setValueAtTime(40 + (performanceMode / 2), audioCtx.currentTime);
      
      // Variable volume based on performance (fans ramping up) + master volume setting
      const targetVol = (performanceMode / 1000) * 0.1 * (volMaster / 100);
      gainNode.gain.setValueAtTime(targetVol, audioCtx.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
    };

    const handleInteraction = () => {
      if (!audioCtx) startAudio();
      window.removeEventListener('click', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);

    return () => {
      if (oscillator) oscillator.stop();
      if (audioCtx) audioCtx.close();
      window.removeEventListener('click', handleInteraction);
    };
  }, [isBooting, isLocked, performanceMode]);

  useEffect(() => {
    if (isBooting) {
      const statuses = [
        'Initializing Google Android Core...',
        'Establishing Cross-Platform Bridge...',
        'Nexus-AI Neural Grid Syncing...',
        'Applying Immersion UI Layer...',
        'Kernel Ready for Handover.'
      ];
      let current = 0;
      const interval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          if (prev > (current + 1) * 20) {
            current++;
            setBootStatus(statuses[Math.min(current, statuses.length - 1)]);
          }
          return prev + Math.random() * 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isBooting]);

  const toggleWindow = useCallback((id: AppId) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        const newState = { ...w, isOpen: !w.isOpen, isMinimized: false };
        if (newState.isOpen) setActiveId(id);
        return newState;
      }
      return w;
    }));
  }, []);

  const focusWindow = useCallback((id: AppId) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 0);
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w);
    });
    setActiveId(id);
  }, []);

  const closeWindow = useCallback((id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    if (activeId === id) setActiveId(null);
  }, [activeId]);

  const minimizeWindow = useCallback((id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeId === id) setActiveId(null);
  }, [activeId]);

  const apps = useMemo(() => ([
    { id: 'ai', title: 'Nexus AI', Icon: Bot, Component: AIAssistant, color: 'text-blue-400' },
    { 
      id: 'settings', 
      title: 'Settings', 
      Icon: Settings, 
      Component: () => <SettingsApp 
        onBgChange={setBgImage} 
        onPerformanceChange={setPerformanceMode} 
        onVolMasterChange={setVolMaster}
        onVolMediaChange={setVolMedia}
        currentPerformance={performanceMode}
        currentBg={bgImage}
        volMaster={volMaster}
        volMedia={volMedia}
      />, 
      color: 'text-gray-400' 
    },
    { id: 'browser', title: 'Chrome', Icon: Globe, Component: BrowserApp, color: 'text-emerald-400' },
    { id: 'media', title: 'Media Hub', Icon: Play, Component: () => <MediaApp currentVolume={volMedia} />, color: 'text-purple-400' },
    { id: 'phone', title: 'Phone', Icon: Phone, Component: PhoneApp, color: 'text-orange-400' },
    { id: 'installer', title: 'Installer', Icon: Download, Component: InstallerApp, color: 'text-cyan-400' },
    { id: 'diagnostics', title: 'Diagnostics', Icon: Activity, Component: DiagnosticsApp, color: 'text-rose-400' },
  ]), []);

  return (
    <div className="h-screen w-screen bg-[#020205] text-[#e0e0e0] overflow-hidden font-sans relative select-none">
      <AnimatePresence>
        {isBooting ? (
          <motion.div 
            key="boot-screen"
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 z-50 bg-[#020205] flex flex-col items-center justify-center p-12 space-y-12"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="w-48 h-48 rounded-full border-2 border-dashed border-cyan-500/20"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-blue-500/40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Bot size={64} className="text-cyan-400 glow-text-cyan" />
              </div>
            </div>

            <div className="space-y-6 w-full max-w-sm">
              <div className="text-center space-y-1">
                <h1 className="text-3xl font-black italic tracking-tighter text-white">NEXUS-AI OS</h1>
                <p className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-[0.5em]">{bootStatus}</p>
              </div>

              <div className="space-y-2">
                <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${bootProgress}%` }}
                    className="h-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-600">
                  <span>KERNEL: v4.2.0-STABLE</span>
                  <span>{Math.round(bootProgress)}%</span>
                </div>
              </div>

              {bootProgress > 40 && bootProgress < 100 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-black/40 border border-white/5 rounded-xl p-4 space-y-2"
                >
                  <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Boot-Time Orchestration</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-slate-500">
                      <span>&gt; STAGING Win32_Runtime.msi</span>
                      <span className="text-emerald-400">READY</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-slate-500">
                      <span>&gt; SYNCING macOS_Quartz.dmg</span>
                      <span className="text-cyan-400 animate-pulse">PENDING...</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-slate-500">
                      <span>&gt; INJECTING Linux_Kernel_4.4</span>
                      <span className="text-white/20">WAITING</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {bootProgress >= 100 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4"
                >
                  <button 
                    onClick={() => setIsBooting(false)}
                    className="w-full py-4 bg-cyan-600 text-white font-black italic rounded-2xl hover:bg-cyan-500 transition-all text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(8,145,178,0.4)] group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      BOOT TO DESKTOP <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button className="w-full py-3 bg-white/5 border border-white/10 text-slate-400 font-bold rounded-2xl hover:bg-white/10 transition-all text-[10px] uppercase tracking-widest">
                    SYSTEM REINSTALL / ADVANCED RECOVERY
                  </button>
                </motion.div>
              )}
            </div>

            <div className="absolute bottom-12 text-[10px] text-slate-700 font-mono flex gap-8">
              <span>ANDROIDBRIDGE_ENABLED: TRUE</span>
              <span>CROSS_PROTO_LINK: ACTIVE</span>
              <span>SECURE_BOOT: ENFORCED</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!isBooting && isLocked ? (
          <motion.div 
            key="lock-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 z-[60] bg-black/60 backdrop-blur-3xl flex flex-col items-center justify-center space-y-12"
          >
            <div className="text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto shadow-2xl">
                <Users size={40} className="text-slate-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black italic tracking-tighter text-white">SYSTEM OPERATOR</h2>
                <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.4em]">Biometric Auth Required</p>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLocked(false)}
              className="group relative flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_50px_rgba(34,211,238,0.4)] transition-all overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                <Fingerprint size={40} className="relative z-10" />
                <motion.div 
                  animate={{ y: [0, 80] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-0 left-0 right-0 h-1 bg-cyan-400 blur-sm z-20"
                />
              </div>
              <span className="text-[10px] font-black italic text-cyan-400 uppercase tracking-widest animate-pulse">Touch Sensor to Unlock</span>
            </motion.button>

            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest">Emergency</div>
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reboot OS</div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {bgImage ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        ) : (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[100px]" />
          </>
        )}
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all ${performanceMode > 100 ? 'backdrop-sepia-[0.1] contrast-125' : ''}`} />
      </div>

      {/* Top System Bar */}
      <div className="h-10 w-full bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-50 relative">
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-sm shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-white/70 font-mono">NexusOS v4.2 // AI Core Active</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-all">
            <Users size={12} className="text-cyan-400" />
            <span className="text-[10px] font-mono text-white/60">Operator_01</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
            <span className="text-[10px] text-green-400 font-mono uppercase tracking-tighter">Neural Link Established</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold text-white/60 font-mono">
            <span className="flex items-center gap-1"><Signal size={12} /> 5G UW</span>
            <span className="flex items-center gap-1"><Battery size={12} /> 78%</span>
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="relative z-10 p-6 flex flex-col md:flex-row gap-12 w-full h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-4 w-fit h-fit order-2 md:order-1">
          {apps.map(app => (
            <button
              key={app.id}
              onClick={() => toggleWindow(app.id)}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/5 transition-all group active:scale-95 text-center"
            >
              <div className={`w-12 h-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg group-hover:border-white/20 transition-all ${app.color}`}>
                <app.Icon size={24} />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 drop-shadow-md">{app.title}</span>
            </button>
          ))}
        </div>

        {/* Desktop Widgets */}
        <div className="flex-1 flex flex-col items-end gap-6 p-4 order-1 md:order-2">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-3xl bg-white/2 backdrop-blur-xl border border-white/5 space-y-4 w-64 shadow-2xl"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-4xl font-black italic tracking-tighter text-white">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </h3>
                <p className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-widest">
                  {new Date().toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                </p>
              </div>
              <Clock size={20} className="text-slate-700" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-3xl bg-white/2 backdrop-blur-xl border border-white/5 space-y-6 w-64 shadow-2xl"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Neural Lattice Load</label>
                <CpuIcon size={14} className="text-cyan-400" />
              </div>
              <div className="space-y-2">
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${memUsage}%` }}
                    className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]" 
                  />
                </div>
                <div className="flex justify-between text-[8px] font-mono text-slate-600">
                  <span>{memUsage}% CAPACITY</span>
                  <span>OPTIMIZED</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Thermal Output</label>
                <TrendingUp size={14} className="text-rose-400" />
              </div>
              <div className="flex gap-1 h-8 items-end">
                {[4, 7, 5, 8, 6, 9, 7, 5, 8, 6].map((h, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [`${h * 10}%`, `${(h + 2) * 10}%`, `${h * 10}%`] }}
                    transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                    className="flex-1 bg-rose-500/20 rounded-t-sm border-t border-rose-500/40"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-2xl bg-cyan-500/5 backdrop-blur-md border border-cyan-500/10 w-64 space-y-2"
          >
            <div className="flex items-center gap-2 text-cyan-400">
              <Bot size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">Assistant Suggestion</span>
            </div>
            <p className="text-[9px] text-slate-400 leading-tight italic">
              "System performance is peaking. Would you like me to allocate more buffers to the Media Hub?"
            </p>
          </motion.div>
        </div>
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none pt-10">
        <AnimatePresence>
          {windows.filter(w => w.isOpen && !w.isMinimized).map(win => {
            const app = apps.find(a => a.id === win.id)!;
            return (
              <motion.div
                key={win.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                style={{ zIndex: win.zIndex }}
                className="absolute inset-4 md:inset-12 pointer-events-auto flex flex-col pt-10"
              >
                <div 
                  onMouseDown={() => focusWindow(win.id)}
                  className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-t-2xl px-4 py-2.5 flex items-center justify-between shadow-2xl"
                >
                  <div className="flex gap-2 mr-4">
                    <button onClick={() => closeWindow(win.id)} className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors" title="Close" />
                    <button onClick={() => minimizeWindow(win.id)} className="w-3 h-3 rounded-full bg-yellow-500/50 hover:bg-yellow-500 transition-colors" title="Minimize" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex items-center gap-3">
                    <app.Icon size={14} className={app.color} />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40">{win.title}</span>
                  </div>
                  <div className="w-20" />
                </div>
                <div className="flex-1 bg-black/40 backdrop-blur-3xl border-x border-b border-white/10 rounded-b-2xl overflow-hidden relative shadow-inner">
                  <app.Component />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Bottom Task Dock */}
      <div className="absolute bottom-0 left-0 right-0 z-50 h-20 flex justify-center items-end pb-4 pointer-events-none">
        <div className="bg-white/10 backdrop-blur-3xl px-4 py-2 rounded-2xl border border-white/20 flex gap-4 shadow-2xl items-center pointer-events-auto">
          {apps.map(app => (
            <button
              key={app.id}
              onClick={() => toggleWindow(app.id)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative overflow-hidden group ${activeId === app.id ? 'bg-white/10 text-white border border-white/20' : 'text-slate-400 hover:bg-white/5'}`}
            >
              <app.Icon size={20} className={activeId === app.id ? 'text-cyan-400' : ''} />
              {activeId === app.id && (
                <motion.div 
                  layoutId="active-dock-indicator" 
                  className="absolute bottom-0.5 left-1.5 right-1.5 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" 
                />
              )}
            </button>
          ))}
          <div className="w-[1px] h-6 bg-white/10 mx-1" />
          <button className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 text-slate-400 hover:bg-white/20">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* System Scanlines Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[100] scanlines" />
    </div>
  );
}
