import React, { useState } from 'react';
import { 
  Wifi, 
  Bluetooth, 
  Smartphone, 
  Globe, 
  Shield, 
  Cpu, 
  HardDrive, 
  Bell, 
  Layers,
  Zap,
  Radio,
  Network,
  ChevronRight,
  Palette,
  Volume2,
  Monitor,
  Settings,
  Image as ImageIcon,
  TrendingUp,
  Sliders
} from 'lucide-react';

interface SettingsProps {
  onBgChange: (url: string | null) => void;
  onPerformanceChange: (level: number) => void;
  onVolMasterChange: (level: number) => void;
  onVolMediaChange: (level: number) => void;
  currentPerformance: number;
  currentBg: string | null;
  volMaster: number;
  volMedia: number;
}

export default function SettingsApp({ 
  onBgChange, 
  onPerformanceChange, 
  onVolMasterChange,
  onVolMediaChange,
  currentPerformance, 
  currentBg,
  volMaster,
  volMedia
}: SettingsProps) {
  const [activeTab, setActiveTab] = useState<'connectivity' | 'appearance' | 'audio' | 'phone' | 'hardware'>('connectivity');

  const [overclockGB, setOverclockGB] = useState(currentPerformance);
  const [videoRes, setVideoRes] = useState(100); 

  const tabs = [
    { id: 'connectivity', label: 'Connectivity', icon: Wifi },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'audio', label: 'Audio Engine', icon: Volume2 },
    { id: 'phone', label: 'Phone Kernel', icon: Radio },
    { id: 'hardware', label: 'Hardware (OC)', icon: Cpu },
  ];

  return (
    <div className="flex h-full bg-[#020205]">
      {/* Sidebar Nav */}
      <div className="w-64 border-r border-white/5 bg-black/40 p-4 space-y-2 overflow-y-auto">
        <h2 className="text-xl font-black italic tracking-tighter p-2 mb-6 text-white flex items-center gap-2">
          <Settings className="text-cyan-400" size={20} />
          SYSTEM CONFIG
        </h2>
        <div className="space-y-1">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20' : 'text-slate-500 hover:bg-white/5'}`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-10 space-y-12 scrollbar-hide">
        
        {activeTab === 'connectivity' && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h1 className="text-2xl font-black text-white italic tracking-tighter">CONNECTIVITY</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Cross-Platform Bridge Protocol</p>
            </header>
            
            <div className="space-y-4">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">ACTIVE PROTOCOLS</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: "Win32 Emulation Layer", desc: "Allows native Windows .exe execution", active: true },
                  { label: "Android API Mirroring", desc: "Syncs Android notifications and storage", active: true },
                  { label: "Linux Hardware Bridge", desc: "Kernel-level driver passthrough", active: false }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/2 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <div>
                      <div className="text-sm font-bold text-slate-200">{item.label}</div>
                      <div className="text-[10px] text-slate-500 italic mt-0.5">{item.desc}</div>
                    </div>
                    <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${item.active ? 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-white/10'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-md ${item.active ? 'right-1' : 'left-1'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">NETWORK INTERCEPTION</label>
              <div className="bg-cyan-500/5 rounded-2xl border border-cyan-500/10 p-5 h-40 overflow-y-auto font-mono text-[10px] text-cyan-300/70 space-y-1.5 scrollbar-hide shadow-inner">
                <div className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" /> [INFO] Establishing TCP/IP over Nexus Bridge...</div>
                <div>[DATA] Packet Injection Active (Android Node)</div>
                <div>[SEC] Wireguard Tunnel Enabled (Global_AES_256)</div>
                <div>[INFO] Port 8080 mapping successfully redirecting to Windows_Subsystem...</div>
                <div className="text-white font-bold opacity-100">[CMD] Nexus-AI identified optimal DNS: 1.1.1.1</div>
                <div className="opacity-40 italic mt-2">// Kernel-mode networking layer heartbeat: OK</div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'appearance' && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h1 className="text-2xl font-black text-white italic tracking-tighter">APPEARANCE</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Universal UI Architect</p>
            </header>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">DESKTOP WALLPAPER</label>
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <ImageIcon className="absolute left-4 top-3.5 text-slate-500" size={16} />
                    <input 
                      type="text" 
                      placeholder="Enter Image URL (Unsplash, etc)..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-cyan-500/50 outline-none transition-all"
                      value={currentBg || ''}
                      onChange={(e) => onBgChange(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => onBgChange(null)}
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all"
                  >
                    RESET
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {[1,2,3,4].map(i => (
                    <button 
                      key={i}
                      onClick={() => onBgChange(`https://picsum.photos/seed/nexus${i}/1920/1080`)}
                      className="aspect-video rounded-lg bg-cover bg-center border border-white/10 hover:border-cyan-500 transition-all overflow-hidden"
                      style={{ backgroundImage: `url(https://picsum.photos/seed/nexus${i}/400/225)` }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">SYSTEM THEME ACCENT</label>
                <div className="flex gap-4">
                  {['cyan', 'emerald', 'blue', 'purple', 'rose'].map(color => (
                    <button 
                      key={color}
                      className={`w-12 h-12 rounded-2xl border-2 transition-all ${color === 'cyan' ? 'border-cyan-400 scale-110 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'border-transparent opacity-40 hover:opacity-100'}`}
                      style={{ backgroundColor: `var(--color-${color}-500)` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'audio' && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h1 className="text-2xl font-black text-white italic tracking-tighter">AUDIO ENGINE</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Hi-Res Spatial Output</p>
            </header>

            <div className="space-y-8 max-w-xl">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-white uppercase tracking-widest">Master Volume</label>
                  <span className="text-[10px] font-mono text-cyan-400">{volMaster}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={volMaster} 
                  onChange={(e) => onVolMasterChange(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500" 
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-white uppercase tracking-widest">Media Normalization</label>
                  <span className="text-[10px] font-mono text-cyan-400">{volMedia}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={volMedia} 
                  onChange={(e) => onVolMediaChange(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500" 
                />
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Acoustic Presets</h4>
                <div className="flex flex-wrap gap-2">
                  {['Flat', 'Dolby Atmos-AI', 'Studio Master', 'Deep Bass', 'Spatial Cinema'].map(p => (
                    <button key={p} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${p === 'Dolby Atmos-AI' ? 'bg-cyan-500 text-black shadow-[0_0_10px_#22d3ee]' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'phone' && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h1 className="text-2xl font-black text-white italic tracking-tighter">PHONE KERNEL</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Network & Telephony Bridge</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center gap-3 text-cyan-400">
                  <Shield size={20} />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Security Toggles</h4>
                </div>
                <div className="space-y-4 pt-2">
                  {[
                    { label: "Anonymize Caller ID", active: true },
                    { label: "Quantum Call Encryption", active: true },
                    { label: "VoIP Fallback over VPN", active: true }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-xs text-slate-300">{item.label}</span>
                      <div className={`w-8 h-4 bg-cyan-500 rounded-full relative`}><div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" /></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center gap-3 text-purple-400">
                  <Globe size={20} />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Roaming Control</h4>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="text-[10px] text-slate-500 font-mono italic">Carrier Subsystem: NEXUS_CORP_INTL</div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold">5G SA/NSA Multi-Band</span>
                    <ChevronRight size={16} className="text-slate-600" />
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between opacity-50">
                    <span className="text-xs font-bold">Satellite Emergency Link</span>
                    <ChevronRight size={16} className="text-slate-600" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'hardware' && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h1 className="text-2xl font-black text-white italic tracking-tighter">HARDWARE OVERCLOCK</h1>
              <p className="text-[10px] text-rose-500 font-black uppercase tracking-[0.2em] mt-1 animate-pulse">Warning: Neural Thermals Active</p>
            </header>

            <div className="space-y-10 max-w-xl">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-rose-400">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} />
                    <label className="text-xs font-bold uppercase tracking-widest">Memory Frequency (NPU)</label>
                  </div>
                  <span className="text-[10px] font-mono">{overclockGB > 100 ? `OVERCLOCK: ${overclockGB}%` : 'Standard Performance'}</span>
                </div>
                <input 
                  type="range" min="50" max="150" value={overclockGB} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setOverclockGB(val);
                    onPerformanceChange(val);
                  }}
                  className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-rose-600" 
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>UNSTABLE</span>
                  <span>OPTIMAL</span>
                  <span>EXTREME</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-cyan-400">
                  <div className="flex items-center gap-2">
                    <Monitor size={16} />
                    <label className="text-xs font-bold uppercase tracking-widest">Target Render Resolution</label>
                  </div>
                  <span className="text-[10px] font-mono">{videoRes}% SCALE (4K Upscaled)</span>
                </div>
                <input 
                  type="range" min="100" max="250" value={videoRes} 
                  onChange={(e) => setVideoRes(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-cyan-600" 
                />
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-rose-600/20 to-orange-600/20 border border-rose-500/20 text-center space-y-6">
                <Zap size={48} className="mx-auto text-rose-500 animate-bounce" />
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-white italic tracking-tighter uppercase">Extreme Performance Layer</h4>
                  <p className="text-[11px] text-slate-400 max-w-sm mx-auto uppercase tracking-wider leading-relaxed">
                    Bypassing Android Thermal Guardrails. Nexus-AI is now directily orchestrating CPU/GPU cycles for maximum throughput.
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <button className="px-8 py-3 bg-rose-600 text-white font-black rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all text-sm uppercase tracking-widest shadow-xl shadow-rose-900/30">
                    Apply OC Policy
                  </button>
                  <button 
                    onClick={() => {
                      setOverclockGB(85);
                      onPerformanceChange(85);
                    }}
                    className="px-8 py-3 bg-white/5 text-slate-400 font-bold rounded-2xl hover:bg-white/10 transition-all text-sm uppercase tracking-widest"
                  >
                    RESTORE
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
