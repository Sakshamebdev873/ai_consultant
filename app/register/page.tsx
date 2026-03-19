'use client';

import Link from 'next/link';
import { useRegisterForm } from '../../hooks/UseRegisterForm';

// ─── Reusable field components ────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[10px] text-red-400 uppercase tracking-wider mt-1">⚠ {message}</p>
  );
}

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="md:col-span-2 text-xs text-neutral-500 border-b border-neutral-900 pb-2 mt-2 mb-2 uppercase tracking-widest">
      {num} // {title}
    </div>
  );
}

function InputField({
  label, name, type = 'text', placeholder,
  value, onChange, error, colSpan, optional,
}: {
  label: string; name: string; type?: string; placeholder?: string;
  value: string; onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string; colSpan?: boolean; optional?: boolean;
}) {
  return (
    <div className={`space-y-2 ${colSpan ? 'md:col-span-2' : ''}`}>
      <label className="text-[10px] uppercase tracking-wider text-neutral-400 flex gap-2 items-center">
        {label}
        {optional && (
          <span className="text-neutral-700 normal-case tracking-normal font-normal">optional</span>
        )}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        autoComplete={type === 'password' ? 'new-password' : 'off'}
        placeholder={placeholder}
        className={`w-full bg-neutral-900/50 border p-4 text-sm focus:bg-black transition-all outline-none
          ${error ? 'border-red-500/60 focus:border-red-400' : 'border-neutral-800 focus:border-white'}`}
      />
      <FieldError message={error} />
    </div>
  );
}

