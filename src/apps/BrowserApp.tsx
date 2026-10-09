import React, { useState } from 'react';
import { Search, Globe, ChevronLeft, ChevronRight, RotateCcw, Home, Plus, MoreHorizontal, Shield } from 'lucide-react';

export default function BrowserApp() {
  const [url, setUrl] = useState('https://google.com');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const newUrl = searchQuery.startsWith('http') 
      ? searchQuery 
      : `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    setUrl(newUrl);
  };

  return (
    <div className="flex flex-col h-full bg-white text-slate-900">
      <div className="bg-slate-100 p-2 flex items-center gap-2 border-b border-slate-200">
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
            <ChevronRight size={18} />
          </button>
          <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
            <RotateCcw size={18} />
          </button>
          <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
            <Home size={18} />
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex-1 relative">
          <div className="absolute left-3 top-2 text-slate-400">
            <Globe size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search with Google Chrome Engine..."
            className="w-full bg-white border border-slate-300 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </form>

        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
            <Plus size={18} />
          </button>
          <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 relative overflow-hidden">
        {/* Real iframe simulated for demo, in production we might use a proxy or just search links */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-6">
          <div className="flex items-center gap-4">
            <Search size={64} className="text-blue-500" />
            <h1 className="text-5xl font-black tracking-tight flex items-center">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </h1>
          </div>
          <p className="text-slate-500 max-w-md">
            Nexus-AI Browser is integrated with the Chrome Search Engine, providing lightning-fast access to the world's information with AI-enhanced results.
          </p>
          <div className="w-full max-w-xl p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-left">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Search size={20} />
              </div>
              <div>
                <div className="font-bold text-sm">Semantic AI Search</div>
                <div className="text-xs text-slate-500">Find exactly what you need with Nexus-AI context mapping.</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-left">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Shield size={20} />
              </div>
              <div>
                <div className="font-bold text-sm">Enhanced Privacy</div>
                <div className="text-xs text-slate-500">Kernel-level tracker blocking and sandboxed sessions.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
