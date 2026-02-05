"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Workflow,
  BarChart2,
  Activity,
  Layers,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

// --- THE HELPER COMPONENT ---
function AnimatedNumber({ value }: { value: any }) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    return value.on("change", (v: number) =>
      setDisplay(Math.floor(v).toString()),
    );
  }, [value]);
  return <>{display}</>;
}

const PHASES = [
  {
    week: "01",
    title: "Intelligence Intake",
    details: "Mapping existing technical debt and data silos.",
    roi: "Audit Phase",
  },
  {
    week: "04",
    title: "Pilot Integration",
    details: "Deploying specialized agents into non-critical workflows.",
    roi: "12% Gains",
  },
  {
    week: "12",
    title: "Full Scale-out",
    details: "Connecting AI Layer to core ERP systems.",
    roi: "45% Gains",
  },
  {
    week: "24+",
    title: "Value Extraction",
    details: "System begins self-tuning based on ROI feedback.",
    roi: "92% Gains",
  },
];

export const StrategyOrchestrator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const roiPercentage = useTransform(scrollYProgress, [0, 1], [0, 92]);
  const roiSpring = useSpring(roiPercentage, { stiffness: 50, damping: 20 });
  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-40  overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24">
          {/* LEFT SIDE: THE FIXED VALUE HUD */}
          <div className="lg:w-1/3">
            <div className="sticky top-40 flex flex-col items-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
                <motion.div
                  style={{ rotate: rotateValue }}
                  className="absolute inset-0 rounded-full border border-dashed border-white/10"
                />

                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="48%"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="48%"
                    stroke="url(#gradientHUD)"
                    strokeWidth="4"
                    fill="none"
                    style={{ pathLength: scrollYProgress }}
                    className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                  />
                  <defs>
                    <linearGradient
                      id="gradientHUD"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      {/* rgba(0,0,0,0.5) is your black/50 */}
                      <stop offset="0%" stopColor="rgba(0, 0, 0, 0.5)" />
                      <stop offset="100%" stopColor="white" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* FIXED PART: Using the AnimatedNumber component here */}
                <div className="absolute flex flex-col items-center text-center">
                  <div className="text-6xl font-black text-white tabular-nums tracking-tighter">
                    <AnimatedNumber value={roiSpring} />
                    <span className="text-2xl text-primary">%</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-2">
                    Efficiency Gain
                  </span>
                  <Activity className="text-primary w-5 h-5 mt-4 animate-pulse" />
                </div>
              </div>

              {/* ... Rest of your code (Roadmap items) remains the same ... */}
            </div>
          </div>

          <div className="lg:w-2/3 relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/5" />
            <motion.div
              style={{ scaleY: pathLength }}
              className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-black/50 to-white origin-top"
            />
            <div className="space-y-32 pl-20 pb-20">
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

const RoadmapItem = ({ phase, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="absolute -left-[5.3rem] top-0 w-10 h-10 rounded-full bg-[#030303] border border-white/10 flex items-center justify-center z-20 group-hover:border-primary transition-all duration-500">
        <span className="text-[10px] font-bold text-slate-500 group-hover:text-primary">
          {phase.week}
        </span>
      </div>
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-white tracking-tight">
          {phase.title}
        </h3>
        <p className="text-slate-400 text-lg leading-relaxed">
          {phase.details}
        </p>
      </div>
    </motion.div>
  );
};
