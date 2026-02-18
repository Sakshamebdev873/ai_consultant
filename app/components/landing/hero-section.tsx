"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Cpu, Activity, Lock, Globe, Terminal, Zap } from "lucide-react";

// --- TYPESCRIPT INTERFACES ---
interface HeroProps {
  globalMouseX: MotionValue<number>;
  globalMouseY: MotionValue<number>;
}

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  delay?: number;
}

export const HeroSection = ({ globalMouseX, globalMouseY }: HeroProps) => {
  // Use a slight parallax, but much more subtle than before
  const springX = useSpring(globalMouseX, { stiffness: 20, damping: 40 });
  const springY = useSpring(globalMouseY, { stiffness: 20, damping: 40 });

  return (
    <section className="relative w-full pt-20 pb-32 overflow-hidden  text-white selection:bg-emerald-500 selection:text-black">
      
      {/* 1. BACKGROUND GRID (Static & Stable) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Main Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* Subtle radial glow top-center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        
        {/* --- ROW 1: HEADLINE & STATUS --- */}
        <div className="flex flex-col items-start gap-8 mb-20">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              System Operational // v4.2
            </span>
          </motion.div>

          {/* Massive Typography */}
          <div className="max-w-5xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
            >
              DECISION <br />
              <span className="text-neutral-500">INTELLIGENCE</span> <br />
              FOR THE <span className="text-emerald-500">AI ERA.</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl text-lg text-neutral-400 leading-relaxed border-l border-emerald-500/30 pl-6"
          >
            Stop guessing with generic tools. We provide an autonomous architectural layer for <span className="text-white">procurement, governance, and ROI orchestration.</span>
          </motion.p>
          
          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/consultant">
              <button className="group h-14 px-8 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center gap-3">
                <Terminal size={16} />
                <span>Initialize Sequence</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="h-14 px-8 border border-neutral-800 text-white font-medium text-xs uppercase tracking-widest hover:bg-neutral-900 transition-colors">
              Read Documentation
            </button>
          </motion.div>
        </div>

        {/* --- ROW 2: THE DATA GRID (Bento Layout) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          
          {/* CARD 1: Latency */}
          <StatCard 
            label="Inference Latency"
            value="14ms"
            sub="Global Edge Network"
            icon={Zap}
            delay={0.8}
          />

          {/* CARD 2: Security */}
          <StatCard 
            label="Governance Protocol"
            value="SOC2"
            sub="Type II Verified"
            icon={Lock}
            delay={0.9}
          />

          {/* CARD 3: Active Agents */}
          <StatCard 
            label="Active Agents"
            value="4,204"
            sub="Autonomous Workers"
            icon={Cpu}
            delay={1.0}
          />

          {/* CARD 4: Live Ticker (Visual Interest) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            className="col-span-1 border border-neutral-800 bg-neutral-900/20 p-6 flex flex-col justify-between overflow-hidden relative group"
          >
             {/* Scanning Line Effect */}
             <div className="absolute top-0 left-0 w-full h-[1px] bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-scan-vertical" />
             
             <div className="flex justify-between items-start mb-4">
                <Activity size={20} className="text-emerald-500" />
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             </div>
             <div>
                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Live Stream</div>
                <div className="space-y-1 font-mono text-[10px] text-neutral-400">
                  <p> Analyzing sector vectors...</p>
                  <p> Optimizing cost models...</p>
                  <p className="text-emerald-500">Threat detected: 0</p>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// --- HELPER COMPONENTS ---

const StatCard = ({ label, value, sub, icon: Icon, delay }: StatCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, borderColor: "rgba(16,185,129,0.5)" }}
      className="border border-neutral-800 bg-neutral-950 p-6 flex flex-col justify-between h-40 transition-colors group cursor-default"
    >
      <div className="flex justify-between items-start">
        <Icon size={20} className="text-neutral-600 group-hover:text-white transition-colors" />
        <span className="text-[9px] font-mono uppercase text-neutral-600 border border-neutral-800 px-1.5 py-0.5 rounded-sm group-hover:border-emerald-500/30 group-hover:text-emerald-500 transition-colors">
          Auto
        </span>
      </div>
      
      <div>
        <div className="text-3xl font-bold text-white mb-1 tracking-tighter">{value}</div>
        <div className="flex items-center gap-2">
           <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{label}</div>
        </div>
        {sub && <div className="text-[10px] text-emerald-600 mt-1">{sub}</div>}
      </div>
    </motion.div>
  );
}