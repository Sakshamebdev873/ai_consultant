"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowRight, Cpu, Zap, Battery, Terminal } from "lucide-react";
import Link from "next/link";

// Static particles
const PARTICLES = Array.from({ length: 12 }).map(() => ({
  size: Math.random() * 3 + 1,
  top: Math.random() * 100,
  left: Math.random() * 100,
  opacity: Math.random() * 0.4 + 0.1,
}));

// Hydration-safe mobile check
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export const CognitiveBridge = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setIsAuthorized(!!localStorage.getItem("access_token"));
  }, []);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    requestAnimationFrame(() => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    });
  };

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], isMobile ? [0, 0] : [10, -10]);
  const rotateY = useTransform(springX, [0, 1], isMobile ? [0, 0] : [-10, 10]);
  const moveX = useTransform(springX, [0, 1], [-30, 30]);
  const moveY = useTransform(springY, [0, 1], [-30, 30]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
      style={{ perspective: "2000px" }}
    >
      {/* ── Background tunnel ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div
          style={isMobile ? {} : { rotateX, rotateY }}
          className="relative w-full h-full flex items-center justify-center transform-gpu will-change-transform"
          {...(!isMobile && { style: { rotateX, rotateY, transformStyle: "preserve-3d" } })}
        >
          {/* Gates — fewer on mobile */}
          {Array.from({ length: isMobile ? 2 : 4 }).map((_, i) => (
            <TunnelGate key={i} index={i} isMobile={isMobile} />
          ))}

          {/* Particles — skip on mobile */}
          {!isMobile && (
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
          )}
        </motion.div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="relative z-20 text-center px-5 sm:px-6 max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-3 sm:px-4 py-1.5 sm:py-2
            border border-emerald-500/30 bg-black/70 backdrop-blur-md"
        >
          <div className="flex gap-0.5 sm:gap-1">
            <span className="w-0.5 sm:w-1 h-2 sm:h-3 bg-emerald-500 animate-pulse" />
            <span className="w-0.5 sm:w-1 h-1.5 sm:h-2 bg-emerald-500/50" />
            <span className="w-0.5 sm:w-1 h-1 bg-emerald-500/30" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.3em] text-emerald-400 uppercase">
            Pipeline_Ready
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-5 sm:mb-8 leading-[0.9]"
        >
          Describe the problem.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-emerald-400">
            Get the strategy.
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-neutral-500 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 font-mono leading-relaxed"
        >
          One problem description flows through four AI agents.{" "}
          <span className="text-white">
            You get tool recommendations, ROI estimates, and a phased roadmap in
            under 60 seconds.
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href={isAuthorized ? "/report" : "/register"}
            className="group relative inline-flex items-center gap-3 sm:gap-4 px-7 sm:px-10 py-4 sm:py-5
              bg-emerald-500 text-black font-bold text-xs sm:text-sm uppercase tracking-widest overflow-hidden
              hover:bg-emerald-400 active:scale-95 transition-all"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Terminal size={16} className="relative z-10 sm:w-[18px] sm:h-[18px]" />
            <span className="relative z-10">
              {isAuthorized ? "Run Analysis" : "Get Started"}
            </span>
            <ArrowRight
              size={16}
              className="relative z-10 sm:w-[18px] sm:h-[18px] group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </motion.div>

        {/* Footer stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 sm:mt-16 flex flex-wrap justify-center gap-6 sm:gap-10 text-[10px] sm:text-xs
            font-mono uppercase text-neutral-500"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Cpu size={11} className="text-emerald-500 sm:w-[12px] sm:h-[12px]" />
            <span>4 Agents</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Zap size={11} className="text-emerald-500 sm:w-[12px] sm:h-[12px]" />
            <span>&lt; 60s Pipeline</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Battery size={11} className="text-emerald-500 sm:w-[12px] sm:h-[12px]" />
            <span>12 KB Tools</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};

// ── Tunnel Gate ───────────────────────────────────────────────────────────────

const TunnelGate = ({ index, isMobile }: { index: number; isMobile: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0.7, 1.3],
      }}
      transition={{
        duration: isMobile ? 12 : 10,
        repeat: Infinity,
        delay: index * (isMobile ? 3 : 1.5),
        ease: "easeInOut",
      }}
      className="absolute border border-emerald-500/15 flex items-center justify-center transform-gpu will-change-transform rounded-2xl sm:rounded-[20px]"
      style={{
        width: isMobile ? "85vw" : "60vw",
        height: isMobile ? "50vh" : "60vh",
      }}
    >
      {/* Gate label — hidden on very small screens */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 sm:px-3 py-0.5 sm:py-1
        bg-black border border-emerald-500/20 text-[7px] sm:text-[8px] font-mono text-emerald-700 uppercase hidden sm:block">
        GATE_0{index + 1}
      </div>

      {/* Corner marks */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-4 sm:w-6 h-4 sm:h-6 border-t border-l border-emerald-500/20" />
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 border-t border-r border-emerald-500/20" />
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-4 sm:w-6 h-4 sm:h-6 border-b border-l border-emerald-500/20" />
      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 border-b border-r border-emerald-500/20" />
    </motion.div>
  );
};