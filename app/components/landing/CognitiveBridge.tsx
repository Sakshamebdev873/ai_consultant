"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Orbit } from "lucide-react";

export const CognitiveBridge = () => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX / window.innerWidth);
    mouseY.set(clientY / window.innerHeight);
  };

  const rotateX = useTransform(mouseY, [0, 1], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 1], [-10, 10]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* 3D PORTAL BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ perspective: "1000px" }}>
        <motion.div 
          style={{ rotateX, rotateY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Concentric Glowing Rings */}
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.1 * i, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className="absolute border border-primary rounded-full"
              style={{
                width: `${i * 300}px`,
                height: `${i * 300}px`,
                boxShadow: "0 0 40px rgba(99, 102, 241, 0.1) inset",
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold tracking-[0.3em] text-primary uppercase"
        >
          <Orbit size={14} className="animate-spin-slow" /> Transition_Sequence_Engaged
        </motion.div>

        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8">
          Cross the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-gradient italic">Intelligence Gap.</span>
        </h2>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-12 py-5 bg-white text-black font-black text-sm rounded-full overflow-hidden transition-all"
        >
          <span className="relative z-10 flex items-center gap-3">
            START YOUR EVALUATION <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>
      </div>
    </section>
  );
};