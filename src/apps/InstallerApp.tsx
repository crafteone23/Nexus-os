import React, { useState, useCallback, useEffect } from 'react';
import { 
  Download, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Monitor, 
  Apple, 
  Wind, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Box,
  Binary,
  Layers,
  Sparkles,
  AlertTriangle,
  X,
  ShieldAlert,
  Camera,
  Mic,
  HardDrive,
  Globe,
  Fingerprint
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InstallTask {
  id: string;
  name: string;
  platform: 'Windows' | 'macOS' | 'Linux';
  progress: number;
  status: 'pending' | 'translating' | 'linking' | 'completed' | 'failed';
  steps: string[];
  permissions?: Record<string, boolean>;
}

interface AppPermission {
  id: string;
  label: string;
  description: string;
  icon: any;
}

interface PendingInstall {
  name: string;
  platform: 'Windows' | 'macOS' | 'Linux';
  requestedPermissions: string[];
}

const SYSTEM_PERMISSIONS: Record<string, AppPermission> = {
  camera: { id: 'camera', label: 'Surveillance Engine', description: 'Access to system camera & optical sensors', icon: Camera },
  mic: { id: 'mic', label: 'Audio Interceptor', description: 'Real-time microphone & frequency capture', icon: Mic },
  storage: { id: 'storage', label: 'Root Storage', description: 'Direct I/O access to local partitions', icon: HardDrive },
  network: { id: 'network', label: 'Packet Ingress', description: 'Socket connections & WAN transmission', icon: Globe },
  biometrics: { id: 'biometrics', label: 'Neural Identity', description: 'Biometric & fingerprint verification', icon: Fingerprint }
};

export default function InstallerApp() {
  const [tasks, setTasks] = useState<InstallTask[]>([]);
  const [pendingInstall, setPendingInstall] = useState<PendingInstall | null>(null);
  const [grantedPermissions, setGrantedPermissions] = useState<Record<string, boolean>>({});
  const [installedApps, setInstalledApps] = useState<string[]>(() => {
    const saved = localStorage.getItem('nexus_installed_apps');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDragging, setIsDragging] = useState(false);

  const togglePermission = (id: string) => {
    setGrantedPermissions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    localStorage.setItem('nexus_installed_apps', JSON.stringify(installedApps));
  }, [installedApps]);

  const startInstall = useCallback((name: string, platform: 'Windows' | 'macOS' | 'Linux') => {
    setPendingInstall(null);
    const id = Math.random().toString(36).substring(7);
    const newTask: InstallTask = {
      id,
      name,
      platform,
      progress: 0,
      status: 'pending',
      steps: [`Initializing translation layer for ${platform}...`],
      permissions: { ...grantedPermissions }
    };

    setTasks(prev => [newTask, ...prev]);

    // Simulate installation stages
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10;
      
      setTasks(prev => prev.map(t => {
        if (t.id === id) {
          const updatedSteps = [...t.steps];
          let status = t.status;

          if (currentProgress > 20 && t.progress <= 20) {
            updatedSteps.push(`Nexus-AI: Decompiling ${t.platform} binary...`);
            status = 'translating';
          }
          if (currentProgress > 50 && t.progress <= 50) {
            updatedSteps.push(`Kernel: Re-mapping API calls to Android Subsystem...`);
            status = 'linking';
          }
          if (currentProgress > 80 && t.progress <= 80) {
            updatedSteps.push(`Security: Hardening entry points and sandbox...`);
          }
          if (currentProgress >= 100) {
            currentProgress = 100;
            updatedSteps.push(`Success: ${name} is now natively available.`);
            status = 'completed';
            setInstalledApps(ia => [...new Set([...ia, name])]);
            clearInterval(interval);
          }

          return { ...t, progress: currentProgress, steps: updatedSteps, status };
        }
        return t;
      }));
    }, 400);
  }, []);

  const initiateInstall = (name: string, platform: 'Windows' | 'macOS' | 'Linux') => {
    const perms = Object.keys(SYSTEM_PERMISSIONS).filter(() => Math.random() > 0.4);
    
    // Default all to granted initially
    const initialPerms: Record<string, boolean> = {};
    perms.forEach(p => initialPerms[p] = true);
    setGrantedPermissions(initialPerms);
    
    setPendingInstall({ name, platform, requestedPermissions: perms });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Simulate detecting a file
    const mockFiles = [
      { name: 'Photoshop.exe', platform: 'Windows' as const },
      { name: 'FinalCut.dmg', platform: 'macOS' as const },
      { name: 'VSCode.deb', platform: 'Linux' as const }
    ];
    const picked = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    initiateInstall(picked.name, picked.platform);
  };

  return (
    <div className="flex h-full bg-[#020205] text-slate-200 relative">
      <AnimatePresence>
        {pendingInstall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-sm bg-[#0a0a10] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90%]"
            >
              <div className="p-6 space-y-5 overflow-y-auto scrollbar-hide flex-1">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                    <ShieldAlert size={24} />
                  </div>
                  <button 
                    onClick={() => setPendingInstall(null)}
                    className="p-2 rounded-full hover:bg-white/5 text-slate-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-black italic tracking-tighter text-white uppercase leading-none">Permission Audit</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target: {pendingInstall.name}</p>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    This binary is requesting access to the following system subsystems. Granting these may compromise sandbox isolation.
                  </p>
                </div>

                <div className="space-y-2">
                  {pendingInstall.requestedPermissions.map(pId => {
                    const perm = SYSTEM_PERMISSIONS[pId];
                    const isGranted = grantedPermissions[pId];
                    return (
                      <div key={pId} className="flex items-center gap-3 p-3 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-all">
                        <div className={`p-2 rounded-lg ${isGranted ? 'bg-cyan-500/10 text-cyan-400' : 'bg-rose-500/10 text-rose-400'} border border-current opacity-60`}>
                          <perm.icon size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">{perm.label}</div>
                          <div className="text-[8px] text-slate-500 truncate">{perm.description}</div>
                        </div>
                        <button 
                          onClick={() => togglePermission(pId)}
                          className={`w-10 h-5 rounded-full relative transition-colors ${isGranted ? 'bg-cyan-600' : 'bg-slate-800'}`}
                        >
                          <motion.div 
                            animate={{ x: isGranted ? 22 : 2 }}
                            className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full shadow-sm"
                          />
                        </button>
                      </div>
                    );
                  })}
                  {pendingInstall.requestedPermissions.length === 0 && (
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-center">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Clean Manifest: No Permissions Required</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-black/40 border-t border-white/5 space-y-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => setPendingInstall(null)}
                    className="flex-1 py-3 bg-white/5 border border-white/10 text-slate-400 font-bold rounded-xl hover:bg-white/10 transition-all text-xs uppercase tracking-widest"
                  >
                    Abort
                  </button>
                  <button
                    onClick={() => startInstall(pendingInstall.name, pendingInstall.platform)}
                    className="flex-1 py-3 bg-cyan-600 text-white font-black italic rounded-xl hover:bg-cyan-500 transition-all text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(8,145,178,0.3)]"
                  >
                    DEPLOY
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-[8px] font-mono text-cyan-400/40 uppercase tracking-[0.2em]">Cross-Platform Logic: {pendingInstall.platform === 'Windows' ? 'WIN32_BRIDGE' : pendingInstall.platform === 'macOS' ? 'QUARTZ_WRAP' : 'KERNEL_LXC'}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-80 border-r border-white/5 bg-black/20 p-6 space-y-8 flex flex-col">
        <div className="space-y-1">
          <h2 className="text-xl font-black italic tracking-tighter text-white flex items-center gap-2">
            <Download className="text-cyan-400" size={24} />
            AUTO-INSTALL
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Universal Translator v2.0</p>
        </div>

        <div className="space-y-4 flex-1">
          <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] border-b border-white/5 pb-2">Platform Hubs</div>
          <div className="grid grid-cols-1 gap-2">
            {[
              { icon: Wind, label: 'Windows (EXE/MSI)', sub: 'Win32 Bridge Active', color: 'text-blue-400' },
              { icon: Apple, label: 'macOS (DMG/APP)', sub: 'Quartz Overlay Ready', color: 'text-slate-300' },
              { icon: Box, label: 'Linux (DEB/RPM)', sub: 'Kernel Passthrough', color: 'text-orange-400' }
            ].map((p, i) => (
              <button 
                key={i}
                onClick={() => initiateInstall(`App-${i}`, p.label.split(' ')[0] as any)}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all text-left group"
              >
                <div className={`p-2 rounded-lg bg-black/40 border border-white/5 ${p.color}`}>
                  <p.icon size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-tight">{p.label}</div>
                  <div className="text-[10px] text-slate-500">{p.sub}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] border-b border-white/5 pb-2">Installed Desktop Core</div>
          <div className="space-y-1">
            {installedApps.map((app, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                <Box size={14} className="text-emerald-400" />
                <span className="text-[10px] font-bold text-white truncate">{app}</span>
                <span className="ml-auto text-[8px] font-mono text-emerald-400/60 uppercase">Active</span>
              </div>
            ))}
            {installedApps.length === 0 && <p className="text-[10px] text-slate-600 italic px-2">No apps mirrored yet.</p>}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sparkles size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">AI Suggestion</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed italic">
            "Your Nexus kernel detected a local Windows server. I can auto-link those .exe programs for zero-latency execution."
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`h-48 border-b border-dashed border-white/10 flex flex-col items-center justify-center transition-all ${isDragging ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-white/2'}`}
        >
          <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 mb-4 transition-transform ${isDragging ? 'scale-110' : ''}`}>
            <Binary size={32} className="text-cyan-400" />
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Drop Executable to Translate</p>
          <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-tighter font-mono">Compatible formats: .exe, .dmg, .deb, .rpm, .app</p>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Active Translation Queue</h3>
            {tasks.length > 0 && <span className="text-[10px] text-cyan-400 font-mono animate-pulse">{tasks.filter(t => t.status !== 'completed').length} JOBS PENDING</span>}
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {tasks.map(task => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-6 relative overflow-hidden"
                >
                  <div className={`p-4 rounded-xl flex items-center justify-center shrink-0 ${task.platform === 'Windows' ? 'bg-blue-500/10 text-blue-400' : task.platform === 'macOS' ? 'bg-slate-500/10 text-slate-300' : 'bg-orange-500/10 text-orange-400'}`}>
                    {task.platform === 'Windows' ? <Wind size={24} /> : task.platform === 'macOS' ? <Apple size={24} /> : <Box size={24} />}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{task.name}</h4>
                        <p className="text-xs text-slate-500 font-mono uppercase tracking-tighter">Target: Nexus-Android Core</p>
                      </div>
                      <div className="text-right">
                        {task.status === 'completed' ? (
                          <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase">
                            <CheckCircle2 size={14} /> INSTALLED
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-black uppercase">
                            <Loader2 size={14} className="animate-spin" /> {task.status}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${task.progress}%` }}
                          className={`h-full ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'}`}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-slate-600">
                        <span>{Math.round(task.progress)}% PROCESS</span>
                        <span>0.4ms LATENCY</span>
                      </div>
                    </div>

                    <div className="bg-black/40 rounded-lg p-3 space-y-1">
                      {task.steps.slice(-3).map((step, si) => (
                        <div key={si} className="text-[10px] font-mono text-cyan-300/60 leading-tight">
                          {`> ${step}`}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {tasks.length === 0 && (
              <div className="text-center py-12 space-y-4 border border-dashed border-white/5 rounded-3xl">
                <Terminal size={32} className="mx-auto text-slate-700" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">No active translations</p>
                  <p className="text-[10px] text-slate-700 max-w-xs mx-auto">Upload any desktop binary to begin the AI-powered cross-platform orchestration process.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
