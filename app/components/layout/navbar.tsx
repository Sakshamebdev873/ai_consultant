"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const links = ["Marketplace", "Enterprise", "Pricing"];

export const Navbar = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 px-0 sm:px-6 pt-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Nav Container */}
        {/* Changed to neutral-950 with a sharp border for that 'hardware' feel */}
        <div className="relative h-16 rounded-lg border border-neutral-800 bg-neutral-950/80 backdrop-blur-md flex items-center justify-between px-6 shadow-2xl shadow-black/50">
          
          {/* LOGO SECTION */}
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="relative w-8 h-8 bg-white text-black rounded-sm flex items-center justify-center font-bold font-mono text-sm tracking-tighter">
               AI
               {/* Decorative 'status light' on the logo */}
               <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-neutral-950"></div>
            </div>
            
            {/* Text */}
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-bold text-white tracking-tight">AI Consultant.io</span>
              <span className="text-[9px] text-emerald-500 uppercase tracking-widest font-mono mt-0.5">
                System_Online
              </span>
            </div>
          </div>

          {/* CENTER LINKS */}
          <div className="hidden md:flex items-center gap-1 bg-neutral-900/50 rounded-full px-2 py-1 border border-neutral-800/50">
            {links.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
                className="relative px-4 py-1.5 rounded-full text-xs font-medium text-neutral-400 transition-colors hover:text-white uppercase tracking-wider"
              >
                {/* Hover Background */}
                {hovered === item && (
                  <span className="absolute inset-0 rounded-full bg-white/10 mix-blend-overlay transition-all" />
                )}
                <span className="relative z-10">{item}</span>
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-6">
            <Link 
              href={'/login'} 
              className="hidden sm:block text-xs font-mono text-neutral-400 hover:text-white uppercase tracking-widest transition-colors"
            >
              // Login
            </Link>

            <Link href="/consultant">
              <button className="group relative overflow-hidden rounded-sm bg-white px-5 py-2.5 transition-all hover:bg-neutral-200">
                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-xs font-bold text-black uppercase tracking-widest">
                    Initialize
                  </span>
                  <ArrowRight className="w-3 h-3 text-black transition-transform group-hover:translate-x-1" />
                </div>
                
                {/* Button Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
};