'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [bootSequence, setBootSequence] = useState(false);

  useEffect(() => {
    setBootSequence(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono flex overflow-hidden selection:bg-white selection:text-black">
      
      {/* LEFT PANEL: Atmospheric Data Visualization */}
      <div className="hidden lg:flex flex-col justify-between w-[60%] border-r border-neutral-800 relative p-12">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        
        {/* Header */}
        <div className="relative z-10">
          <h1 className="text-xl font-bold tracking-widest uppercase mb-2">AI Consultant.io</h1>
          <div className="flex items-center gap-2 text-[10px] text-neutral-500">
            <div className="w-2 h-2 bg-emerald-500 animate-pulse" />
            <span>SYSTEM STATUS: NOMINAL</span>
          </div>
        </div>

        {/* Centerpiece: Big Typography */}
        <div className="relative z-10 space-y-2">
          <h2 className="text-6xl font-bold tracking-tighter leading-none opacity-90">
            STOP GUESSING.
            <br />
            <span className="text-neutral-600">START ARCHITECTING.</span>
          </h2>
          <p className="text-sm text-neutral-400 max-w-md mt-6 border-l border-neutral-700 pl-4 py-1">
            The world's first autonomous platform for AI procurement. 
            We turn the AI market into a verifiable science.
          </p>
        </div>

        {/* Footer Metrics */}
        <div className="relative z-10 grid grid-cols-3 gap-8 border-t border-neutral-800 pt-8">
          <div>
            <div className="text-[10px] text-neutral-500 uppercase mb-1">Risk Governance</div>
            <div className="text-xl font-bold">SECURE</div>
          </div>
          <div>
            <div className="text-[10px] text-neutral-500 uppercase mb-1">Latency</div>
            <div className="text-xl font-bold font-mono">14ms</div>
          </div>
          <div>
            <div className="text-[10px] text-neutral-500 uppercase mb-1">ROI Match</div>
            <div className="text-xl font-bold text-emerald-400">99.8%</div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: The Login Form */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center p-8 lg:p-20 relative bg-neutral-950">
        
        {/* Mobile Header (Visible only on small screens) */}
        <div className="lg:hidden absolute top-8 left-8">
           <h1 className="text-lg font-bold tracking-widest uppercase">AI Consultant.io</h1>
        </div>

        <div className={`transition-opacity duration-1000 ${bootSequence ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-12">
            <div className="text-xs text-neutral-500 mb-2 uppercase tracking-widest">[ AUTHENTICATION_PROTOCOL ]</div>
            <h2 className="text-3xl font-bold text-white">Initialize Session</h2>
          </div>

          <form className="space-y-8">
            {/* Custom Input: Email */}
            <div className="group relative">
              <label 
                className={`absolute left-0 -top-3 text-[10px] uppercase tracking-wider transition-colors duration-200 ${isFocused === 'email' ? 'text-white' : 'text-neutral-500'}`}
              >
                Enter Command (Email)
              </label>
              <input 
                type="email" 
                name="email"
                placeholder="user@enterprise.com"
                className="w-full bg-transparent border-b border-neutral-800 py-3 text-lg focus:outline-none focus:border-white transition-colors text-neutral-300 placeholder-neutral-800 rounded-none"
                onFocus={() => setIsFocused('email')}
                onBlur={() => setIsFocused(null)}
              />
              {/* Animated Underline Effect */}
              <div className={`h-[1px] bg-white absolute bottom-0 left-0 transition-all duration-300 ${isFocused === 'email' ? 'w-full' : 'w-0'}`} />
            </div>

            {/* Custom Input: Password */}
            <div className="group relative">
              <div className="flex justify-between items-baseline mb-1">
                <label 
                  className={`absolute left-0 -top-3 text-[10px] uppercase tracking-wider transition-colors duration-200 ${isFocused === 'password' ? 'text-white' : 'text-neutral-500'}`}
                >
                  Passkey
                </label>
              </div>
              <input 
                type="password" 
                name="password"
                placeholder="••••••••••••"
                className="w-full bg-transparent border-b border-neutral-800 py-3 text-lg focus:outline-none focus:border-white transition-colors text-neutral-300 placeholder-neutral-800 rounded-none"
                onFocus={() => setIsFocused('password')}
                onBlur={() => setIsFocused(null)}
              />
              <div className={`h-[1px] bg-white absolute bottom-0 left-0 transition-all duration-300 ${isFocused === 'password' ? 'w-full' : 'w-0'}`} />
              
              <div className="mt-2 text-right">
                <Link href="#" className="text-[10px] text-neutral-500 hover:text-white transition-colors uppercase tracking-wider">
                  Reset_Key?
                </Link>
              </div>
            </div>

            {/* Brutalist Button */}
            <button className="w-full group relative bg-white text-black h-14 font-bold uppercase tracking-widest overflow-hidden hover:bg-neutral-200 transition-colors">
              <div className="absolute inset-0 flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                <span>Decrypt & Enter</span>
                <span className="text-xl">→</span>
              </div>
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-neutral-900 flex justify-between items-center text-xs text-neutral-500">
            <span>ID: UNREGISTERED</span>
            <Link href="/register" className="text-white hover:underline underline-offset-4 decoration-1">
              DEPLOY IDENTITY →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}