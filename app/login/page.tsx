'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLoginForm } from '../../hooks/useLoginForm';

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[10px] text-red-400 uppercase tracking-wider mt-2">
      ⚠ {message}
    </p>
  );
}

// Underline-style input matching the existing design
function UnderlineInput({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  isFocused,
  onFocus,
  onBlur,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <div className="group relative">
      <label
        className={`absolute left-0 -top-3 text-[10px] uppercase tracking-wider transition-colors duration-200
          ${isFocused ? 'text-white' : error ? 'text-red-400' : 'text-neutral-500'}`}
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={type === 'password' ? 'current-password' : 'email'}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`w-full bg-transparent border-b py-3 text-lg focus:outline-none transition-colors
          text-neutral-300 placeholder-neutral-800 rounded-none
          ${error
            ? 'border-red-500/60'
            : isFocused
              ? 'border-white'
              : 'border-neutral-800'
          }`}
      />

      {/* Animated white underline sweep */}
      <div
        className={`h-[1px] bg-white absolute bottom-0 left-0 transition-all duration-300
          ${isFocused ? 'w-full' : 'w-0'}`}
      />

      <FieldError message={error} />
    </div>
  );
}

// ─── Static data ──────────────────────────────────────────────────────────────

const METRICS = [
  { label: 'Risk Governance', value: 'SECURE', color: '' },
  { label: 'Latency',         value: '14ms',   color: 'font-mono' },
  { label: 'ROI Match',       value: '99.8%',  color: 'text-emerald-400' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [bootSequence, setBootSequence] = useState(false);

  const {
    values,
    fieldErrors,
    globalError,
    isLoading,
    isSuccess,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  useEffect(() => {
    setBootSequence(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono flex overflow-hidden selection:bg-white selection:text-black">

      {/* ── LEFT PANEL ─────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-[60%] border-r border-neutral-800 relative p-12">

        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10">
          <h1 className="text-xl font-bold tracking-widest uppercase mb-2">AI Consultant.io</h1>
          <div className="flex items-center gap-2 text-[10px] text-neutral-500">
            <div className="w-2 h-2 bg-emerald-500 animate-pulse" />
            <span>SYSTEM STATUS: NOMINAL</span>
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 space-y-2">
          <h2 className="text-6xl font-bold tracking-tighter leading-none opacity-90">
            STOP GUESSING.
            <br />
            <span className="text-neutral-600">START ARCHITECTING.</span>
          </h2>
          <p className="text-sm text-neutral-400 max-w-md mt-6 border-l border-neutral-700 pl-4 py-1">
            The world's first autonomous platform for AI procurement.
            We turn the AI market into a verifiable science.
          </p>
        </div>

        {/* Footer metrics */}
        <div className="relative z-10 grid grid-cols-3 gap-8 border-t border-neutral-800 pt-8">
          {METRICS.map(({ label, value, color }) => (
            <div key={label}>
              <div className="text-[10px] text-neutral-500 uppercase mb-1">{label}</div>
              <div className={`text-xl font-bold ${color}`}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────────────────────────── */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center p-8 lg:p-20 relative bg-neutral-950">

        {/* Mobile logo */}
        <div className="lg:hidden absolute top-8 left-8">
          <h1 className="text-lg font-bold tracking-widest uppercase">AI Consultant.io</h1>
        </div>

        <div className={`transition-opacity duration-1000 ${bootSequence ? 'opacity-100' : 'opacity-0'}`}>

          {/* Heading */}
          <div className="mb-12">
            <div className="text-xs text-neutral-500 mb-2 uppercase tracking-widest">
              [ AUTHENTICATION_PROTOCOL ]
            </div>
            <h2 className="text-3xl font-bold text-white">Initialize Session</h2>
          </div>

          {/* Global / server error */}
          {globalError && (
            <div className="mb-8 border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400 uppercase tracking-wider">
              ⚠ {globalError}
            </div>
          )}

          {/* Success banner */}
          {isSuccess && (
            <div className="mb-8 border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400 uppercase tracking-wider">
              ✓ SESSION AUTHENTICATED — LOADING TERMINAL...
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-10">

            {/* Email */}
            <UnderlineInput
              label="Enter Command (Email)"
              name="email"
              type="email"
              placeholder="user@enterprise.com"
              value={values.email}
              onChange={handleChange}
              error={fieldErrors.email}
              isFocused={focusedField === 'email'}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />

            {/* Password */}
            <div>
              <UnderlineInput
                label="Passkey"
                name="password"
                type="password"
                placeholder="••••••••••••"
                value={values.password}
                onChange={handleChange}
                error={fieldErrors.password}
                isFocused={focusedField === 'password'}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />
              <div className="mt-3 text-right">
                <Link
                  href="#"
                  className="text-[10px] text-neutral-500 hover:text-white transition-colors uppercase tracking-wider"
                >
                  Reset_Key?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full group relative bg-white text-black h-14 font-bold uppercase
                tracking-widest overflow-hidden hover:bg-neutral-200 transition-colors
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                {isLoading ? (
                  <>
                    <span>AUTHENTICATING</span>
                    <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  </>
                ) : isSuccess ? (
                  <>
                    <span>ACCESS GRANTED</span>
                    <span>✓</span>
                  </>
                ) : (
                  <>
                    <span>Decrypt & Enter</span>
                    <span className="text-xl">→</span>
                  </>
                )}
              </div>
            </button>

          </form>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-neutral-900 flex justify-between items-center text-xs text-neutral-500">
            <span>ID: UNREGISTERED</span>
            <Link
              href="/register"
              className="text-white hover:underline underline-offset-4 decoration-1"
            >
              DEPLOY IDENTITY →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}