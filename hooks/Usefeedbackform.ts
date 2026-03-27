'use client';

import { useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ImplementationStage =
  | 'planning'
  | 'in-progress'
  | 'completed'
  | 'abandoned'
  | '';

export interface ReportSummary {
  id: string;
  session_id: string;
  problem_domain: string;
  battery_type: string;
  confidence_score: number;
  roi_min: number;
  roi_max: number;
  roi_metric: string;
  tools_recommended: string[];
  executive_summary: string;
  created_at: string;
}

export interface FeedbackFormState {
  session_id: string;
  overall_rating: number;
  diagnosis_accuracy: number;
  tool_relevance: number;
  roi_accuracy: number;
  report_clarity: number;
  tools_chosen: string[];
  tools_rejected: string[];
  tools_rejected_reason: string;
  missing_tools: string;
  implemented: boolean | null;
  implementation_stage: ImplementationStage;
  implementation_blocker: string;
  roi_achieved: string;
  roi_timeframe_months: string;
  cost_savings_area: string;
  what_was_wrong: string;
  what_was_right: string;
  industry_context_missing: string;
  would_recommend: boolean | null;
  additional_comments: string;
}

export interface FeedbackResponse {
  status: string;
  message: string;
  session_id: string;
  feedback_id: string;
  next_steps: string[];
}

export type RatingField =
  | 'overall_rating'
  | 'diagnosis_accuracy'
  | 'tool_relevance'
  | 'roi_accuracy'
  | 'report_clarity';

// ─── Constants ────────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
}

function defaultForm(sessionId = ''): FeedbackFormState {
  return {
    session_id: sessionId,
    overall_rating: 0,
    diagnosis_accuracy: 0,
    tool_relevance: 0,
    roi_accuracy: 0,
    report_clarity: 0,
    tools_chosen: [],
    tools_rejected: [],
    tools_rejected_reason: '',
    missing_tools: '',
    implemented: null,
    implementation_stage: '',
    implementation_blocker: '',
    roi_achieved: '',
    roi_timeframe_months: '',
    cost_savings_area: '',
    what_was_wrong: '',
    what_was_right: '',
    industry_context_missing: '',
    would_recommend: null,
    additional_comments: '',
  };
}

function validate(form: FeedbackFormState): string | null {
  if (!form.session_id.trim()) return 'Please select a report to review.';
  if (form.overall_rating < 1 || form.overall_rating > 5)
    return 'Overall rating (1–5) is required.';
  return null;
}
// Add this fetcher
async function fetchToolNames(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/tools/`);
  if (!res.ok) return [];
  return res.json();
}
// ─── API: fetch all user reports ──────────────────────────────────────────────

async function fetchUserReports(): Promise<ReportSummary[]> {
  const token = getToken();
  const url = new URL(`${API_BASE}/reports/`);
  url.searchParams.set('limit', '50');
  url.searchParams.set('offset', '0');

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error('Please log in to view your reports.');
    throw new Error('Failed to load reports. Please try again.');
  }

  const data = await res.json();

  // Handle both { reports: [...] } and plain array shapes
  return Array.isArray(data) ? data : (data.reports ?? []);
}

// ─── API: submit feedback ─────────────────────────────────────────────────────

async function postFeedback(form: FeedbackFormState): Promise<FeedbackResponse> {
  const payload: Record<string, unknown> = {
    session_id: form.session_id,
    overall_rating: form.overall_rating,
  };

  if (form.diagnosis_accuracy > 0) payload.diagnosis_accuracy = form.diagnosis_accuracy;
  if (form.tool_relevance > 0)     payload.tool_relevance     = form.tool_relevance;
  if (form.roi_accuracy > 0)       payload.roi_accuracy       = form.roi_accuracy;
  if (form.report_clarity > 0)     payload.report_clarity     = form.report_clarity;

  if (form.tools_chosen.length)          payload.tools_chosen          = form.tools_chosen;
  if (form.tools_rejected.length)        payload.tools_rejected        = form.tools_rejected;
  if (form.tools_rejected_reason.trim()) payload.tools_rejected_reason = form.tools_rejected_reason.trim();
  if (form.missing_tools.trim())         payload.missing_tools         = form.missing_tools.trim();

  if (form.implemented !== null)          payload.implemented            = form.implemented;
  if (form.implementation_stage)          payload.implementation_stage   = form.implementation_stage;
  if (form.implementation_blocker.trim()) payload.implementation_blocker = form.implementation_blocker.trim();

  if (form.roi_achieved.trim())
    payload.roi_achieved = parseFloat(form.roi_achieved);
  if (form.roi_timeframe_months.trim())
    payload.roi_timeframe_months = parseInt(form.roi_timeframe_months, 10);
  if (form.cost_savings_area.trim())
    payload.cost_savings_area = form.cost_savings_area.trim();

  if (form.what_was_wrong.trim())           payload.what_was_wrong           = form.what_was_wrong.trim();
  if (form.what_was_right.trim())           payload.what_was_right           = form.what_was_right.trim();
  if (form.industry_context_missing.trim()) payload.industry_context_missing = form.industry_context_missing.trim();
  if (form.would_recommend !== null)        payload.would_recommend          = form.would_recommend;
  if (form.additional_comments.trim())      payload.additional_comments      = form.additional_comments.trim();

  const token = getToken();
  const res = await fetch(`${API_BASE}/feedback/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: string }).detail ?? `Server error ${res.status}`
    );
  }

  return res.json() as Promise<FeedbackResponse>;
}

