"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function ReportPage() {
  const [loading, setLoading] = useState(true);

  // Simulate "Agent Processing" delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-mono space-y-4">
        <div className="w-16 h-16 border-4 border-neutral-800 border-t-emerald-500 rounded-full animate-spin"></div>
        <div className="text-xs uppercase tracking-widest animate-pulse">
          Compiling Intelligence...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 lg:p-8 overflow-x-hidden">
      {/* HEADER: Report Metadata */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-neutral-800 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-emerald-500 uppercase tracking-widest">
              Analysis Complete
            </span>
          </div>
          <h1 className="text-3xl font-bold">INTELLIGENCE REPORT // V.1</h1>
          <p className="text-neutral-500 text-sm mt-1">
            Generated for: <span className="text-white">FINTECH_USER_01</span>
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 border border-neutral-800 hover:bg-neutral-900 text-xs uppercase tracking-widest transition-colors">
            Export PDF
          </button>

          {/* UPDATE THIS BUTTON */}
          <Link href="/roadmap">
            <button className="px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors">
              Deploy Stack
            </button>
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUMN 1: CONSULTANT SUMMARY [Source: 5] */}
        <div className="lg:col-span-1 space-y-8">
          {/* Section: Context Analysis */}
          <section className="bg-neutral-900/30 border border-neutral-800 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-50">
              <svg
                className="w-6 h-6 text-neutral-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <h3 className="text-xs text-neutral-500 uppercase tracking-widest mb-4">
              01 // Context Analysis
            </h3>

            <div className="space-y-4">
              <div>
                <div className="text-[10px] uppercase text-neutral-600 mb-1">
                  Detected Industry
                </div>
                <div className="text-xl text-white">Fintech & Banking</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] uppercase text-neutral-600 mb-1">
                    Maturity Score
                  </div>
                  <div className="text-sm text-emerald-400">HIGH (8.5/10)</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-neutral-600 mb-1">
                    Risk Profile
                  </div>
                  <div className="text-sm text-orange-400">CRITICAL</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-neutral-600 mb-1">
                  Primary Pain Point
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed border-l-2 border-neutral-700 pl-3">
                  "Manual extraction of unstructured invoice data causing
                  20h/week latency in payment processing."
                </p>
              </div>
            </div>
          </section>

          {/* Section: Cost Projection [Source: 7] */}
          <section className="bg-neutral-900/30 border border-neutral-800 p-6">
            <h3 className="text-xs text-neutral-500 uppercase tracking-widest mb-6">
              03 // Cost Estimator (Monthly)
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                <span className="text-sm text-neutral-400">
                  Infrastructure (Cloud/GPU)
                </span>
                <span className="font-mono text-sm">$400 - $600</span>
              </div>
              <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                <span className="text-sm text-neutral-400">
                  Licensing (LLM APIs)
                </span>
                <span className="font-mono text-sm">$150 - $300</span>
              </div>
              <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                <span className="text-sm text-neutral-400">
                  Maintenance Team
                </span>
                <span className="font-mono text-sm">~$5k (Part-time)</span>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <span className="text-sm font-bold text-white">
                  TOTAL ESTIMATE
                </span>
                <span className="font-mono text-xl text-emerald-400 font-bold">
                  $5.5k - $6k
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* COLUMN 2 & 3: RECOMMENDED STACK [Source: 6] */}
        <div className="lg:col-span-2">
          <div className="border border-neutral-800 bg-neutral-950 p-8 h-full relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <h3 className="text-xs text-neutral-500 uppercase tracking-widest mb-8 relative z-10">
              02 // Recommended Architecture
            </h3>

            <div className="grid gap-6 relative z-10">
              {/* Tool Card 1: The Brain */}
              <div className="group border border-neutral-800 bg-black hover:border-emerald-500/50 transition-colors p-6 flex flex-col md:flex-row gap-6">
                <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center border border-neutral-800 text-xl">
                  🧠
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-white">
                      OpenAI GPT-4o (API)
                    </h4>
                    <span className="px-2 py-1 bg-neutral-900 text-[10px] text-neutral-400 uppercase border border-neutral-800">
                      Inference
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 mb-4">
                    Selected for high reasoning capabilities required for
                    unstructured invoice data extraction. Superior zero-shot
                    performance on financial documents.
                  </p>
                  <ul className="text-xs text-neutral-500 space-y-1 font-mono">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> Handles
                      complex table structures
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>{" "}
                      Enterprise-grade security compliance
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tool Card 2: The Memory */}
              <div className="group border border-neutral-800 bg-black hover:border-emerald-500/50 transition-colors p-6 flex flex-col md:flex-row gap-6">
                <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center border border-neutral-800 text-xl">
                  🗄️
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-white">
                      Pinecone (Serverless)
                    </h4>
                    <span className="px-2 py-1 bg-neutral-900 text-[10px] text-neutral-400 uppercase border border-neutral-800">
                      Vector Database
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 mb-4">
                    Managed vector database to store historical invoice
                    embeddings for "Retrieval Augmented Generation" (RAG),
                    allowing the AI to learn from past decisions.
                  </p>
                  <ul className="text-xs text-neutral-500 space-y-1 font-mono">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> Low latency
                      retrieval {`(<100ms)`}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> Metadata
                      filtering for strict data segregation
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tool Card 3: The Infrastructure */}
              <div className="group border border-neutral-800 bg-black hover:border-emerald-500/50 transition-colors p-6 flex flex-col md:flex-row gap-6">
                <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center border border-neutral-800 text-xl">
                  ☁️
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-white">
                      Vercel / AWS Lambda
                    </h4>
                    <span className="px-2 py-1 bg-neutral-900 text-[10px] text-neutral-400 uppercase border border-neutral-800">
                      Compute
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 mb-4">
                    Serverless architecture to handle sporadic document upload
                    spikes without paying for idle server time. Cost-effective
                    for batch processing.
                  </p>
                  <ul className="text-xs text-neutral-500 space-y-1 font-mono">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> Auto-scaling
                      zero-to-infinity
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> Native
                      Python/Node.js runtime support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
