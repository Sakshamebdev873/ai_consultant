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
    <div className="border border-neutral-800 bg-neutral-950 p-6 flex flex-col gap-2 hover:border-neutral-600 transition-colors">
      <div className="text-[10px] uppercase tracking-widest text-neutral-500">{label}</div>
      <div className={`text-3xl font-bold ${accent ? 'text-emerald-400' : 'text-white'}`}>
        {value}
      </div>
      {sub && <div className="text-xs text-neutral-600">{sub}</div>}
    </div>
  );
}

// ─── Profile row ──────────────────────────────────────────────────────────────

function ProfileRow({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-neutral-900 last:border-0">
      <span className="text-[10px] uppercase tracking-widest text-neutral-500">{label}</span>
      <span className="text-sm text-neutral-200 font-mono">
        {value ?? <span className="text-neutral-700">—</span>}
      </span>
    </div>
  );
}

// ─── Quick action card ────────────────────────────────────────────────────────

function ActionCard({
  icon, title, desc, href,
}: {
  icon: string; title: string; desc: string; href: string;
}) {
  return (
    <Link
      href={href}
      className="border border-neutral-800 bg-neutral-950 p-6 flex flex-col gap-3
        hover:border-white hover:bg-neutral-900 transition-all group"
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-sm font-bold uppercase tracking-widest mb-1 group-hover:text-emerald-400 transition-colors">
          {title}
        </div>
        <div className="text-xs text-neutral-500 leading-relaxed">{desc}</div>
      </div>
      <span className="text-neutral-600 group-hover:text-white transition-colors text-sm mt-auto">
        → Access
      </span>
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
        <div className="flex items-center gap-3 text-neutral-500 text-xs uppercase tracking-widest">
          <span className="inline-block w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
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
    <div className="min-h-screen bg-black text-white font-mono">

      {/* ── TOP NAV ──────────────────────────────────────────────────────────── */}
      <nav className="border-b border-neutral-800 bg-neutral-950 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href='/' className="text-sm font-bold tracking-widest uppercase">AI Consultant.io</Link>
          <div className="hidden md:flex items-center gap-1 text-[10px] text-neutral-500">
            <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse rounded-full" />
            <span>SYSTEM NOMINAL</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Nav links */}
          <div className="hidden md:flex items-center gap-4 text-xs uppercase tracking-widest text-neutral-500">
            <Link href="/report"   className="hover:text-white transition-colors">New Report</Link>
            <Link href="/roadmap"  className="hover:text-white transition-colors">Roadmap</Link>
            <Link href="/dashboard" className="text-white border-b border-white pb-0.5">Dashboard</Link>
          </div>

          {/* User chip */}
          <div className="flex items-center gap-3 border border-neutral-800 px-3 py-1.5">
            <div className="w-6 h-6 bg-white text-black text-[10px] font-bold flex items-center justify-center">
              {initials}
            </div>
            <span className="text-xs hidden sm:block">{user.full_name.split(' ')[0]}</span>
          </div>

          <button
            onClick={handleLogout}
            className="text-[10px] uppercase tracking-widest text-neutral-500
              hover:text-white border border-neutral-800 hover:border-white px-3 py-1.5 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12 space-y-12">

        {/* ── HEADER ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4
          border-b border-neutral-800 pb-8">
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">
              [ SESSION_ACTIVE ]
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              WELCOME BACK,<br />
              <span className="text-neutral-400">{user.full_name.toUpperCase()}</span>
            </h1>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-neutral-600 uppercase tracking-widest">Operator since</div>
            <div className="text-sm text-neutral-400">{joinDate}</div>
          </div>
        </div>

        {/* ── STATS ──────────────────────────────────────────────────────────── */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-4">
            // Metrics
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-800">
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
          <div className="lg:col-span-1 border border-neutral-800 bg-neutral-950 p-6">
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 border-b border-neutral-900 pb-4 mb-4">
              // Operator Profile
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white text-black text-lg font-bold flex items-center justify-center flex-shrink-0">
                {initials}
              </div>
              <div>
                <div className="font-bold text-sm">{user.full_name}</div>
                <div className="text-[10px] text-neutral-500">{user.email}</div>
              </div>
            </div>

            <ProfileRow label="Company"       value={user.company_name} />
            <ProfileRow label="Size"          value={user.company_size} />
            <ProfileRow label="Country"       value={user.country} />
            <ProfileRow label="Domain"        value={user.battery_domain} />
            <ProfileRow label="Yrs in field"  value={user.years_in_industry} />
            <ProfileRow label="Account ID"    value={user.id.slice(0, 8) + '...'} />

            <Link
              href="/profile/edit"
              className="mt-6 w-full block text-center border border-neutral-800
                hover:border-white text-xs uppercase tracking-widest py-3
                text-neutral-400 hover:text-white transition-all"
            >
              Edit Profile →
            </Link>
          </div>

          {/* Actions + activity */}
          <div className="lg:col-span-2 space-y-8">

            {/* Quick actions */}
            <div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-4">
                // Quick Actions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ActionCard
                  icon="⚡"
                  title="New Analysis"
                  desc="Run the 4-agent pipeline on a new battery problem to get tool recommendations and ROI estimates."
                  href="/report"
                />
                <ActionCard
                  icon="🗺"
                  title="View Roadmap"
                  desc="See your implementation roadmap and track progress across all recommended AI tools."
                  href="/roadmap"
                />
                <ActionCard
                  icon="🔗"
                  title="Integrations"
                  desc="Connect your existing tools and data sources to enrich future recommendations."
                  href="/integration"
                />
                <ActionCard
                  icon="📋"
                  title="Consultant"
                  desc="Access your full consulting history, past reports, and saved insights."
                  href="/consultant"
                />
              </div>
            </div>

            {/* Status panel */}
            <div className="border border-neutral-800 bg-neutral-950 p-6">
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 border-b border-neutral-900 pb-4 mb-4">
                // System Status
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Agent Pipeline',     status: 'OPERATIONAL', ok: true },
                  { label: 'Knowledge Base',      status: '12 TOOLS LOADED', ok: true },
                  { label: 'JWT Auth',            status: 'ACTIVE', ok: true },
                  { label: 'PDF Export',          status: 'COMING SOON', ok: false },
                  { label: 'Cloud Deployment',    status: 'COMING SOON', ok: false },
                ].map(({ label, status, ok }) => (
                  <div key={label} className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400 uppercase tracking-wider">{label}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 border
                      ${ok
                        ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                        : 'text-neutral-500 border-neutral-800 bg-neutral-900'
                      }`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
        <div className="border-t border-neutral-900 pt-6 flex justify-between items-center text-[10px] text-neutral-700 uppercase tracking-widest">
          <span>AI Consultant.io // V.4.0.2</span>
          <span>SESSION: {user.id.slice(0, 12).toUpperCase()}...</span>
        </div>

      </div>
    </div>
  );
}