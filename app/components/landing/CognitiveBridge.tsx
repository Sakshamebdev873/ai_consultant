"use client";

import React, { useRef } from "react";
import {
  motion,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowRight, Network, Zap, Hexagon, Terminal } from "lucide-react";
import Link from "next/link";

// ✅ STATIC PARTICLES (no re-renders)
const PARTICLES = Array.from({ length: 12 }).map(() => ({
  size: Math.random() * 3 + 1,
  top: Math.random() * 100,
  left: Math.random() * 100,
  opacity: Math.random() * 0.4 + 0.1,
}));

export const CognitiveBridge = () => {
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // ✅ MOBILE CHECK
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  // ✅ THROTTLED MOUSE MOVE
  const handleMouseMove = (e: React.MouseEvent) => {
    requestAnimationFrame(() => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    });
  };

  const springX = useSpring(mouseX, {
    stiffness: 50,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 50,
    damping: 20,
  });

  // ✅ LIGHTER 3D (disabled on mobile)
  const rotateX = useTransform(
    springY,
    [0, 1],
    isMobile ? [0, 0] : [10, -10]
  );

  const rotateY = useTransform(
    springX,
    [0, 1],
    isMobile ? [0, 0] : [-10, 10]
  );

  const moveX = useTransform(springX, [0, 1], [-30, 30]);
  const moveY = useTransform(springY, [0, 1], [-30, 30]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent perspective-[2000px]"
    >
      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative w-full h-full flex items-center justify-center preserve-3d transform-gpu will-change-transform"
        >
          {/* ✅ REDUCED GATES */}
          {Array.from({ length: 4 }).map((_, i) => (
            <TunnelGate key={i} index={i} />
          ))}

          {/* ✨ PARTICLES */}
          <motion.div
            style={{ x: moveX, y: moveY }}
            className="absolute inset-0"
          >
            {PARTICLES.map((p, i) => (
              <div
                key={i}
                className="absolute bg-emerald-500/20 rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  top: `${p.top}%`,
                  left: `${p.left}%`,
                  opacity: p.opacity,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 🧠 CONTENT */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 mb-8 px-4 py-2 border border-emerald-500/30 bg-black/70 backdrop-blur-md"
        >
          <div className="flex gap-1">
            <span className="w-1 h-3 bg-emerald-500 animate-pulse" />
            <span className="w-1 h-2 bg-emerald-500/50" />
            <span className="w-1 h-1 bg-emerald-500/30" />
          </div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-emerald-400 uppercase">
            Bridge_Sequence_Ready
          </span>
        </motion.div>

        {/* Heading */}
        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
          Cross the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-emerald-400">
            Intelligence Gap.
          </span>
        </h2>

        {/* Text */}
        <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-mono">
          Legacy infrastructure on one side. Autonomous agents on the other.
          <span className="text-white">
            {" "}
            We provide the architecture to connect them.
          </span>
        </p>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center gap-4 px-10 py-5 bg-emerald-500 text-black font-bold uppercase tracking-widest overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />

          <Link href='/dashboard' className="relative z-10 flex items-center gap-3">
            <Terminal size={18} />
            Initialize Bridge
            <ArrowRight
              size={18}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </motion.button>

        {/* Footer */}
        <div className="mt-16 flex justify-center gap-10 text-xs font-mono uppercase text-neutral-400">
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

      {/* Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};

// 🚀 OPTIMIZED TUNNEL GATE
const TunnelGate = ({ index }: { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, z: -300 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0.7, 1.3],
        z: [-300, 300],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        delay: index * 1.5,
        ease: "easeInOut",
      }}
      className="absolute border border-emerald-500/20 flex items-center justify-center transform-gpu will-change-transform"
      style={{
        width: "60vw",
        height: "60vh",
        borderRadius: "20px",
      }}
    >
      {/* Label */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-black border border-emerald-500/20 text-[8px] font-mono text-emerald-700 uppercase">
        GATE_0{index + 1}
      </div>

      {/* Corners */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-emerald-500/30" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-emerald-500/30" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-emerald-500/30" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-emerald-500/30" />
    </motion.div>
  );
};