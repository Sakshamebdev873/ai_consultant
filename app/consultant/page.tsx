'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAllReports, getReportById } from '../../hooks/useReportForm';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function confidenceTag(score: number) {
  if (score >= 75) return { label: 'HIGH', cls: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
  if (score >= 40) return { label: 'MED',  cls: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
  return              { label: 'LOW',  cls: 'text-red-400 border-red-500/30 bg-red-500/10' };
}

// ─── Shared micro-components ──────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-widest text-neutral-500 border-b border-neutral-900 pb-3 mb-5">
      // {children}
    </div>
  );
}

function KVRow({ label, value, mono }: { label: string; value?: string | number | null; mono?: boolean }) {
  return (
    <div className="flex justify-between items-baseline py-2.5 border-b border-neutral-900 last:border-0">
      <span className="text-[10px] uppercase tracking-widest text-neutral-600">{label}</span>
      <span className={`text-sm text-neutral-300 ${mono ? 'font-mono' : ''}`}>
        {value ?? <span className="text-neutral-700">—</span>}
      </span>
    </div>
  );
}

function Pill({ children, cls }: { children: React.ReactNode; cls: string }) {
  return (
    <span className={`text-[10px] font-mono px-2 py-0.5 border ${cls}`}>
      {children}
    </span>
  );
}

// ─── Top nav (shared style from dashboard) ────────────────────────────────────

