"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  CheckCircle2,
  Cpu,
  Zap,
  Crosshair,
  GitCommit,
  ArrowRight
} from "lucide-react";

// --- HELPER: ANIMATED NUMBER ---
function AnimatedNumber({ value }: { value: any }) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    return value.on("change", (v: number) =>
      setDisplay(Math.floor(v).toString()),
    );
  }, [value]);
  return <>{display}</>;
}

// --- DATA ---
const PHASES = [
  {
    id: "01",
    title: "Intelligence Intake",
    details: "Mapping existing technical debt, data silos, and API topography.",
    status: "COMPLETE",
    tags: ["Audit", "Vectorization"],
    roi: "Base"
  },
  {
    id: "02",
    title: "Pilot Integration",
    details: "Deploying specialized agents into non-critical workflows (Customer Support, QA).",
    status: "IN_PROGRESS",
    tags: ["Agent_Deploy", "Testing"],
    roi: "+12%"
  },
  {
    id: "03",
    title: "Full Scale-out",
    details: "Connecting AI Layer to core ERP systems and authorizing autonomous decision rights.",
    status: "LOCKED",
    tags: ["ERP_Sync", "Auto_Auth"],
    roi: "+45%"
  },
  {
    id: "04",
    title: "Value Extraction",
    details: "System begins self-tuning based on ROI feedback loops and market drift.",
    status: "LOCKED",
    tags: ["Self_Heal", "Profit_Ops"],
    roi: "+92%"
  },
];

export const StrategyOrchestrator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Physics for the HUD
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const roiPercentage = useTransform(scrollYProgress, [0, 0.9], [0, 92]);
  const roiSpring = useSpring(roiPercentage, { stiffness: 50, damping: 20 });
  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-40  overflow-hidden selection:bg-emerald-500 selection:text-black"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24">
          
          {/* --- LEFT SIDE: THE TURBINE HUD --- */}
          <div className="lg:w-1/3 relative">
            <div className="sticky top-40 flex flex-col items-center">
              
              {/* Header for HUD */}
              <motion.div 
                style={{ opacity: opacityValue }}
                className="mb-8 text-center"
              >
                 <div className="flex items-center justify-center gap-2 text-emerald-500 text-xs font-mono uppercase tracking-widest mb-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live Projection
                 </div>
                 <h2 className="text-3xl font-bold text-white tracking-tight">Efficiency Gain</h2>
              </motion.div>

              {/* The Gauge */}
              <div className="relative w-80 h-80 flex items-center justify-center">
                
                {/* Outer Rotating Ticks */}
                <motion.div
                  style={{ rotate: rotateValue }}
                  className="absolute inset-0 rounded-full border border-dashed border-neutral-800"
                />
                
                {/* Decorative Spinners */}
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-4 rounded-full border border-neutral-900 border-t-neutral-700"
                />
                <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-12 rounded-full border border-neutral-900 border-b-neutral-700"
                />

                {/* SVG Progress Ring */}
                <svg className="w-full h-full -rotate-90 absolute inset-0 z-10">
                  <circle
                    cx="50%" cy="50%" r="42%"
                    stroke="#171717" strokeWidth="2" fill="none"
                  />
                  <motion.circle
                    cx="50%" cy="50%" r="42%"
                    stroke="#10b981" strokeWidth="4" fill="none"
                    strokeDasharray="10 4" // Dashed look
                    style={{ pathLength }}
                    className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                </svg>

                {/* Center Data */}
                <div className="absolute flex flex-col items-center text-center z-20 bg-black rounded-full p-8 border border-neutral-900 shadow-2xl">
                  <div className="text-6xl font-black text-white tabular-nums tracking-tighter">
                    <AnimatedNumber value={roiSpring} />
                    <span className="text-2xl text-emerald-500 align-top">+</span>
                  </div>
                  <div className="h-px w-12 bg-neutral-800 my-2" />
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    Projected ROI
                  </span>
                </div>
              </div>

              {/* HUD Footer */}
              <div className="mt-8 grid grid-cols-2 gap-8 w-full max-w-[280px]">
                 <div className="text-center">
                    <div className="text-[10px] text-neutral-500 uppercase font-mono mb-1">Timeline</div>
                    <div className="text-lg font-bold text-white">4-6 Wks</div>
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] text-neutral-500 uppercase font-mono mb-1">Velocity</div>
                    <div className="text-lg font-bold text-white">High</div>
                 </div>
              </div>

            </div>
          </div>

          {/* --- RIGHT SIDE: THE EXECUTION TIMELINE --- */}
          <div className="lg:w-2/3 relative pt-12">
            
            {/* The Vertical "Power Line" */}
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-neutral-900" />
            <motion.div
              style={{ scaleY: pathLength }}
              className="absolute left-[27px] top-0 bottom-0 w-px bg-emerald-500 origin-top shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            />

            <div className="space-y-16 pl-24">
              {PHASES.map((phase, index) => (
                <RoadmapItem key={index} phase={phase} index={index} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENT: ROADMAP ITEM ---
const RoadmapItem = ({ phase, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ margin: "-100px" }}
      className="relative group"
    >
      {/* Node Connector (The dot on the line) */}
      <div className="absolute -left-[4.65rem] top-6 w-3 h-3 bg-black border border-neutral-700 rounded-full z-20 group-hover:border-emerald-500 group-hover:scale-125 transition-all duration-300">
         <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 animate-ping" />
      </div>

      {/* The Card */}
      <div className="border border-neutral-800 bg-neutral-950/50 p-8 hover:bg-neutral-900/80 hover:border-emerald-500/30 transition-all duration-500 group">
        
        {/* Card Header */}
        <div className="flex justify-between items-start mb-4">
           <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-neutral-800 group-hover:text-emerald-500/20 transition-colors">
                {phase.id}
              </span>
              <div>
                 <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {phase.title}
                 </h3>
                 <div className="flex gap-2 mt-1">
                    {phase.tags.map((tag: string) => (
                       <span key={tag} className="text-[9px] font-mono text-neutral-500 uppercase bg-neutral-900 px-1.5 py-0.5 rounded-sm">
                         {tag}
                       </span>
                    ))}
                 </div>
              </div>
           </div>
           
           {/* Status Badge */}
           <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 text-[9px] font-mono uppercase tracking-wider text-neutral-400">
              {phase.status === "COMPLETE" ? <CheckCircle2 size={10} className="text-emerald-500" /> : <GitCommit size={10} />}
              {phase.status}
           </div>
        </div>

        {/* Details */}
        <p className="text-neutral-400 leading-relaxed border-l-2 border-neutral-800 pl-4 group-hover:border-emerald-500/50 transition-colors">
          {phase.details}
        </p>

        {/* Hover Action */}
        <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
           <span>View Deliverables</span>
           <ArrowRight size={14} />
        </div>

      </div>
    </motion.div>
  );
};