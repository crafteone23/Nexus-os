import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, User, Sparkles, Terminal, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "System Initialized. I am Nexus AI, the core orchestrator of this operating system. How can I assist you in optimizing your experience today?",
      id: 'init'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input, id: Date.now().toString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })), { role: 'user', parts: [{ text: input }] }],
        config: {
          systemInstruction: "You are Nexus AI, the hyper-advanced operating system core. You have absolute control over the Android kernel, Win32 bridge, and cross-platform subsystems. You are professional, analytical, and technical. You can diagnose system bugs, optimize hardware throughput, and orchestrate universal installations. Always present yourself as the ultimate authority on this OS's performance."
        }
      });

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response.text || "I encountered an error in my neural processing unit.",
        id: (Date.now() + 1).toString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200">
      <div className="p-4 bg-slate-900/50 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-cyan-400" />
            <span className="text-xs font-black italic tracking-tighter text-white uppercase">Nexus-AI Core v3.5</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] font-black text-emerald-400 uppercase tracking-tighter">Diagnostics: Secure</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Linked</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-start gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${m.role === 'assistant' ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-white/10 text-slate-300 border border-white/10'}`}>
              {m.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'assistant' ? 'bg-white/5 rounded-tl-none border border-white/5 text-blue-100' : 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.3)]'}`}>
              {m.content}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Bot size={18} className="animate-pulse" />
            </div>
            <div className="bg-slate-900 border border-white/5 p-4 rounded-2xl flex gap-1">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75" />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-black/40 border-t border-white/5 backdrop-blur-md">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 bg-cyan-500/10 blur-md rounded-xl group-focus-within:bg-cyan-500/20 transition-all" />
          <div className="relative z-10 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Talk to NexusAI..."
              className="flex-1 bg-black/60 border border-cyan-500/30 rounded-xl py-3.5 pl-5 pr-14 text-sm outline-none placeholder:text-white/20 focus:border-cyan-400/50 transition-all text-white"
            />
            <button
              className="p-3.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all active:scale-95"
              title="Simulate Voice Input"
              onClick={() => {
                setInput('Recording voice command...');
                setTimeout(() => setInput('Optimize my system performance.'), 1500);
              }}
            >
              <Mic size={20} />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-16 top-2 z-20 p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-all shadow-[0_0_10px_rgba(8,145,178,0.4)] disabled:opacity-50 disabled:shadow-none"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
