'use client'

import { useRef } from "react";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { ProductField } from "@/components/landing/product-mockup";
import { BackgroundBlobs } from "@/components/landing/background-blobs";
import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { useMotionValue } from "framer-motion";
import { IndustryMatrix } from "./components/landing/IndustryMatrix";
import { StrategyOrchestrator } from "./components/landing/IndustryOrchestrator";
import { MarketDecryptor } from "./components/landing/MarketDecrypter";
import { CognitiveBridge } from "./components/landing/CognitiveBridge";
import { ResultEngine } from "./components/landing/ResultEngine";
import { Footer } from "./components/layout/Footer";

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
      className="min-h-screen relative overflow-hidden bg-background"
    >
      {/* BACKGROUND LAYER (Fixed so it follows scroll) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <InteractiveGrid mouseX={mX} mouseY={mY} />
        <BackgroundBlobs />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* UI LAYER */}
      <Navbar />

      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
        {/* Pass mouse values to Hero so it can handle 3D parallax without re-tracking */}
        <HeroSection globalMouseX={mX} globalMouseY={mY} />
        
        <ProductField />
      </section>
        <IndustryMatrix/>
        <StrategyOrchestrator/>
        <MarketDecryptor/>
        <CognitiveBridge/>
        <ResultEngine/>
        <Footer/>

    </main>
  );
}