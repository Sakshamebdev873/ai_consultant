"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Network, Zap, Hexagon, Terminal } from "lucide-react";

export const CognitiveBridge = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Mouse tracking for 3D perspective
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX / window.innerWidth);
    mouseY.set(clientY / window.innerHeight);
  };

  // Smooth out the mouse movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Calculate 3D rotations based on mouse position
  const rotateX = useTransform(springY, [0, 1], [15, -15]);
  const rotateY = useTransform(springX, [0, 1], [-15, 15]);
  
  // Parallax for background elements
  const moveX = useTransform(springX, [0, 1], [-50, 50]);
  const moveY = useTransform(springY, [0, 1], [-50, 50]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden  selection:bg-emerald-500 selection:text-black perspective-[2000px]"
    >
      
      {/* 1. BACKGROUND: THE WARP TUNNEL */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" style={{ perspective: "1000px" }}>
        <motion.div 
          style={{ rotateX, rotateY }}
          className="relative w-full h-full flex items-center justify-center preserve-3d"
        >
          {/* GENERATE 6 ARCHITECTURAL GATES */}
          {Array.from({ length: 6 }).map((_, i) => (
            <TunnelGate key={i} index={i} />
          ))}
          
          {/* FLOATING DATA PARTICLES */}
          <motion.div 
             style={{ x: moveX, y: moveY }}
             className="absolute inset-0 z-0"
          >
             {Array.from({ length: 20 }).map((_, i) => (
               <div 
                 key={i}
                 className="absolute bg-emerald-500/20 rounded-full blur-[1px]"
                 style={{
                   width: Math.random() * 4 + 1 + 'px',
                   height: Math.random() * 4 + 1 + 'px',
                   top: Math.random() * 100 + '%',
                   left: Math.random() * 100 + '%',
                   opacity: Math.random() * 0.5 + 0.1,
                 }}
               />
             ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 2. CENTER CONTENT UI */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        
        {/* Holographic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-sm border border-emerald-500/30 bg-black/80 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        >
          <div className="flex items-center gap-1">
             <span className="w-1 h-3 bg-emerald-500 animate-pulse" />
             <span className="w-1 h-2 bg-emerald-500/50" />
             <span className="w-1 h-1 bg-emerald-500/30" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-emerald-500 uppercase">
            Bridge_Sequence_Ready
          </span>
        </motion.div>

        {/* Main Heading */}
        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
          Cross the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-emerald-400 animate-shimmer bg-[length:200%_auto] italic">
            Intelligence Gap.
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-mono">
          Legacy infrastructure on one side. Autonomous agents on the other. 
          <span className="text-white"> We provide the architecture to connect them.</span>
        </p>

        {/* CTA Button: "The Key" */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center justify-center px-10 py-6 bg-emerald-500 text-black font-black text-sm uppercase tracking-[0.2em] overflow-hidden"
        >
          {/* Button Background Scan Effect */}
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          
          <span className="relative z-10 flex items-center gap-4">
            <Terminal size={18} />
            Initialize Bridge
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </span>
          
          {/* Decorative Corner Borders */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black" />
        </motion.button>

        {/* Status Footer */}
        <div className="mt-16 flex justify-center gap-12 opacity-50 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
           <div className="flex items-center gap-2">
              <Hexagon size={12} className="text-emerald-500" /> 
              Protocol: Secure
           </div>
           <div className="flex items-center gap-2">
              <Zap size={12} className="text-emerald-500" /> 
              Latency: 4ms
           </div>
           <div className="flex items-center gap-2">
              <Network size={12} className="text-emerald-500" /> 
              Nodes: Active
           </div>
        </div>

      </div>
      
      {/* Bottom Fade for smooth transition to footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};

// --- SUB-COMPONENT: 3D TUNNEL GATE ---
const TunnelGate = ({ index }: { index: number }) => {
  // Create staggered animation for the "infinite tunnel" effect
  // The further back (higher index), the smaller the scale and lower opacity initially
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, z: -500 }}
      animate={{ 
         opacity: [0, 1, 0], // Fade in then out
         scale: [0.5, 1.5],  // Grow towards camera
         z: [-500, 500]      // Move from back to front
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        delay: index * 1.2, 
        ease: "linear" 
      }}
      className="absolute border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)] flex items-center justify-center"
      style={{
        width: '60vw',
        height: '60vh',
        borderRadius: '20px', // Slightly rounded corners for "Tech" look
      }}
    >
      {/* Decorative Gate Markings */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-black border border-emerald-500/20 text-[8px] font-mono text-emerald-900 uppercase tracking-widest">
         GATE_0{index + 1}
      </div>
      
      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-emerald-500/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-emerald-500/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-emerald-500/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-emerald-500/30" />
    </motion.div>
  );
};