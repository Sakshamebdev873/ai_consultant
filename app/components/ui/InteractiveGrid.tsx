"use client";

import { motion, useMotionTemplate } from "framer-motion";

interface GridProps {
  mouseX: any;
  mouseY: any;
}

export const InteractiveGrid = ({ mouseX, mouseY }: GridProps) => {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none">
      
      {/* LAYER 1: Base Static Grid (The "Always On" Architectural Layer) */}
      {/* Uses very faint white lines (3% opacity) on a 50px scale */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* LAYER 2: Interactive "Scanner" Grid */}
      {/* This layer is Emerald Green (#10b981) and only reveals under the mouse */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.2)_1px,transparent_1px)] bg-[size:50px_50px]"
        style={{
          maskImage: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
        }}
      />
      
      {/* LAYER 3: Ambient Bloom */}
      {/* A soft emerald glow that follows the cursor to simulate a light source */}
      <motion.div 
        className="absolute inset-0"
        style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(16,185,129,0.03), transparent 70%)`
        }}
      />
    </div>
  );
};