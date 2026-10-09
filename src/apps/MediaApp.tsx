import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Maximize, 
  Settings, 
  Music, 
  Video, 
  Tv, 
  Cloud,
  Layers,
  Code
} from 'lucide-react';

interface MediaProps {
  currentVolume: number;
}

export default function MediaHub({ currentVolume }: MediaProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [internalVol, setInternalVol] = useState(currentVolume);

  useEffect(() => {
    setInternalVol(currentVolume);
  }, [currentVolume]);

  const stats = [
    { label: "Codec", value: "NexusVortex AV1 (HW Accel)" },
    { label: "Container", value: "Matroska (MKV) v4" },
    { label: "Bitrate", value: "34.2 Mbps adaptive" },
    { label: "HDR", value: "Vision-AI Master Profile" },
  ];

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="flex-1 relative group bg-slate-900 overflow-hidden flex items-center justify-center">
        {/* Placeholder for video content */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/mediaos/1280/720?blur=5" 
            className="w-full h-full object-cover opacity-40 blur-sm"
            referrerPolicy="no-referrer"
            alt="Video Background"
          />
        </div>
        
        <div className="z-10 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-all cursor-pointer">
            <Play size={32} className="ml-1 fill-current" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Nature 8K Sample Reel</h2>
            <p className="text-sm text-slate-400">03:45 / 12:00 • 8K ULTRA HD</p>
          </div>
        </div>

        {/* Video Controls overlay - always visible at bottom for OS feel */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent pt-24">
          <div className="space-y-5">
            <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group/seek">
              <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-cyan-500 rounded-full shadow-[0_0_10px_#22d3ee]" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <SkipBack size={20} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
                <SkipForward size={20} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
                <div className="flex items-center gap-3 text-slate-500 ml-4 group/vol">
                  <Volume2 size={18} className="group-hover/vol:text-white transition-colors" />
                  <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/60" style={{ width: `${internalVol}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-tighter shadow-[0_0_5px_rgba(34,211,238,0.2)]">Native AV1-4K</span>
                  <span className="text-[10px] font-black px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-tighter">HDR-AI</span>
                </div>
                <Settings size={20} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
                <Maximize size={20} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-48 bg-slate-900/80 backdrop-blur-md border-t border-white/5 p-6 flex gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Code size={16} className="text-blue-400" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Advanced Codec Diagnostics</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-[10px] text-slate-500 font-bold uppercase">{s.label}</div>
                <div className="text-sm font-semibold text-slate-200">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-px h-full bg-white/5" />

        <div className="w-80 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            <span>Media Library</span>
            <span className="text-blue-400">Syncing...</span>
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group">
                <div className="w-12 h-12 rounded bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-slate-700">
                  <Video size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">Nexus Cinematic Demo 0{i}</div>
                  <div className="text-[10px] text-slate-500">1.2 GB • 4K HEVC</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