function TopNav() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/login');
  }

  const [initials, setInitials] = useState('--');
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const u = JSON.parse(stored);
        setInitials(
          u.full_name
            ?.split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) ?? '--',
        );
        setFirstName(u.full_name?.split(' ')[0] ?? '');
      }
    } catch { /* noop */ }
  }, []);

  return (
    <nav className="border-b border-neutral-800 bg-neutral-950 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-sm font-bold tracking-widest uppercase">
          AI Consultant.io
        </Link>
        <div className="hidden md:flex items-center gap-1 text-[10px] text-neutral-500">
          <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse rounded-full" />
          <span>SYSTEM NOMINAL</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4 text-xs uppercase tracking-widest text-neutral-500">
          <Link href="/report"     className="hover:text-white transition-colors">New Report</Link>
          <Link href="/roadmap"    className="hover:text-white transition-colors">Roadmap</Link>
          <Link href="/dashboard"  className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/consultant" className="text-white border-b border-white pb-0.5">Consultant</Link>
        </div>

        <div className="flex items-center gap-3 border border-neutral-800 px-3 py-1.5">
          <div className="w-6 h-6 bg-white text-black text-[10px] font-bold flex items-center justify-center">
            {initials}
          </div>
          <span className="text-xs hidden sm:block">{firstName}</span>
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
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  LIST VIEW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ReportsList({
  reports,
  onSelect,
}: {
  reports: any[];
  onSelect: (id: string) => void;
}) {
  if (reports.length === 0) {
    return (
      <div className="border border-neutral-800 bg-neutral-950 p-16 cursor-pointer text-center space-y-4">
        <div className="text-3xl">∅</div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">
          No reports generated
        </h3>
        <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
          Run your first consultation through the 4-agent pipeline to generate
          an AI-powered battery industry analysis.
        </p>
        <Link
          href="/report"
          className="inline-block mt-4 border border-neutral-700 hover:border-white
            text-xs uppercase tracking-widest px-6 py-3 text-neutral-400 hover:text-white transition-all"
        >
          Start Consultation →
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-neutral-800 bg-neutral-950 divide-y divide-neutral-900">
      {/* Table header */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] uppercase tracking-widest text-neutral-600">
        <div className="col-span-1">#</div>
        <div className="col-span-3">Domain</div>
        <div className="col-span-2">Chemistry</div>
        <div className="col-span-2">ROI Range</div>
        <div className="col-span-1">Score</div>
        <div className="col-span-1">Tools</div>
        <div className="col-span-2">Date</div>
      </div>

      {/* Rows */}
      {reports.map((r, i) => {
        const conf = confidenceTag(r.confidence_score);
        return (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            className="w-full cursor-pointer text-left grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4
              hover:bg-neutral-900 transition-colors group"
          >
            {/* Index */}
            <div className="col-span-1 text-neutral-700 text-xs font-mono hidden md:block">
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Domain */}
            <div className="col-span-3">
              <span className="text-sm text-neutral-200 group-hover:text-white transition-colors">
                {(r.problem_domain ?? 'unclassified').toUpperCase()}
              </span>
              {/* mobile-only date */}
              <span className="md:hidden text-[10px] text-neutral-600 ml-3">{formatDate(r.created_at)}</span>
            </div>

            {/* Chemistry */}
            <div className="col-span-2 text-xs text-neutral-400 font-mono hidden md:block">
              {r.battery_type ?? '—'}
            </div>

            {/* ROI */}
            <div className="col-span-2 text-xs text-emerald-400/80 font-mono hidden md:block">
              ${r.roi_min?.toLocaleString()} – ${r.roi_max?.toLocaleString()}
            </div>

            {/* Confidence */}
            <div className="col-span-1 hidden md:block">
              <Pill cls={conf.cls}>{conf.label}</Pill>
            </div>

            {/* Tools count */}
            <div className="col-span-1 text-xs text-neutral-500 font-mono hidden md:block">
              {r.tools_recommended?.length ?? 0}
            </div>

            {/* Date */}
            <div className="col-span-2 text-xs text-neutral-600 font-mono hidden md:block">
              {formatDate(r.created_at)}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  DETAIL VIEW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ReportDetail({
  report,
  onBack,
}: {
  report: any;
  onBack: () => void;
}) {
  const full     = report.full_report_json ?? {};
  const intake   = full.intake   ?? {};
  const diag     = full.diagnosis ?? {};
  const solution = full.solution ?? {};
  const roi      = full.roi      ?? {};
  const tools    = solution.recommended_tools ?? [];
  const roadmap  = roi.roadmap ?? [];
  const conf     = confidenceTag(report.confidence_score ?? 0);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">

      {/* ── Back + header ──────────────────────────────────────────────────── */}
      <div>
        <button
          onClick={onBack}
          className="text-[10px] uppercase tracking-widest text-neutral-500
            hover:text-white transition-colors mb-6 flex items-center gap-2"
        >
          ← Back to reports
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-8">
          <div>
            <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-2">
              [ REPORT_DETAIL ]
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              {(report.problem_domain ?? 'ANALYSIS').toUpperCase()}
            </h1>
            <p className="text-xs text-neutral-500 mt-2 font-mono">
              SESSION: {report.session_id?.slice(0, 8)}... &nbsp;·&nbsp; {formatDate(report.created_at)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Pill cls={conf.cls}>CONFIDENCE: {report.confidence_score}% ({conf.label})</Pill>
          </div>
        </div>
      </div>

      {/* ── ROI headline strip ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-800">
        <div className="bg-neutral-950 p-6">
          <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Est. Annual Savings</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            ${report.roi_min?.toLocaleString()} – ${report.roi_max?.toLocaleString()}
          </div>
        </div>
        <div className="bg-neutral-950 p-6">
          <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-2">ROI Metric</div>
          <div className="text-sm text-neutral-200">{report.roi_metric || '—'}</div>
        </div>
        <div className="bg-neutral-950 p-6">
          <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Payback Period</div>
          <div className="text-sm text-neutral-200">{roi.payback_period_months ? `${roi.payback_period_months} months` : '—'}</div>
        </div>
        <div className="bg-neutral-950 p-6">
          <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Battery Chemistry</div>
          <div className="text-sm text-neutral-200">{report.battery_type || '—'}</div>
        </div>
      </div>

      {/* ── Executive summary ──────────────────────────────────────────────── */}
      {(report.executive_summary || roi.executive_summary) && (
        <div className="border border-neutral-800 bg-neutral-950 p-6">
          <SectionLabel>Executive Summary</SectionLabel>
          <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
            {report.executive_summary || roi.executive_summary}
          </p>
        </div>
      )}

      {/* ── Two-column: Intake + Diagnosis ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Intake */}
        <div className="border border-neutral-800 bg-neutral-950 p-6">
          <SectionLabel>Agent 1 — Intake</SectionLabel>
          <KVRow label="Problem Domain"    value={intake.problem_domain} />
          <KVRow label="Battery Type"      value={intake.battery_type} />
          <KVRow label="Company Profile"   value={intake.company_profile} />
          {intake.key_challenges && (
            <div className="mt-4">
              <span className="text-[10px] uppercase tracking-widest text-neutral-600">Key Challenges</span>
              <ul className="mt-2 space-y-1">
                {(Array.isArray(intake.key_challenges) ? intake.key_challenges : [intake.key_challenges]).map(
                  (c: string, i: number) => (
                    <li key={i} className="text-xs text-neutral-400 pl-3 border-l border-neutral-800">
                      {c}
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Diagnosis */}
        <div className="border border-neutral-800 bg-neutral-950 p-6">
          <SectionLabel>Agent 2 — Diagnosis</SectionLabel>
          <KVRow label="Impact Level" value={diag.impact_level} />
          {diag.root_cause_analysis && (
            <div className="mt-4">
              <span className="text-[10px] uppercase tracking-widest text-neutral-600">Root Cause Analysis</span>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                {diag.root_cause_analysis}
              </p>
            </div>
          )}
          {diag.ai_opportunities && (
            <div className="mt-4">
              <span className="text-[10px] uppercase tracking-widest text-neutral-600">AI Opportunities</span>
              <ul className="mt-2 space-y-1">
                {(Array.isArray(diag.ai_opportunities) ? diag.ai_opportunities : [diag.ai_opportunities]).map(
                  (o: string, i: number) => (
                    <li key={i} className="text-xs text-neutral-400 pl-3 border-l border-emerald-500/30">
                      {o}
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ── Recommended tools ──────────────────────────────────────────────── */}
      <div className="border border-neutral-800 bg-neutral-950 p-6">
        <SectionLabel>Agent 3 — Recommended Tools ({tools.length})</SectionLabel>

        {tools.length === 0 ? (
          <p className="text-xs text-neutral-600">No tools recommended.</p>
        ) : (
          <div className="space-y-4">
            {tools.map((tool: any, idx: number) => (
              <div
                key={idx}
                className="border border-neutral-800 p-5 hover:border-neutral-600 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-neutral-700">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-bold text-neutral-100 uppercase tracking-wide">
                      {tool.tool_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill cls="text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                      FIT: {tool.fit_score}%
                    </Pill>
                    {tool.pricing_tier && (
                      <Pill cls="text-neutral-400 border-neutral-700 bg-neutral-900">
                        {tool.pricing_tier}
                      </Pill>
                    )}
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                  {tool.why_recommended}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-neutral-600 uppercase tracking-widest">
                  {tool.roi_min != null && (
                    <span>ROI: ${tool.roi_min?.toLocaleString()} – ${tool.roi_max?.toLocaleString()}</span>
                  )}
                  {tool.implementation_weeks && (
                    <span>Deploy: {tool.implementation_weeks} wks</span>
                  )}
                  {tool.website && <span>Web: {tool.website}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Roadmap ────────────────────────────────────────────────────────── */}
      {roadmap.length > 0 && (
        <div className="border border-neutral-800 bg-neutral-950 p-6">
          <SectionLabel>Agent 4 — Implementation Roadmap</SectionLabel>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-800" />

            <div className="space-y-6">
              {roadmap.map((phase: any, idx: number) => (
                <div key={idx} className="relative pl-8">
                  {/* Dot */}
                  <div className="absolute left-0 top-1 w-[15px] h-[15px] border border-neutral-700 bg-neutral-950 flex items-center justify-center">
                    <div className={`w-[7px] h-[7px] ${idx === 0 ? 'bg-emerald-500' : 'bg-neutral-700'}`} />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
                    <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                      Phase {phase.phase_number ?? idx + 1}: {phase.title}
                    </span>
                    {phase.duration_weeks && (
                      <span className="text-[10px] text-neutral-600 font-mono">
                        {phase.duration_weeks} weeks
                      </span>
                    )}
                  </div>

                  {phase.key_activities && (
                    <ul className="space-y-1 mb-2">
                      {phase.key_activities.map((a: string, ai: number) => (
                        <li key={ai} className="text-xs text-neutral-500 pl-3 border-l border-neutral-800">
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}

                  {phase.deliverable && (
                    <div className="text-[10px] uppercase tracking-widest text-neutral-600">
                      Deliverable: <span className="text-neutral-400">{phase.deliverable}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Caveats ────────────────────────────────────────────────────────── */}
      {roi.caveats && roi.caveats.length > 0 && (
        <div className="border border-neutral-800 bg-neutral-950 p-6">
          <SectionLabel>Caveats & Assumptions</SectionLabel>
          <ul className="space-y-2">
            {roi.caveats.map((c: string, i: number) => (
              <li key={i} className="text-xs text-neutral-500 pl-3 border-l border-amber-500/30">
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Footer actions ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link
          href="/report"
          className="border border-neutral-700 hover:border-white text-xs uppercase tracking-widest
            px-6 py-3 text-neutral-400 hover:text-white transition-all text-center"
        >
          Run New Analysis →
        </Link>
        <button
          onClick={onBack}
          className="border border-neutral-800 hover:border-neutral-600 text-xs uppercase tracking-widest
            px-6 py-3 text-neutral-600 hover:text-neutral-300 transition-all text-center"
        >
          ← Back to List
        </button>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function ConsultantPage() {
  const [view, setView]                   = useState<'list' | 'detail'>('list');
  const [isLoading, setIsLoading]         = useState(true);
  const [error, setError]                 = useState<string | null>(null);
  const [reports, setReports]             = useState<any[]>([]);
  const [selectedReport, setSelected]     = useState<any | null>(null);

  useEffect(() => { loadList(); }, []);

  async function loadList() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllReports();
      setReports(data);
      setView('list');
    } catch (err: any) {
      setError(err.message || 'Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  }

  async function openDetail(id: string) {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getReportById(id);
      setSelected(data);
      setView('detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Failed to load report');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <TopNav />

      <div className="max-w-6xl mx-auto px-8 py-12 space-y-10">

        {/* Page header (list view only) */}
        {view === 'list' && !isLoading && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-8">
            <div>
              <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-2">
                [ CONSULTING_HISTORY ]
              </p>
              <h1 className="text-4xl font-bold tracking-tight">REPORTS</h1>
              <p className="text-xs text-neutral-500 mt-2">
                {reports.length} {reports.length === 1 ? 'analysis' : 'analyses'} on record
              </p>
            </div>
            <Link
              href="/report"
              className="border border-neutral-700 hover:border-white text-xs uppercase tracking-widest
                px-6 py-3 text-neutral-400 hover:text-white transition-all"
            >
              New Analysis →
            </Link>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <div className="flex items-center gap-3 text-neutral-500 text-xs uppercase tracking-widest">
              <span className="inline-block w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              {view === 'list' ? 'LOADING REPORTS...' : 'LOADING REPORT DATA...'}
            </div>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="border border-red-500/30 bg-red-500/5 p-6 space-y-4 text-center">
            <p className="text-xs text-red-400 uppercase tracking-widest">Error</p>
            <p className="text-sm text-neutral-400">{error}</p>
            <button
              onClick={loadList}
              className="border border-neutral-700 hover:border-white text-xs uppercase tracking-widest
                px-5 py-2.5 text-neutral-400 hover:text-white transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* List view */}
        {!isLoading && !error && view === 'list' && (
          <ReportsList reports={reports} onSelect={openDetail} />
        )}

        {/* Detail view */}
        {!isLoading && !error && view === 'detail' && selectedReport && (
          <ReportDetail report={selectedReport} onBack={loadList} />
        )}

        {/* Footer */}
        <div className="border-t border-neutral-900 pt-6 flex justify-between items-center text-[10px] text-neutral-700 uppercase tracking-widest">
          <span>AI Consultant.io // Consulting Archive</span>
          <span>{reports.length} REPORTS</span>
        </div>
      </div>
    </div>
  );
}