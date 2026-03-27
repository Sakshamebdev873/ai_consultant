"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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
  Search,
  ArrowRight,
  ExternalLink,
  SlidersHorizontal,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/navbar";

// ── Tool data (mirrors your battery_tools.json KB) ────────────────────────────

const TOOLS = [
  {
    id: "siemens-xcelerator",
    name: "Siemens Xcelerator",
    domain: "Manufacturing",
    chemistry: ["Li-ion", "LFP", "NMC"],
    icon: Factory,
    fit: 92,
    pricing: "Enterprise",
    deploy: "12 weeks",
    description:
      "End-to-end digital twin platform for battery cell production — electrode coating, drying, calendering, and formation process optimization.",
    capabilities: ["MES Integration", "Digital Twin", "Process Control", "Quality AI"],
    website: "siemens.com/xcelerator",
  },
  {
    id: "voltaiq",
    name: "Voltaiq EIS",
    domain: "EV & Lifecycle",
    chemistry: ["Li-ion", "NMC", "NCA", "LFP"],
    icon: BatteryCharging,
    fit: 95,
    pricing: "Enterprise",
    deploy: "8 weeks",
    description:
      "Battery intelligence platform unifying formation, cycling, and field data. Impedance analytics for cell-level performance tracking.",
    capabilities: ["EIS Analytics", "Lifecycle Tracking", "Fleet Monitoring", "Data Unification"],
    website: "voltaiq.com",
  },
  {
    id: "c3ai",
    name: "C3.ai Predictive Maintenance",
    domain: "Grid & ESS",
    chemistry: ["Li-ion", "LFP"],
    icon: Cpu,
    fit: 90,
    pricing: "Enterprise",
    deploy: "10 weeks",
    description:
      "AI-powered predictive maintenance for battery storage fleets. Anomaly detection, failure forecasting, and automated alerting at scale.",
    capabilities: ["Anomaly Detection", "Failure Prediction", "Fleet Scale", "Real-Time Alerts"],
    website: "c3.ai",
  },
  {
    id: "citrine",
    name: "Citrine Informatics",
    domain: "R&D",
    chemistry: ["All"],
    icon: FlaskConical,
    fit: 93,
    pricing: "Mid-Market",
    deploy: "6 weeks",
    description:
      "AI-guided materials development platform. Reduces electrolyte formulation and cathode optimization cycles from months to weeks.",
    capabilities: ["Materials AI", "DOE Optimization", "Formulation ML", "Knowledge Graphs"],
    website: "citrine.io",
  },
  {
    id: "sight-machine",
    name: "Sight Machine",
    domain: "Manufacturing",
    chemistry: ["Li-ion", "LFP", "NMC"],
    icon: Eye,
    fit: 87,
    pricing: "Enterprise",
    deploy: "10 weeks",
    description:
      "Manufacturing data platform connecting line sensors to AI quality models. Real-time defect detection and process analytics.",
    capabilities: ["Real-Time QC", "Sensor Fusion", "Process Analytics", "OEE Tracking"],
    website: "sightmachine.com",
  },
  {
    id: "monolith",
    name: "Monolith AI",
    domain: "EV & Lifecycle",
    chemistry: ["Li-ion", "NMC", "NCA"],
    icon: BarChart3,
    fit: 88,
    pricing: "Mid-Market",
    deploy: "4 weeks",
    description:
      "No-code self-learning models that reduce physical testing by up to 70%. Build predictive models from test data without data science teams.",
    capabilities: ["No-Code ML", "Test Reduction", "Self-Learning", "Rapid Deployment"],
    website: "monolith.ai",
  },
  {
    id: "accure",
    name: "ACCURE Battery Intelligence",
    domain: "Grid & ESS",
    chemistry: ["Li-ion", "LFP", "NMC"],
    icon: ShieldCheck,
    fit: 86,
    pricing: "Mid-Market",
    deploy: "6 weeks",
    description:
      "Cloud-native battery safety and performance analytics. SOH forecasting, thermal risk detection, and warranty analytics for storage operators.",
    capabilities: ["Safety Analytics", "SOH Forecasting", "Thermal Risk", "Cloud-Native"],
    website: "accure.net",
  },
  {
    id: "ansys",
    name: "Ansys Twin Builder",
    domain: "R&D",
    chemistry: ["All"],
    icon: Database,
    fit: 85,
    pricing: "Enterprise",
    deploy: "14 weeks",
    description:
      "Multiphysics simulation and digital twin builder for electrochemical-thermal modeling of cells, modules, and packs.",
    capabilities: ["Multiphysics Sim", "Digital Twin", "Pack Design", "Thermal Modeling"],
    website: "ansys.com",
  },
  {
    id: "custom-defect",
    name: "Custom Defect Detection",
    domain: "Manufacturing",
    chemistry: ["Li-ion", "LFP", "NMC"],
    icon: Zap,
    fit: 91,
    pricing: "Custom",
    deploy: "8 weeks",
    description:
      "Computer vision pipeline for electrode and separator defect detection. Trained on battery-specific defect taxonomies.",
    capabilities: ["CV Pipeline", "Defect Taxonomy", "Edge Deployment", "Active Learning"],
    website: null,
  },
  {
    id: "formation-opt",
    name: "Formation Optimizer",
    domain: "Manufacturing",
    chemistry: ["Li-ion", "NMC", "NCA", "LFP"],
    icon: Activity,
    fit: 89,
    pricing: "Mid-Market",
    deploy: "6 weeks",
    description:
      "AI-driven cell formation protocol optimization. Reduces formation time while improving SEI quality and first-cycle capacity.",
    capabilities: ["Protocol Optimization", "SEI Quality", "Cycle Reduction", "Cell-Level Tuning"],
    website: null,
  },
  {
    id: "supply-chain",
    name: "Battery Supply Chain AI",
    domain: "Grid & ESS",
    chemistry: ["All"],
    icon: Factory,
    fit: 82,
    pricing: "Enterprise",
    deploy: "12 weeks",
    description:
      "Procurement optimization and supply risk modeling for critical battery materials — lithium, nickel, cobalt, manganese.",
    capabilities: ["Procurement AI", "Risk Modeling", "Material Tracking", "Cost Optimization"],
    website: null,
  },
  {
    id: "thermal-modeler",
    name: "Pack Thermal Modeler",
    domain: "EV & Lifecycle",
    chemistry: ["Li-ion", "NMC", "NCA"],
    icon: Cpu,
    fit: 84,
    pricing: "Mid-Market",
    deploy: "8 weeks",
    description:
      "Thermal simulation and cooling system optimization for battery packs. Prevents thermal runaway through predictive heat mapping.",
    capabilities: ["Thermal Simulation", "Cooling Design", "Runaway Prevention", "Heat Mapping"],
    website: null,
  },
];

