"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono flex overflow-hidden">
      {/* SIDEBAR NAVIGATION */}
      <div className="w-20 lg:w-64 border-r border-neutral-800 flex flex-col justify-between p-6 bg-neutral-950">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-sm flex items-center justify-center font-bold text-black">
              AI
            </div>
            <span className="hidden lg:block font-bold tracking-widest">
              CONSULTANT
            </span>
          </div>

          <nav className="space-y-2">
            <button className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest bg-neutral-900 border-l-2 border-emerald-500 text-white">
              Mission Control
            </button>
            <button className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest text-neutral-500 hover:text-white border-l-2 border-transparent transition-colors">
              Agent Logs
            </button>
            <button className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest text-neutral-500 hover:text-white border-l-2 border-transparent transition-colors">
              Cost Ledger
            </button>
            <button className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest text-neutral-500 hover:text-white border-l-2 border-transparent transition-colors">
              Settings
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3 opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
          <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700"></div>
          <div className="hidden lg:block">
            <div className="text-xs font-bold">Alex Chen</div>
            <div className="text-[10px] text-neutral-500">
              CTO // FINTECH_01
            </div>
          </div>
        </div>
      </div>

      {/* MAIN DASHBOARD CONTENT */}
      <div className="flex-1 overflow-y-auto bg-black relative">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <header className="p-8 border-b border-neutral-800 flex justify-between items-center bg-black/80 backdrop-blur-md sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold">
              Project Status: <span className="text-emerald-500">ACTIVE</span>
            </h1>
            <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest">
              Phase 01: Infrastructure Provisioning in Progress
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-[10px] text-neutral-500 uppercase">
                Server Time
              </div>
              <div className="font-mono text-sm">14:02:55 UTC</div>
            </div>
            <button className="bg-white text-black px-4 py-2 font-bold text-xs uppercase hover:bg-neutral-200">
              Pause Workflow
            </button>
          </div>
        </header>

        <main className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {/* CARD 1: LIVE METRICS (Simulated) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-neutral-900/50 border border-neutral-800 p-6">
                <div className="text-[10px] text-neutral-500 uppercase mb-2">
                  Est. Monthly Cost
                </div>
                <div className="text-2xl font-mono text-white">$5,850</div>
                <div className="text-[10px] text-emerald-500 mt-1">
                  WITHIN BUDGET
                </div>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 p-6">
                <div className="text-[10px] text-neutral-500 uppercase mb-2">
                  Tokens Processed
                </div>
                <div className="text-2xl font-mono text-white">0</div>
                <div className="text-[10px] text-neutral-500 mt-1">
                  IDLE STATE
                </div>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 p-6">
                <div className="text-[10px] text-neutral-500 uppercase mb-2">
                  Security Score
                </div>
                <div className="text-2xl font-mono text-emerald-500">
                  98/100
                </div>
                <div className="text-[10px] text-neutral-500 mt-1">
                  SOC2 COMPLIANT
                </div>
              </div>
            </div>

            {/* LIVE AGENT TERMINAL */}
            <div className="border border-neutral-800 bg-black h-96 flex flex-col">
              <div className="border-b border-neutral-800 p-4 flex justify-between items-center bg-neutral-950">
                <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">
                  System Logs
                </span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 border border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
                </div>
              </div>
              <div className="flex-1 p-4 font-mono text-xs space-y-2 overflow-y-auto text-neutral-400">
                <p>
                  <span className="text-neutral-600">[14:00:01]</span>{" "}
                  <span className="text-emerald-500">SYSTEM</span> Project
                  initialized by user.
                </p>
                <p>
                  <span className="text-neutral-600">[14:00:02]</span>{" "}
                  <span className="text-blue-400">AGENT_01</span> Reading SOW
                  parameters...
                </p>
                <p>
                  <span className="text-neutral-600">[14:00:05]</span>{" "}
                  <span className="text-blue-400">AGENT_01</span> Provisioning
                  Pinecone Index: 'fintech-invoice-v1'
                </p>
                <p>
                  <span className="text-neutral-600">[14:00:08]</span>{" "}
                  <span className="text-yellow-500">WARN</span> API Key rotation
                  recommended within 24h.
                </p>
                <p>
                  <span className="text-neutral-600">[14:00:12]</span>{" "}
                  <span className="text-blue-400">AGENT_02</span> Validating
                  OpenAI credits...
                </p>
                <p className="animate-pulse">_</p>
              </div>
            </div>
          </div>

          {/* CARD 2: ACTION ITEMS */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 p-6">
              <h3 className="text-xs uppercase tracking-widest font-bold mb-4 border-b border-neutral-800 pb-2">
                Pending Actions
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start opacity-50">
                  <div className="mt-1 w-4 h-4 border border-emerald-500 bg-emerald-500 flex items-center justify-center text-black font-bold text-[10px]">
                    ✓
                  </div>
                  <div>
                    <div className="text-sm line-through">
                      Approve Statement of Work
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      Completed 2m ago
                    </div>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="mt-1 w-4 h-4 border border-neutral-600 hover:border-emerald-500 cursor-pointer transition-colors"></div>
                  <div>
                    <div className="text-sm text-white">
                      Connect Data Source
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      Required for Phase 02
                    </div>

                    {/* UPDATE THIS BUTTON */}
                    <Link href="/integration">
                      <button className="mt-2 text-[10px] bg-neutral-800 px-2 py-1 hover:bg-neutral-700 transition-colors">
                        Configure API →
                      </button>
                    </Link>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="mt-1 w-4 h-4 border border-neutral-600 hover:border-emerald-500 cursor-pointer transition-colors"></div>
                  <div>
                    <div className="text-sm text-white">
                      Invite Team Members
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      0/3 Seats used
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-900/50 p-6">
              <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-500 mb-2">
                Need Human Override?
              </h3>
              <p className="text-xs text-neutral-400 mb-4">
                Our solution architects are available for high-level debugging.
              </p>
              <button className="w-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 text-xs py-2 uppercase hover:bg-emerald-500 hover:text-black transition-all">
                Request Session
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
