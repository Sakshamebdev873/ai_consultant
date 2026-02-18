"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { 
  AlertOctagon, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Lock, 
  Activity,
  XCircle,
  Binary
} from "lucide-react";

export const MarketDecryptor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics for the lens movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // The mask reveals the "Signal" layer. 
  // We use a radial gradient that moves with the mouse.
  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${springX}px ${springY}px, black, transparent)`;

  return (
    <section className="relative w-full py-40 bg-black overflow-hidden cursor-none">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12 text-center">
            <h2 className="text-5xl font-black text-white tracking-tighter mb-4">
              Market <span className="text-neutral-700">Reality.</span>
            </h2>
            <p className="text-neutral-500 uppercase tracking-widest text-xs font-mono">
              Use your cursor to decrypt the signal
            </p>
        </div>

        {/* --- THE INTERACTION LAYER --- */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative w-full h-[600px] border border-neutral-800 bg-neutral-900/20 rounded-3xl overflow-hidden group"
        >
          
          {/* LAYER 1: THE NOISE (Visible by default) */}
          {/* This represents the chaotic, unverified market */}
          <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-4 p-8 opacity-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <NoiseCard key={i} index={i} />
            ))}
          </div>

          {/* LAYER 2: THE SIGNAL (Hidden, revealed by mask) */}
          {/* This represents the verified, high-value tools */}
          <motion.div 
            style={{ maskImage, WebkitMaskImage: maskImage }}
            className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-black z-10"
          >
             {/* Background for the revealed area */}
             <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(16,185,129,0.1)_0%,transparent_100%)]" />
             
             {Array.from({ length: 12 }).map((_, i) => (
                <SignalCard key={i} index={i} />
             ))}
          </motion.div>

          {/* LAYER 3: THE LENS UI (Follows Mouse) */}
          <motion.div
            style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
            className="absolute w-[300px] h-[300px] rounded-full border border-emerald-500/50 pointer-events-none z-20 flex items-center justify-center"
          >
             {/* Rotating Rings */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-2 border border-dashed border-emerald-500/20 rounded-full"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
               className="absolute inset-8 border border-dotted border-emerald-500/20 rounded-full"
             />
             
             {/* Center Crosshair */}
             <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
             
             {/* Data Readout Floating near lens */}
             <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-emerald-500/30 px-3 py-1 rounded-full whitespace-nowrap">
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                  <Activity size={10} className="animate-pulse" /> Decrypting_Reality
                </span>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: NOISE CARD (The Bad Reality) ---
const NoiseCard = ({ index }: { index: number }) => {
  const noiseTerms = ["VAPORWARE", "DATA_LEAK", "HIGH_COST", "AUDIT_FAIL", "BETA_FOREVER", "NO_COMPLIANCE"];
  const term = noiseTerms[index % noiseTerms.length];

  return (
    <div className="h-full w-full bg-neutral-900/50 border border-neutral-800 p-6 flex flex-col items-center justify-center gap-4 grayscale opacity-50">
      <div className="p-4 bg-neutral-800 rounded-full text-neutral-600">
        <XCircle size={32} />
      </div>
      <div className="text-center">
        <div className="text-2xl font-black text-neutral-700 tracking-tighter line-through decoration-red-900 decoration-4">
          {term}
        </div>
        <div className="text-[10px] font-mono text-red-900 mt-2 uppercase tracking-widest">
          Threat_Detected
        </div>
      </div>
      <div className="w-full h-1 bg-red-900/20 rounded-full mt-4" />
    </div>
  );
};

// --- COMPONENT: SIGNAL CARD (The Verified Truth) ---
const SignalCard = ({ index }: { index: number }) => {
  // We map the "Noise" index to a "Signal" equivalent
  const signals = [
    { name: "Enterprise LLM", icon: <Cpu />, tier: "SOC2 Type II" },
    { name: "Vector Memory", icon: <Database />, tier: "Encrypted" },
    { name: "Neural Guard", icon: <ShieldCheck />, tier: "GDPR Ready" },
    { name: "Logic Core", icon: <Binary />, tier: "99.9% Uptime" },
    { name: "Auth Gateway", icon: <Lock />, tier: "ISO 27001" },
    { name: "Edge Compute", icon: <Activity />, tier: "<15ms Latency" },
  ];
  
  const signal = signals[index % signals.length];

  return (
    <div className="h-full w-full bg-black border border-emerald-500/50 p-6 flex flex-col items-center justify-center gap-4 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden">
      
      {/* Background Grid inside the card */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
      
      <div className="relative p-4 bg-emerald-500/10 rounded-full text-emerald-500 border border-emerald-500/20">
        {signal.icon}
      </div>
      
      <div className="relative text-center">
        <div className="text-xl font-bold text-white tracking-tight">
          {signal.name}
        </div>
        <div className="text-[10px] font-mono text-emerald-500 mt-2 uppercase tracking-widest bg-emerald-950/50 px-2 py-1 rounded-sm border border-emerald-500/20 inline-block">
          {signal.tier}
        </div>
      </div>

      <div className="relative w-full h-1 bg-neutral-900 rounded-full mt-4 overflow-hidden">
        <motion.div 
           initial={{ width: 0 }}
           whileInView={{ width: "100%" }}
           className="h-full bg-emerald-500"
        />
      </div>
    </div>
  );
};