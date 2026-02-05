"use client";

import { motion, useMotionTemplate } from "framer-motion";

interface GridProps {
  mouseX: any;
  mouseY: any;
}

export const InteractiveGrid = ({ mouseX, mouseY }: GridProps) => {
  return (
    <div className="absolute inset-0 h-full w-full">
      {/* Base Faint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Interactive Primary Spotlight Grid */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.15)_1px,transparent_1px)] bg-[size:50px_50px]"
        style={{
          maskImage: useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
        }}
      />
      
      {/* Radial Glow that follows cursor */}
      <motion.div 
        className="absolute inset-0"
        style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary)/0.03), transparent 70%)`
        }}
      />
    </div>
  );
};