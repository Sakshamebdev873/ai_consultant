"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Stethoscope, 
  Factory, 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  ScanLine 
} from "lucide-react";

// --- DOMAIN DATA ---
const DOMAINS = [
  {
    id: "banking",
    name: "Banking Excellence",
    icon: <Building2 size={24} />,
    color: "#10b981", // Emerald
    description: "Compliance-first AI selection with PII-safe guardrails.",
    tools: [
      { name: "FinAnalyzer Pro", score: 98, tags: ["SOC2", "PII-Safe"], type: "Analytics" },
      { name: "RiskSense AI", score: 94, tags: ["GDPR", "Audit-Ready"], type: "Risk" },
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: <Stethoscope size={24} />,
    color: "#3b82f6", // Blue (for contrast)
    description: "HIPAA-aligned intelligence for clinical scale.",
    tools: [
      { name: "MedCloud LLM", score: 99, tags: ["HIPAA", "HITRUST"], type: "Diagnostic" },
      { name: "PatientFlow", score: 91, tags: ["EHR-Sync"], type: "Operations" },
    ]
  },
  {
    id: "manufacturing",
    name: "Industry 4.0",
    icon: <Factory size={24} />,
    color: "#f59e0b", // Amber
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
    <section className="relative w-full py-32 overflow-hidden selection:bg-emerald-500 selection:text-black">
      
      {/* 1. BACKGROUND GRID (Technical Context) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="px-3 py-1 rounded-sm border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-mono tracking-widest text-emerald-500 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              DOMAIN_SPECIFIC_INTELLIGENCE
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Domain-aware <br /> 
            <span className="text-neutral-600 font-mono text-3xl md:text-5xl">not domain-agnostic.</span>
          </h2>
          <p className="text-neutral-400 max-w-xl text-lg border-l-2 border-emerald-500/20 pl-6 leading-relaxed">
            Generic AI fails in regulated industries. Our consultant applies specialized agents trained on the specific constraints of your sector.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- LEFT COLUMN: THE SECTOR RADAR --- */}
          <div className="lg:col-span-4 relative">
             <div className="sticky top-20 space-y-4">
               {DOMAINS.map((domain) => (
                 <button
                   key={domain.id}
                   onClick={() => setActiveDomain(domain)}
                   className={`w-full group relative overflow-hidden p-6 text-left transition-all duration-500 border-l-2 ${
                     activeDomain.id === domain.id 
                       ? "border-emerald-500 bg-neutral-900/40" 
                       : "border-neutral-800 hover:border-neutral-600 bg-transparent"
                   }`}
                 >
                   <div className="flex items-center justify-between relative z-10">
                     <div className="flex items-center gap-4">
                       <div className={`p-3 rounded-md transition-colors ${
                          activeDomain.id === domain.id ? "bg-emerald-500 text-black" : "bg-neutral-900 text-neutral-500"
                       }`}>
                         {domain.icon}
                       </div>
                       <div>
                         <h3 className={`text-lg font-bold ${activeDomain.id === domain.id ? "text-white" : "text-neutral-500"}`}>
                           {domain.name}
                         </h3>
                         {activeDomain.id === domain.id && (
                           <motion.p 
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: "auto" }}
                             className="text-xs text-emerald-500 mt-1 font-mono uppercase tracking-widest"
                           >
                             {">>"} Analysis Ready
                           </motion.p>
                         )}
                       </div>
                     </div>
                     
                     {activeDomain.id === domain.id && (
                       <ScanLine className="text-emerald-500 animate-pulse" size={20} />
                     )}
                   </div>
                   
                   {/* Hover/Active Background Effect */}
                   <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent transition-opacity duration-500 ${
                      activeDomain.id === domain.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                   }`} />
                 </button>
               ))}
             </div>
          </div>

          {/* --- RIGHT COLUMN: THE HOLOGRAPHIC CARDS --- */}
          <div className="lg:col-span-8">
            <div className="min-h-[500px] relative">
              
              {/* Background Radar Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-neutral-800 rounded-full opacity-20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-neutral-800 rounded-full opacity-20" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDomain.id}
                  initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  
                  {/* Sector Description */}
                  <div className="bg-neutral-950 border border-neutral-800 p-8 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-50 transition-opacity">
                        <Cpu size={100} strokeWidth={0.5} />
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-2">{activeDomain.name}</h3>
                     <p className="text-neutral-400 font-mono text-sm leading-relaxed max-w-lg">
                       {activeDomain.description}
                     </p>
                     
                     <div className="mt-6 flex flex-wrap gap-4">
                        {["Workflow integration", "Regulatory mapping", "ROI forecasting"].map((tag, i) => (
                           <div key={i} className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600">
                             <ShieldCheck size={14} /> {tag}
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Tool Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeDomain.tools.map((tool, i) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="bg-black border border-neutral-800 hover:border-emerald-500/50 p-6 transition-all group relative overflow-hidden"
                      >
                         {/* Card Header */}
                         <div className="flex justify-between items-start mb-8">
                            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-[9px] font-mono uppercase text-neutral-400 rounded-sm">
                              {tool.type}
                            </span>
                            <div className="text-right">
                               <div className="text-2xl font-bold text-white font-mono">{tool.score}<span className="text-sm text-neutral-500">%</span></div>
                               <div className="text-[9px] uppercase text-emerald-500 tracking-widest">Match</div>
                            </div>
                         </div>

                         {/* Card Body */}
                         <h4 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">{tool.name}</h4>
                         
                         <div className="w-full bg-neutral-900 h-1 mb-4 overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${tool.score}%` }}
                             transition={{ duration: 1, delay: 0.5 }}
                             className="h-full bg-emerald-500"
                           />
                         </div>

                         <div className="flex flex-wrap gap-2 mb-6">
                            {tool.tags.map(tag => (
                               <span key={tag} className="text-[10px] text-neutral-500 border border-neutral-800 px-2 py-1 uppercase tracking-wider">
                                 {tag}
                               </span>
                            ))}
                         </div>

                         <button className="w-full py-3 border border-neutral-800 text-xs uppercase font-bold text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 group/btn">
                           View Analysis 
                           <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                         </button>

                      </motion.div>
                    ))}
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};