'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  useFeedbackForm,
  type RatingField,
  type ReportSummary,
  type ImplementationStage,
} from '../../hooks/Usefeedbackform';

// ─── Known tools from KB ──────────────────────────────────────────────────────

const KNOWN_TOOLS = [
  'Siemens Xcelerator (Battery Manufacturing)',
  'Ansys Battery Simulation Suite',
  'C3.ai Predictive Maintenance',
  'BatteryBits AI Platform',
  'Voltaiq Enterprise Analytics',
  'Honeywell Forge for Energy Storage',
  'Microsoft Azure Digital Twins (Battery)',
  'Palantir Foundry for Manufacturing',
  'IBM Maximo + Battery Pack',
  'NVIDIA Omniverse (Battery Design)',
  'Dassault Systèmes CATIA (Battery)',
  'Autodesk Fusion (EV Battery)',
];

// ─── Primitives ───────────────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="text-[10px] uppercase tracking-widest text-neutral-500 border-b border-neutral-900 pb-3 mb-5 flex items-center gap-2">
      <span className="text-neutral-700">{'//'}</span>
      {label}
    </div>
  );
}

function StarRating({
  field, label, value, onChange,
}: {
  field: RatingField; label: string; value: number;
  onChange: (field: RatingField, v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center justify-between py-2 border-b border-neutral-900 last:border-0">
      <span className="text-xs text-neutral-400 uppercase tracking-wider">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(field, star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className={`w-7 h-7 text-sm border transition-all duration-150
              ${(hovered || value) >= star
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                : 'border-neutral-800 bg-neutral-950 text-neutral-700 hover:border-neutral-600'
              }`}
          >★</button>
        ))}
        <span className="ml-2 text-[10px] text-neutral-600 font-mono w-4 self-center">
          {value > 0 ? value : '—'}
        </span>
      </div>
    </div>
  );
}

