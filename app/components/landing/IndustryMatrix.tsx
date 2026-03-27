"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Factory, Car, BatteryCharging, FlaskConical, ChevronRight, ShieldCheck, Gauge } from "lucide-react";

// --- BATTERY INDUSTRY DOMAINS ---
const DOMAINS = [
  {
    id: "manufacturing",
    name: "Cell Manufacturing",
    icon: <Factory size={20} />,
    description:
      "AI-driven defect detection, electrode coating optimization, and formation process control for Li-ion and LFP production lines.",
    capabilities: ["Vision-based QC", "Scrap rate reduction", "Process twins"],
    tools: [
      {
        name: "Siemens Xcelerator",
        score: 92,
        tags: ["MES-Ready", "Digital Twin"],
        type: "Manufacturing AI",
        detail: "Purpose-built for battery cell production — coating, drying, calendering optimization",
      },
      {
        name: "Sight Machine",
        score: 87,
        tags: ["IoT-Sync", "Real-Time"],
        type: "Analytics",
        detail: "Manufacturing data platform connecting line sensors to AI quality models",
      },
    ],
  },
  {
    id: "ev_performance",
    name: "EV & Performance",
    icon: <Car size={20} />,
    description:
      "Battery management system optimization, range prediction, thermal modeling, and degradation forecasting for electric vehicle packs.",
    capabilities: ["BMS tuning", "Range modeling", "Thermal analytics"],
    tools: [
      {
        name: "Voltaiq EIS",
        score: 95,
        tags: ["Impedance", "Lifecycle"],
        type: "Battery Intelligence",
        detail: "Enterprise battery analytics — formation, cycling, and field performance in one platform",
      },
      {
        name: "Monolith AI",
        score: 88,
        tags: ["No-Code ML", "Test Reduction"],
        type: "Predictive",
        detail: "Self-learning models that reduce physical testing by up to 70%",
      },
    ],
  },
  {
    id: "grid_storage",
    name: "Grid & ESS",
    icon: <BatteryCharging size={20} />,
    description:
      "Energy storage system health monitoring, capacity fade prediction, and dispatch optimization for utility-scale and C&I deployments.",
    capabilities: ["SOH forecasting", "Dispatch optimization", "Fleet monitoring"],
    tools: [
      {
        name: "C3.ai Predictive Maintenance",
        score: 90,
        tags: ["Fleet-Scale", "Anomaly Detection"],
        type: "Maintenance AI",
        detail: "Predictive failure modeling across distributed ESS assets with real-time alerts",
      },
      {
        name: "ACCURE Battery Intelligence",
        score: 86,
        tags: ["Cloud-Native", "Safety"],
        type: "Analytics",
        detail: "Battery safety and performance analytics for storage operators and OEMs",
      },
    ],
  },
  {
    id: "rnd",
    name: "R&D & Materials",
    icon: <FlaskConical size={20} />,
    description:
      "Accelerate materials discovery, electrolyte formulation, and cell design iteration with AI-guided experimentation and simulation.",
    capabilities: ["Materials screening", "Formulation ML", "Simulation acceleration"],
    tools: [
      {
        name: "Citrine Informatics",
        score: 93,
        tags: ["Materials AI", "DOE"],
        type: "Discovery",
        detail: "AI-guided materials development — reduce formulation cycles from months to weeks",
      },
      {
        name: "Ansys Twin Builder",
        score: 85,
        tags: ["Multiphysics", "Digital Twin"],
        type: "Simulation",
        detail: "Electrochemical-thermal simulation twins for cell and pack design validation",
      },
    ],
  },
];

export const IndustryMatrix = () => {
  const [activeDomain, setActiveDomain] = useState(DOMAINS[0]);

  return (
    <section className="w-full py-24 bg-neutral-950 text-neutral-200 selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto px-6">

        {/* --- HEADER --- */}
        <div className="mb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-emerald-500 font-mono text-[10px] tracking-[0.4em] mb-4 uppercase flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Knowledge_Base // 12 Enterprise Tools
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Built for battery.
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            Generic AI tools fail on cell chemistry constraints. Our knowledge
            base maps your specific domain — manufacturing, EV, grid storage, or
            R&D — to purpose-built solutions with verified fit scores.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">

          {/* --- LEFT: DOMAIN TABS --- */}
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
                  <div
                    className={`${
                      isActive ? "text-emerald-400" : "text-neutral-500"
                    }`}
                  >
                    {domain.icon}
                  </div>
                  <div>
                    <span className="font-medium text-base block">
                      {domain.name}
                    </span>
                    {isActive && (
                      <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
                        {domain.tools.length} tools matched
                      </span>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Aggregate stat */}
            <div className="mt-4 p-4 rounded-xl bg-neutral-900/50 ring-1 ring-neutral-800/50">
              <div className="flex items-center gap-2 mb-2">
                <Gauge size={14} className="text-emerald-500" />
                <span className="text-[10px] uppercase tracking-widest text-neutral-600 font-mono">
                  Pipeline Coverage
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-neutral-500">Chemistries</span>
                  <p className="text-white font-medium">6 supported</p>
                </div>
                <div>
                  <span className="text-neutral-500">Avg. Fit Score</span>
                  <p className="text-emerald-400 font-medium font-mono">
                    89.5%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: CONTENT --- */}
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
                {/* Domain overview card */}
                <div className="p-6 md:p-8 rounded-2xl bg-neutral-900 ring-1 ring-neutral-800">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {activeDomain.name}
                  </h3>
                  <p className="text-neutral-400 mb-6">
                    {activeDomain.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {activeDomain?.capabilities?.map((cap, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 text-xs font-medium bg-neutral-800 px-3 py-1.5 rounded-full text-neutral-300"
                      >
                        <ShieldCheck
                          size={14}
                          className="text-emerald-400"
                        />{" "}
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tool cards */}
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
                            <span className="text-xl font-semibold text-white">
                              {tool.score}%
                            </span>
                            <span className="block text-[10px] uppercase text-emerald-400 font-medium">
                              Fit Score
                            </span>
                          </div>
                        </div>
                        <h4 className="text-lg font-medium text-white mb-2">
                          {tool.name}
                        </h4>
                        <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                          {tool.detail}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {tool.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-medium text-neutral-400 bg-neutral-800 px-2 py-1 rounded"
                            >
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