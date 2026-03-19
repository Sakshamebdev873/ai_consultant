'use client';

import { useState, useEffect, useCallback } from 'react';
import type { RoadmapPhase, ReportResult } from '@/types/report';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PhaseProgress {
  phaseNumber: number;
  completedActivities: Set<number>;
  signedOff: boolean;
}

export type ActiveTab = 'timeline' | 'checklist' | 'budget';

// ─── Budget estimation per phase (heuristic) ─────────────────────────────────
// Real values would come from the API — this is a reasonable fallback

function estimatePhaseBudget(phase: RoadmapPhase, roiRange: string): {
  min: number; max: number; items: { label: string; cost: string }[];
} {
  const budgetMap: Record<number, { min: number; max: number; items: { label: string; cost: string }[] }> = {
    1: { min: 5000,  max: 15000,  items: [{ label: 'Data audit & readiness', cost: '$3k–$8k' },  { label: 'KPI definition workshop', cost: '$2k–$7k' }] },
    2: { min: 10000, max: 30000,  items: [{ label: 'Vendor setup & licensing', cost: '$6k–$18k' }, { label: 'Integration engineering', cost: '$4k–$12k' }] },
    3: { min: 8000,  max: 20000,  items: [{ label: 'Pilot deployment', cost: '$5k–$12k' },       { label: 'Staff training', cost: '$3k–$8k' }] },
    4: { min: 5000,  max: 12000,  items: [{ label: 'Full rollout & monitoring', cost: '$4k–$9k' }, { label: 'Documentation', cost: '$1k–$3k' }] },
  };
  return budgetMap[phase.phase_number] ?? { min: 5000, max: 15000, items: [{ label: 'Execution costs', cost: '$5k–$15k' }] };
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

const STORAGE_KEY = 'roadmap_progress';

function loadProgress(sessionId: string): Record<number, { completedActivities: number[]; signedOff: boolean }> {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${sessionId}`);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveProgress(
  sessionId: string,
  data: Record<number, { completedActivities: number[]; signedOff: boolean }>,
) {
  try {
    localStorage.setItem(`${STORAGE_KEY}_${sessionId}`, JSON.stringify(data));
  } catch { /* storage full */ }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useRoadmap() {
  const [report, setReport]         = useState<ReportResult | null>(null);
  const [phases, setPhases]         = useState<RoadmapPhase[]>([]);
  const [progress, setProgress]     = useState<Record<number, { completedActivities: number[]; signedOff: boolean }>>({});
  const [activeTab, setActiveTab]   = useState<ActiveTab>('timeline');
  const [activePhase, setActivePhase] = useState<number>(1);
  const [mounted, setMounted]       = useState(false);

  // Load report + persisted progress on mount
  useEffect(() => {
    setMounted(true);
    try {
      const raw = sessionStorage.getItem('report_result');
      if (raw) {
        const r = JSON.parse(raw) as ReportResult;
        setReport(r);
        setPhases(r.roadmap ?? []);
        setProgress(loadProgress(r.session_id));
      }
    } catch { /* no report */ }
  }, []);

  // Persist whenever progress changes
  useEffect(() => {
    if (report && Object.keys(progress).length > 0) {
      saveProgress(report.session_id, progress);
    }
  }, [progress, report]);

  const toggleActivity = useCallback((phaseNum: number, activityIdx: number) => {
    setProgress(prev => {
      const existing = prev[phaseNum] ?? { completedActivities: [], signedOff: false };
      const set = new Set(existing.completedActivities);
      set.has(activityIdx) ? set.delete(activityIdx) : set.add(activityIdx);
      return { ...prev, [phaseNum]: { ...existing, completedActivities: Array.from(set) } };
    });
  }, []);

  const signOffPhase = useCallback((phaseNum: number) => {
    setProgress(prev => {
      const existing = prev[phaseNum] ?? { completedActivities: [], signedOff: false };
      return { ...prev, [phaseNum]: { ...existing, signedOff: !existing.signedOff } };
    });
  }, []);

  // Derived stats
  const totalActivities = phases.reduce((acc, p) => acc + p.key_activities.length, 0);
  const completedActivities = Object.values(progress).reduce(
    (acc, p) => acc + p.completedActivities.length, 0,
  );
  const signedOffCount = Object.values(progress).filter(p => p.signedOff).length;
  const overallProgress = totalActivities > 0
    ? Math.round((completedActivities / totalActivities) * 100)
    : 0;

  const getPhaseProgress = (phaseNum: number) => progress[phaseNum] ?? { completedActivities: [], signedOff: false };
  const getBudget = (phase: RoadmapPhase) => estimatePhaseBudget(phase, report?.roi_range ?? '');

  return {
    report, phases, activeTab, setActiveTab,
    activePhase, setActivePhase,
    overallProgress, totalActivities, completedActivities,
    signedOffCount, mounted,
    toggleActivity, signOffPhase,
    getPhaseProgress, getBudget,
  };
}