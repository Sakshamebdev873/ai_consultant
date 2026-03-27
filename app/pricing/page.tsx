"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Minus, ArrowRight, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/Footer";

// ── Plan data ─────────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "Free",
    period: "",
    description: "Explore the pipeline. No credit card required.",
    cta: "Get Started",
    ctaHref: "/register",
    highlight: false,
    limits: [
      "3 reports / month",
      "Basic tool recommendations",
      "Standard response time",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$149",
    period: "/ month",
    description: "For teams running production battery lines.",
    cta: "Start Pro Trial",
    ctaHref: "/register",
    highlight: true,
    limits: [
      "Unlimited reports",
      "Full KB access (12 tools)",
      "Detailed ROI modeling",
      "PDF report export",
      "Priority pipeline",
      "Email support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Custom KB, private deployment, SLA guarantees.",
    cta: "Contact Sales",
    ctaHref: "/enterprise",
    highlight: false,
    limits: [
      "Everything in Pro",
      "Custom tool integrations",
      "Private knowledge base",
      "SSO & RBAC",
      "SLA & uptime guarantees",
      "Dedicated success manager",
      "On-prem deployment option",
    ],
  },
];

// ── Feature comparison ────────────────────────────────────────────────────────

const FEATURES = [
  { name: "Reports per month", starter: "3", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "4-Agent pipeline", starter: true, pro: true, enterprise: true },
  { name: "Knowledge base tools", starter: "6 of 12", pro: "All 12", enterprise: "12 + Custom" },
  { name: "ROI estimation", starter: "Basic range", pro: "Detailed model", enterprise: "Custom model" },
  { name: "PDF export", starter: false, pro: true, enterprise: true },
  { name: "Report history", starter: "Last 5", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Chemistry support", starter: "Li-ion, LFP", pro: "All 6", enterprise: "All + Custom" },
  { name: "API access", starter: false, pro: true, enterprise: true },
  { name: "Custom KB tools", starter: false, pro: false, enterprise: true },
  { name: "SSO / RBAC", starter: false, pro: false, enterprise: true },
  { name: "SLA guarantee", starter: false, pro: false, enterprise: true },
  { name: "Dedicated support", starter: false, pro: false, enterprise: true },
];

const FAQ = [
  {
    q: "How does the 4-agent pipeline work?",
    a: "You describe your battery problem in one text field. Four specialized AI agents process it sequentially — Intake extracts structured data, Diagnosis identifies root causes, Solution matches tools from our KB, and ROI generates savings estimates with a phased roadmap.",
  },
  {
    q: "What battery chemistries do you support?",
    a: "Li-ion, LFP, NMC, NCA, solid-state, and lead-acid. Enterprise plans can add custom chemistry profiles specific to your R&D work.",
  },
  {
    q: "Can I integrate my own tools into the knowledge base?",
    a: "Enterprise plans include custom KB integration. You can add proprietary tools, internal systems, or niche vendors that the Solution Agent will consider during matching.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted in transit and at rest. Enterprise plans offer private deployment, on-prem options, and data residency controls. We never use your data to train models.",
  },
  {
    q: "What happens after I generate a report?",
    a: "You get tool recommendations with fit scores, ROI estimates, payback periods, and a phased implementation roadmap. Pro and Enterprise users can export to PDF and track implementation progress.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-black text-white font-mono">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 sm:pt-32 pb-12 sm:pb-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[10px] text-emerald-500 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Pricing_Matrix
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4">
              SIMPLE PRICING
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Start free. Upgrade when the pipeline proves its value.
              <br className="hidden sm:block" />
              No contracts, no hidden fees.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {/* ── Plan cards ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-800 mb-16 sm:mb-20">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`relative flex flex-col p-6 sm:p-8 ${
                plan.highlight ? "bg-neutral-900" : "bg-neutral-950"
              }`}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                  Most Popular
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-widest text-neutral-600">
                  {plan.name}
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span
                    className={`text-4xl sm:text-5xl font-black tracking-tighter ${
                      plan.highlight ? "text-emerald-400" : "text-white"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-neutral-600">{plan.period}</span>
                  )}
                </div>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.limits.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-neutral-400">
                    <Check
                      size={12}
                      className={`mt-0.5 flex-shrink-0 ${
                        plan.highlight ? "text-emerald-500" : "text-neutral-600"
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.ctaHref}
                className={`block text-center text-xs uppercase tracking-widest py-3.5 transition-all ${
                  plan.highlight
                    ? "bg-emerald-500 text-black font-bold hover:bg-emerald-400"
                    : "border border-neutral-700 text-neutral-400 hover:border-white hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── Feature comparison table ─────────────────────────────────────── */}
        <div className="mb-16 sm:mb-20">
          <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-6">
            // Full Feature Comparison
          </div>

          <div className="border border-neutral-800 bg-neutral-950 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left text-[10px] uppercase tracking-widest text-neutral-600 p-4 sm:p-5 w-1/3">
                    Feature
                  </th>
                  {["Starter", "Pro", "Enterprise"].map((t) => (
                    <th
                      key={t}
                      className="text-center text-[10px] uppercase tracking-widest text-neutral-600 p-4 sm:p-5"
                    >
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((f) => (
                  <tr key={f.name} className="border-b border-neutral-900 last:border-0">
                    <td className="text-xs text-neutral-400 p-4 sm:p-5">{f.name}</td>
                    {(["starter", "pro", "enterprise"] as const).map((tier) => {
                      const val = f[tier];
                      return (
                        <td key={tier} className="text-center p-4 sm:p-5">
                          {val === true ? (
                            <Check size={14} className="text-emerald-500 mx-auto" />
                          ) : val === false ? (
                            <Minus size={14} className="text-neutral-800 mx-auto" />
                          ) : (
                            <span className="text-xs text-neutral-300 font-mono">{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-6">
            // Frequently Asked
          </div>

          <div className="border border-neutral-800 bg-neutral-950 divide-y divide-neutral-900">
            {FAQ.map((item, i) => (
              <button
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left p-5 sm:p-6 hover:bg-neutral-900/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs sm:text-sm text-neutral-200 font-medium">
                    {item.q}
                  </span>
                  <span
                    className={`text-neutral-600 text-xs flex-shrink-0 transition-transform ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </div>
                {openFaq === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-neutral-500 leading-relaxed mt-3 pr-8"
                  >
                    {item.a}
                  </motion.p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
        <div className="border border-neutral-800 bg-neutral-950 p-8 sm:p-12 text-center">
          <Zap size={20} className="text-emerald-500 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2">
            Ready to optimize your battery operations?
          </h3>
          <p className="text-xs text-neutral-500 mb-6 max-w-md mx-auto leading-relaxed">
            Start with a free report. See the pipeline in action before
            committing to a plan.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-emerald-500 text-black text-xs font-bold
              uppercase tracking-widest px-8 py-3.5 hover:bg-emerald-400 active:scale-95 transition-all"
          >
            Start Free <ArrowRight size={14} />
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-neutral-900 pt-6 flex justify-between items-center text-[10px] text-neutral-700 uppercase tracking-widest">
          <span>AI Consultant.io // Pricing</span>
          <span>No contracts</span>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}