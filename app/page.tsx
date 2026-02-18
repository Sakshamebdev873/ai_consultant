'use client'

import { useRef } from "react";
import { useMotionValue } from "framer-motion";

// Components
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { ProductField } from "@/components/landing/product-mockup";
import { BackgroundBlobs } from "@/components/landing/background-blobs"; // You might want to remove this if you want a strict grid
import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { IndustryMatrix } from "@/components/landing/IndustryMatrix";
import { StrategyOrchestrator } from "@/components/landing/IndustryOrchestrator";
import  {MarketDecryptor}  from "@/components/landing/MarketDecrypter";
import { CognitiveBridge } from "@/components/landing/CognitiveBridge";
import { ResultEngine } from "@/components/landing/ResultEngine";
import { Footer } from "@/components/layout/Footer";

export default function LandingPage() {
  const containerRef = useRef<HTMLElement>(null);
  
  // 1. Global Motion Values
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);

  // 2. Global Mouse Handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // We use clientX/Y to ensure the spotlight follows the cursor even if scrolled
    mX.set(e.clientX);
    mY.set(e.clientY);
  };

  return (
    <main 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-emerald-500 selection:text-black font-sans"
    >
      {/* BACKGROUND LAYER */}
      {/* We use z-0 to keep it behind everything. 
          The 'pointer-events-none' ensures clicks pass through to the UI. */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Optional: Add the static CSS grid here if InteractiveGrid is too heavy 
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
        */}
        
        <InteractiveGrid mouseX={mX} mouseY={mY} />
        
        {/* Reduced opacity for blobs to maintain the sharp 'technical' look */}
        <div className="opacity-20"> 
           <BackgroundBlobs />
        </div>
        
        {/* Noise overlay for that 'analog monitor' feel */}
        <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
      </div>

      {/* UI LAYER */}
      <div className="relative z-10">
        <Navbar />

        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
          {/* Hero receives global mouse coordinates for parallax effects */}
          <HeroSection globalMouseX={mX} globalMouseY={mY} />
          <ProductField />
        </section>

        {/* Stacked Sections */}
        <IndustryMatrix />
        <StrategyOrchestrator />
        {/* <MarketDecryptor /> */}
        <CognitiveBridge />
        <ResultEngine />
        
        <Footer />
      </div>

    </main>
  );
}