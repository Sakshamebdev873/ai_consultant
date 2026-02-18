'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ConsultationPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    industry: '',
    companySize: '',
    role: '',
    problem: '',
    goal: '',
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-black text-white font-mono flex overflow-hidden">
      
      {/* LEFT PANEL: The AI "Consultant Agent" Observer */}
      <div className="hidden lg:flex flex-col w-[30%] border-r border-neutral-800 bg-neutral-950/50 p-8 relative">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,127,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,127,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="z-10 h-full flex flex-col">
          <div className="mb-8">
            <h2 className="text-xs font-bold text-emerald-500 tracking-widest uppercase mb-2">
              <span className="w-2 h-2 bg-emerald-500 inline-block mr-2 animate-pulse rounded-full"></span>
              Consultant_Agent_V1
            </h2>
            <div className="h-[1px] w-full bg-emerald-900/50"></div>
          </div>

          {/* Simulated System Logs */}
          <div className="flex-1 overflow-hidden font-mono text-[10px] text-neutral-500 space-y-2 leading-relaxed opacity-80">
            <p className="text-emerald-500/50"> [SYSTEM] Initializing intake protocol...</p>
            <p> [AGENT] Awaiting user inputs for vector classification.</p>
            {activeStep > 1 && (
              <>
                <p className="text-white"> [INPUT_RX] Business context received.</p>
                <p> [PROCESS] Analyzing sector constraints...</p>
                <p> [PROCESS] Mapping maturity model...</p>
              </>
            )}
            {formData.industry && (
               <p className="text-emerald-400"> [DETECT] Industry Vector: {formData.industry.toUpperCase()}</p>
            )}
            <div className="animate-pulse">_</div>
          </div>

          {/* Bottom Stats */}
          <div className="border-t border-neutral-800 pt-4 mt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-[9px] uppercase text-neutral-600">Tokens Processed</div>
              <div className="text-lg text-neutral-300">0</div>
            </div>
            <div>
              <div className="text-[9px] uppercase text-neutral-600">Model Confidence</div>
              <div className="text-lg text-emerald-500">--%</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: The Input Terminal */}
      <div className="w-full lg:w-[70%] flex flex-col relative overflow-y-auto">
        <header className="p-8 border-b border-neutral-800 flex justify-between items-center bg-black/80 backdrop-blur-sm sticky top-0 z-50">
          <div>
             <h1 className="text-xl font-bold tracking-tight">Diagnostic Sequence</h1>
             <p className="text-xs text-neutral-500 mt-1">Provide operational parameters for AI architecture.</p>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-xs text-neutral-500">STEP {activeStep} / 3</span>
             <div className="w-24 h-1 bg-neutral-800 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-white transition-all duration-500 ease-out"
                 style={{ width: `${(activeStep / 3) * 100}%` }}
               />
             </div>
          </div>
        </header>

        <main className="flex-1 p-8 lg:p-16 max-w-4xl mx-auto w-full">
          
          {/* STEP 1: Business Context [Cite: 5] */}
          {activeStep === 1 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 border-l-2 border-emerald-500 pl-3">
                  01 // Business Context
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase text-neutral-500">Target Industry</label>
                    <select 
                      className="w-full bg-neutral-900 border border-neutral-800 p-4 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all text-neutral-200"
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    >
                      <option value="">Select Sector...</option>
                      <option value="fintech">Fintech & Banking</option>
                      <option value="healthcare">Healthcare & Bio</option>
                      <option value="ecommerce">Retail & E-commerce</option>
                      <option value="saas">Enterprise SaaS</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase text-neutral-500">Organization Scale</label>
                    <select 
                      className="w-full bg-neutral-900 border border-neutral-800 p-4 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all text-neutral-200"
                      onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                    >
                      <option value="">Select Range...</option>
                      <option value="startup">Startup (1-10)</option>
                      <option value="smb">Growth (11-50)</option>
                      <option value="mid">Mid-Market (51-200)</option>
                      <option value="enterprise">Enterprise (200+)</option>
                    </select>
                  </div>

                   <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase text-neutral-500">Primary Role</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Technical', 'Product', 'Executive', 'Operations'].map((role) => (
                        <button
                          key={role}
                          onClick={() => setFormData({...formData, role})}
                          className={`p-4 border text-xs uppercase tracking-wider transition-all
                            ${formData.role === role 
                              ? 'bg-white text-black border-white' 
                              : 'bg-transparent border-neutral-800 text-neutral-400 hover:border-neutral-600'
                            }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex justify-end">
                <button 
                  onClick={handleNext}
                  className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center gap-2 group"
                >
                  <span>Proceed to Maturity Check</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Tech Maturity [Cite: 5] */}
          {activeStep === 2 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 border-l-2 border-emerald-500 pl-3">
                  02 // Technical Baseline
                </h3>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs uppercase text-neutral-500">Current Tech Stack (Separate with commas)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. AWS, React, Python, Postgres..."
                      className="w-full bg-neutral-900 border border-neutral-800 p-4 text-sm focus:border-emerald-500 outline-none text-white font-mono"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs uppercase text-neutral-500">Data Readiness</label>
                    <div className="grid gap-4">
                      {[
                        'Unstructured / Raw (PDFs, Docs)',
                        'Semi-Structured (NoSQL, APIs)',
                        'Structured (SQL Warehouses)',
                        'Vectorized / Embedding Ready'
                      ].map((level, idx) => (
                        <label key={idx} className="flex items-center gap-4 p-4 border border-neutral-800 hover:bg-neutral-900 cursor-pointer group transition-colors">
                          <div className="w-4 h-4 rounded-full border border-neutral-600 group-hover:border-emerald-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <span className="text-sm text-neutral-300 font-mono">{level}</span>
                          <input type="radio" name="data_maturity" className="hidden" />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex justify-between">
                <button onClick={() => setActiveStep(1)} className="text-neutral-500 hover:text-white uppercase text-xs tracking-widest">
                   ← Back
                </button>
                <button 
                  onClick={handleNext}
                  className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center gap-2 group"
                >
                  <span>Analyze Problem</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          )}

           {/* STEP 3: Problem Definition [Cite: 5] */}
           {activeStep === 3 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 border-l-2 border-emerald-500 pl-3">
                  03 // Intelligence Gap
                </h3>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase text-neutral-500">Primary Objective</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['Cost Reduction', 'Process Automation', 'Prediction/Forecasting', 'Customer Experience'].map((goal) => (
                        <button
                          key={goal}
                          onClick={() => setFormData({...formData, goal})}
                          className={`p-4 border text-xs uppercase tracking-wider transition-all text-left
                            ${formData.goal === goal 
                              ? 'bg-neutral-800 border-emerald-500 text-white' 
                              : 'bg-transparent border-neutral-800 text-neutral-400 hover:border-neutral-600'
                            }`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs uppercase text-neutral-500">Describe the Friction Point</label>
                    <textarea 
                      rows={6}
                      placeholder="Describe the specific workflow you want to automate. Example: 'We spend 20 hours a week manually extracting data from invoices and need to automate this flow...'"
                      className="w-full bg-neutral-900 border border-neutral-800 p-4 text-sm focus:border-emerald-500 outline-none text-white font-mono resize-none leading-relaxed"
                      onChange={(e) => setFormData({...formData, problem: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 flex justify-between items-center">
                 <button onClick={() => setActiveStep(2)} className="text-neutral-500 hover:text-white uppercase text-xs tracking-widest">
                   ← Back
                </button>
                <button 
                  className="bg-emerald-500 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                >
                  <Link href={'/report'} className="animate-pulse">INITIATE ANALYSIS</Link>
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}