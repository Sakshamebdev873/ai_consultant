"use client";

import React from "react";
import { Github, Twitter, Linkedin, Terminal, Send, Cpu, Activity, ShieldCheck } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative w-full pt-24 pb-12 bg-black border-t border-neutral-900 overflow-hidden selection:bg-emerald-500 selection:text-black">
      {/* 1. BACKGROUND TEXTURE */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-px  border border-neutral-900 mb-20">
          
          {/* BRAND TERMINAL (5 Cols) */}
          <div className="md:col-span-5 bg-black p-8 lg:p-12 space-y-8">
            <div className="flex items-center gap-3 font-bold text-xl tracking-tighter text-white uppercase group cursor-default">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-mono">AI</div>
              <span>Consultant<span className="text-emerald-500">.io</span></span>
            </div>
            
            <p className="text-neutral-500 text-xs font-mono max-w-sm leading-relaxed uppercase tracking-wider">
              [SYSTEM_LOG]: Bringing deterministic structure, intelligence, and ROI accountability to the enterprise AI economy.
            </p>

            <div className="space-y-3">
              <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.3em]">Subscribe_to_Logs</div>
              <div className="relative max-w-sm group">
                  <input 
                      type="email" 
                      placeholder="USER@DOMAIN.COM" 
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-none px-4 py-4 text-[10px] font-mono text-emerald-500 placeholder-neutral-700 focus:outline-none focus:border-emerald-500 transition-all"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-neutral-500 hover:text-emerald-500 transition-colors">
                      <Send size={14} />
                  </button>
              </div>
            </div>
          </div>

          {/* NAVIGATION LINKS (4 Cols split) */}
          <div className="md:col-span-4 grid grid-cols-2 bg-neutral-900 gap-px">
            <div className="bg-black p-8 space-y-6">
              <h4 className="text-[10px] font-mono font-bold text-neutral-600 uppercase tracking-[0.4em]">Protocol</h4>
              <ul className="space-y-4 text-[10px] text-neutral-400 font-mono uppercase tracking-widest">
                <li className="hover:text-emerald-500 transition-colors cursor-pointer flex items-center gap-2">
                  <span className="text-neutral-800">01</span> Marketplace
                </li>
                <li className="hover:text-emerald-500 transition-colors cursor-pointer flex items-center gap-2">
                  <span className="text-neutral-800">02</span> Decision_Engine
                </li>
                <li className="hover:text-emerald-500 transition-colors cursor-pointer flex items-center gap-2">
                  <span className="text-neutral-800">03</span> Enterprise_Plan
                </li>
              </ul>
            </div>

            <div className="bg-black p-8 space-y-6">
              <h4 className="text-[10px] font-mono font-bold text-neutral-600 uppercase tracking-[0.4em]">Internal</h4>
              <ul className="space-y-4 text-[10px] text-neutral-400 font-mono uppercase tracking-widest">
                <li className="hover:text-emerald-500 transition-colors cursor-pointer flex items-center gap-2">
                  <span className="text-neutral-800">04</span> Documentation
                </li>
                <li className="hover:text-emerald-500 transition-colors cursor-pointer flex items-center gap-2">
                  <span className="text-neutral-800">05</span> ROI_Forecaster
                </li>
                <li className="hover:text-emerald-500 transition-colors cursor-pointer flex items-center gap-2">
                  <span className="text-neutral-800">06</span> API_Access
                </li>
              </ul>
            </div>
          </div>

          {/* HARDWARE STATUS (3 Cols) */}
          <div className="md:col-span-3 bg-black p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-900">
             <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                    <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">System_Status</span>
                    <span className="flex items-center gap-2 text-[9px] font-mono text-emerald-500 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                        Active
                    </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase flex items-center gap-2"><Cpu size={10} /> Latency</span>
                      <span className="text-[9px] font-mono text-white">14MS</span>
                  </div>
                  <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase flex items-center gap-2"><Activity size={10} /> Load</span>
                      <span className="text-[9px] font-mono text-white">12.4%</span>
                  </div>
                  <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase flex items-center gap-2"><ShieldCheck size={10} /> Security</span>
                      <span className="text-[9px] font-mono text-emerald-500">SOC2_READY</span>
                  </div>
                </div>
             </div>

             <div className="pt-8 md:pt-0">
                <button className="w-full py-3 border border-neutral-800 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 hover:text-white hover:border-white transition-all">
                  Open_Support_Ticket
                </button>
             </div>
          </div>
        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="pt-10 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="text-[9px] font-mono text-neutral-700 uppercase tracking-widest">
              © 2026 INTELLIGENCE_PLATFORM_CORE
            </div>
            <div className="flex gap-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
              <span className="hover:text-emerald-500 cursor-pointer transition-colors">Privacy_Protocol</span>
              <span className="hover:text-emerald-500 cursor-pointer transition-colors">Terms_of_Service</span>
            </div>
          </div>
          
          <div className="flex gap-8">
            <Twitter size={14} className="text-neutral-700 hover:text-emerald-500 transition-all cursor-pointer" />
            <Github size={14} className="text-neutral-700 hover:text-emerald-500 transition-all cursor-pointer" />
            <Linkedin size={14} className="text-neutral-700 hover:text-emerald-500 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};