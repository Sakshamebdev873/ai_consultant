"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Check, ArrowRight, Cpu, Search, Wrench, TrendingUp } from "lucide-react";

// --- DATA: Matches the actual 4-agent pipeline ---
const PHASES = [
  {
    id: "01",
    title: "Intake Agent",
    details:
      "Extracts your domain, battery chemistry, company profile, and key challenges from a single problem description.",
    status: "COMPLETE",
    metric: "12 fields parsed",
    icon: Search,
  },
  {
    id: "02",
    title: "Diagnosis Agent",
    details:
      "Identifies root causes, maps AI opportunities, and classifies the impact level of your manufacturing or R&D bottleneck.",
    status: "COMPLETE",
    metric: "Root cause found",
    icon: Cpu,
  },
  {
    id: "03",
    title: "Solution Agent",
    details:
      "Matches 2–3 enterprise tools from our curated knowledge base, scored by fit, pricing tier, and deployment timeline.",
    status: "IN_PROGRESS",
    metric: "3 tools matched",
    icon: Wrench,
  },
  {
    id: "04",
    title: "ROI Agent",
    details:
      "Generates dollar-value ROI estimates, payback periods, a phased implementation roadmap, and an executive summary.",
    status: "LOCKED",
    metric: "Up to $900K saved",
    icon: TrendingUp,
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

// --- STAT PILL ---
function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-widest text-neutral-600">
        {label}
      </span>
      <span className="text-sm font-medium text-neutral-300 font-mono">
        {value}
      </span>
    </div>
  );
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

  const agentsComplete = useTransform(smoothProgress, [0, 1], [0, 4]);
  const savingsValue = useTransform(smoothProgress, [0, 1], [0, 900]);
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 bg-transparent overflow-hidden text-neutral-300 font-sans"
    >
      {/* Ambient glow */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 left-0 w-full h-[200%] opacity-30 pointer-events-none mix-blend-lighten"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-2/3 right-1/4 w-[30rem] h-[30rem] bg-emerald-300/10 rounded-full blur-[150px]" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-20">
        {/* ── LEFT: Sticky panel ───────────────────────────────────────────── */}
        <div className="md:w-1/3 relative">
          <div className="sticky top-1/3 flex flex-col gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-6 border border-emerald-500/20 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                4-Agent Pipeline
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
                From problem to
                <br />
                <span className="font-semibold bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
                  actionable ROI.
                </span>
              </h2>

              <p className="text-neutral-500 text-base mt-4 leading-relaxed max-w-sm">
                One problem description flows through four specialized AI
                agents. Each builds on the last. You get a complete strategy in
                under 60 seconds.
              </p>
            </div>

            {/* Live metrics card */}
            <div className="mt-4 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md space-y-6">
              {/* Savings counter */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-2">
                  Projected Annual Savings
                </p>
                <div className="text-6xl font-light text-white tracking-tighter flex items-start">
                  <span className="text-3xl text-emerald-500 mt-2 mr-1">$</span>
                  <SmoothNumber value={savingsValue} />
                  <span className="text-2xl text-neutral-600 mt-2 ml-1">K</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/[0.05]" />

              {/* Sub-stats */}
              <div className="grid grid-cols-2 gap-4">
                <StatPill label="Agents" value="4 specialized" />
                <StatPill label="KB Tools" value="12 enterprise" />
                <StatPill label="Avg. Time" value="< 60 seconds" />
                <StatPill label="Domains" value="6 battery types" />
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Timeline ──────────────────────────────────────────────── */}
        <div className="md:w-2/3 relative pt-12 md:pt-0">
          {/* Base line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-white/[0.05] rounded-full" />

          {/* Animated fill line */}
          <motion.div
            style={{ scaleY: smoothProgress }}
            className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 to-white origin-top rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)]"
          />

          <div className="space-y-16 pl-16">
            {PHASES.map((phase, index) => (
              <RoadmapItem key={index} phase={phase} index={index} />
            ))}

            {/* Pipeline complete marker */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-10% 0px -10% 0px" }}
              className="relative"
            >
              <div className="absolute -left-[3.5rem] top-1.5 w-10 h-10 flex items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
                <Check size={16} className="text-emerald-400" />
              </div>
              <div className="py-6 px-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] backdrop-blur-sm">
                <p className="text-sm font-medium text-emerald-400 mb-1">
                  Pipeline Complete
                </p>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Full report delivered — executive summary, tool
                  recommendations, ROI estimates, and phased roadmap. Ready for
                  stakeholder review.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- ROADMAP ITEM ---
const RoadmapItem = ({
  phase,
  index,
}: {
  phase: (typeof PHASES)[number];
  index: number;
}) => {
  const isComplete = phase.status === "COMPLETE";
  const isInProgress = phase.status === "IN_PROGRESS";
  const Icon = phase.icon;

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
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
          <span className="text-sm font-medium text-emerald-500/50 font-mono">
            {phase.id}
          </span>
          <h3
            className={`text-2xl font-medium transition-colors duration-300 ${
              isComplete || isInProgress ? "text-white" : "text-neutral-500"
            }`}
          >
            {phase.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-neutral-400 text-lg leading-relaxed max-w-lg mb-4 font-light">
          {phase.details}
        </p>

        {/* Metric tag + icon */}
        <div className="flex items-center gap-4">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border backdrop-blur-sm ${
              isComplete
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : isInProgress
                  ? "bg-emerald-300/10 text-emerald-300 border-emerald-300/20"
                  : "bg-white/[0.03] text-neutral-600 border-white/[0.05]"
            }`}
          >
            <Icon size={12} />
            {phase.metric}
          </div>

          {/* Hover CTA */}
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Explore <ArrowRight size={14} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};