// ─── Hook return type ─────────────────────────────────────────────────────────

export interface UseFeedbackFormReturn {
  // Report picker
  reports: ReportSummary[];
  selectedReport: ReportSummary | null;
  isLoadingReports: boolean;
  reportsError: string | null;
  selectReport: (report: ReportSummary) => void;
  clearSelection: () => void;

  // Form
  form: FeedbackFormState;
  isSubmitting: boolean;
  isSuccess: boolean;
  submitError: string | null;
  response: FeedbackResponse | null;
  setField: <K extends keyof FeedbackFormState>(key: K, value: FeedbackFormState[K]) => void;
  setRating: (field: RatingField, value: number) => void;
  toggleToolChosen: (tool: string) => void;
  toggleToolRejected: (tool: string) => void;
  submitFeedback: () => Promise<void>;
  reset: () => void;
  toolNames : string[] | []
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useFeedbackForm(): UseFeedbackFormReturn {
  // Report list
  const [reports, setReports]                   = useState<ReportSummary[]>([]);
  const [selectedReport, setSelectedReport]     = useState<ReportSummary | null>(null);
  const [isLoadingReports, setLoadingReports]   = useState(true);
  const [reportsError, setReportsError]         = useState<string | null>(null);

  // Form
  const [form, setForm]               = useState<FeedbackFormState>(defaultForm());
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess]       = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [response, setResponse]       = useState<FeedbackResponse | null>(null);
const [toolNames, setToolNames] = useState<string[]>([]);
  // ── Fetch reports on mount ─────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setLoadingReports(true);
    setReportsError(null);

    fetchUserReports()
      .then(data => {
        if (cancelled) return;
        setReports(data);

        // Auto-select if coming from /report/result via sessionStorage
        try {
          const stored = sessionStorage.getItem('report_result');
          if (stored) {
            const result = JSON.parse(stored);
            const match = data.find(r => r.session_id === result.session_id);
            if (match) {
              setSelectedReport(match);
              setForm(defaultForm(match.session_id));
            }
          }
          fetchToolNames().then(setToolNames);
        } catch { /* ignore corrupted storage */ }
      })
      .catch(err => { if (!cancelled) setReportsError(err.message); })
      .finally(() => { if (!cancelled) setLoadingReports(false); });

    return () => { cancelled = true; };
  }, []);

  // ── Report selection ───────────────────────────────────────────────────────
  function selectReport(report: ReportSummary) {
    setSelectedReport(report);
    setForm(prev => ({ ...prev, session_id: report.session_id }));
    setSubmitError(null);
  }

  function clearSelection() {
    setSelectedReport(null);
    setForm(prev => ({ ...prev, session_id: '' }));
  }

  // ── Field helpers ──────────────────────────────────────────────────────────
  function setField<K extends keyof FeedbackFormState>(key: K, value: FeedbackFormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function setRating(field: RatingField, value: number) {
    setForm(prev => ({ ...prev, [field]: prev[field] === value ? 0 : value }));
  }

  function toggleToolChosen(tool: string) {
    setForm(prev => ({
      ...prev,
      tools_chosen: prev.tools_chosen.includes(tool)
        ? prev.tools_chosen.filter(t => t !== tool)
        : [...prev.tools_chosen, tool],
    }));
  }

  function toggleToolRejected(tool: string) {
    setForm(prev => ({
      ...prev,
      tools_rejected: prev.tools_rejected.includes(tool)
        ? prev.tools_rejected.filter(t => t !== tool)
        : [...prev.tools_rejected, tool],
    }));
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function submitFeedback() {
    setSubmitError(null);
    const err = validate(form);
    if (err) { setSubmitError(err); return; }

    setSubmitting(true);
    try {
      const data = await postFeedback(form);
      setResponse(data);
      setSuccess(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Unexpected error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  // ── Reset ──────────────────────────────────────────────────────────────────
  function reset() {
    setSelectedReport(null);
    setForm(defaultForm());
    setSuccess(false);
    setSubmitError(null);
    setResponse(null);
  }

  return {
    reports, selectedReport, isLoadingReports, reportsError,
    selectReport, clearSelection,
    form, isSubmitting, isSuccess, submitError, response,
    setField, setRating, toggleToolChosen, toggleToolRejected,
    submitFeedback, reset,toolNames
  };
}