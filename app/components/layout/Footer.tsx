"use client";

import React from "react";
import { Github, Twitter, Linkedin, Terminal, Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative w-full  pt-20 pb-10 border-t border-white/5 overflow-hidden">
      {/* BACKGROUND NOISE TENSION */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* BRAND & NEWSLETTER */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-white uppercase">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">AI</div>
              Consultant<span className="text-primary">.io</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              We bring structure, intelligence, and accountability to the AI economy. 
              The decision layer for the future of enterprise.
            </p>
            <div className="relative max-w-sm">
                <input 
                    type="text" 
                    placeholder="Enter terminal command (email)..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
                <button className="absolute right-2 top-2 p-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                    <Send size={16} />
                </button>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Platform</h4>
            <ul className="space-y-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
              <li className="hover:text-primary transition-colors cursor-pointer text-nowrap">Marketplace</li>
              <li className="hover:text-primary transition-colors cursor-pointer text-nowrap">Decision Engine</li>
              <li className="hover:text-primary transition-colors cursor-pointer text-nowrap">Enterprise</li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Resources</h4>
            <ul className="space-y-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
              <li className="hover:text-primary transition-colors cursor-pointer text-nowrap">Documentation</li>
              <li className="hover:text-primary transition-colors cursor-pointer text-nowrap">ROI Calculator</li>
              <li className="hover:text-primary transition-colors cursor-pointer text-nowrap">API Access</li>
            </ul>
          </div>

          {/* SYSTEM STATUS CARD */}
          <div className="md:col-span-3">
             <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">System Status</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-green-500">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Online
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">Tools Analyzed</span>
                    <span className="text-[10px] font-mono text-white">4,208</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">Uptime</span>
                    <span className="text-[10px] font-mono text-white">99.98%</span>
                </div>
             </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            © 2024 Intelligence Platform // Built for the next era.
          </div>
          <div className="flex gap-6">
            <Twitter size={18} className="text-slate-600 hover:text-white transition-colors cursor-pointer" />
            <Github size={18} className="text-slate-600 hover:text-white transition-colors cursor-pointer" />
            <Linkedin size={18} className="text-slate-600 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};