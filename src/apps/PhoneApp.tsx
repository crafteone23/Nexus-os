import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  MessageSquare, 
  Users, 
  Clock, 
  Search, 
  Hash, 
  ShieldCheck, 
  Network, 
  Radio, 
  Settings,
  MoreVertical,
  Activity,
  Globe
} from 'lucide-react';

export default function PhoneHub() {
  const [activeTab, setActiveTab] = useState<'keypad' | 'calls' | 'contacts'>('keypad');
  const [downloadSpeed, setDownloadSpeed] = useState(4.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadSpeed(prev => {
        const delta = (Math.random() - 0.5) * 0.4;
        return Math.max(0.1, Math.min(10, prev + delta));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Signal Strength", value: "-118 dBm (Excellent)", icon: Network, color: "text-blue-400" },
    { label: "Network Band", value: "n78 (Sub-6GHz SA)", icon: Radio, color: "text-emerald-400" },
    { label: "Phone Protocol", value: "Hybrid IP/GSM v2", icon: Activity, color: "text-orange-400" },
    { label: "Security Layer", value: "Post-Quantum VPN", icon: ShieldCheck, color: "text-purple-400" },
  ];

  return (
    <div className="flex h-full bg-slate-950 text-slate-200">
      <div className="w-80 border-r border-white/5 flex flex-col">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Phone</h1>
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <MoreVertical size={20} className="text-slate-500" />
            </button>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-600" />
            <input 
              type="text" 
              placeholder="Search contacts & tools..." 
              className="w-full bg-slate-900 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-1">
          {[1,2,3,4,5].map(i => (
            <button key={i} className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all text-left">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/5 flex items-center justify-center text-slate-300 font-bold">
                {String.fromCharCode(64 + i)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold truncate">Nexus Protocol User {i}</div>
                <div className="text-xs text-slate-500">+1 (888) NEXUS-0{i}</div>
              </div>
              <Phone size={16} className="text-blue-400" />
            </button>
          ))}
        </div>

        <div className="p-4 grid grid-cols-3 gap-2 border-t border-white/5">
          {[
            { id: 'keypad', icon: Hash, label: 'Keypad' },
            { id: 'calls', icon: Clock, label: 'Calls' },
            { id: 'contacts', icon: Users, label: 'Contacts' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === tab.id ? 'bg-blue-600/20 text-blue-400' : 'text-slate-500 hover:bg-white/5'}`}
            >
              <tab.icon size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-8 space-y-8 bg-slate-900/20 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 shrink-0">
          {stats.map((s, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center gap-4 backdrop-blur-sm">
              <div className={`p-3 rounded-xl bg-slate-800/80 border border-white/5 ${s.color}`}>
                <s.icon size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{s.label}</div>
                <div className="text-sm font-semibold text-slate-200">{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-32 bg-slate-900/50 rounded-2xl border border-white/5 p-4 flex flex-col gap-3 shrink-0">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Real-Time Packet Visualizer</span>
            <span className="text-[10px] font-mono text-cyan-400">{downloadSpeed.toFixed(1)} GB/s // ACTIVE</span>
          </div>
          <div className="flex-1 flex items-end gap-1 px-1">
            {Array.from({ length: 48 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: [
                    `${10 + Math.random() * 80}%`, 
                    `${10 + Math.random() * 80}%`, 
                    `${10 + Math.random() * 80}%`
                  ] 
                }}
                transition={{ 
                  duration: 2 / (downloadSpeed / 2), 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: i * (0.05 / (downloadSpeed / 4))
                }}
                className={`flex-1 rounded-t-sm ${downloadSpeed > 7 ? 'bg-emerald-500/40' : downloadSpeed < 2 ? 'bg-rose-500/40' : 'bg-cyan-500/40'}`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-12">
          <div className="text-center space-y-2">
            <div className="text-6xl font-extralight tracking-[0.2em] text-slate-600">00:00:00</div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-[0.5em]">System Idle</div>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-xs w-full">
            {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(n => (
              <button key={n} className="w-16 h-16 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-xl font-medium hover:bg-slate-800 active:scale-90 transition-all text-slate-300">
                {n}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button className="w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-900/20 hover:bg-emerald-500 active:scale-95 transition-all">
              <Phone size={32} />
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-12 h-12 rounded-full bg-rose-600/20 text-rose-400 flex items-center justify-center border border-rose-500/20 hover:bg-rose-600 hover:text-white transition-all group relative"
              title="Soft Reboot for System Installation"
            >
              <Activity size={20} className="group-hover:animate-pulse" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                FORCE BOOT INSTALL
              </div>
            </button>
            <button className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center border border-white/5 hover:bg-slate-700 transition-all">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-blue-600/5 border border-blue-500/10 flex items-center gap-6">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
            <Globe size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white mb-1">Nexus Universal Routing</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your calls and data are intercepted by the Nexus-AI kernel, providing real-time translation, noise reduction, and advanced multi-platform synchronization for Android, Windows, and Linux devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
