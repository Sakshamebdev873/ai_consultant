"use client";

import Link from "next/link";
import { useState } from "react";

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState("timeline");

  return (
    <div className="min-h-screen bg-black text-white font-mono flex overflow-hidden">
      {/* LEFT SIDEBAR: Navigation */}
      <div className="w-20 lg:w-64 border-r border-neutral-800 flex flex-col justify-between p-6 bg-neutral-950">
        <div className="space-y-8">
          <div className="w-8 h-8 bg-white rounded-full mb-8"></div>

          <nav className="space-y-2">
            {["Overview", "Timeline", "Budget", "Team"].map((item) => (
              <button
                key={item}
                className={`w-full text-left px-4 py-3 text-xs uppercase tracking-widest transition-colors border-l-2
                  ${
                    activeTab === item.toLowerCase() ||
                    (item === "Timeline" && activeTab === "timeline")
                      ? "border-emerald-500 text-white bg-neutral-900"
                      : "border-transparent text-neutral-500 hover:text-white"
                  }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="text-[10px] text-neutral-600 uppercase">
          Project ID: <br /> #A9-442-X
        </div>
      </div>

      {/* MAIN CONTENT: The Execution Plan */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <header className="p-8 border-b border-neutral-800 flex justify-between items-end bg-black/80 backdrop-blur-md z-10">
          <div>
            <div className="text-emerald-500 text-xs uppercase tracking-widest mb-2">
              ● Active Protocol
            </div>
            <h1 className="text-3xl font-bold">Execution Roadmap</h1>
            <p className="text-neutral-500 text-sm mt-1">
              Est. Completion: <span className="text-white">4 Weeks</span>
            </p>
          </div>
          <Link href="/dashboard">
            <button className="bg-emerald-500 text-black px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center gap-2">
              <span>Sign Statement of Work</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
            </button>
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* PHASE 1 */}
            <div className="relative pl-8 border-l border-neutral-800 space-y-2">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-bold">
                  Phase 01: Infrastructure Provisioning
                </h3>
                <span className="text-xs font-mono text-neutral-500">
                  Week 1
                </span>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-sm">
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-5 h-5 flex items-center justify-center border border-neutral-700 bg-black text-[10px] text-neutral-400">
                      01
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        Vector Database Setup (Pinecone)
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">
                        Initialize index pods (s1.x1) and configure namespace
                        isolation for secure data handling.
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-5 h-5 flex items-center justify-center border border-neutral-700 bg-black text-[10px] text-neutral-400">
                      02
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        API Gateway Configuration
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">
                        Set up edge caching and rate limiting for OpenAI
                        endpoints.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* PHASE 2 */}
            <div className="relative pl-8 border-l border-neutral-800 space-y-2">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-neutral-700 rounded-full border border-black"></div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-bold text-neutral-300">
                  Phase 02: Ingestion Pipelines
                </h3>
                <span className="text-xs font-mono text-neutral-500">
                  Week 2-3
                </span>
              </div>
              <div className="bg-neutral-900/30 border border-neutral-800 p-6 rounded-sm opacity-75 hover:opacity-100 transition-opacity">
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-5 h-5 flex items-center justify-center border border-neutral-700 bg-black text-[10px] text-neutral-400">
                      01
                    </div>
                    <div>
                      <div className="text-sm font-bold text-neutral-300">
                        Unstructured Data ETL
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">
                        Build Python scripts to OCR PDFs and chunk text for
                        embedding generation.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* PHASE 3 */}
            <div className="relative pl-8 border-l border-neutral-800 space-y-2">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-neutral-700 rounded-full border border-black"></div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-bold text-neutral-300">
                  Phase 03: Agent Orchestration
                </h3>
                <span className="text-xs font-mono text-neutral-500">
                  Week 4
                </span>
              </div>
              <div className="bg-neutral-900/30 border border-neutral-800 p-6 rounded-sm opacity-50">
                <div className="text-xs text-neutral-500 uppercase tracking-widest text-center py-4">
                  Awaiting Phase 02 Completion
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