function SelectField({
  label, name, value, onChange, options, optional,
}: {
  label: string; name: string; value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: { value: string; label: string }[];
  optional?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-wider text-neutral-400 flex gap-2 items-center">
        {label}
        {optional && (
          <span className="text-neutral-700 normal-case tracking-normal font-normal">optional</span>
        )}
      </label>
      <select
        name={name} value={value} onChange={onChange}
        className="w-full bg-neutral-900/50 border border-neutral-800 p-4 text-sm
          focus:border-white focus:bg-black transition-all outline-none
          appearance-none text-neutral-300 cursor-pointer"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ─── Static option data ───────────────────────────────────────────────────────

const COMPANY_SIZE_OPTIONS = [
  { value: '',           label: 'Select size' },
  { value: 'startup',    label: 'Startup  (< 50 employees)' },
  { value: 'mid-size',   label: 'Mid-size  (50 – 500)' },
  { value: 'enterprise', label: 'Enterprise  (500+)' },
];

const BATTERY_DOMAIN_OPTIONS = [
  { value: '',                  label: 'Select domain' },
  { value: 'manufacturing',     label: 'Manufacturing' },
  { value: 'ev_performance',    label: 'EV Performance' },
  { value: 'grid_storage',      label: 'Grid Storage' },
  { value: 'consumer_electronics', label: 'Consumer Electronics' },
  { value: 'industrial',        label: 'Industrial' },
  { value: 'r_and_d',           label: 'R&D' },
];

const LEFT_PANEL_FEATURES = ['REGULATORY MAPPING', 'WORKFLOW INTEGRATION', 'ROI FORECASTING'];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const {
    values, fieldErrors, globalError,
    isLoading, isSuccess, handleChange, handleSubmit,
  } = useRegisterForm();

  return (
    <div className="min-h-screen bg-black text-white font-mono flex overflow-hidden">

      {/* ── LEFT PANEL ─────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col w-[35%] border-r border-neutral-800 p-12 bg-neutral-950 relative">
        <div className="space-y-12 my-auto">
          <div>
            <h1 className="text-4xl font-bold mb-4">INTELLIGENCE<br />INTAKE</h1>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Generic AI fails in regulated industries. Our consultant applies
              specialized agents trained on the specific constraints of your sector.
            </p>
          </div>
          <ul className="space-y-4 text-xs tracking-widest text-neutral-400">
            {LEFT_PANEL_FEATURES.map(item => (
              <li key={item} className="flex items-center gap-4">
                <span className="w-1 h-1 bg-white" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Step indicator */}
          <div className="space-y-3">
            {['01 // Identity', '02 // Organisation', '03 // Domain', '04 // Security'].map((s, i) => (
              <div key={s} className="flex items-center gap-3 text-[10px] uppercase tracking-widest">
                <span className={`w-1.5 h-1.5 ${i === 0 ? 'bg-white' : 'bg-neutral-700'}`} />
                <span className={i === 0 ? 'text-white' : 'text-neutral-600'}>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-12 left-12 text-[10px] text-neutral-600 uppercase">
          V.4.0.2 // STABLE
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────────────────────────── */}
      <div className="w-full lg:w-[65%] flex flex-col p-8 lg:p-16 overflow-y-auto">
        <div className="max-w-2xl mx-auto w-full">

          {/* Header */}
          <div className="mb-10 flex justify-between items-end border-b border-neutral-800 pb-6">
            <h2 className="text-2xl font-bold">CONFIGURE PROFILE</h2>
            <span className="text-xs text-emerald-500 border border-emerald-500/30 px-2 py-1 bg-emerald-500/10">
              SECURE_CONNECTION
            </span>
          </div>

          {/* Global error */}
          {globalError && (
            <div className="mb-6 border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400 uppercase tracking-wider">
              ⚠ {globalError}
            </div>
          )}

          {/* Success */}
          {isSuccess && (
            <div className="mb-6 border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400 uppercase tracking-wider">
              ✓ PROFILE INITIALIZED — REDIRECTING TO LOGIN...
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">

            {/* ── 01 Identity ──────────────────────────────────────────────── */}
            <SectionLabel num="01" title="Identity" />

            <InputField label="First Name" name="firstName" placeholder="ALEX"
              value={values.firstName} onChange={handleChange} error={fieldErrors.firstName} />

            <InputField label="Last Name" name="lastName" placeholder="CHEN"
              value={values.lastName} onChange={handleChange} error={fieldErrors.lastName} />

            {/* ── 02 Organisation ──────────────────────────────────────────── */}
            <SectionLabel num="02" title="Organisation" />

            <InputField label="Work Email" name="email" type="email"
              placeholder="name@company.com" value={values.email}
              onChange={handleChange} error={fieldErrors.email} colSpan />

            <InputField label="Company Name" name="companyName" placeholder="C4V BATTERIES"
              value={values.companyName} onChange={handleChange}
              error={fieldErrors.companyName} optional />

            <SelectField label="Company Size" name="companySize"
              value={values.companySize} onChange={handleChange}
              options={COMPANY_SIZE_OPTIONS} optional />

            <InputField label="Country" name="country" placeholder="India"
              value={values.country} onChange={handleChange}
              error={fieldErrors.country} colSpan optional />

            {/* ── 03 Domain ────────────────────────────────────────────────── */}
            <SectionLabel num="03" title="Battery Domain" />

            <SelectField label="Primary Battery Domain" name="batteryDomain"
              value={values.batteryDomain} onChange={handleChange}
              options={BATTERY_DOMAIN_OPTIONS} optional />

            <InputField label="Years in Industry" name="yearsInIndustry"
              type="number" placeholder="5"
              value={values.yearsInIndustry} onChange={handleChange}
              error={fieldErrors.yearsInIndustry} optional />

            {/* ── 04 Security ──────────────────────────────────────────────── */}
            <SectionLabel num="04" title="Security" />

            <InputField label="Security Key" name="password" type="password"
              placeholder="min. 8 characters" value={values.password}
              onChange={handleChange} error={fieldErrors.password} colSpan />

            {/* ── Submit ───────────────────────────────────────────────────── */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest
                  hover:bg-neutral-200 transition-colors flex justify-between px-6 items-center
                  group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>
                  {isLoading ? 'INITIALIZING...' : isSuccess ? 'ACCESS GRANTED' : 'Initialize Sequence'}
                </span>
                <span className="group-hover:translate-x-2 transition-transform">
                  {isLoading
                    ? <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    : '→'}
                </span>
              </button>

              <p className="text-center mt-6 text-xs text-neutral-500">
                Already have a session ID?{' '}
                <Link href="/login" className="text-white underline">Access Terminal</Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}