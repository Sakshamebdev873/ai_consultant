"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Factory,
  BatteryCharging,
  Cpu,
  FlaskConical,
  Eye,
  BarChart3,
  ShieldCheck,
  Database,
  Zap,
  Activity,
  X,
} from "lucide-react";

// --- Verified tools from KB ---
const VERIFIED = [
  { name: "Siemens Xcelerator",   icon: Factory,          fit: 92, domain: "Manufacturing" },
  { name: "Voltaiq EIS",          icon: BatteryCharging,  fit: 95, domain: "EV & Lifecycle" },
  { name: "C3.ai Maintenance",    icon: Cpu,              fit: 90, domain: "Grid & ESS" },
  { name: "Citrine Informatics",  icon: FlaskConical,     fit: 93, domain: "R&D Materials" },
  { name: "Sight Machine",        icon: Eye,              fit: 87, domain: "Manufacturing" },
  { name: "Monolith AI",          icon: BarChart3,        fit: 88, domain: "EV Testing" },
  { name: "ACCURE Battery",       icon: ShieldCheck,      fit: 86, domain: "Safety & ESS" },
  { name: "Ansys Twin Builder",   icon: Database,         fit: 85, domain: "Simulation" },
];

const REJECTED = [
  "Generic ChatGPT wrapper",
  "No battery data support",
  "Unverified ROI claims",
  "No chemistry-aware models",
  "Vendor lock-in risk",
  "No MES integration",
];

// --- Filter chip ---
const FILTERS = ["All", "Manufacturing", "EV", "Grid & ESS", "R&D"];

 const ToolValidation = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = VERIFIED.filter(
    (t) => activeFilter === "All" || t.domain.toLowerCase().includes(activeFilter.toLowerCase()),
  );

  return (
    <section className="relative w-full py-24 sm:py-32 md:py-40 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-emerald-500 font-mono text-[10px] tracking-[0.4em] mb-4 uppercase flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Knowledge_Base // 12 Verified Tools
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.95]"
          >
            200+ tools screened.
            <br />
            <span className="text-neutral-700">12 survived.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 text-base sm:text-lg mt-5 leading-relaxed max-w-lg"
          >
            Every tool in our knowledge base is validated against battery-specific
            criteria — chemistry support, MES integration, proven ROI, and
            deployment timeline.
          </motion.p>
        </div>

        {/* ── Rejected strip ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-700 mb-4">
            // Filtered out
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {REJECTED.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] sm:text-xs font-mono
                  text-neutral-600 border border-neutral-800/60 line-through decoration-neutral-700 select-none"
              >
                <X size={10} className="text-neutral-700 flex-shrink-0" />
                {r}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Filter chips ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest
                border transition-all duration-200 ${
                  activeFilter === f
                    ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/5"
                    : "border-neutral-800 text-neutral-600 hover:text-neutral-300 hover:border-neutral-600"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Tool grid ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800">
          {filtered.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="bg-neutral-950 p-6 sm:p-8 flex flex-col justify-between
                  group hover:bg-neutral-900 transition-colors"
              >
                {/* Top: icon + domain */}
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-2.5 border border-neutral-800 text-neutral-500
                      group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-700">
                      {tool.domain}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-neutral-200
                    group-hover:text-white transition-colors leading-tight mb-2">
                    {tool.name}
                  </h3>
                </div>

                {/* Bottom: fit score bar */}
                <div className="mt-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">
                      Fit Score
                    </span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {tool.fit}%
                    </span>
                  </div>
                  <div className="w-full h-[3px] bg-neutral-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.fit}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05, duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Empty state for filters ──────────────────────────────────────── */}
        {filtered.length === 0 && (
          <div className="bg-neutral-950 border border-neutral-800 p-12 text-center">
            <p className="text-xs font-mono text-neutral-600 uppercase tracking-widest">
              No tools in this category yet
            </p>
          </div>
        )}

        {/* ── Bottom stats ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-px grid grid-cols-2 sm:grid-cols-4 gap-px bg-neutral-800"
        >
          {[
            { label: "Tools Screened",  value: "200+" },
            { label: "Passed Validation", value: "12" },
            { label: "Rejection Rate",  value: "94%" },
            { label: "Avg. Fit Score",  value: "89%" },
          ].map((s) => (
            <div key={s.label} className="bg-black p-4 sm:p-5 text-center">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-600 mb-1">
                {s.label}
              </div>
              <div className="text-sm sm:text-base font-bold text-white font-mono">
                {s.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default ToolValidation