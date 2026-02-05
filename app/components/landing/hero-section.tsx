"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowUpRight, Cpu, Shield, BarChart3, Globe, Command } from "lucide-react";
import { ShinyButton } from "@/components/ui/ShinyButton";

export const HeroSection = ({ globalMouseX, globalMouseY }: any) => {
  const [winSize, setWinSize] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    setWinSize({ w: window.innerWidth, h: window.innerHeight });
    const handleResize = () => setWinSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- PHYSICS ENGINE ---
  const springX = useSpring(globalMouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(globalMouseY, { stiffness: 40, damping: 20 });

  // 3D Parallax Tilt
  const rotateX = useTransform(springY, [0, winSize.h], [10, -10]);
  const rotateY = useTransform(springX, [0, winSize.w], [-10, 10]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center  pb-12 overflow-hidden selection:bg-primary selection:text-white">
      
      {/* 1. KINETIC BACKGROUND ENGINE */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-blob-slow" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT COLUMN: THE DECISION HUB (8 Cols) --- */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* System Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-[10px] font-mono tracking-[0.4em] text-slate-500 uppercase"
            >
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-primary rounded-full animate-pulse delay-75" />
                <div className="w-1 h-1 bg-primary rounded-full animate-pulse delay-150" />
              </div>
              Strategic_Orchestrator_v4.0
            </motion.div>

            {/* Main Headline */}
            <div className="relative">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl md:text-[7rem] font-black leading-[0.8] tracking-[-0.05em] text-white uppercase italic"
              >
                Stop <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-300 to-white animate-gradient">Guessing.</span> <br />
                Start Architecting.
              </motion.h1>
              
              {/* Floating Decorative Label */}
              <motion.div 
                style={{ x: useTransform(springX, [0, winSize.w], [-20, 20]), y: useTransform(springY, [0, winSize.h], [-20, 20]) }}
                className="absolute -right-4 top-1/2 hidden lg:block"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-lg -rotate-12">
                  <span className="text-[10px] font-black text-primary tracking-widest uppercase">Decision Intelligence</span>
                </div>
              </motion.div>
            </div>

            {/* Sub-text / Value Prop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <p className="text-slate-400 text-lg leading-relaxed border-l-4 border-primary pl-8 uppercase font-medium">
                The world&apos;s first autonomous platform for <span className="text-white">AI procurement, governance, and ROI orchestration.</span> We turn the AI market into a verifiable science.
              </p>
              
              <div className="flex flex-col justify-end gap-6">
                <div className="flex gap-4">
                  <Link href="/consultant" className="w-full sm:w-auto">
                    <ShinyButton className="h-16 px-12 w-full rounded-none skew-x-[-12deg] flex items-center justify-center gap-4">
                       <Command size={20} className="skew-x-[12deg]" />
                       <span className="text-sm font-black tracking-[0.2em] skew-x-[12deg] uppercase">INITIALIZE SESSION</span>
                    </ShinyButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: LIVE DATA HUD (4 Cols) --- */}
          <div className="lg:col-span-4 h-full flex flex-col justify-between pt-12">
            
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="space-y-6"
            >
              {/* Tool Card 1 */}
              <HUDCard icon={<Shield className="text-primary"/>} label="Risk Governance" value="SECURE" status="Verified" />
              
              {/* Tool Card 2 */}
              <HUDCard icon={<BarChart3 className="text-blue-400"/>} label="Market Coverage" value="4.2k+" status="Live Index" />
              
              {/* The "Main" Diagnostic Circle */}
              <div className="relative aspect-square w-full rounded-full border border-white/5 flex items-center justify-center bg-white/[0.01] overflow-hidden group">
                 <div className="absolute inset-0 bg-noise opacity-10" />
                 
                 {/* Inner rotating data */}
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="absolute w-[80%] h-[80%] border border-dashed border-primary/20 rounded-full"
                 />

                 <div className="text-center z-10">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">ROI Match</div>
                    <div className="text-5xl font-black text-white">99<span className="text-primary">.8</span></div>
                 </div>

                 {/* Scan Bar */}
                 <motion.div 
                    animate={{ top: ['-10%', '110%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
                 />
              </div>

              {/* Tool Card 3 */}
              <HUDCard icon={<Globe className="text-indigo-400"/>} label="Deployment" xDir={20} value="GLOBAL" status="Distributed" />
            </motion.div>

          </div>

        </div>

        {/* --- FOOTER OF HERO: TRUST SECTOR --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-between items-center gap-10"
        >
          <div className="flex gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <div className="text-xs font-black tracking-widest text-slate-400">SOC2_COMPLIANT</div>
             <div className="text-xs font-black tracking-widest text-slate-400">HIPAA_READY</div>
             <div className="text-xs font-black tracking-widest text-slate-400">GDPR_VERIFIED</div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
             <Cpu size={14} /> 
             PROCESSOR_LOAD: 12% // LATENCY: 14ms
          </div>
        </motion.div>

      </div>
    </section>
  );
};

// --- HELPER COMPONENT: HUD CARD ---
const HUDCard = ({ icon, label, value, status, xDir = -20 }: any) => (
  <motion.div 
    whileHover={{ scale: 1.05, x: xDir }}
    className="p-5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between group cursor-pointer transition-all"
  >
    <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-primary/50 transition-colors">
            {icon}
        </div>
        <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{label}</div>
            <div className="text-lg font-black text-white">{value}</div>
        </div>
    </div>
    <div className="text-[8px] font-mono text-primary rotate-90 tracking-[0.2em]">{status}</div>
  </motion.div>
);