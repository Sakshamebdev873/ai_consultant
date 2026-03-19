'use client';

import Link from 'next/link';
import { useReportForm } from '../../hooks/useReportForm';

// ─── Reusable field primitives ────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[10px] text-red-400 uppercase tracking-wider mt-1.5 flex items-center gap-1">
      <span>⚠</span> {message}
    </p>
  );
}

function SectionDivider({ num, title, sub }: { num: string; title: string; sub?: string }) {
  return (
    <div className="col-span-full flex items-end justify-between border-b border-neutral-800 pb-3 mt-6 mb-1">
      <div>
        <span className="text-[10px] text-neutral-600 tracking-widest uppercase">{num} //</span>
        <span className="text-xs text-neutral-400 uppercase tracking-widest ml-2">{title}</span>
      </div>
      {sub && <span className="text-[10px] text-neutral-700 uppercase tracking-widest">{sub}</span>}
    </div>
  );
}

function Field({
  label, name, value, onChange, error, optional, colSpan, hint,
  children,
}: {
  label: string; name: string; value?: string; onChange?: React.ChangeEventHandler<never>;
  error?: string; optional?: boolean; colSpan?: boolean; hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-1.5 ${colSpan ? 'col-span-full' : ''}`}
      data-error={!!error}
    >
      <label className="text-[10px] uppercase tracking-wider text-neutral-500 flex items-center gap-2">
        {label}
        {optional
          ? <span className="text-neutral-800 normal-case tracking-normal not-uppercase">opt.</span>
          : <span className="text-red-600">*</span>
        }
      </label>
      {children}
      {hint && !error && <p className="text-[10px] text-neutral-700">{hint}</p>}
      <FieldError message={error} />
    </div>
  );
}

const inputCls = (error?: string) =>
  `w-full bg-black border p-3 text-sm focus:outline-none transition-all font-mono
  placeholder-neutral-800 text-neutral-200
  ${error ? 'border-red-500/50 focus:border-red-400' : 'border-neutral-800 focus:border-neutral-500 hover:border-neutral-700'}`;

const selectCls =
  `w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none
  focus:border-neutral-500 hover:border-neutral-700 transition-all
  font-mono text-neutral-300 appearance-none cursor-pointer`;

// ─── Select option sets ───────────────────────────────────────────────────────

const COMPANY_SIZE   = ['', 'startup', 'mid-size', 'enterprise'];
const CHEMISTRY      = ['', 'Li-ion', 'LFP', 'NMC', 'NCA', 'solid-state', 'lead-acid'];
const APPLICATION    = ['', 'EV', 'grid storage', 'consumer electronics', 'industrial', 'R&D'];
const BUDGET         = ['', 'low (<$50K)', 'medium ($50K-$500K)', 'high ($500K+)'];
const DATA_AVAIL     = ['', 'none', 'partial', 'full'];

function Opt({ v }: { v: string }) {
  return <option value={v}>{v || '— Select —'}</option>;
}

// ─── Agent loading overlay ────────────────────────────────────────────────────

const AGENT_META = [
  { id: 'intake_agent',    label: 'INTAKE AGENT',    desc: 'Extracting domain & profile...'    },
  { id: 'diagnosis_agent', label: 'DIAGNOSIS AGENT', desc: 'Identifying root causes...'        },
  { id: 'solution_agent',  label: 'SOLUTION AGENT',  desc: 'Matching knowledge base tools...'  },
  { id: 'roi_agent',       label: 'ROI AGENT',       desc: 'Calculating ROI & roadmap...'      },
];

function LoadingOverlay({ activeAgent }: { activeAgent: number }) {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-10 font-mono">
      {/* Pulsing grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="relative z-10 text-center space-y-2">
        <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">
          [ PIPELINE EXECUTING ]
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">
          PROCESSING REQUEST
        </h2>
      </div>

      {/* Agent pipeline */}
      <div className="relative z-10 w-full max-w-sm space-y-3 px-8">
        {AGENT_META.map((agent, i) => {
          const isDone    = i < activeAgent;
          const isRunning = i === activeAgent;
          return (
            <div
              key={agent.id}
              className={`border p-4 transition-all duration-500 flex items-center gap-4
                ${isDone    ? 'border-emerald-500/40 bg-emerald-500/5'   : ''}
                ${isRunning ? 'border-white/30 bg-white/5'               : ''}
                ${!isDone && !isRunning ? 'border-neutral-900 opacity-40' : ''}`}
            >
              {/* Status dot */}
              <div className={`w-2 h-2 rounded-full flex-shrink-0
                ${isDone    ? 'bg-emerald-500'                            : ''}
                ${isRunning ? 'bg-white animate-pulse'                    : ''}
                ${!isDone && !isRunning ? 'bg-neutral-800'               : ''}`}
              />
              <div className="flex-1 min-w-0">
                <div className={`text-[10px] uppercase tracking-widest font-bold
                  ${isDone ? 'text-emerald-400' : isRunning ? 'text-white' : 'text-neutral-700'}`}>
                  {agent.label}
                </div>
                {isRunning && (
                  <div className="text-[10px] text-neutral-500 mt-0.5 truncate">{agent.desc}</div>
                )}
              </div>
              {isDone    && <span className="text-emerald-500 text-xs flex-shrink-0">✓</span>}
              {isRunning && (
                <span className="inline-block w-3 h-3 border border-white border-t-transparent rounded-full animate-spin flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      <div className="relative z-10 text-[10px] text-neutral-700 uppercase tracking-widest animate-pulse">
        This may take 15–30 seconds
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportPage() {
  const {
    values, fieldErrors, globalError,
    isLoading, activeAgent,
    handleChange, handleSubmit,
  } = useReportForm();

  const charCount = values.problem_text.length;

  return (
    <>
      {isLoading && <LoadingOverlay activeAgent={activeAgent} />}

      <div className="min-h-screen bg-black text-white font-mono">

        {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-40 border-b border-neutral-900 bg-black/90 backdrop-blur px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
              ← Dashboard
            </Link>
            <span className="text-neutral-800">|</span>
            <span className="text-xs uppercase tracking-widest text-neutral-600">
              New Analysis
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-neutral-600 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse" />
            4-AGENT PIPELINE READY
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">

          {/* ── PAGE HEADER ────────────────────────────────────────────────── */}
          <div className="mb-12 border-b border-neutral-800 pb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-3">
              [ INTELLIGENCE_REQUEST ]
            </p>
            <h1 className="text-5xl font-bold tracking-tight leading-none mb-4">
              DESCRIBE YOUR<br />
              <span className="text-neutral-600">PROBLEM.</span>
            </h1>
            <p className="text-sm text-neutral-500 max-w-lg leading-relaxed">
              Our 4-agent pipeline will analyse your problem, match enterprise tools,
              and generate ROI estimates. The more context you provide, the more
              precise the recommendations.
            </p>

            {/* Pipeline badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {['01 Intake', '02 Diagnosis', '03 Solution', '04 ROI'].map(a => (
                <span key={a}
                  className="text-[10px] uppercase tracking-widest border border-neutral-800
                    px-2 py-1 text-neutral-600">
                  {a}
                </span>
              ))}
              <span className="text-[10px] uppercase tracking-widest border border-emerald-500/30
                px-2 py-1 text-emerald-600 bg-emerald-500/5">
                → REPORT
              </span>
            </div>
          </div>

          {/* ── GLOBAL ERROR ───────────────────────────────────────────────── */}
          {globalError && (
            <div className="mb-8 border border-red-500/30 bg-red-500/5 p-4 text-xs text-red-400 uppercase tracking-wider">
              ⚠ {globalError}
            </div>
          )}

          {/* ── FORM ───────────────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

            {/* ── 01 Core Problem ──────────────────────────────────────────── */}
            <SectionDivider num="01" title="Core Problem" sub="Required" />

            <Field label="Problem Description" name="problem_text"
              error={fieldErrors.problem_text} colSpan
              hint="Describe the specific challenge, pain point, or inefficiency you face.">
              <div className="relative">
                <textarea
                  name="problem_text"
                  value={values.problem_text}
                  onChange={handleChange}
                  rows={6}
                  placeholder="e.g. Our electrode coating scrap rate is 4.2%, above industry average of 2%. Manual inspection misses micro-defects causing costly rework..."
                  className={`${inputCls(fieldErrors.problem_text)} resize-none leading-relaxed`}
                />
                <div className={`absolute bottom-3 right-3 text-[10px] font-mono
                  ${charCount > 4800 ? 'text-red-500' : 'text-neutral-700'}`}>
                  {charCount}/5000
                </div>
              </div>
            </Field>

            <Field label="Primary Goal" name="primary_goal"
              optional error={fieldErrors.primary_goal} colSpan
              hint="The #1 outcome you want from AI — e.g. 'reduce scrap rate'">
              <input name="primary_goal" type="text" value={values.primary_goal}
                onChange={handleChange} placeholder="e.g. Reduce defect rate below 1%"
                className={inputCls(fieldErrors.primary_goal)} />
            </Field>

            {/* ── 02 Company Context ───────────────────────────────────────── */}
            <SectionDivider num="02" title="Company Context" sub="Optional — improves accuracy" />

            <Field label="Company Name" name="company_name" optional error={fieldErrors.company_name}>
              <input name="company_name" type="text" value={values.company_name}
                onChange={handleChange} placeholder="C4V BATTERIES"
                className={inputCls(fieldErrors.company_name)} />
            </Field>

            <Field label="Country" name="country" optional error={fieldErrors.country}>
              <input name="country" type="text" value={values.country}
                onChange={handleChange} placeholder="India"
                className={inputCls(fieldErrors.country)} />
            </Field>

            <Field label="Company Size" name="company_size" optional>
              <select name="company_size" value={values.company_size} onChange={handleChange} className={selectCls}>
                {COMPANY_SIZE.map(v => <Opt key={v} v={v} />)}
              </select>
            </Field>

            <Field label="Years in Industry" name="years_in_industry" optional error={fieldErrors.years_in_industry}>
              <input name="years_in_industry" type="number" min={0} max={50}
                value={values.years_in_industry} onChange={handleChange}
                placeholder="5" className={inputCls(fieldErrors.years_in_industry)} />
            </Field>

            {/* ── 03 Battery Specifics ─────────────────────────────────────── */}
            <SectionDivider num="03" title="Battery Specifics" sub="Optional — improves tool matching" />

            <Field label="Battery Chemistry" name="battery_chemistry" optional>
              <select name="battery_chemistry" value={values.battery_chemistry} onChange={handleChange} className={selectCls}>
                {CHEMISTRY.map(v => <Opt key={v} v={v} />)}
              </select>
            </Field>

            <Field label="Battery Application" name="battery_application" optional>
              <select name="battery_application" value={values.battery_application} onChange={handleChange} className={selectCls}>
                {APPLICATION.map(v => <Opt key={v} v={v} />)}
              </select>
            </Field>

            <Field label="Annual Production (GWh)" name="annual_production_gwh"
              optional error={fieldErrors.annual_production_gwh}
              hint="Leave blank if not applicable">
              <input name="annual_production_gwh" type="number" min={0} step="0.1"
                value={values.annual_production_gwh} onChange={handleChange}
                placeholder="2.0" className={inputCls(fieldErrors.annual_production_gwh)} />
            </Field>

            <Field label="Current Tools in Use" name="current_tools_in_use" optional>
              <input name="current_tools_in_use" type="text" value={values.current_tools_in_use}
                onChange={handleChange}
                placeholder="e.g. Manual inspection, Excel, SAP"
                className={inputCls()} />
            </Field>

            {/* ── 04 Implementation Context ────────────────────────────────── */}
            <SectionDivider num="04" title="Implementation Context" sub="Optional — improves ROI calculation" />

            <Field label="Budget Range" name="budget_range" optional>
              <select name="budget_range" value={values.budget_range} onChange={handleChange} className={selectCls}>
                {BUDGET.map(v => <Opt key={v} v={v} />)}
              </select>
            </Field>

            <Field label="Data Availability" name="data_availability" optional>
              <select name="data_availability" value={values.data_availability} onChange={handleChange} className={selectCls}>
                {DATA_AVAIL.map(v => <Opt key={v} v={v} />)}
              </select>
            </Field>

            <Field label="Timeline (months)" name="timeline_months"
              optional error={fieldErrors.timeline_months}
              hint="How many months available for implementation?">
              <input name="timeline_months" type="number" min={1}
                value={values.timeline_months} onChange={handleChange}
                placeholder="6" className={inputCls(fieldErrors.timeline_months)} />
            </Field>

            {/* ── Submit ───────────────────────────────────────────────────── */}
            <div className="col-span-full mt-8 border-t border-neutral-900 pt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black py-5 font-bold uppercase tracking-[0.2em]
                  text-sm hover:bg-neutral-200 transition-colors
                  flex items-center justify-between px-8
                  disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span>Run Intelligence Pipeline</span>
                <span className="flex items-center gap-3">
                  <span className="text-[10px] font-normal text-neutral-600 normal-case tracking-normal">
                    4 agents · ~20s
                  </span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>

              <p className="text-center mt-4 text-[10px] text-neutral-700 uppercase tracking-widest">
                Anonymous submissions supported — log in to save reports to your profile
              </p>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}