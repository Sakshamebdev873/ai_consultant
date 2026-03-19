'use client';

import Link from 'next/link';
import { useRoadmap, ActiveTab } from '../../hooks/useRoadmap';
import type { RoadmapPhase } from '@/types/report';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TAB_LABELS: { id: ActiveTab; label: string; hint: string }[] = [
  { id: 'timeline',  label: 'Timeline',  hint: 'Phase overview & status' },
  { id: 'checklist', label: 'Checklist', hint: 'Task-level progress'     },
  { id: 'budget',    label: 'Budget',    hint: 'Cost breakdown'          },
];

// Map phase index → visual colour
const PHASE_COLORS = [
  'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]',
  'bg-blue-500    shadow-[0_0_10px_rgba(59,130,246,0.6)]',
  'bg-yellow-500  shadow-[0_0_10px_rgba(234,179,8,0.6)]',
  'bg-purple-500  shadow-[0_0_10px_rgba(168,85,247,0.6)]',
];
const PHASE_TEXT = ['text-emerald-400', 'text-blue-400', 'text-yellow-400', 'text-purple-400'];
const PHASE_BORDER = [
  'border-emerald-500/30 bg-emerald-500/5',
  'border-blue-500/30 bg-blue-500/5',
  'border-yellow-500/30 bg-yellow-500/5',
  'border-purple-500/30 bg-purple-500/5',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="text-[10px] uppercase tracking-widest text-neutral-600 border-b border-neutral-900 pb-2 mb-4">
      // {label}
    </div>
  );
}

// ─── TIMELINE TAB ─────────────────────────────────────────────────────────────

