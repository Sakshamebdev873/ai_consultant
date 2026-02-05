"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const links = ["Marketplace", "Enterprise", "Pricing"];

export const Navbar = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className="fixed top-4 inset-x-0 z-50 px-4">
      <div className="relative max-w-7xl mx-auto">
        
        {/* Subtle light haze (no color) */}
        <div className="absolute inset-0 rounded-2xl bg-white/5 blur-xl opacity-40" />

        <div className="relative h-16 rounded-2xl border border-border bg-background/70 backdrop-blur-xl flex items-center justify-between px-6 shadow-lg">
          
          {/* Logo */}
          <div className="flex items-center gap-3 font-semibold text-lg tracking-tight">
            <div className="relative">
              <div className="absolute inset-0 bg-white blur-md opacity-20 rounded-lg" />
              <div className="relative w-9 h-9 bg-white text-black rounded-lg flex items-center justify-center font-bold">
                AI
              </div>
            </div>
            <span className="text-foreground">
              Consultant<span className="opacity-60">.io</span>
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            {links.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
                className="relative px-4 py-2 rounded-lg text-slate-400 transition-colors hover:text-foreground"
              >
                {hovered === item && (
                  <span className="absolute inset-0 rounded-lg border border-white/15 bg-white/5" />
                )}
                <span className="relative z-10">{item}</span>
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm text-slate-400 hover:text-foreground transition-colors">
              Login
            </button>

            <Link href="/consultant">
              <button className="group relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-medium text-black bg-white">
                <span className="absolute inset-0 bg-white opacity-90 transition-transform duration-300 group-hover:scale-105" />
                <span className="relative z-10 flex items-center gap-2">
                  Start Consultation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