const DOMAINS = ["All", "Manufacturing", "EV & Lifecycle", "Grid & ESS", "R&D"];
const PRICING_TIERS = ["All", "Enterprise", "Mid-Market", "Custom"];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [pricingFilter, setPricingFilter] = useState("All");
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return TOOLS.filter((t) => {
      const matchSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
      const matchDomain = domainFilter === "All" || t.domain === domainFilter;
      const matchPricing = pricingFilter === "All" || t.pricing === pricingFilter;
      return matchSearch && matchDomain && matchPricing;
    });
  }, [search, domainFilter, pricingFilter]);

  return (
<>
<Navbar/>
    <div className="min-h-screen bg-black text-white font-mono">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 sm:pt-32 pb-12 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[10px] text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Knowledge_Base // {TOOLS.length} Tools
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4">
              MARKETPLACE
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base max-w-lg leading-relaxed">
              Every tool in our knowledge base has been validated against
              battery-specific criteria. Browse, filter, and explore fit scores
              before running a full consultation.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        {/* ── Filters ────────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8 pb-8 border-b border-neutral-900">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="w-full bg-neutral-950 border border-neutral-800 pl-9 pr-4 py-2.5
                text-xs text-neutral-300 placeholder:text-neutral-700 focus:border-neutral-600
                focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <SlidersHorizontal size={12} className="text-neutral-700 hidden sm:block" />

            {/* Domain filter */}
            <div className="flex flex-wrap gap-1.5">
              {DOMAINS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDomainFilter(d)}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-widest border transition-all ${
                    domainFilter === d
                      ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/5"
                      : "border-neutral-800 text-neutral-600 hover:text-neutral-300 hover:border-neutral-600"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing sub-filter */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          <span className="text-[10px] uppercase tracking-widest text-neutral-700 mr-2 self-center">
            Tier:
          </span>
          {PRICING_TIERS.map((p) => (
            <button
              key={p}
              onClick={() => setPricingFilter(p)}
              className={`px-3 py-1 text-[10px] uppercase tracking-widest border transition-all ${
                pricingFilter === p
                  ? "border-white/30 text-white bg-white/5"
                  : "border-neutral-800 text-neutral-700 hover:text-neutral-400"
              }`}
            >
              {p}
            </button>
          ))}
          <span className="ml-auto text-[10px] text-neutral-700 self-center">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Tool grid ──────────────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="border border-neutral-800 bg-neutral-950 p-16 text-center">
            <p className="text-xs text-neutral-600 uppercase tracking-widest mb-2">
              No tools match your filters
            </p>
            <button
              onClick={() => {
                setSearch("");
                setDomainFilter("All");
                setPricingFilter("All");
              }}
              className="text-[10px] text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors"
            >
              Clear all filters →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800">
            {filtered.map((tool, i) => {
              const Icon = tool.icon;
              const isExpanded = expandedTool === tool.id;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-neutral-950 group"
                >
                  <button
                    onClick={() => setExpandedTool(isExpanded ? null : tool.id)}
                    className="w-full text-left p-6 sm:p-8 hover:bg-neutral-900 transition-colors"
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 border border-neutral-800 text-neutral-600
                          group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-colors"
                        >
                          <Icon size={16} />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-neutral-200 group-hover:text-white transition-colors">
                            {tool.name}
                          </h3>
                          <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                            {tool.domain}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <span className="text-lg font-bold text-emerald-400 font-mono">
                          {tool.fit}%
                        </span>
                        <span className="block text-[9px] text-neutral-600 uppercase tracking-widest">
                          Fit
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-neutral-500 leading-relaxed mb-4 line-clamp-2">
                      {tool.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-neutral-700 uppercase tracking-widest">
                      <span>{tool.pricing}</span>
                      <span className="text-neutral-800">·</span>
                      <span>{tool.deploy}</span>
                      <span className="ml-auto text-neutral-600 group-hover:text-emerald-500 transition-colors">
                        {isExpanded ? "Collapse ↑" : "Details ↓"}
                      </span>
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-neutral-900 px-6 sm:px-8 py-6 bg-neutral-900/30"
                    >
                      <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                        {tool.description}
                      </p>

                      {/* Capabilities */}
                      <div className="mb-5">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-600 block mb-2">
                          Capabilities
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {tool.capabilities.map((c) => (
                            <span
                              key={c}
                              className="px-2.5 py-1 text-[10px] font-mono text-neutral-400
                                border border-neutral-800 bg-neutral-950"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Chemistry support */}
                      <div className="mb-5">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-600 block mb-2">
                          Chemistry Support
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {tool.chemistry.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 text-[10px] font-mono text-emerald-400/70
                                border border-emerald-500/20 bg-emerald-500/5"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom row */}
                      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-neutral-800">
                        <Link
                          href="/report"
                          className="flex items-center gap-2 text-[10px] uppercase tracking-widest
                            text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          Run consultation with this tool <ArrowRight size={10} />
                        </Link>
                        {tool.website && (
                          <a
                            href={`https://${tool.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest
                              text-neutral-600 hover:text-neutral-400 transition-colors ml-auto"
                          >
                            {tool.website} <ExternalLink size={9} />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── Bottom CTA ─────────────────────────────────────────────────────── */}
        <div className="mt-12 border border-neutral-800 bg-neutral-950 p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2">
              Can&apos;t find the right tool?
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-md">
              Run the full 4-agent pipeline with your specific problem. The
              system matches from the entire KB — not just what you see here.
            </p>
          </div>
          <Link
            href="/report"
            className="border border-neutral-700 hover:border-white text-xs uppercase tracking-widest
              px-6 py-3 text-neutral-400 hover:text-white transition-all flex-shrink-0"
          >
            Start Consultation →
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-neutral-900 pt-6 flex justify-between items-center text-[10px] text-neutral-700 uppercase tracking-widest">
          <span>AI Consultant.io // Marketplace</span>
          <span>{TOOLS.length} Verified Tools</span>
        </div>
      </div>
    </div>
    <Footer/>
</>
  );
}