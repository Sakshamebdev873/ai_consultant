"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Stethoscope, Factory, ChevronRight, ShieldCheck } from "lucide-react";

// --- DOMAIN DATA (Unchanged) ---
const DOMAINS = [
  {
    id: "banking",
    name: "Banking & Finance",
    icon: <Building2 size={20} />,
    description: "Compliance-first AI selection with PII-safe guardrails.",
    tools: [
      { name: "FinAnalyzer Pro", score: 98, tags: ["SOC2", "PII-Safe"], type: "Analytics" },
      { name: "RiskSense AI", score: 94, tags: ["GDPR", "Audit-Ready"], type: "Risk" },
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: <Stethoscope size={20} />,
    description: "HIPAA-aligned intelligence for clinical scale.",
    tools: [
      { name: "MedCloud LLM", score: 99, tags: ["HIPAA", "HITRUST"], type: "Diagnostic" },
      { name: "PatientFlow", score: 91, tags: ["EHR-Sync"], type: "Operations" },
    ]
  },
  {
    id: "manufacturing",
    name: "Industry 4.0",
    icon: <Factory size={20} />,
    description: "Predictive IoT models and supply-chain optimization.",
    tools: [
      { name: "OptiPlant", score: 96, tags: ["IoT-Ready"], type: "Predictive" },
      { name: "ChainLogic", score: 92, tags: ["SCM-Sync"], type: "Logistics" },
    ]
  },
];

export const IndustryMatrix = () => {
  const [activeDomain, setActiveDomain] = useState(DOMAINS[0]);

  return (
    <section className="w-full py-24 bg-neutral-950 text-neutral-200 selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Built for your industry.
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            Generic AI fails in regulated environments. We map your specific constraints to the perfect specialized models.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* --- LEFT COLUMN: SIMPLE TABS --- */}
          <div className="md:w-1/3 flex flex-col gap-2">
            {DOMAINS.map((domain) => {
              const isActive = activeDomain.id === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all duration-300 ${
                    isActive 
                      ? "bg-neutral-900 text-white shadow-sm ring-1 ring-neutral-800" 
                      : "text-neutral-500 hover:bg-neutral-900/50 hover:text-neutral-300"
                  }`}
                >
                  <div className={`${isActive ? "text-emerald-400" : "text-neutral-500"}`}>
                    {domain.icon}
                  </div>
                  <span className="font-medium text-base">{domain.name}</span>
                </button>
              );
            })}
          </div>

          {/* --- RIGHT COLUMN: CONTENT CARDS --- */}
          <div className="md:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDomain.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Domain Header Card */}
                <div className="p-6 md:p-8 rounded-2xl bg-neutral-900 ring-1 ring-neutral-800">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {activeDomain.name} Overview
                  </h3>
                  <p className="text-neutral-400 mb-6">
                    {activeDomain.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["Workflow integration", "Regulatory mapping", "ROI forecasting"].map((tag, i) => (
                      <span key={i} className="flex items-center gap-1.5 text-xs font-medium bg-neutral-800 px-3 py-1.5 rounded-full text-neutral-300">
                        <ShieldCheck size={14} className="text-emerald-400" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tool Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeDomain.tools.map((tool) => (
                    <div 
                      key={tool.name} 
                      className="group p-6 rounded-2xl bg-neutral-900 ring-1 ring-neutral-800 hover:ring-emerald-500/50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-xs font-medium text-neutral-500 bg-neutral-950 px-2.5 py-1 rounded-md">
                            {tool.type}
                          </span>
                          <div className="text-right">
                            <span className="text-xl font-semibold text-white">{tool.score}%</span>
                            <span className="block text-[10px] uppercase text-emerald-400 font-medium">Match</span>
                          </div>
                        </div>
                        <h4 className="text-lg font-medium text-white mb-4">{tool.name}</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {tool.tags.map(tag => (
                            <span key={tag} className="text-[11px] font-medium text-neutral-400 bg-neutral-800 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button className="flex items-center justify-between w-full pt-4 border-t border-neutral-800 text-sm font-medium text-neutral-400 group-hover:text-emerald-400 transition-colors">
                        View Analysis
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};