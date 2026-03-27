"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const publicLinks = [
  { name: "Marketplace", href: "/marketplace" },
  { name: "Enterprise", href: "/enterprise" },
  { name: "Pricing", href: "/pricing" },
];

const appLinks = [
  { name: "New Report", href: "/report" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Consultant", href: "/consultant" },
];

export const Navbar = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthorized(!!token);
  }, []);

  const links = isAuthorized ? appLinks : publicLinks;

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setIsAuthorized(false);
    setMobileOpen(false);
    window.location.href = "/login";
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-6">
      <div className="max-w-7xl mx-auto">

        {/* ── MAIN BAR ─────────────────────────────────────────────────────── */}
        <div className="relative flex items-center justify-between h-16 px-6 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

          {/* LEFT: LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 flex items-center justify-center rounded-md bg-white text-black font-bold text-sm font-mono">
              AI
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-black" />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-white font-semibold tracking-tight group-hover:text-emerald-400 transition-colors">
                Ambee AI
              </span>
              <span className="text-[9px] text-emerald-500 font-mono uppercase tracking-widest">
                System Online
              </span>
            </div>
          </Link>

          {/* CENTER: NAV LINKS (desktop) */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-neutral-400 rounded-full transition-all duration-300 hover:text-white hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-4">

            {/* Logged-in: logout (desktop) */}
            {isAuthorized && (
              <button
                onClick={handleLogout}
                className="hidden sm:block text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
              >
                // Logout
              </button>
            )}

            {/* Not logged in: login (desktop) */}
            {!isAuthorized && (
              <Link
                href="/login"
                className="hidden sm:block text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
              >
                // Login
              </Link>
            )}

            {/* CTA button */}
            <Link href={isAuthorized ? "/dashboard" : "/register"}>
              <button className="group relative overflow-hidden rounded-md bg-emerald-500 px-5 py-2.5 transition-all hover:bg-emerald-400 active:scale-95">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-400/20 blur-xl" />
                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-xs font-bold text-black uppercase tracking-widest">
                    {isAuthorized ? "Dashboard" : "Get Started"}
                  </span>
                  <ArrowRight className="w-3 h-3 text-black transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden text-neutral-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── MOBILE DROPDOWN ──────────────────────────────────────────────── */}
        {mobileOpen && (
          <div className="md:hidden mt-2 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col p-4 gap-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile-only auth actions */}
              <div className="border-t border-white/10 mt-2 pt-2">
                {isAuthorized ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-red-400 rounded-lg transition-colors"
                  >
                    // Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white rounded-lg transition-colors"
                  >
                    // Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};