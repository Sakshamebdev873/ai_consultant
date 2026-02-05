"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, BarChart3, Globe, Zap } from "lucide-react";

const RESULTS = [
  { company: "FinTech Global", result: "42% Reduction in License Waste", tool: "Matched with FinSense AI" },
  { company: "HealthNode", result: "HIPAA Compliance Automation", tool: "Matched with MedSecure LLM" },
  { company: "OmniRetail", result: "2.4x ROI in Marketing Ops", tool: "Matched with GrowthFlow" },
];

export const ResultEngine = () => {
  return (
    <section className="relative w-full py-32 ">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-none">
              The end of <br />
              <span className="text-slate-500">Guesswork.</span>
            </h2>
            <div className="space-y-6">
              {RESULTS.map((res, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="text-primary font-mono text-[10px] uppercase mb-2 flex items-center gap-2">
                    <Zap size={12} /> Case_Study_{i + 1}
                  </div>
                  <div className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{res.result}</div>
                  <div className="text-slate-500 text-sm italic">{res.company} — {res.tool}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <div className="relative p-10 rounded-[3rem] bg-card border border-white/10 shadow-2xl">
              <Quote className="text-primary mb-6" size={40} />
              <p className="text-2xl text-white font-medium leading-relaxed mb-8 italic">
                "The AI Consultant didn't just give us a list of tools; it gave us a verifiable implementation strategy that saved us $200k in our first quarter."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600" />
                <div>
                  <div className="text-white font-bold">Marcus Chen</div>
                  <div className="text-slate-500 text-xs uppercase tracking-widest">CTO @ FinTech Global</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};