function TimelineTab({
  phases, getPhaseProgress, activePhase, setActivePhase, signOffPhase,
}: {
  phases: RoadmapPhase[];
  getPhaseProgress: (n: number) => { completedActivities: number[]; signedOff: boolean };
  activePhase: number;
  setActivePhase: (n: number) => void;
  signOffPhase: (n: number) => void;
}) {
  return (
    <div className="space-y-6">
      {phases.map((phase, idx) => {
        const prog     = getPhaseProgress(phase.phase_number);
        const done     = prog.completedActivities.length;
        const total    = phase.key_activities.length;
        const pct      = total > 0 ? Math.round((done / total) * 100) : 0;
        const isActive = activePhase === phase.phase_number;

        return (
          <div key={phase.phase_number}
            className="relative pl-10 group">

            {/* Timeline spine */}
            {idx < phases.length - 1 && (
              <div className="absolute left-[7px] top-6 bottom-[-24px] w-[1px] bg-neutral-800" />
            )}

            {/* Phase dot */}
            <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-black flex-shrink-0
              ${prog.signedOff ? PHASE_COLORS[idx % 4] : pct > 0 ? 'bg-neutral-600' : 'bg-neutral-800'}`}
            />

            {/* Card */}
            <button
              type="button"
              onClick={() => setActivePhase(isActive ? -1 : phase.phase_number)}
              className={`w-full text-left border transition-all
                ${isActive
                  ? `${PHASE_BORDER[idx % 4]} border`
                  : prog.signedOff
                    ? 'border-neutral-700 bg-neutral-950/60'
                    : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                }`}
            >
              <div className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  {/* Phase badge */}
                  <div className={`text-[10px] font-bold uppercase px-2 py-0.5 border flex-shrink-0
                    ${prog.signedOff
                      ? `${PHASE_TEXT[idx % 4]} ${PHASE_BORDER[idx % 4]} border`
                      : 'text-neutral-600 border-neutral-800'
                    }`}>
                    P{phase.phase_number}
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-sm font-bold uppercase tracking-wide truncate
                      ${prog.signedOff ? PHASE_TEXT[idx % 4] : 'text-white'}`}>
                      {phase.title}
                    </h3>
                    <div className="text-[10px] text-neutral-600 mt-0.5 flex items-center gap-3">
                      <span>{phase.duration}</span>
                      <span>·</span>
                      <span>{done}/{total} tasks</span>
                      {prog.signedOff && <span className="text-emerald-500">· SIGNED OFF ✓</span>}
                    </div>
                  </div>
                </div>

                {/* Progress + chevron */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className={`text-lg font-bold font-mono ${PHASE_TEXT[idx % 4]}`}>{pct}%</div>
                    <div className="w-16 h-0.5 bg-neutral-800 mt-1">
                      <div
                        className={`h-full transition-all duration-700 ${PHASE_COLORS[idx % 4].split(' ')[0]}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className={`text-neutral-600 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}>
                    ↓
                  </span>
                </div>
              </div>
            </button>

            {/* Expanded detail */}
            {isActive && (
              <div className={`border border-t-0 p-6 space-y-4 ${PHASE_BORDER[idx % 4]} border`}>
                {/* Activities preview */}
                <ul className="space-y-2">
                  {phase.key_activities.map((act, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-neutral-500">
                      <span className={`${PHASE_TEXT[idx % 4]} flex-shrink-0`}>›</span>
                      {act}
                    </li>
                  ))}
                </ul>

                {/* Deliverable */}
                <div className="border border-neutral-800 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1">Deliverable</div>
                  <div className="text-xs text-neutral-300">{phase.deliverable}</div>
                </div>

                {/* Sign off button */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); signOffPhase(phase.phase_number); }}
                  className={`text-[10px] uppercase tracking-widest border px-4 py-2 transition-all
                    ${prog.signedOff
                      ? 'border-neutral-700 text-neutral-600 hover:border-red-500/50 hover:text-red-500'
                      : `${PHASE_BORDER[idx % 4]} border ${PHASE_TEXT[idx % 4]} hover:opacity-80`
                    }`}
                >
                  {prog.signedOff ? '✓ Signed Off — Click to Revoke' : 'Sign Off Phase →'}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── CHECKLIST TAB ────────────────────────────────────────────────────────────

function ChecklistTab({
  phases, getPhaseProgress, toggleActivity,
}: {
  phases: RoadmapPhase[];
  getPhaseProgress: (n: number) => { completedActivities: number[]; signedOff: boolean };
  toggleActivity: (phaseNum: number, actIdx: number) => void;
}) {
  return (
    <div className="space-y-8">
      {phases.map((phase, idx) => {
        const prog = getPhaseProgress(phase.phase_number);
        const done = prog.completedActivities.length;
        const total = phase.key_activities.length;

        return (
          <div key={phase.phase_number}>
            {/* Phase label */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 border
                  ${PHASE_TEXT[idx % 4]} ${PHASE_BORDER[idx % 4]} border`}>
                  P{phase.phase_number}
                </span>
                <span className="text-xs uppercase tracking-widest text-neutral-400">{phase.title}</span>
              </div>
              <span className={`text-xs font-mono font-bold ${PHASE_TEXT[idx % 4]}`}>
                {done}/{total}
              </span>
            </div>

            {/* Tasks */}
            <div className="space-y-2">
              {phase.key_activities.map((act, i) => {
                const isChecked = prog.completedActivities.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleActivity(phase.phase_number, i)}
                    className={`w-full text-left flex items-start gap-4 p-4 border transition-all group
                      ${isChecked
                        ? 'border-neutral-800 bg-neutral-950/40'
                        : 'border-neutral-800 bg-black hover:border-neutral-700'
                      }`}
                  >
                    {/* Checkbox */}
                    <div className={`w-4 h-4 border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all
                      ${isChecked
                        ? `${PHASE_BORDER[idx % 4].split(' ')[0].replace('border-', 'border-')} border ${PHASE_COLORS[idx % 4].split(' ')[0]}`
                        : 'border-neutral-700 group-hover:border-neutral-500'
                      }`}>
                      {isChecked && <span className="text-black text-[10px] font-bold leading-none">✓</span>}
                    </div>

                    <span className={`text-sm transition-all ${isChecked ? 'text-neutral-600 line-through' : 'text-neutral-300'}`}>
                      {act}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Phase progress bar */}
            <div className="mt-3 h-[2px] bg-neutral-900">
              <div
                className={`h-full transition-all duration-700 ${PHASE_COLORS[idx % 4].split(' ')[0]}`}
                style={{ width: total > 0 ? `${(done / total) * 100}%` : '0%' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── BUDGET TAB ───────────────────────────────────────────────────────────────

function BudgetTab({
  phases, getBudget, report,
}: {
  phases: RoadmapPhase[];
  getBudget: (phase: RoadmapPhase) => { min: number; max: number; items: { label: string; cost: string }[] };
  report: { roi_range: string; roi_metric: string; payback_period: string } | null;
}) {
  const totalMin = phases.reduce((acc, p) => acc + getBudget(p).min, 0);
  const totalMax = phases.reduce((acc, p) => acc + getBudget(p).max, 0);

  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;

  return (
    <div className="space-y-6">

      {/* Total estimate banner */}
      <div className="border border-emerald-500/20 bg-emerald-500/5 p-6">
        <SectionHeader label="Total Implementation Budget" />
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-4xl font-bold text-emerald-400">
              {fmt(totalMin)} – {fmt(totalMax)}
            </div>
            <div className="text-xs text-neutral-500 mt-1">estimated one-time implementation cost</div>
          </div>
          {report && (
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1">vs. ROI</div>
              <div className="text-sm font-bold text-white">{report.roi_range}</div>
              <div className="text-[10px] text-neutral-600">{report.roi_metric}</div>
            </div>
          )}
        </div>

        {/* Payback */}
        {report?.payback_period && (
          <div className="mt-4 pt-4 border-t border-emerald-500/10 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-neutral-600">Payback Period:</span>
            <span className="text-xs font-bold text-emerald-400">{report.payback_period}</span>
          </div>
        )}
      </div>

      {/* Per-phase breakdown */}
      <div>
        <SectionHeader label="Per-Phase Breakdown" />
        <div className="space-y-3">
          {phases.map((phase, idx) => {
            const budget = getBudget(phase);
            const phasePct = totalMax > 0 ? (budget.max / totalMax) * 100 : 0;
            return (
              <div key={phase.phase_number} className="border border-neutral-800 bg-neutral-950 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 border ${PHASE_TEXT[idx % 4]} ${PHASE_BORDER[idx % 4]} border`}>
                      P{phase.phase_number}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-neutral-400">{phase.title}</span>
                  </div>
                  <span className={`text-sm font-bold font-mono ${PHASE_TEXT[idx % 4]}`}>
                    {fmt(budget.min)} – {fmt(budget.max)}
                  </span>
                </div>

                {/* Budget bar */}
                <div className="h-[2px] bg-neutral-800 mb-4">
                  <div
                    className={`h-full ${PHASE_COLORS[idx % 4].split(' ')[0]}`}
                    style={{ width: `${phasePct}%` }}
                  />
                </div>

                {/* Line items */}
                <div className="space-y-2">
                  {budget.items.map(item => (
                    <div key={item.label} className="flex justify-between items-center">
                      <span className="text-xs text-neutral-600">{item.label}</span>
                      <span className="text-xs font-mono text-neutral-400">{item.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-[10px] text-neutral-700 border border-neutral-900 p-4 leading-relaxed">
        ⚠ Budget estimates are indicative and based on industry benchmarks for your company
        profile. Actual costs depend on vendor negotiations, in-house capability, and
        implementation complexity. Use these figures for planning purposes only.
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
  const {
    report, phases, activeTab, setActiveTab,
    activePhase, setActivePhase,
    overallProgress, totalActivities, completedActivities,
    signedOffCount, mounted,
    toggleActivity, signOffPhase,
    getPhaseProgress, getBudget,
  } = useRoadmap();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
        <div className="flex items-center gap-3 text-neutral-500 text-xs uppercase tracking-widest">
          <span className="inline-block w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
          LOADING ROADMAP...
        </div>
      </div>
    );
  }

  const hasReport = phases.length > 0;

  return (
    <div className="min-h-screen bg-black text-white font-mono flex overflow-hidden">

      {/* ── LEFT SIDEBAR ──────────────────────────────────────────────────── */}
      <div className="w-16 lg:w-60 border-r border-neutral-800 flex flex-col justify-between py-6 bg-neutral-950 flex-shrink-0">
        <div className="space-y-8">
          {/* Logo / back */}
          <div className="px-4 lg:px-6">
            <Link href="/dashboard"
              className="flex items-center gap-3 text-neutral-500 hover:text-white transition-colors group">
              <div className="w-6 h-6 border border-neutral-700 flex items-center justify-center text-[10px] group-hover:border-white transition-colors">
                ←
              </div>
              <span className="hidden lg:block text-[10px] uppercase tracking-widest">Dashboard</span>
            </Link>
          </div>

          {/* Tab nav */}
          <nav className="space-y-1 px-2">
            {TAB_LABELS.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-3 transition-all border-l-2 group
                  ${activeTab === tab.id
                    ? 'border-white text-white bg-white/5'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300 hover:border-neutral-700'
                  }`}
              >
                <div className="text-[10px] uppercase tracking-widest">{tab.label}</div>
                <div className="hidden lg:block text-[9px] text-neutral-700 mt-0.5 group-hover:text-neutral-600">
                  {tab.hint}
                </div>
              </button>
            ))}
          </nav>

          {/* Progress summary — sidebar */}
          <div className="px-4 lg:px-6 hidden lg:block space-y-4">
            <div className="border border-neutral-800 p-4">
              <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-3">Progress</div>
              <div className="text-2xl font-bold mb-2">{overallProgress}%</div>
              <div className="h-[2px] bg-neutral-800">
                <div
                  className="h-full bg-white transition-all duration-700"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <div className="text-[9px] text-neutral-700 mt-2">
                {completedActivities}/{totalActivities} tasks · {signedOffCount}/{phases.length} phases signed off
              </div>
            </div>
          </div>
        </div>

        {/* Session ID */}
        {report && (
          <div className="px-4 lg:px-6">
            <div className="text-[9px] text-neutral-800 uppercase leading-relaxed hidden lg:block">
              Session<br />
              {report.session_id.slice(0, 12)}...
            </div>
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Background grid */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <header className="relative z-10 p-6 lg:p-8 border-b border-neutral-800 bg-black/80 backdrop-blur">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] text-emerald-500 uppercase tracking-widest mb-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse" />
                ACTIVE PROTOCOL
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                {hasReport && report
                  ? report.problem_domain.toUpperCase()
                  : 'EXECUTION ROADMAP'}
              </h1>
              {report && (
                <p className="text-neutral-500 text-sm mt-1">
                  {phases.length} phases ·{' '}
                  {phases.reduce((acc, p) => acc + p.key_activities.length, 0)} tasks ·{' '}
                  {report.payback_period} payback
                </p>
              )}
            </div>

            {/* Overall progress bar */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1">Overall</div>
                <div className="text-2xl font-bold">{overallProgress}%</div>
                <div className="w-32 h-[2px] bg-neutral-800 mt-1.5">
                  <div
                    className="h-full bg-white transition-all duration-700"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>

              <Link href="/report/result"
                className="border border-white bg-white text-black px-5 py-3 font-bold
                  text-[10px] uppercase tracking-widest hover:bg-neutral-200
                  transition-colors flex items-center gap-2 flex-shrink-0">
                View Report →
              </Link>
            </div>
          </div>

          {/* Tab pills */}
          <div className="flex gap-1 mt-6">
            {TAB_LABELS.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 text-[10px] uppercase tracking-widest border transition-all
                  ${activeTab === tab.id
                    ? 'border-white bg-white text-black'
                    : 'border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-white'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* ── TAB CONTENT ─────────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto relative z-10 p-6 lg:p-10">

          {!hasReport ? (
            /* No report state */
            <div className="max-w-md mx-auto text-center py-24 space-y-6">
              <div className="text-6xl font-bold text-neutral-800">?</div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-2">
                  NO ACTIVE SESSION
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Your roadmap is generated from an analysis report.
                  Run a new analysis to populate this view.
                </p>
              </div>
              <Link href="/report"
                className="inline-flex items-center gap-2 border border-white px-6 py-3
                  text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Run Analysis →
              </Link>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {activeTab === 'timeline' && (
                <TimelineTab
                  phases={phases}
                  getPhaseProgress={getPhaseProgress}
                  activePhase={activePhase}
                  setActivePhase={setActivePhase}
                  signOffPhase={signOffPhase}
                />
              )}
              {activeTab === 'checklist' && (
                <ChecklistTab
                  phases={phases}
                  getPhaseProgress={getPhaseProgress}
                  toggleActivity={toggleActivity}
                />
              )}
              {activeTab === 'budget' && (
                <BudgetTab
                  phases={phases}
                  getBudget={getBudget}
                  report={report}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}