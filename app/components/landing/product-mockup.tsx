"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Brain, Sparkles, Shield, Cpu, Lock, BarChart3, Zap, Eye } from "lucide-react";

// --- DATA ---
const thoughtNodes = [
  { text: "Risk profiling", icon: <Shield size={14} />, x: -30, y: -25 },
  { text: "Compliance checks", icon: <Lock size={14} />, x: 35, y: -20 },
  { text: "Latency modeling", icon: <Cpu size={14} />, x: -38, y: 10 },
  { text: "Cost alignment", icon: <BarChart3 size={14} />, x: 40, y: 20 },
  { text: "Security validation", icon: <Eye size={14} />, x: -15, y: 35 },
  { text: "Scalability fit", icon: <Zap size={14} />, x: 18, y: -40 },
];

// --- SUB-COMPONENT: SCRAMBLE TEXT ---
const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split("").map((_, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <motion.span onViewportEnter={scramble} className="font-mono ">
      {displayText}
    </motion.span>
  );
};

export const ProductField = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Mouse tracking for the gravity effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    // Normalize -1 to 1
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center py-20 "
    >
      {/* 1. THE RADAR PULSE (Color change to Emerald) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [0, 4],
            opacity: [0, 0.2, 0] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          className="w-[300px] h-[300px] rounded-full border border-emerald-500/50 shadow-[0_0_100px_rgba(16,185,129,0.2)]"
        />
      </div>

      {/* 2. NEURAL BACKGROUND CONNECTIONS */}
      {/* <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {thoughtNodes.map((node, i) => (
          <NeuralLine 
            key={i} 
            index={i} 
            x={node.x} 
            y={node.y} 
            smoothX={smoothX} 
            smoothY={smoothY} 
          />
        ))}
      </svg> */}

      {/* 3. FLOATING THOUGHT NODES */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {thoughtNodes.map((t, i) => (
          <ThoughtNode 
            key={i} 
            node={t} 
            smoothX={smoothX} 
            smoothY={smoothY} 
            index={i} 
          />
        ))}
      </div>

      {/* 4. CENTRAL FOCUS ENGINE */}
      <div className="relative z-30 text-center px-6 flex flex-col items-center">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -z-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"
        />

        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
          className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md cursor-none"
        >
          <Brain className="w-16 h-16 text-emerald-500 animate-pulse" />
        </motion.div>

        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white!">
          <ScrambleText text="Decisions, not suggestions." />
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          className="mt-6 max-w-xl text-neutral-400 text-lg leading-relaxed"
        >
          Our neural engine silently parses <span className="text-white">4,000+ variables </span> 
          across the AI marketplace to surface the single point of truth for your stack.
        </motion.p>

        {/* INTERACTIVE MATCH IDENTIFIER (Color change to Emerald) */}
        <div className="mt-16 relative group cursor-pointer">
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "240px" }}
                className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto"
            />
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex items-center justify-center gap-3 text-xs font-mono uppercase tracking-[0.4em] text-emerald-500"
            >
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                        <motion.div 
                            key={i}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, delay: i * 0.2 }}
                            className="w-1 h-1 bg-emerald-500 rounded-full"
                        />
                    ))}
                </div>
                MATCH_SYNC_COMPLETE
                <Sparkles className="w-4 h-4" />
            </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- HELPER: NEURAL LINE ---
const NeuralLine = ({ x, y, smoothX, smoothY, index }: any) => {
  const targetX = useTransform(smoothX, [-1, 1], [`${50 + x - 2}%`, `${50 + x + 2}%`]);
  const targetY = useTransform(smoothY, [-1, 1], [`${50 + y - 2}%`, `${50 + y + 2}%`]);

  return (
    <motion.line 
      x1="50%" y1="50%" 
      x2={targetX} y2={targetY}
      stroke="url(#lineGradient)"
      strokeWidth="1"
      strokeDasharray="4 4"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: index * 0.1 }}
    />
  );
};

// --- HELPER: THOUGHT NODE ---
const ThoughtNode = ({ node, smoothX, smoothY, index }: any) => {
  const depth = (index % 3) + 1;
  const moveX = useTransform(smoothX, [-1, 1], [node.x - 5 * depth, node.x + 5 * depth]);
  const moveY = useTransform(smoothY, [-1, 1], [node.y - 5 * depth, node.y + 5 * depth]);

  return (
    <motion.div
      style={{ 
        left: useMotionTemplate`${50 + node.x}%`, 
        top: useMotionTemplate`${50 + node.y}%`,
        x: useTransform(smoothX, [-1, 1], [-20 * depth, 20 * depth]),
        y: useTransform(smoothY, [-1, 1], [-20 * depth, 20 * depth]),
      }}
      className="absolute flex flex-col items-center gap-2 group"
    >
      <motion.div 
        whileHover={{ scale: 1.2, color: "#fff" }}
        className="p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-neutral-500 transition-colors group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
      >
        {node.icon}
      </motion.div>
      <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-neutral-500 group-hover:text-emerald-400 transition-colors whitespace-nowrap bg-black/50 px-2 py-1 rounded">
        {node.text}
      </span>
    </motion.div>
  );
};