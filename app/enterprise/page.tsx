"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Server,
  Users,
  Database,
  Lock,
  Cpu,
  ArrowRight,
  Check,
  Building2,
  Globe,
  Zap,
  FileText,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/navbar";

// ── Capabilities ──────────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    icon: Database,
    title: "Custom Knowledge Base",
    description:
      "Add proprietary tools, internal systems, and niche vendors to the Solution Agent's matching pool. Your KB stays private.",
  },
  {
    icon: Server,
    title: "Private Deployment",
    description:
      "Run the full 4-agent pipeline on your infrastructure. On-prem, VPC, or air-gapped — your data never leaves your perimeter.",
  },
  {
    icon: Lock,
    title: "SSO & RBAC",
    description:
      "SAML/OIDC single sign-on with role-based access. Admins see all reports, engineers see their own, executives get summaries.",
  },
  {
    icon: Shield,
    title: "SLA & Compliance",
    description:
      "99.9% uptime SLA, SOC2 audit readiness, and data residency controls. Built for regulated battery manufacturing environments.",
  },
  {
    icon: Users,
    title: "Dedicated Success",
    description:
      "A dedicated customer success manager who understands battery operations. Quarterly reviews, onboarding support, and KB curation.",
  },
  {
    icon: Cpu,
    title: "Custom Agent Tuning",
    description:
      "Fine-tune the Diagnosis and ROI agents on your historical data. The pipeline learns your cost structures and failure modes.",
  },
];

// ── Deployment options ────────────────────────────────────────────────────────

const DEPLOYMENTS = [
  {
    title: "Cloud (Managed)",
    description: "We host, you use. Full pipeline running on our infrastructure with your custom KB.",
    tags: ["Fastest setup", "Auto-scaling", "Managed updates"],
  },
  {
    title: "VPC (Hybrid)",
    description: "Pipeline runs in your cloud account (AWS/GCP/Azure). Data stays in your VPC, we manage the agents.",
    tags: ["Data residency", "Your cloud", "Co-managed"],
  },
  {
    title: "On-Premise",
    description: "Full air-gapped deployment on your servers. For classified R&D environments and defense contractors.",
    tags: ["Air-gapped", "Full control", "Custom SLA"],
  },
];

// ── Stats ─────────────────────────────────────────────────────────────────────

