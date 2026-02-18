"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, CheckCircle2, Zap, ArrowUpRight, ShieldCheck } from "lucide-react";

const RESULTS = [
  { company: "FINTECH_GLOBAL", result: "-42% LICENSE_WASTE", tool: "MATCH: FINSENSE_AI" },
  { company: "HEALTH_NODE", result: "HIPAA_COMPLIANCE_AUTO", tool: "MATCH: MEDSECURE_LLM" },
  { company: "OMNI_RETAIL", result: "2.4X_ROI_GAIN", tool: "MATCH: GROWTHFLOW" },
];

export const ResultEngine = () => {
  return (
    <section className="relative w-full py-40  overflow-hidden selection:bg-emerald-500 selection:text-black">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT SIDE: THE LEDGER --- */}
          <div className="lg:col-span-6 space-y-12">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-emerald-500 font-mono text-[10px] tracking-[0.4em] mb-4 uppercase flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Performance_Ledger_v1.0
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                The end of <br />
                <span className="text-neutral-800 italic">Guesswork.</span>
              </h2>
            </div>

            <div className="space-y-4">
              {RESULTS.map((res, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="group relative p-8 border border-neutral-800 bg-neutral-900/20 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Subtle Scanline on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <div className="text-emerald-500 font-mono text-[9px] uppercase tracking-widest mb-3 flex items-center gap-2">
                        <ShieldCheck size={10} /> {res.company}
                      </div>
                      <div className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors uppercase">
                        {res.result}
                      </div>
                    </div>
                    <div className="h-10 w-10 border border-neutral-800 flex items-center justify-center text-neutral-600 group-hover:text-emerald-500 group-hover:border-emerald-500/30 transition-all">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-neutral-800/50 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    Deployment_Status: <span className="text-white">Active</span> // {res.tool}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- RIGHT SIDE: THE STRATEGIC BRIEF --- */}
          <div className="lg:col-span-6 lg:pt-24 relative">
            {/* Massive background text for depth */}
            <div className="absolute -top-10 -right-10 text-[12rem] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter">
              ROI
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative p-12 border-l-4 border-emerald-500 bg-neutral-900/10 backdrop-blur-sm"
            >
              <Quote className="text-emerald-500 mb-8 opacity-50" size={48} strokeWidth={1} />
              
              <blockquote className="text-2xl md:text-3xl text-white font-light leading-snug mb-12">
                "The AI Consultant didn't just give us a list of tools; it gave us a <span className="text-emerald-500 font-medium">verifiable implementation strategy</span> that saved us $200k in our first quarter."
              </blockquote>

              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                    <span className="text-xl font-bold text-emerald-500">MC</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-black rounded-full" />
                </div>
                
                <div className="space-y-1">
                  <div className="text-lg font-bold text-white uppercase tracking-tight">Marcus Chen</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em]">CTO @ FINTECH_GLOBAL</span>
                    <div className="px-1.5 py-0.5 border border-emerald-500/30 text-[8px] text-emerald-500 rounded-sm">VERIFIED</div>
                  </div>
                </div>
              </div>

              {/* Decorative data readout bottom right */}
              <div className="absolute bottom-4 right-8 opacity-20 group-hover:opacity-100 transition-opacity">
                <div className="text-[8px] font-mono text-neutral-500 text-right leading-none uppercase">
                  Ref_ID: 992-001<br />
                  Auth: SHA-256
                </div>
              </div>
            </motion.div>

            {/* Bottom Call-to-Action Link */}
            <div className="mt-12 flex justify-end">
               <button className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 hover:text-emerald-500 transition-all group">
                 Read Full Intelligence Brief 
                 <div className="w-8 h-[1px] bg-neutral-800 group-hover:bg-emerald-500 transition-all" />
               </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};