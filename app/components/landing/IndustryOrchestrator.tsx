"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

// --- DATA ---
const PHASES = [
  {
    id: "01",
    title: "Intelligence Intake",
    details: "Mapping existing technical debt, data silos, and API topography.",
    status: "COMPLETE",
    roi: "Base",
  },
  {
    id: "02",
    title: "Pilot Integration",
    details: "Deploying specialized agents into non-critical workflows.",
    status: "IN_PROGRESS",
    roi: "+12%",
  },
  {
    id: "03",
    title: "Full Scale-out",
    details: "Connecting AI Layer to core ERP systems and authorizing decision rights.",
    status: "LOCKED",
    roi: "+45%",
  },
  {
    id: "04",
    title: "Value Extraction",
    details: "System begins self-tuning based on ROI feedback loops and market drift.",
    status: "LOCKED",
    roi: "+92%",
  },
];

// --- HELPER: SMOOTH NUMBER ---
function SmoothNumber({ value }: { value: any }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    return value.on("change", (v: number) => setDisplay(Math.round(v)));
  }, [value]);

  return <>{display}</>;
}

export const StrategyOrchestrator = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    mass: 0.8,
  });

  const roiValue = useTransform(smoothProgress, [0, 1], [0, 92]);
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 bg-transparent overflow-hidden text-neutral-300 font-sans"
    >
      {/* Ambient Emerald Glow */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 left-0 w-full h-[200%] opacity-30 pointer-events-none mix-blend-lighten"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-2/3 right-1/4 w-[30rem] h-[30rem] bg-emerald-300/10 rounded-full blur-[150px]" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-20">
        
        {/* LEFT SIDE */}
        <div className="md:w-1/3 relative">
          <div className="sticky top-1/3 flex flex-col gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-6 border border-emerald-500/20 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Integration
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
                Watch your <br />
                <span className="font-semibold bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
                  efficiency scale.
                </span>
              </h2>
            </div>

            {/* ROI */}
            <div className="mt-8 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md">
              <p className="text-sm text-neutral-500 mb-2">
                Projected ROI Gain
              </p>

              <div className="text-7xl font-light text-white tracking-tighter flex items-start">
                <span className="text-4xl text-emerald-500 mt-2 mr-1">+</span>
                <SmoothNumber value={roiValue} />
                <span className="text-3xl text-neutral-600 mt-2 ml-1">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-2/3 relative pt-12 md:pt-0">
          
          {/* Base Line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-white/[0.05] rounded-full" />

          {/* Animated Line */}
          <motion.div
            style={{ scaleY: smoothProgress }}
            className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 to-white origin-top rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)]"
          />

          <div className="space-y-12 pl-16">
            {PHASES.map((phase, index) => (
              <RoadmapItem key={index} phase={phase} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- ROADMAP ITEM ---
const RoadmapItem = ({ phase, index }: { phase: any; index: number }) => {
  const isComplete = phase.status === "COMPLETE";
  const isInProgress = phase.status === "IN_PROGRESS";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
      className="relative group cursor-pointer"
    >
      {/* Node */}
      <div className="absolute -left-[3.5rem] top-1.5 w-10 h-10 flex items-center justify-center bg-transparent backdrop-blur-md rounded-full border border-white/[0.05]">
        <motion.div
          animate={isInProgress ? { scale: [1, 1.2, 1] } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-500 shadow-sm ${
            isComplete
              ? "bg-emerald-500 shadow-emerald-500/50"
              : isInProgress
              ? "bg-emerald-300 shadow-emerald-300/50"
              : "bg-white/10"
          }`}
        >
          {isComplete && <Check size={10} className="text-white" />}
          {isInProgress && (
            <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
          )}
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        whileHover={{ x: 8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="block"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
          <span className="text-sm font-medium text-emerald-500/50">
            {phase.id}
          </span>

          <h3
            className={`text-2xl font-medium transition-colors duration-300 ${
              isComplete || isInProgress
                ? "text-white"
                : "text-neutral-500"
            }`}
          >
            {phase.title}
          </h3>
        </div>

        <p className="text-neutral-400 text-lg leading-relaxed max-w-lg mb-4 font-light">
          {phase.details}
        </p>

        <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Explore Phase <ArrowRight size={16} />
        </div>
      </motion.div>
    </motion.div>
  );
};