const STATS = [
  { label: "Enterprise Clients", value: "40+" },
  { label: "Countries", value: "12" },
  { label: "Avg. ROI Delivered", value: "$503K" },
  { label: "Uptime SLA", value: "99.9%" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EnterprisePage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    size: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, POST to your API
    setSubmitted(true);
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-black text-white font-mono">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div className="relative border-b border-neutral-800 bg-neutral-950 overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 sm:pt-36 pb-16 sm:pb-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={14} className="text-emerald-500" />
              <span className="text-[10px] text-emerald-500 uppercase tracking-widest">
                Enterprise Program
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-5 leading-[0.9]">
              AI CONSULTING
              <br />
              <span className="text-neutral-600">AT SCALE.</span>
            </h1>

            <p className="text-neutral-500 text-sm sm:text-base max-w-xl leading-relaxed mb-8">
              Custom knowledge bases. Private deployments. SLA guarantees. Built
              for battery manufacturers who need the pipeline running inside
              their own infrastructure.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-emerald-500 text-black text-xs font-bold
                  uppercase tracking-widest px-7 py-3.5 hover:bg-emerald-400 active:scale-95 transition-all"
              >
                Talk to Sales <ArrowRight size={14} />
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 border border-neutral-700 text-xs uppercase
                  tracking-widest px-7 py-3.5 text-neutral-400 hover:border-white hover:text-white transition-all"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* ── Stats strip ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-neutral-800 -mt-px">
          {STATS.map((s) => (
            <div key={s.label} className="bg-neutral-950 p-5 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mb-1">
                {s.value}
              </div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-600">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Capabilities ─────────────────────────────────────────────────── */}
        <div className="py-16 sm:py-20">
          <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-8">
            // Enterprise Capabilities
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-neutral-950 p-6 sm:p-8 group hover:bg-neutral-900 transition-colors"
                >
                  <div
                    className="p-2.5 border border-neutral-800 text-neutral-600 w-fit mb-5
                    group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-colors"
                  >
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-2 group-hover:text-white transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {cap.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Deployment options ────────────────────────────────────────────── */}
        <div className="pb-16 sm:pb-20">
          <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-8">
            // Deployment Models
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-800">
            {DEPLOYMENTS.map((dep, i) => (
              <motion.div
                key={dep.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-neutral-950 p-6 sm:p-8 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Globe size={14} className="text-emerald-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    {dep.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed mb-5 flex-1">
                  {dep.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dep.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-mono text-neutral-400
                        border border-neutral-800 bg-neutral-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── What you get ─────────────────────────────────────────────────── */}
        <div className="pb-16 sm:pb-20">
          <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-8">
            // Everything Included
          </div>

          <div className="border border-neutral-800 bg-neutral-950 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
              {[
                "Unlimited reports for all team members",
                "Full 12-tool knowledge base + custom additions",
                "Detailed ROI modeling with your cost structures",
                "PDF report generation with your branding",
                "SAML/OIDC SSO integration",
                "Role-based access (Admin / Engineer / Executive)",
                "Custom agent fine-tuning on your data",
                "Quarterly business reviews",
                "99.9% uptime SLA",
                "Priority pipeline (< 30s response)",
                "Data residency controls",
                "Dedicated Slack channel for support",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 py-2">
                  <Check size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-neutral-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Process ──────────────────────────────────────────────────────── */}
        <div className="pb-16 sm:pb-20">
          <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-8">
            // How It Works
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-neutral-800">
            {[
              {
                step: "01",
                title: "Discovery Call",
                desc: "30-minute call to understand your battery operations, current tooling, and pain points.",
                icon: Users,
              },
              {
                step: "02",
                title: "KB Customization",
                desc: "We configure the knowledge base with your internal tools, cost models, and chemistry profiles.",
                icon: Database,
              },
              {
                step: "03",
                title: "Pilot Deployment",
                desc: "Run the pipeline on 3-5 real problems from your team. Validate recommendations against ground truth.",
                icon: Zap,
              },
              {
                step: "04",
                title: "Full Rollout",
                desc: "Deploy to all teams with SSO, RBAC, and your chosen infrastructure model. Ongoing support begins.",
                icon: FileText,
              },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-neutral-950 p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono text-emerald-500">{s.step}</span>
                    <Icon size={14} className="text-neutral-600" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-2">
                    {s.title}
                  </h4>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Contact form ─────────────────────────────────────────────────── */}
        <div id="contact" className="pb-16 sm:pb-20 scroll-mt-24">
          <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-8">
            // Contact Sales
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-neutral-800">
            {/* Left: Context */}
            <div className="lg:col-span-2 bg-neutral-950 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-3">
                  Let&apos;s talk about your battery operations.
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                  Tell us about your manufacturing challenges and we&apos;ll show
                  you how the pipeline can be customized for your environment.
                </p>

                <div className="space-y-3">
                  {[
                    "30-minute discovery call",
                    "Custom demo with your problem type",
                    "ROI estimate for your specific use case",
                    "No commitment required",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check size={10} className="text-emerald-500 flex-shrink-0" />
                      <span className="text-[11px] text-neutral-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-900 text-[10px] text-neutral-700 uppercase tracking-widest">
                Response time: &lt; 24 hours
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3 bg-neutral-950 p-6 sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="p-3 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mb-4">
                    <Check size={24} />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">
                    Message Received
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-sm">
                    Our enterprise team will reach out within 24 hours to schedule
                    your discovery call.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-black border border-neutral-800 px-4 py-2.5 text-xs text-neutral-300
                          placeholder:text-neutral-700 focus:border-neutral-600 focus:outline-none transition-colors"
                        placeholder="Rajesh Kumar"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-black border border-neutral-800 px-4 py-2.5 text-xs text-neutral-300
                          placeholder:text-neutral-700 focus:border-neutral-600 focus:outline-none transition-colors"
                        placeholder="rajesh@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-1.5">
                        Company *
                      </label>
                      <input
                        name="company"
                        required
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full bg-black border border-neutral-800 px-4 py-2.5 text-xs text-neutral-300
                          placeholder:text-neutral-700 focus:border-neutral-600 focus:outline-none transition-colors"
                        placeholder="C4V Batteries"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-1.5">
                        Company Size
                      </label>
                      <select
                        name="size"
                        value={formState.size}
                        onChange={handleChange}
                        className="w-full bg-black border border-neutral-800 px-4 py-2.5 text-xs text-neutral-300
                          focus:border-neutral-600 focus:outline-none transition-colors appearance-none"
                      >
                        <option value="">Select...</option>
                        <option value="50-200">50 – 200 employees</option>
                        <option value="200-1000">200 – 1,000 employees</option>
                        <option value="1000+">1,000+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-1.5">
                      What challenges are you facing? *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full bg-black border border-neutral-800 px-4 py-2.5 text-xs text-neutral-300
                        placeholder:text-neutral-700 focus:border-neutral-600 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your battery manufacturing challenges, current tooling, and what you're looking to improve..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-500 text-black text-xs font-bold uppercase tracking-widest
                      py-3.5 hover:bg-emerald-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Send Message <ArrowRight size={14} />
                  </button>

                  <p className="text-[10px] text-neutral-700 text-center">
                    By submitting, you agree to be contacted about enterprise solutions.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-900 py-6 flex justify-between items-center text-[10px] text-neutral-700 uppercase tracking-widest">
          <span>AI Consultant.io // Enterprise</span>
          <span>SOC2 Ready</span>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}