"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Stethoscope, 
  Factory, 
  Megaphone, 
  ShieldCheck, 
  ChevronRight, 
  PieChart, 
  Cpu 
} from "lucide-react";

// --- DOMAIN DATA ---
const DOMAINS = [
  {
    id: "banking",
    name: "Banking",
    icon: <Building2 size={18} />,
    color: "#6366f1", // Indigo
    description: "Compliance-first AI selection with PII-safe guardrails.",
    tools: [
      { name: "FinAnalyzer Pro", score: 98, tags: ["SOC2", "PII-Safe"], type: "Analytics" },
      { name: "RiskSense AI", score: 94, tags: ["GDPR", "Audit-Ready"], type: "Risk" },
      { name: "LendingNode", score: 89, tags: ["ISO27001"], type: "Automation" },
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: <Stethoscope size={18} />,
    color: "#10b981", // Emerald
    description: "HIPAA-aligned intelligence for clinical and operational scale.",
    tools: [
      { name: "MedCloud LLM", score: 99, tags: ["HIPAA", "HITRUST"], type: "Diagnostic" },
      { name: "PatientFlow", score: 91, tags: ["EHR-Sync"], type: "Operations" },
      { name: "BioSentry", score: 87, tags: ["FDA-ClassII"], type: "Research" },
    ]
  },
  {
    id: "manufacturing",
    name: "Industry 4.0",
    icon: <Factory size={18} />,
    color: "#f59e0b", // Amber
    description: "Predictive IoT models and supply-chain optimization.",
    tools: [
      { name: "OptiPlant", score: 96, tags: ["IoT-Ready"], type: "Predictive" },
      { name: "ChainLogic", score: 92, tags: ["SCM-Sync"], type: "Logistics" },
      { name: "SafetyVision", score: 85, tags: ["OSHA-Compliant"], type: "Safety" },
    ]
  },
];

export const IndustryMatrix = () => {
  const [activeTab, setActiveTab] = useState(DOMAINS[0]);

  return (
    <section className="relative w-full py-24 bg-background overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-4"
          >
            <Cpu size={14} /> DOMAIN_SPECIFIC_INTELLIGENCE
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Domain-aware <br /> 
            <span className="text-slate-500 italic">not domain-agnostic.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            Generic AI fails in regulated industries. Our consultant applies specialized agents 
            trained on the specific constraints of your sector.
          </p>
        </div>

        {/* DOMAIN SELECTOR */}
        <div className="flex flex-wrap gap-4 mb-12">
          {DOMAINS.map((domain) => (
            <button
              key={domain.id}
              onClick={() => setActiveTab(domain)}
              className={`relative flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 ${
                activeTab.id === domain.id 
                ? "bg-white/10 text-white border-white/20 shadow-xl" 
                : "bg-transparent text-slate-500 border border-transparent hover:border-white/5"
              }`}
            >
              {activeTab.id === domain.id && (
                <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10"
                />
              )}
              <span className={activeTab.id === domain.id ? "text-primary" : "text-slate-500"}>
                {domain.icon}
              </span>
              <span className="text-sm font-bold tracking-tight relative z-10">{domain.name}</span>
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Domain Details */}
          <div className="lg:col-span-4 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div 
                    className="w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-2xl"
                    style={{ backgroundColor: `${activeTab.color}20`, border: `1px solid ${activeTab.color}40` }}
                >
                  {React.cloneElement(activeTab.icon as React.ReactElement, { size: 32, style: { color: activeTab.color } })}
                </div>
                <h3 className="text-3xl font-bold text-white">{activeTab.name} Excellence</h3>
                <p className="text-slate-400 leading-relaxed">{activeTab.description}</p>
                
                <ul className="space-y-4 pt-4">
                  {["Workflow integration", "Regulatory mapping", "ROI forecasting"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                      <ShieldCheck size={16} className="text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tool Recommendation Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* The "Scanning" Beam Effect */}
            <motion.div 
              key={activeTab.id + "beam"}
              initial={{ left: "-10%" }}
              animate={{ left: "110%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-primary/20 to-transparent z-10 skew-x-12 pointer-events-none"
            />

            <AnimatePresence mode="popLayout">
              {activeTab.tools.map((tool, index) => (
                <motion.div
                  key={activeTab.id + tool.name}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card border border-white/5 p-6 rounded-[2rem] hover:border-primary/30 transition-all duration-500 shadow-2xl relative overflow-hidden"
                >
                  {/* Subtle Grid Pattern inside card */}
                  <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{tool.type}</span>
                      <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{tool.name}</h4>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-2xl font-black text-white">{tool.score}%</span>
                      <span className="text-[8px] font-bold text-slate-500 uppercase">Match Score</span>
                    </div>
                  </div>

                  {/* Compatibility Gauge */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full mb-6 overflow-hidden relative z-10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${tool.score}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {tool.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="mt-6 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-primary hover:border-primary transition-all flex items-center justify-center gap-2 group/btn">
                    View Full Analysis <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};