function ToggleChip({ label, active, onClick, variant = 'default' }: {
  label: string; active: boolean; onClick: () => void;
  variant?: 'default' | 'chosen' | 'rejected';
}) {
  const activeClass =
    variant === 'chosen'   ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' :
    variant === 'rejected' ? 'border-red-500/60 bg-red-500/10 text-red-300' :
                             'border-white bg-white/10 text-white';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1.5 text-[10px] uppercase tracking-wider border transition-all duration-150
        ${active ? activeClass : 'border-neutral-800 text-neutral-500 bg-neutral-950 hover:border-neutral-600 hover:text-neutral-300'}`}
    >
      {active && (variant === 'chosen' ? '✓ ' : variant === 'rejected' ? '✕ ' : '')}
      {label}
    </button>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-widest text-neutral-500">{label}</label>
      <textarea
        rows={rows} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 p-3
          placeholder:text-neutral-700 font-mono resize-none focus:outline-none
          focus:border-emerald-500/50 transition-colors"
      />
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-widest text-neutral-500">{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 px-3 py-2.5
          placeholder:text-neutral-700 font-mono focus:outline-none
          focus:border-emerald-500/50 transition-colors"
      />
    </div>
  );
}

// ─── Report picker card ───────────────────────────────────────────────────────

function ReportCard({
  report, selected, onSelect,
}: {
  report: ReportSummary; selected: boolean; onSelect: () => void;
}) {
  const date = new Date(report.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
console.log(report);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left border p-4 transition-all duration-200 group
        ${selected
          ? 'border-emerald-500 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.08)]'
          : 'border-neutral-800 bg-neutral-950 hover:border-neutral-600 hover:bg-neutral-900'
        }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left: info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {/* Domain badge */}
            <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 border font-mono
              ${selected
                ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                : 'border-neutral-700 text-neutral-500 bg-neutral-900'
              }`}>
              {report.problem_domain || 'Unknown'}
            </span>
            {report.battery_type && (
              <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 border border-neutral-800 text-neutral-600 bg-neutral-950">
                {report.battery_type}
              </span>
            )}
          </div>

          {/* Summary */}
          <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2 group-hover:text-neutral-200 transition-colors">
            {report.executive_summary
              ? report.executive_summary.slice(0, 120) + '...'
              : 'No summary available.'}
          </p>

          {/* Tools recommended */}
          {report.tools_recommended?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {report.tools_recommended.slice(0, 3).map(t => (
                <span key={t} className="text-[9px] text-neutral-600 border border-neutral-800 px-1.5 py-0.5">
                  {t}
                </span>
              ))}
              {report.tools_recommended.length > 3 && (
                <span className="text-[9px] text-neutral-700 px-1.5 py-0.5">
                  +{report.tools_recommended.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right: stats */}
        <div className="shrink-0 text-right space-y-2">
          <div className="text-[10px] text-neutral-600 font-mono">{date}</div>
          {report.roi_min != null && report.roi_max != null && (
            <div className={`text-xs font-bold font-mono ${selected ? 'text-emerald-400' : 'text-neutral-400'}`}>
              ${(report.roi_min / 1000).toFixed(0)}K–${(report.roi_max / 1000).toFixed(0)}K
            </div>
          )}
          <div className={`text-[10px] font-mono px-1.5 py-0.5 border inline-block
            ${report.confidence_score >= 70
              ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5'
              : 'border-neutral-700 text-neutral-500'
            }`}>
            {report.confidence_score ?? '—'}% conf.
          </div>
        </div>
      </div>

      {/* Selected indicator */}
      {selected && (
        <div className="mt-3 pt-3 border-t border-emerald-500/20 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[10px] text-emerald-400 uppercase tracking-widest">
            Selected — submit feedback for this report
          </span>
        </div>
      )}
    </button>
  );
}

// ─── Report picker section ────────────────────────────────────────────────────

function ReportPicker({
  reports, selectedReport, isLoading, error, onSelect, onClear,
}: {
  reports: ReportSummary[];
  selectedReport: ReportSummary | null;
  isLoading: boolean;
  error: string | null;
  onSelect: (r: ReportSummary) => void;
  onClear: () => void;
}) {
  if (isLoading) {
    return (
      <div className="border border-neutral-800 bg-neutral-950/50 p-8 flex items-center justify-center gap-3 text-emerald-500">
        <span className="w-3 h-3 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest">Loading your reports...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-500/30 bg-red-500/5 p-6 text-xs text-red-400 flex gap-2 items-start">
        <span className="text-red-500 mt-0.5">⚠</span>
        <span>{error}</span>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="border border-neutral-800 bg-neutral-950/50 p-10 text-center space-y-3">
        <p className="text-2xl">📋</p>
        <p className="text-sm text-neutral-400">No reports found.</p>
        <p className="text-xs text-neutral-600">
          Generate a report first before submitting feedback.
        </p>
        <Link
          href="/report"
          className="inline-block mt-2 border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5
            text-xs uppercase tracking-widest text-emerald-400 hover:bg-emerald-500/20 transition-all"
        >
          → Run New Analysis
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-neutral-800 bg-neutral-950/50 p-6">
      <div className="flex items-center justify-between mb-5">
        <SectionHeader label={`Select Report (${reports.length} found)`} />
        {selectedReport && (
          <button
            type="button"
            onClick={onClear}
            className="text-[10px] uppercase tracking-widest text-neutral-600
              hover:text-neutral-300 border border-transparent hover:border-neutral-700 px-2 py-1 transition-all"
          >
            Clear
          </button>
        )}
      </div>
      {/* Custom scrollbar via injected style — no Tailwind plugin needed */}
      <style>{`
        .report-scroll::-webkit-scrollbar        { width: 3px; }
        .report-scroll::-webkit-scrollbar-track  { background: transparent; }
        .report-scroll::-webkit-scrollbar-thumb  { background: #262626; border-radius: 0; }
        .report-scroll::-webkit-scrollbar-thumb:hover { background: #404040; }
        .report-scroll { scrollbar-width: thin; scrollbar-color: #262626 transparent; }
      `}</style>

      <div className="relative">
        <div className="report-scroll space-y-3 max-h-115 overflow-y-auto pr-2">
          {reports.map(report => (
            <ReportCard
              key={report.id}
              report={report}
              selected={selectedReport?.id === report.id}
              onSelect={() => onSelect(report)}
            />
          ))}
        </div>

        {/* Bottom fade — hints that more items exist below */}
        {reports.length > 3 && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-neutral-950 to-transparent" />
        )}
      </div>

      {reports.length > 3 && (
        <p className="text-[10px] text-neutral-700 text-center uppercase tracking-widest mt-3 font-mono">
          ↕ scroll · {reports.length} reports
        </p>
      )}
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessPanel({
  feedbackId, nextSteps, onReset,
}: {
  feedbackId: string; nextSteps: string[]; onReset: () => void;
}) {
  return (
    <div className="border border-emerald-500/30 bg-emerald-950/10 p-10 text-center space-y-6">
      <div className="w-14 h-14 border border-emerald-500 bg-emerald-500/10 mx-auto flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(52,211,153,0.2)]">
        ✓
      </div>
      <div>
        <p className="text-[10px] text-emerald-500 uppercase tracking-widest mb-2">Feedback Recorded</p>
        <h2 className="text-2xl font-bold tracking-tight">TRANSMISSION COMPLETE</h2>
        <p className="text-xs text-neutral-500 mt-2 font-mono">
          FEEDBACK_ID: {feedbackId.toUpperCase()}
        </p>
      </div>
      {nextSteps.length > 0 && (
        <div className="text-left border border-neutral-800 bg-neutral-950 p-5 space-y-2 max-w-lg mx-auto">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">// Next Steps</p>
          {nextSteps.map((step, i) => (
            <p key={i} className="text-xs text-neutral-300 flex gap-2">
              <span className="text-emerald-500">→</span>{step}
            </p>
          ))}
        </div>
      )}
      <div className="flex gap-3 justify-center">
        <button
          onClick={onReset}
          className="border border-neutral-800 px-5 py-2.5 text-xs uppercase tracking-widest
            text-neutral-400 hover:text-white hover:border-neutral-500 transition-all"
        >
          Submit Another
        </button>
        <Link
          href="/dashboard"
          className="border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-xs
            uppercase tracking-widest text-emerald-400 hover:bg-emerald-500/20 transition-all"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeedbackPage() {
  const router = useRouter();

  const {
    reports, selectedReport, isLoadingReports, reportsError,
    selectReport, clearSelection,
    form, isSubmitting, isSuccess, submitError, response,
    setField, setRating, toggleToolChosen, toggleToolRejected,
    submitFeedback, reset,
  } = useFeedbackForm();

  // Tools to show in chip selectors — prefer the selected report's recommendations,
  // fall back to the full known KB list
  const toolList =
    selectedReport?.tools_recommended?.length
      ? [...new Set([...selectedReport.tools_recommended, ...KNOWN_TOOLS])]
      : KNOWN_TOOLS;

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-emerald-500/30">

      {/* NAV */}
      <nav className="border-b border-neutral-800 bg-black/80 backdrop-blur-md px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full" />
          AI Consultant.io
        </Link>
        <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-neutral-500">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/report"    className="hover:text-white transition-colors">New Report</Link>
          <Link href="/feedback"  className="text-emerald-400 border-b border-emerald-400 pb-0.5">Feedback</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-12 space-y-10">

        {/* HEADER */}
        <div className="border-b border-neutral-800 pb-8 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none rounded-full" />
          <p className="text-xs text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
            MODEL FEEDBACK LOOP
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            RATE YOUR<br />
            <span className="text-neutral-500">CONSULTATION</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-3 max-w-md leading-relaxed">
            Select a past report below, then rate it across multiple dimensions.
            Every response sharpens future recommendations for the entire battery industry.
          </p>
        </div>

        {/* SUCCESS */}
        {isSuccess && response ? (
          <SuccessPanel
            feedbackId={response.feedback_id}
            nextSteps={response.next_steps}
            onReset={reset}
          />
        ) : (
          <div className="space-y-8">

            {/* ── STEP 1: PICK A REPORT ─────────────────────────────────────── */}
            <div className="flex items-center gap-3 mb-1">
              <div className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold border
                ${selectedReport ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-neutral-700 text-neutral-500'}`}>
                1
              </div>
              <span className="text-xs uppercase tracking-widest text-neutral-400">
                {selectedReport ? 'Report selected — proceed below' : 'Choose which report to review'}
              </span>
            </div>

            <ReportPicker
              reports={reports}
              selectedReport={selectedReport}
              isLoading={isLoadingReports}
              error={reportsError}
              onSelect={selectReport}
              onClear={clearSelection}
            />

            {/* ── STEP 2: FORM (only shown after selection) ─────────────────── */}
            {selectedReport && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center text-[10px] font-bold border border-emerald-500 bg-emerald-500/10 text-emerald-400">
                    2
                  </div>
                  <span className="text-xs uppercase tracking-widest text-neutral-400">
                    Rate &amp; review the report
                  </span>
                </div>

                {/* Report quality ratings */}
                <div className="border border-neutral-800 bg-neutral-950/50 p-6">
                  <SectionHeader label="Report Quality Ratings" />
                  <div className="space-y-0.5">
                    <StarRating field="overall_rating"     label="Overall Quality *"    value={form.overall_rating}     onChange={setRating} />
                    <StarRating field="diagnosis_accuracy" label="Diagnosis Accuracy"   value={form.diagnosis_accuracy} onChange={setRating} />
                    <StarRating field="tool_relevance"     label="Tool Relevance"       value={form.tool_relevance}     onChange={setRating} />
                    <StarRating field="roi_accuracy"       label="ROI Accuracy"         value={form.roi_accuracy}       onChange={setRating} />
                    <StarRating field="report_clarity"     label="Report Clarity"       value={form.report_clarity}     onChange={setRating} />
                  </div>
                </div>

                {/* Tool decisions */}
                <div className="border border-neutral-800 bg-neutral-950/50 p-6 space-y-6">
                  <SectionHeader label="Tool Decisions" />

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
                      Tools you are planning to use
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {toolList.map(tool => (
                        <ToggleChip
                          key={tool} label={tool} variant="chosen"
                          active={form.tools_chosen.includes(tool)}
                          onClick={() => toggleToolChosen(tool)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
                      Tools you rejected
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {toolList.map(tool => (
                        <ToggleChip
                          key={tool} label={tool} variant="rejected"
                          active={form.tools_rejected.includes(tool)}
                          onClick={() => toggleToolRejected(tool)}
                        />
                      ))}
                    </div>
                  </div>

                  {form.tools_rejected.length > 0 && (
                    <Textarea
                      label="Why did you reject those tools?"
                      value={form.tools_rejected_reason}
                      onChange={v => setField('tools_rejected_reason', v)}
                      placeholder="Budget constraints, poor fit, vendor issues..."
                    />
                  )}

                  <Textarea
                    label="Tools we should have recommended (but didn't)"
                    value={form.missing_tools}
                    onChange={v => setField('missing_tools', v)}
                    placeholder="Tool names or categories we missed..."
                    rows={2}
                  />
                </div>

                {/* Implementation */}
                <div className="border border-neutral-800 bg-neutral-950/50 p-6 space-y-5">
                  <SectionHeader label="Implementation Status" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
                      Have you started implementing a solution?
                    </p>
                    <div className="flex gap-3">
                      {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map(opt => (
                        <button
                          key={String(opt.value)} type="button"
                          onClick={() => setField('implemented', opt.value)}
                          className={`px-5 py-2 text-xs uppercase tracking-widest border transition-all
                            ${form.implemented === opt.value
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                              : 'border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'
                            }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {form.implemented !== null && (
                    <>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
                          Implementation stage
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(['planning', 'in-progress', 'completed', 'abandoned'] as ImplementationStage[]).map(stage => (
                            <button
                              key={stage} type="button"
                              onClick={() => setField('implementation_stage', stage)}
                              className={`px-3 py-1.5 text-[10px] uppercase tracking-wider border transition-all
                                ${form.implementation_stage === stage
                                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                                  : 'border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'
                                }`}
                            >
                              {stage}
                            </button>
                          ))}
                        </div>
                      </div>
                      <Textarea
                        label="What's blocking implementation? (optional)"
                        value={form.implementation_blocker}
                        onChange={v => setField('implementation_blocker', v)}
                        placeholder="Budget approval, data readiness, vendor delays..."
                        rows={2}
                      />
                    </>
                  )}
                </div>

                {/* ROI tracking */}
                <div className="border border-neutral-800 bg-neutral-950/50 p-6 space-y-5">
                  <SectionHeader label="ROI Tracking" />
                  <p className="text-[10px] text-neutral-600 -mt-2">
                    Fill this later once you have real numbers.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <TextInput
                      label="Actual ROI achieved (USD)" type="number"
                      value={form.roi_achieved}
                      onChange={v => setField('roi_achieved', v)}
                      placeholder="e.g. 250000"
                    />
                    <TextInput
                      label="Months to see ROI" type="number"
                      value={form.roi_timeframe_months}
                      onChange={v => setField('roi_timeframe_months', v)}
                      placeholder="e.g. 8"
                    />
                  </div>
                  <TextInput
                    label="Where did main cost savings come from?"
                    value={form.cost_savings_area}
                    onChange={v => setField('cost_savings_area', v)}
                    placeholder="e.g. Scrap reduction, predictive maintenance..."
                  />
                </div>

                {/* Qualitative */}
                <div className="border border-neutral-800 bg-neutral-950/50 p-6 space-y-5">
                  <SectionHeader label="Qualitative Feedback" />
                  <Textarea
                    label="What was inaccurate or unhelpful?"
                    value={form.what_was_wrong}
                    onChange={v => setField('what_was_wrong', v)}
                    placeholder="ROI felt generic, tools didn't fit our chemistry..."
                  />
                  <Textarea
                    label="What was most accurate or useful?"
                    value={form.what_was_right}
                    onChange={v => setField('what_was_right', v)}
                    placeholder="Tool shortlist was spot-on, root cause matched exactly..."
                  />
                  <Textarea
                    label="Battery domain knowledge that was missing"
                    value={form.industry_context_missing}
                    onChange={v => setField('industry_context_missing', v)}
                    placeholder="India-specific market context, solid-state nuances..."
                    rows={2}
                  />
                  <Textarea
                    label="Additional comments"
                    value={form.additional_comments}
                    onChange={v => setField('additional_comments', v)}
                    placeholder="Anything else you'd like to share..."
                    rows={2}
                  />
                </div>

                {/* NPS */}
                <div className="border border-neutral-800 bg-neutral-950/50 p-6">
                  <SectionHeader label="Net Promoter" />
                  <p className="text-xs text-neutral-400 mb-4">
                    Would you recommend this tool to a colleague in the battery industry?
                  </p>
                  <div className="flex gap-3">
                    {[
                      { label: '👍  Yes, definitely', value: true  },
                      { label: '👎  Not yet',         value: false },
                    ].map(opt => (
                      <button
                        key={String(opt.value)} type="button"
                        onClick={() => setField('would_recommend', opt.value)}
                        className={`px-5 py-2.5 text-xs uppercase tracking-widest border transition-all
                          ${form.would_recommend === opt.value
                            ? opt.value
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                              : 'border-red-500/60 bg-red-500/10 text-red-300'
                            : 'border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error */}
                {submitError && (
                  <div className="border border-red-500/40 bg-red-500/5 px-5 py-4 text-xs text-red-400 font-mono flex gap-3 items-start">
                    <span className="text-red-500 mt-0.5">⚠</span>
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={submitFeedback}
                    disabled={isSubmitting}
                    className="flex-1 border border-emerald-500/50 bg-emerald-500/10 text-emerald-400
                      text-xs uppercase tracking-widest py-4 hover:bg-emerald-500/20 hover:border-emerald-400
                      transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                        Transmitting...
                      </>
                    ) : '→ Submit Feedback'}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="border border-neutral-800 px-6 py-4 text-xs uppercase tracking-widest
                      text-neutral-500 hover:text-white hover:border-neutral-600 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

          </div>
        )}

        {/* FOOTER */}
        <div className="border-t border-neutral-900 pt-6 flex justify-between items-center text-[10px] text-neutral-700 uppercase tracking-widest">
          <span>AI Consultant.io // Feedback Module</span>
          <span>Phase 3 Training Data Collection</span>
        </div>

      </div>
    </div>
  );
}