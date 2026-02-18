'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IntegrationPage() {
  const [keyVisible, setKeyVisible] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success'>('idle');

  const handleTestConnection = () => {
    setConnectionStatus('testing');
    setTimeout(() => setConnectionStatus('success'), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex overflow-hidden">
      
      {/* SIDEBAR (Simplified for context) */}
      <div className="w-20 lg:w-64 border-r border-neutral-800 hidden lg:flex flex-col p-6 bg-neutral-950">
         <div className="mb-8 font-bold tracking-widest">AI CONSULTANT</div>
         <nav className="space-y-2 text-xs uppercase tracking-widest text-neutral-500">
           <Link href="/dashboard" className="block p-3 hover:text-white">← Back to Mission</Link>
           <div className="block p-3 text-white border-l-2 border-emerald-500 bg-neutral-900">Integrations</div>
         </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col relative overflow-y-auto">
        
        {/* Header */}
        <header className="p-8 border-b border-neutral-800 bg-black/80 backdrop-blur-md sticky top-0 z-20 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              SECURE VAULT
            </h1>
            <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest">Encrypted Credential Management</p>
          </div>
          <div className="flex gap-2 text-[10px] uppercase tracking-widest text-neutral-500 border border-neutral-800 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            End-to-End Encrypted
          </div>
        </header>

        <main className="p-8 lg:p-12 max-w-5xl mx-auto w-full space-y-12">

          {/* SECTION 1: LLM PROVIDERS (Licensing Cost Factor) [cite: 7] */}
          <section className="space-y-6">
            <div className="flex justify-between items-end border-b border-neutral-800 pb-2">
              <h2 className="text-lg font-bold text-neutral-300">01 // Inference Engine (LLM)</h2>
              <span className="text-xs text-neutral-500">Required for Reasoning</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* OpenAI Card */}
              <div className="border border-neutral-800 bg-neutral-900/30 p-6 relative group transition-all hover:border-neutral-600">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold rounded-sm">OA</div>
                    <div>
                      <h3 className="text-sm font-bold">OpenAI API</h3>
                      <p className="text-[10px] text-neutral-500">GPT-4o / Turbo Models</p>
                    </div>
                  </div>
                  <div className={`text-[10px] px-2 py-1 border ${connectionStatus === 'success' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : 'border-neutral-700 text-neutral-500'}`}>
                    {connectionStatus === 'success' ? 'ACTIVE' : 'DISCONNECTED'}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-neutral-500">Secret Key (sk-...)</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input 
                        type={keyVisible ? "text" : "password"}
                        placeholder="sk-..."
                        className="w-full bg-black border border-neutral-800 p-3 text-xs focus:border-emerald-500 outline-none font-mono text-emerald-500"
                        defaultValue={connectionStatus === 'success' ? "sk-proj-123456789" : ""}
                      />
                      <button 
                        onClick={() => setKeyVisible(!keyVisible)}
                        className="absolute right-3 top-3 text-neutral-600 hover:text-white"
                      >
                        {keyVisible ? "HIDE" : "SHOW"}
                      </button>
                    </div>
                    <button 
                      onClick={handleTestConnection}
                      className="bg-white text-black px-4 text-xs font-bold uppercase hover:bg-neutral-200 min-w-[100px]"
                    >
                      {connectionStatus === 'testing' ? '...' : connectionStatus === 'success' ? 'Synced' : 'Test'}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Placeholder for Anthropic/Other */}
              <div className="border border-neutral-800 bg-neutral-900/10 p-6 flex flex-col justify-center items-center text-neutral-600 border-dashed">
                <span className="text-2xl mb-2">+</span>
                <span className="text-xs uppercase tracking-widest">Add Fallback Model</span>
              </div>
            </div>
          </section>

          {/* SECTION 2: KNOWLEDGE BASE (Data Availability)  */}
          <section className="space-y-6">
             <div className="flex justify-between items-end border-b border-neutral-800 pb-2">
              <h2 className="text-lg font-bold text-neutral-300">02 // Knowledge Base</h2>
              <span className="text-xs text-neutral-500">Required for Context</span>
            </div>

            <div className="bg-neutral-900/30 border border-neutral-800 p-8 text-center border-dashed hover:border-emerald-500/50 transition-colors cursor-pointer group relative overflow-hidden">
               <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite] pointer-events-none opacity-0 group-hover:opacity-100"></div>
               
               <div className="relative z-10 space-y-4">
                 <div className="w-16 h-16 mx-auto bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-colors">
                   <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                 </div>
                 <div>
                   <h3 className="text-sm font-bold text-white">Upload Training Data</h3>
                   <p className="text-xs text-neutral-500 mt-2 max-w-md mx-auto">
                     Drag & drop PDF, CSV, or JSON files here. The ingestion agent will automatically chunk and vectorize this content.
                   </p>
                 </div>
                 <div className="pt-4">
                   <span className="text-[10px] uppercase border border-neutral-700 px-3 py-1 text-neutral-400 rounded-full">Max size: 500MB</span>
                 </div>
               </div>
            </div>
          </section>

           {/* SECTION 3: VECTOR DB (Infrastructure) [cite: 7] */}
           <section className="space-y-6">
             <div className="flex justify-between items-end border-b border-neutral-800 pb-2">
              <h2 className="text-lg font-bold text-neutral-300">03 // Long-Term Memory (Pinecone)</h2>
              <span className="text-xs text-neutral-500">Required for Recall</span>
            </div>
             
             <div className="border border-neutral-800 bg-neutral-900/30 p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase text-neutral-500">Environment</label>
                      <input type="text" className="w-full bg-black border border-neutral-800 p-3 text-xs outline-none text-white" placeholder="us-east-1-aws" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase text-neutral-500">Index Name</label>
                      <input type="text" className="w-full bg-black border border-neutral-800 p-3 text-xs outline-none text-white" placeholder="production-v1" />
                   </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase text-neutral-500">API Key</label>
                    <input type="password" className="w-full bg-black border border-neutral-800 p-3 text-xs outline-none text-white" placeholder="••••••••••••••••••••••••" />
                </div>
             </div>
           </section>

        </main>
      </div>
    </div>
  );
}