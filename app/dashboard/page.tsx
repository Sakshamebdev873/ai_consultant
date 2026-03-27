'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { AuthUser } from '@/types/auth';

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  label, value, sub, accent,
}: {
  label: string; value: string | number; sub?: string; accent?: boolean;
}) {
  return (
    <div className="border border-neutral-800 bg-neutral-950/50 p-6 flex flex-col gap-2 hover:bg-neutral-900 transition-colors">
      <div className="text-[10px] uppercase tracking-widest text-neutral-500">{label}</div>
      <div className={`text-3xl font-bold tracking-tight ${accent ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'text-white'}`}>
        {value}
      </div>
      {sub && <div className="text-xs text-neutral-600">{sub}</div>}
    </div>
  );
}

// ─── Profile row ──────────────────────────────────────────────────────────────

function ProfileRow({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-neutral-900 last:border-0 group">
      <span className="text-[10px] uppercase tracking-widest text-neutral-500 group-hover:text-neutral-400 transition-colors">{label}</span>
      <span className="text-sm text-neutral-200 font-mono">
        {value ?? <span className="text-neutral-700">—</span>}
      </span>
    </div>
  );
}

// ─── Quick action card ────────────────────────────────────────────────────────

function ActionCard({
  icon, title, desc, href, accent
}: {
  icon: string; title: string; desc: string; href: string; accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`border border-neutral-800 p-6 flex flex-col gap-3 transition-all duration-300 group
        ${accent 
          ? 'bg-emerald-950/10 hover:bg-emerald-900/20 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
          : 'bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-500'
        }`}
    >
      <div className="flex justify-between items-start">
        <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{icon}</span>
        <span className={`text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity ${accent ? 'text-emerald-500' : 'text-neutral-500'}`}>
          Initialize →
        </span>
      </div>
      <div className="mt-2">
        <div className={`text-sm font-bold uppercase tracking-widest mb-1 transition-colors ${accent ? 'text-emerald-400' : 'group-hover:text-white'}`}>
          {title}
        </div>
        <div className="text-xs text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">{desc}</div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('user');
    const token  = localStorage.getItem('access_token');

    if (!token || !stored) {
      router.push('/login');
      return;
    }

    try {
      setUser(JSON.parse(stored) as AuthUser);
    } catch {
      router.push('/login');
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/login');
  }

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
        <div className="flex items-center gap-3 text-emerald-500 text-xs uppercase tracking-widest">
          <span className="inline-block w-3 h-3 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          AUTHENTICATING SESSION...
        </div>
      </div>
    );
  }

  const initials = user.full_name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-emerald-500/30">

      {/* ── TOP NAV ──────────────────────────────────────────────────────────── */}
      <nav className="border-b border-neutral-800 bg-black/80 backdrop-blur-md px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href='/' className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            AI Consultant.io
          </Link>
          <div className="hidden md:flex items-center gap-2 text-[10px] text-neutral-500 border border-neutral-800 px-2 py-1 bg-neutral-900/50">
            <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse rounded-full" />
            <span>SYSTEM NOMINAL</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-neutral-500">
            <Link href="/dashboard" className="text-emerald-400 border-b border-emerald-400 pb-0.5">Dashboard</Link>
            <Link href="/report"    className="hover:text-white transition-colors">New Report</Link>
            <Link href="/roadmap"   className="hover:text-white transition-colors">Roadmap</Link>
          </div>

          {/* User chip */}
          <div className="flex items-center gap-3 border border-neutral-800 pl-1.5 pr-3 py-1.5 bg-neutral-950 hover:bg-neutral-900 transition-colors cursor-default">
            <div className="w-6 h-6 bg-white text-black text-[10px] font-bold flex items-center justify-center">
              {initials}
            </div>
            <span className="text-xs hidden sm:block text-neutral-300">{user.full_name.split(' ')[0]}</span>
          </div>

          <button
            onClick={handleLogout}
            className="text-[10px] uppercase tracking-widest text-neutral-500
              hover:text-white border border-transparent hover:border-neutral-800 px-3 py-1.5 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12 space-y-12">

        {/* ── HEADER ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-8 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none rounded-full" />
          <div>
            <p className="text-xs text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></span>
              SESSION_ACTIVE
            </p>
            <h1 className="text-4xl font-bold tracking-tight leading-tight">
              WELCOME BACK,<br />
              <span className="text-neutral-500">{user.full_name.toUpperCase()}</span>
            </h1>
          </div>
          <div className="text-left md:text-right border-l md:border-l-0 md:border-r border-neutral-800 pl-4 md:pl-0 md:pr-4">
            <div className="text-[10px] text-neutral-600 uppercase tracking-widest mb-1">Operator Since</div>
            <div className="text-sm text-neutral-300">{joinDate}</div>
          </div>
        </div>

        {/* ── STATS ──────────────────────────────────────────────────────────── */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-4 flex items-center gap-2">
            <span className="text-neutral-800">{'//'}</span> Metrics Overview
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800">
            <StatCard
              label="Reports Generated"
              value={user.reports_generated}
              sub="Total analyses run"
              accent={user.reports_generated > 0}
            />
            <StatCard
              label="Company Size"
              value={user.company_size ?? '—'}
              sub="Organisation tier"
            />
            <StatCard
              label="Industry Exp."
              value={user.years_in_industry != null ? `${user.years_in_industry} yrs` : '—'}
              sub="Years in battery industry"
            />
            <StatCard
              label="Domain"
              value={user.battery_domain?.replace('_', ' ').toUpperCase() ?? '—'}
              sub="Primary focus area"
            />
          </div>
        </div>

        {/* ── MAIN GRID ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Profile panel */}
          <div className="lg:col-span-1 border border-neutral-800 bg-neutral-950/50 p-6 flex flex-col">
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 border-b border-neutral-900 pb-4 mb-4 flex items-center gap-2">
              <span className="text-neutral-800">{'//'}</span> Operator Profile
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-white text-black text-xl font-bold flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                {initials}
              </div>
              <div>
                <div className="font-bold text-sm tracking-wide">{user.full_name}</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">{user.email}</div>
              </div>
            </div>

            <div className="flex-1 space-y-1">
              <ProfileRow label="Company"        value={user.company_name} />
              <ProfileRow label="Size"           value={user.company_size} />
              <ProfileRow label="Country"        value={user.country} />
              <ProfileRow label="Domain"         value={user.battery_domain} />
              <ProfileRow label="Yrs in field"   value={user.years_in_industry} />
              <ProfileRow label="Account ID"     value={user.id.slice(0, 8) + '...'} />
            </div>

            <Link
              href="/profile/edit"
              className="mt-8 w-full block text-center border border-neutral-800 bg-black
                hover:border-neutral-500 text-xs uppercase tracking-widest py-3
                text-neutral-400 hover:text-white transition-all shadow-sm"
            >
              Configure Profile
            </Link>
          </div>

          {/* Actions + activity */}
          <div className="lg:col-span-2 space-y-8">

            {/* Quick actions */}
            <div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
                <span className="text-neutral-800">{'//'}</span> Mission Control
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ActionCard
                  icon="⚡"
                  title="New Analysis"
                  desc="Run the 4-agent pipeline on a new battery problem to get tool recommendations and ROI estimates."
                  href="/report"
                  accent={true}
                />
                <ActionCard
                  icon="📋"
                  title="Consultant Archives"
                  desc="Access your full consulting history, review past reports, and revisit AI insights."
                  href="/consultant"
                />
                <ActionCard
                  icon="🗺"
                  title="View Roadmap"
                  desc="See your implementation roadmap and track progress across all recommended AI tools."
                  href="/roadmap"
                />
                <ActionCard
                  icon="⭐"
                  title="Model Feedback"
                  desc="Rate your recent AI consultations and tool recommendations to help fine-tune our models."
                  href="/feedback"
                />
              </div>
            </div>

            {/* Status panel */}
            <div className="border border-neutral-800 bg-neutral-950/50 p-6">
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 border-b border-neutral-900 pb-4 mb-4 flex items-center gap-2">
                <span className="text-neutral-800">{'//'}</span> System Telemetry
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { label: 'Agent Pipeline',     status: 'OPERATIONAL', ok: true },
                  { label: 'Knowledge Base',      status: 'UPDATED', ok: true },
                  { label: 'JWT Auth',            status: 'ACTIVE', ok: true },
                  { label: 'Feedback Loop',       status: 'ONLINE', ok: true },
                  { label: 'PDF Export',          status: 'OFFLINE', ok: false },
                  { label: 'Cloud Deployment',    status: 'OFFLINE', ok: false },
                ].map(({ label, status, ok }) => (
                  <div key={label} className="flex items-center justify-between text-xs border-b border-neutral-900/50 pb-2 last:border-0">
                    <span className="text-neutral-400 uppercase tracking-wider">{label}</span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 border flex items-center gap-1.5
                      ${ok
                        ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
                        : 'text-neutral-500 border-neutral-800 bg-neutral-900'
                      }`}>
                      {ok && <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></span>}
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
        <div className="border-t border-neutral-900 pt-6 flex justify-between items-center text-[10px] text-neutral-700 uppercase tracking-widest font-mono">
          <span>AI Consultant.io // Build_4.1.0</span>
          <span>SYS_ID: {user.id.slice(0, 12).toUpperCase()}</span>
        </div>

      </div>
    </div>
  );
}