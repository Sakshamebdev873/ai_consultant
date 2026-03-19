'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { ReportResult, ToolRecommendation, RoadmapPhase } from '@/types/report';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function impactColor(level: string) {
  if (level === 'high')   return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5';
  if (level === 'medium') return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5';
  return                         'text-neutral-400 border-neutral-500/30 bg-neutral-500/5';
}

function confidenceColor(score: number) {
  if (score >= 70) return 'bg-emerald-500';
  if (score >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-neutral-800 pb-3 mb-6">
      <span className="text-[10px] text-neutral-600 tracking-widest">{num} //</span>
      <span className="text-xs uppercase tracking-widest text-neutral-400">{title}</span>
    </div>
  );
}

function MetaBadge({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border border-neutral-800 bg-neutral-950 px-4 py-3">
      <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1">{label}</div>
      <div className={`text-sm font-bold uppercase ${accent ? 'text-emerald-400' : 'text-white'}`}>
        {value || '—'}
      </div>
    </div>
  );
}

function ToolCard({ tool, index }: { tool: ToolRecommendation; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div className={`border transition-colors ${expanded ? 'border-white/20 bg-neutral-950' : 'border-neutral-800 bg-black hover:border-neutral-700'}`}>
      {/* Header — always visible */}
      <button
        type="button"
        onClick={() => setExpanded(e => !e)}
        className="w-full text-left p-5 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4 min-w-0">
          {/* Rank badge */}
          <div className="w-8 h-8 border border-neutral-800 flex items-center justify-center text-[10px] text-neutral-500 flex-shrink-0 font-bold">
            #{index + 1}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white truncate">{tool.tool_name}</h4>
            <div className="text-[10px] text-neutral-500 mt-0.5">
              Fit score: <span className="text-emerald-400 font-mono">{tool.fit_score}/100</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-neutral-600 uppercase tracking-widest">ROI</div>
            <div className="text-sm font-mono text-emerald-400">{tool.roi_range}x</div>
          </div>
          <span className="text-neutral-600 text-sm">{expanded ? '−' : '+'}</span>
        </div>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-neutral-800/60 pt-4 space-y-4">
          <p className="text-sm text-neutral-400 leading-relaxed">{tool.why_recommended}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Implementation',  value: tool.implementation_weeks },
              { label: 'Pricing',         value: tool.pricing_tier },
              { label: 'ROI Range',       value: `${tool.roi_range}x` },
            ].map(({ label, value }) => (
              <div key={label} className="border border-neutral-800 p-3">
                <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1">{label}</div>
                <div className="text-xs text-neutral-300 font-mono">{value}</div>
              </div>
            ))}
          </div>

          {/* Fit score bar */}
          <div>
            <div className="flex justify-between text-[10px] text-neutral-600 uppercase tracking-widest mb-1.5">
              <span>Fit Score</span>
              <span className="text-white font-mono">{tool.fit_score}/100</span>
            </div>
            <div className="h-1 bg-neutral-800 w-full">
              <div
                className="h-full bg-emerald-500 transition-all duration-1000"
                style={{ width: `${tool.fit_score}%` }}
              />
            </div>
          </div>

          <a
            href={`https://${tool.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest
              border border-neutral-800 hover:border-white px-3 py-2
              text-neutral-500 hover:text-white transition-all"
          >
            Visit {tool.website} →
          </a>
        </div>
      )}
    </div>
  );
}

function RoadmapCard({ phase }: { phase: RoadmapPhase }) {
  return (
    <div className="relative border border-neutral-800 bg-neutral-950 p-5">
      {/* Phase connector line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/40 to-transparent" />

      <div className="flex items-start gap-4">
        <div className="w-8 h-8 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
          P{phase.phase_number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h4 className="text-sm font-bold uppercase tracking-wider">{phase.title}</h4>
            <span className="text-[10px] text-neutral-500 border border-neutral-800 px-2 py-0.5 flex-shrink-0">
              {phase.duration}
            </span>
          </div>
          <ul className="space-y-1 mb-3">
            {phase.key_activities.map((a, i) => (
              <li key={i} className="text-xs text-neutral-500 flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 flex-shrink-0">›</span>
                {a}
              </li>
            ))}
          </ul>
          <div className="text-[10px] text-neutral-700 border-t border-neutral-900 pt-2 mt-2">
            DELIVERABLE: <span className="text-neutral-500">{phase.deliverable}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportResultPage() {
  const router = useRouter();
  const [report, setReport] = useState<ReportResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const raw = sessionStorage.getItem('report_result');
    if (!raw) { router.push('/report'); return; }
    try { setReport(JSON.parse(raw)); }
    catch { router.push('/report'); }
  }, [router]);

  if (!mounted || !report) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
        <div className="flex items-center gap-3 text-neutral-500 text-xs uppercase tracking-widest">
          <span className="inline-block w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
          LOADING REPORT...
        </div>
      </div>
    );
  }

  const generatedAt = new Date(report.generated_at).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-black text-white font-mono">

      {/* ── TOP NAV ──────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 border-b border-neutral-900 bg-black/95 backdrop-blur px-6 py-3
        flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard"
            className="text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
            ← Dashboard
          </Link>
          <span className="text-neutral-800">|</span>
          <Link href="/report"
            className="text-xs uppercase tracking-widest text-neutral-600 hover:text-white transition-colors">
            New Analysis
          </Link>
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-600">Analysis Complete</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* ── REPORT HEADER ────────────────────────────────────────────────── */}
        <div className="border-b border-neutral-800 pb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-3">
            [ INTELLIGENCE_REPORT // SESSION: {report.session_id.slice(0, 12).toUpperCase()}... ]
          </p>
          <h1 className="text-5xl font-bold tracking-tight leading-none mb-6">
            ANALYSIS<br />
            <span className="text-neutral-600">COMPLETE.</span>
          </h1>

          {/* Meta badges row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <MetaBadge label="Domain"      value={report.problem_domain} accent />
            <MetaBadge label="Battery Type" value={report.battery_type} />
            <MetaBadge label="Impact Level" value={report.impact_level.toUpperCase()} accent={report.impact_level === 'high'} />
            <MetaBadge label="Generated"   value={generatedAt} />
          </div>

          {/* Agents completed */}
          <div className="flex flex-wrap gap-2">
            {report.agents_completed.map(a => (
              <span key={a}
                className="text-[10px] uppercase tracking-widest border border-emerald-500/30
                  bg-emerald-500/5 px-2 py-1 text-emerald-600 flex items-center gap-1.5">
                <span>✓</span> {a.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* ── MAIN GRID ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN: Summary + ROI + Confidence ──────────────────────── */}
          <div className="space-y-6">

            {/* Executive summary */}
            <div className="border border-neutral-800 bg-neutral-950 p-6">
              <SectionHeader num="01" title="Executive Summary" />
              <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-line">
                {report.executive_summary}
              </p>
            </div>

            {/* ROI card */}
            <div className="border border-emerald-500/20 bg-emerald-500/5 p-6">
              <SectionHeader num="02" title="ROI Estimate" />
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1">Projected Range</div>
                  <div className="text-3xl font-bold text-emerald-400">{report.roi_range}</div>
                  <div className="text-[10px] text-neutral-600 mt-1">{report.roi_metric}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-neutral-800 p-3">
                    <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1">Payback</div>
                    <div className="text-sm font-bold text-white">{report.payback_period}</div>
                  </div>
                  <div className="border border-neutral-800 p-3">
                    <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1">Impact</div>
                    <div className={`text-xs font-bold border px-2 py-0.5 inline-block uppercase ${impactColor(report.impact_level)}`}>
                      {report.impact_level}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence score */}
            <div className="border border-neutral-800 bg-neutral-950 p-6">
              <SectionHeader num="03" title="Confidence Score" />
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-4xl font-bold">{report.confidence_score}</span>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest">/100</span>
                </div>
                <div className="h-1.5 bg-neutral-800 w-full">
                  <div
                    className={`h-full transition-all duration-1000 ${confidenceColor(report.confidence_score)}`}
                    style={{ width: `${report.confidence_score}%` }}
                  />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-600">
                  Level: <span className="text-white">{report.confidence_level}</span>
                </div>
              </div>
            </div>

            {/* Caveats */}
            {report.caveats.length > 0 && (
              <div className="border border-yellow-500/20 bg-yellow-500/5 p-6">
                <SectionHeader num="04" title="Caveats" />
                <ul className="space-y-2">
                  {report.caveats.map((c, i) => (
                    <li key={i} className="text-xs text-neutral-500 flex items-start gap-2">
                      <span className="text-yellow-600 flex-shrink-0">⚠</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Tools + Roadmap ──────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Recommended tools */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 border-b border-neutral-800 pb-3 flex-1">
                  <span className="text-[10px] text-neutral-600 tracking-widest">05 //</span>
                  <span className="text-xs uppercase tracking-widest text-neutral-400">Recommended Tools</span>
                  <span className="ml-auto text-[10px] text-neutral-700 border border-neutral-800 px-2 py-0.5">
                    {report.recommended_tools.length} tools matched
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {report.recommended_tools.map((tool, i) => (
                  <ToolCard key={tool.tool_name} tool={tool} index={i} />
                ))}
              </div>
            </div>

            {/* Implementation roadmap */}
            <div>
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-3 mb-6">
                <span className="text-[10px] text-neutral-600 tracking-widest">06 //</span>
                <span className="text-xs uppercase tracking-widest text-neutral-400">Implementation Roadmap</span>
              </div>

              <div className="space-y-3">
                {report.roadmap.map(phase => (
                  <RoadmapCard key={phase.phase_number} phase={phase} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── ACTIONS ──────────────────────────────────────────────────────── */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/report"
            className="flex-1 border border-neutral-800 hover:border-white text-center py-4
              text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-all"
          >
            ← Run New Analysis
          </Link>
          <Link
            href="/roadmap"
            className="flex-1 bg-white text-black font-bold py-4 text-center
              text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors
              flex items-center justify-center gap-3"
          >
            Deploy Stack <span>→</span>
          </Link>
        </div>

        {/* Session ID footer */}
        <div className="text-[10px] text-neutral-800 uppercase tracking-widest text-center pb-4">
          SESSION ID: {report.session_id}
        </div>

      </div>
    </div>
  );
}