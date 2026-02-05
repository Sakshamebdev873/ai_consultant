"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Filter, Zap, Search, Layers } from "lucide-react";

const CHAOS_NODES = Array.from({ length: 24 });

export const MarketDecryptor = () => {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  

  return (
    <section 

      className="relative w-full py-32  overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-mono text-[10px] tracking-[0.5em] mb-4 uppercase"
          >
            Market_Denoising_Engine
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            From chaos to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-white animate-gradient">Verifiable Signal.</span>
          </h2>
          <p className="text-slate-500 max-w-xl text-lg">
            The AI market is a flood of noise. Our engine decrypts tool capabilities 
            to find the 0.1% that actually integrate with your stack.
          </p>
        </div>

        {/* INTERACTIVE DECRYPTOR FIELD */}
        <div className="relative h-[500px] w-full border border-white/5 rounded-[3rem] bg-white/[0.01] flex items-center justify-center cursor-none group">
          
          {/* Chaotic Background Nodes */}
          <div className="absolute inset-0 overflow-hidden">
            {CHAOS_NODES.map((_, i) => (
              <MovingNode key={i} mouseX={mouseX} mouseY={mouseY} active={isDecrypted} />
            ))}
          </div>

          {/* Central Action Trigger */}
          <motion.button
            onMouseEnter={() => setIsDecrypted(true)}
            onMouseLeave={() => setIsDecrypted(false)}
            whileHover={{ scale: 1.05 }}
            className="relative z-20 px-12 py-6 bg-white text-black rounded-2xl font-black text-sm tracking-widest flex items-center gap-4 shadow-2xl transition-all"
          >
            {isDecrypted ? <Zap className="animate-pulse" /> : <Filter />}
            {isDecrypted ? "DECRYPTING MARKET..." : "HOVER TO FILTER NOISE"}
          </motion.button>

          {/* Custom Cursor */}
          {/* <motion.div 
            className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-50 mix-blend-difference"
            style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
          /> */}
        </div>
      </div>
    </section>
  );
};

const MovingNode = ({ mouseX, mouseY, active }: any) => {
  // Random initial positions
  const initialX = Math.random() * 100;
  const initialY = Math.random() * 100;
  
  // Snap to grid positions when active
  const gridX = Math.floor(initialX / 20) * 20 + 10;
  const gridY = Math.floor(initialY / 20) * 20 + 10;

  return (
    <motion.div
      animate={{ 
        left: active ? `${gridX}%` : `${initialX}%`, 
        top: active ? `${gridY}%` : `${initialY}%`,
        opacity: active ? 0.6 : 0.2,
        scale: active ? 1 : 0.5
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`absolute w-1 h-1 bg-white rounded-full ${active ? 'shadow-[0_0_10px_white]' : ''}`}
    />
  );
};