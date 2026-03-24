'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { ReportFormValues, ReportFieldErrors, ReportResult } from '@/types/report';

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL_VALUES: ReportFormValues = {
  problem_text: '',
  company_name: '',
  company_size: '',
  annual_production_gwh: '',
  battery_chemistry: '',
  battery_application: '',
  current_tools_in_use: '',
  budget_range: '',
  country: '',
  years_in_industry: '',
  primary_goal: '',
  data_availability: '',
  timeline_months: '',
};

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(v: ReportFormValues): ReportFieldErrors {
  const errors: ReportFieldErrors = {};

  if (!v.problem_text.trim())
    errors.problem_text = 'Problem description is required';
  else if (v.problem_text.trim().length < 20)
    errors.problem_text = 'Please describe your problem in at least 20 characters';
  else if (v.problem_text.trim().length > 5000)
    errors.problem_text = 'Maximum 5000 characters';

  if (v.annual_production_gwh !== '') {
    const n = Number(v.annual_production_gwh);
    if (isNaN(n) || n < 0) errors.annual_production_gwh = 'Enter a valid number';
  }

  if (v.years_in_industry !== '') {
    const n = Number(v.years_in_industry);
    if (isNaN(n) || n < 0 || n > 50) errors.years_in_industry = 'Enter 0 – 50';
  }

  if (v.timeline_months !== '') {
    const n = Number(v.timeline_months);
    if (isNaN(n) || n < 1) errors.timeline_months = 'Enter a valid number of months';
  }

  return errors;
}

// ─── API helpers ──────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

/**
 * Re-fetch the current user from GET /auth/me and overwrite localStorage.
 */
async function refreshUser(): Promise<void> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (!token) return;

  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    const updatedUser = await res.json();
    localStorage.setItem('user', JSON.stringify(updatedUser));
  } catch {
    // Network error — silently ignore
  }
}

async function submitReport(v: ReportFormValues): Promise<ReportResult> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  // Note: if you updated your backend router prefix to `/reports`, this should be `${API_BASE}/reports/generate-report`
  const res = await fetch(`${API_BASE}/reports/generate-report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      problem_text:          v.problem_text.trim(),
      company_name:          v.company_name          || undefined,
      company_size:          v.company_size          || undefined,
      annual_production_gwh: v.annual_production_gwh  ? Number(v.annual_production_gwh)  : undefined,
      battery_chemistry:     v.battery_chemistry     || undefined,
      battery_application:   v.battery_application   || undefined,
      current_tools_in_use:  v.current_tools_in_use  || undefined,
      budget_range:          v.budget_range          || undefined,
      country:               v.country               || undefined,
      years_in_industry:     v.years_in_industry      ? Number(v.years_in_industry)      : undefined,
      primary_goal:          v.primary_goal          || undefined,
      data_availability:     v.data_availability      || undefined,
      timeline_months:       v.timeline_months        ? Number(v.timeline_months)        : undefined,
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const detail = data?.detail;
    throw new Error(
      typeof detail === 'string'
        ? detail
        : Array.isArray(detail)
          ? detail.map((d: { msg: string }) => d.msg).join(', ')
          : 'Failed to generate report. Please try again.',
    );
  }

  return data as ReportResult;
}

// ─── NEW: Fetch All Reports ───────────────────────────────────────────────────

export async function getAllReports(limit = 50, offset = 0): Promise<any> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  
  // Construct URL with pagination parameters
  const url = new URL(`${API_BASE}/reports/`);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('offset', offset.toString());

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch reports. Please ensure you are logged in.');
  }

  return await res.json();
}

// ─── NEW: Fetch Single Report by ID ───────────────────────────────────────────

export async function getReportById(reportId: string): Promise<any> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  const res = await fetch(`${API_BASE}/reports/${reportId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    if (res.status === 403) throw new Error('Access denied. You do not have permission to view this report.');
    if (res.status === 404) throw new Error('Report not found.');
    throw new Error('Failed to fetch report details.');
  }

  return await res.json();
}

// ─── State ────────────────────────────────────────────────────────────────────

interface FormState {
  values:      ReportFormValues;
  fieldErrors: ReportFieldErrors;
  globalError: string | null;
  isLoading:   boolean;
  activeAgent: number;
}

const AGENTS = ['intake_agent', 'diagnosis_agent', 'solution_agent', 'roi_agent'];

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useReportForm() {
  const router = useRouter();

  const [state, setState] = useState<FormState>({
    values:      INITIAL_VALUES,
    fieldErrors: {},
    globalError: null,
    isLoading:   false,
    activeAgent: 0,
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setState(prev => ({
        ...prev,
        values:      { ...prev.values,      [name]: value },
        fieldErrors: { ...prev.fieldErrors, [name]: undefined },
        globalError: null,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const errors = validate(state.values);
      if (Object.keys(errors).length > 0) {
        setState(prev => ({ ...prev, fieldErrors: errors }));
        const el = document.querySelector('[data-error="true"]');
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      setState(prev => ({ ...prev, isLoading: true, globalError: null, activeAgent: 0 }));

      // Animate agent pipeline while API runs
      let agentIndex = 0;
      const agentTimer = setInterval(() => {
        agentIndex = Math.min(agentIndex + 1, AGENTS.length - 1);
        setState(prev => ({ ...prev, activeAgent: agentIndex }));
      }, 4000);

      try {
        const result = await submitReport(state.values);
        clearInterval(agentTimer);

        // 1. Store result so /report/result can read it
        sessionStorage.setItem('report_result', JSON.stringify(result));

        // 2. Re-fetch /auth/me → update localStorage user → dashboard shows
        //    the incremented reports_generated without needing a re-login
        await refreshUser();

        router.push('/report/result');
      } catch (err) {
        clearInterval(agentTimer);
        setState(prev => ({
          ...prev,
          isLoading:   false,
          globalError: err instanceof Error ? err.message : 'Something went wrong.',
        }));
      }
    },
    [state.values, router],
  );

  return {
    values:      state.values,
    fieldErrors: state.fieldErrors,
    globalError: state.globalError,
    isLoading:   state.isLoading,
    activeAgent: state.activeAgent,
    agents:      AGENTS,
    handleChange,
    handleSubmit,
  };
}