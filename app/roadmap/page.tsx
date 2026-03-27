"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import {
  listRoadmaps,
  getRoadmap,
  createRoadmap,
  updateRoadmap,
  updatePhase,
  resetRoadmap,
  deleteRoadmap,
} from "../../hooks/useRoadmap";
import { getAllReports } from "../../hooks/useReportForm";
import type {
  RoadmapSummary,
  RoadmapDetail,
  RoadmapPhase,
} from "../../hooks/useRoadmap";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOAST SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

let toastId = 0;

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, dismiss };
}

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => {
        const config = {
          success: {
            border: "border-emerald-500/40",
            bg: "bg-emerald-500/10",
            text: "text-emerald-400",
            icon: "✓",
          },
          error: {
            border: "border-red-500/40",
            bg: "bg-red-500/10",
            text: "text-red-400",
            icon: "✕",
          },
          info: {
            border: "border-neutral-600",
            bg: "bg-neutral-900",
            text: "text-neutral-300",
            icon: "→",
          },
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 px-4 py-3 border ${config.border} ${config.bg} backdrop-blur-md font-mono
              animate-[slideIn_0.3s_ease-out]`}
            style={{
              animation: "slideIn 0.3s ease-out",
            }}
          >
            <span className={`${config.text} text-xs font-bold flex-shrink-0 mt-0.5`}>
              {config.icon}
            </span>
            <p className={`text-xs ${config.text} leading-relaxed flex-1`}>
              {toast.message}
            </p>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-neutral-600 hover:text-neutral-300 text-[10px] flex-shrink-0 ml-2"
            >
              ✕
            </button>
          </div>
        );
      })}

      {/* Inline keyframe for slide-in */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const STATUS_CONFIG: Record<string, { label: string; cls: string; dotCls: string }> = {
  not_started: { label: "NOT STARTED", cls: "text-neutral-600 border-neutral-800 bg-neutral-900", dotCls: "bg-neutral-700" },
  in_progress: { label: "IN PROGRESS", cls: "text-amber-400 border-amber-500/30 bg-amber-500/10", dotCls: "bg-amber-400 animate-pulse" },
  completed:   { label: "COMPLETED",   cls: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10", dotCls: "bg-emerald-500" },
  blocked:     { label: "BLOCKED",     cls: "text-red-400 border-red-500/30 bg-red-500/10", dotCls: "bg-red-500" },
  skipped:     { label: "SKIPPED",     cls: "text-neutral-500 border-neutral-700 bg-neutral-800", dotCls: "bg-neutral-600" },
  active:      { label: "ACTIVE",      cls: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10", dotCls: "bg-emerald-500" },
  paused:      { label: "PAUSED",      cls: "text-amber-400 border-amber-500/30 bg-amber-500/10", dotCls: "bg-amber-400" },
  abandoned:   { label: "ABANDONED",   cls: "text-red-400 border-red-500/30 bg-red-500/10", dotCls: "bg-red-500" },
};

function StatusPill({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.not_started;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 border ${config.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotCls}`} />
      {config.label}
    </span>
  );
}

function ProgressBar({ percent, size = "md" }: { percent: number; size?: "sm" | "md" }) {
  return (
    <div className={`w-full bg-neutral-800 overflow-hidden ${size === "sm" ? "h-[3px]" : "h-1.5"}`}>
      <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${Math.min(percent, 100)}%` }} />
    </div>
  );
}

function Spinner({ label }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
      <span className="w-3 h-3 border border-emerald-500 border-t-transparent rounded-full animate-spin" />
      {label ?? "Processing..."}
    </span>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CREATE MODAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CreateRoadmapModal({
  onClose,
  onCreated,
  onToast,
}: {
  onClose: () => void;
  onCreated: () => void;
  onToast: (type: ToastType, msg: string) => void;
}) {
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllReports()
      .then((data) => {
        setReports(data);
        if (data.length === 0) setError("No reports found. Generate a report first.");
      })
      .catch(() => setError("Failed to load reports. Are you logged in?"))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate() {
    if (!selectedReport) return;
    setCreating(true);
    setError(null);
    try {
      await createRoadmap(selectedReport, title || undefined);
      onToast("success", "Roadmap created! Phases extracted from report.");
      onCreated();
    } catch (err: any) {
      setError(err.message);
      onToast("error", err.message);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg border border-neutral-800 bg-neutral-950 font-mono">
        <div className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500">// Create Roadmap from Report</span>
          <button onClick={onClose} className="text-neutral-600 hover:text-white text-xs transition-colors">✕</button>
        </div>

        <div className="p-6 space-y-5">
          {loading ? (
            <div className="flex justify-center py-8"><Spinner label="Loading your reports..." /></div>
          ) : (
            <>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-1.5">Select Report *</label>
                <select
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="w-full bg-black border border-neutral-800 px-4 py-2.5 text-xs text-neutral-300 focus:border-neutral-600 focus:outline-none transition-colors appearance-none"
                >
                  <option value="">Choose a report...</option>
                  {reports.map((r) => (
                    <option key={r.id} value={r.id}>
                      {(r.problem_domain ?? "Unknown").toUpperCase()} — {r.battery_type ?? "N/A"} — {new Date(r.created_at).toLocaleDateString()}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-neutral-700 mt-1.5">Phases will be auto-extracted from the report&apos;s ROI roadmap.</p>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-1.5">Title (optional)</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Auto-generated from report domain"
                  className="w-full bg-black border border-neutral-800 px-4 py-2.5 text-xs text-neutral-300 placeholder:text-neutral-700 focus:border-neutral-600 focus:outline-none transition-colors"
                />
              </div>

              {error && (
                <div className="border border-red-500/20 bg-red-500/5 px-3 py-2">
                  <p className="text-[10px] text-red-400">{error}</p>
                </div>
              )}

              <button
                onClick={handleCreate}
                disabled={!selectedReport || creating}
                className="w-full bg-emerald-500 text-black text-xs font-bold uppercase tracking-widest py-3 hover:bg-emerald-400 disabled:opacity-40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {creating ? <Spinner label="Creating roadmap..." /> : "Create Roadmap"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PHASE CARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PHASE_TRANSITIONS: Record<string, string[]> = {
  not_started: ["in_progress", "skipped"],
  in_progress: ["completed", "blocked"],
  blocked:     ["in_progress", "skipped"],
  completed:   ["in_progress"],
  skipped:     ["not_started"],
};

function PhaseCard({
  phase, roadmapId, onUpdated, onToast,
}: {
  phase: RoadmapPhase;
  roadmapId: string;
  onUpdated: (data: RoadmapDetail) => void;
  onToast: (type: ToastType, msg: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState(phase.progress_notes ?? "");
  const [blocker, setBlocker] = useState(phase.blocker ?? "");
  const [busy, setBusy] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  function flashCard() {
    if (!cardRef.current) return;
    cardRef.current.classList.add("ring-1", "ring-emerald-500/50");
    setTimeout(() => { cardRef.current?.classList.remove("ring-1", "ring-emerald-500/50"); }, 1500);
  }

  async function setStatus(newStatus: string) {
    setBusy(true);
    setLastAction(newStatus);
    try {
      const data = await updatePhase(roadmapId, phase.id, { status: newStatus });
      onUpdated(data);
      flashCard();
      onToast("success", `Phase "${phase.title}" → ${STATUS_CONFIG[newStatus]?.label ?? newStatus}`);
    } catch (err: any) {
      onToast("error", `Failed to update phase: ${err.message}`);
    } finally {
      setBusy(false);
      setLastAction(null);
    }
  }

  async function saveNotes() {
    setBusy(true);
    try {
      const data = await updatePhase(roadmapId, phase.id, {
        progress_notes: notes || undefined,
        blocker: blocker || undefined,
      });
      onUpdated(data);
      setEditing(false);
      flashCard();
      onToast("success", `Notes saved for "${phase.title}"`);
    } catch (err: any) {
      onToast("error", `Failed to save notes: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  const transitions = PHASE_TRANSITIONS[phase.status] ?? [];
  const config = STATUS_CONFIG[phase.status] ?? STATUS_CONFIG.not_started;

  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-1 w-[15px] h-[15px] border border-neutral-700 bg-neutral-950 flex items-center justify-center">
        <div className={`w-[7px] h-[7px] ${config.dotCls}`} />
      </div>

      <div ref={cardRef} className="border border-neutral-800 bg-neutral-950 hover:border-neutral-700 transition-all duration-300">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-neutral-700">{String(phase.phase_number).padStart(2, "0")}</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-200">{phase.title}</h4>
            </div>
            <StatusPill status={phase.status} />
          </div>

          {phase.duration_weeks && (
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Duration: {phase.duration_weeks} weeks</span>
          )}

          {phase.key_activities && phase.key_activities.length > 0 && (
            <div className="mt-3">
              <span className="text-[10px] uppercase tracking-widest text-neutral-700 block mb-1.5">Activities</span>
              <ul className="space-y-1">
                {phase.key_activities.map((a, i) => (
                  <li key={i} className="text-xs text-neutral-500 pl-3 border-l border-neutral-800">{a}</li>
                ))}
              </ul>
            </div>
          )}

          {phase.deliverable && (
            <div className="mt-3">
              <span className="text-[10px] uppercase tracking-widest text-neutral-700">Deliverable: </span>
              <span className="text-xs text-neutral-400">{phase.deliverable}</span>
            </div>
          )}

          {phase.blocker && !editing && (
            <div className="mt-3 px-3 py-2 border border-red-500/20 bg-red-500/5">
              <span className="text-[10px] uppercase tracking-widest text-red-400 block mb-1">Blocker</span>
              <p className="text-xs text-red-300">{phase.blocker}</p>
            </div>
          )}

          {phase.progress_notes && !editing && (
            <div className="mt-3 px-3 py-2 border border-neutral-800 bg-neutral-900/50">
              <span className="text-[10px] uppercase tracking-widest text-neutral-600 block mb-1">Notes</span>
              <p className="text-xs text-neutral-400">{phase.progress_notes}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-3 text-[10px] text-neutral-700 font-mono">
            {phase.started_at && <span>Started: {formatDate(phase.started_at)}</span>}
            {phase.completed_at && <span>Completed: {formatDate(phase.completed_at)}</span>}
          </div>

          {editing && (
            <div className="mt-4 space-y-3 border-t border-neutral-800 pt-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-1">Progress Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-neutral-300 placeholder:text-neutral-700 focus:border-neutral-600 focus:outline-none resize-none"
                  placeholder="What progress has been made..." />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-1">Blocker</label>
                <input value={blocker} onChange={(e) => setBlocker(e.target.value)}
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-neutral-300 placeholder:text-neutral-700 focus:border-neutral-600 focus:outline-none"
                  placeholder="Any blockers..." />
              </div>
              <div className="flex gap-2">
                <button onClick={saveNotes} disabled={busy}
                  className="bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-emerald-400 disabled:opacity-40 transition-all">
                  {busy ? "Saving..." : "Save"}
                </button>
                <button onClick={() => setEditing(false)}
                  className="border border-neutral-800 text-[10px] uppercase tracking-widest px-4 py-2 text-neutral-500 hover:text-white hover:border-neutral-600 transition-all">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-neutral-900">
            {transitions.map((s) => {
              const label = STATUS_CONFIG[s]?.label ?? s;
              const isThisLoading = busy && lastAction === s;
              return (
                <button key={s} onClick={() => setStatus(s)} disabled={busy}
                  className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 border border-neutral-800 text-neutral-500 hover:text-white hover:border-neutral-600 disabled:opacity-40 transition-all flex items-center gap-1.5">
                  {isThisLoading ? <span className="w-2.5 h-2.5 border border-white border-t-transparent rounded-full animate-spin" /> : "→"} {label}
                </button>
              );
            })}
            {!editing && (
              <button onClick={() => setEditing(true)}
                className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 border border-neutral-800 text-neutral-600 hover:text-emerald-400 hover:border-emerald-500/30 transition-all ml-auto">
                Edit Notes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DETAIL VIEW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function RoadmapDetailView({
  roadmap, onBack, onUpdate, onToast,
}: {
  roadmap: RoadmapDetail;
  onBack: () => void;
  onUpdate: (data: RoadmapDetail) => void;
  onToast: (type: ToastType, msg: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [editingMeta, setEditingMeta] = useState(false);
  const [metaStatus, setMetaStatus] = useState(roadmap.status);
  const [metaNotes, setMetaNotes] = useState(roadmap.notes ?? "");
  const [metaActualRoi, setMetaActualRoi] = useState(roadmap.actual_roi?.toString() ?? "");

  async function handleReset() {
    setBusy(true);
    try {
      const data = await resetRoadmap(roadmap.id);
      onUpdate(data);
      setShowConfirmReset(false);
      onToast("success", "All phases reset to NOT STARTED");
    } catch (err: any) { onToast("error", `Reset failed: ${err.message}`); }
    finally { setBusy(false); }
  }

  async function handleDelete() {
    setBusy(true);
    try {
      await deleteRoadmap(roadmap.id);
      onToast("success", "Roadmap deleted permanently");
      onBack();
    } catch (err: any) { onToast("error", `Delete failed: ${err.message}`); }
    finally { setBusy(false); }
  }

  async function handleMetaSave() {
    setBusy(true);
    try {
      const data = await updateRoadmap(roadmap.id, {
        status: metaStatus,
        notes: metaNotes || undefined,
        actual_roi: metaActualRoi ? parseFloat(metaActualRoi) : undefined,
      });
      onUpdate(data);
      setEditingMeta(false);
      onToast("success", "Roadmap settings updated");
    } catch (err: any) { onToast("error", `Update failed: ${err.message}`); }
    finally { setBusy(false); }
  }

  const statusBreakdown = roadmap.phases.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-10">
      <div>
        <button onClick={onBack} className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors mb-6 flex items-center gap-2">← Back to roadmaps</button>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-8">
          <div>
            <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-2">[ ROADMAP_TRACKER ]</p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{roadmap.title.toUpperCase()}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <StatusPill status={roadmap.status} />
              <span className="text-[10px] font-mono text-neutral-600">{roadmap.problem_domain?.toUpperCase()} · {roadmap.battery_type ?? "N/A"}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-emerald-400 font-mono">{roadmap.progress_percent.toFixed(0)}%</div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-600">{roadmap.completed_phases} / {roadmap.total_phases} phases</div>
          </div>
        </div>
      </div>

      <ProgressBar percent={roadmap.progress_percent} />

      {/* Status breakdown */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(statusBreakdown).map(([status, count]) => (
          <div key={status} className="flex items-center gap-1.5">
            <StatusPill status={status} />
            <span className="text-[10px] font-mono text-neutral-600">×{count}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-neutral-800">
        {[
          { label: "Est. Savings", value: `$${roadmap.estimated_roi_min?.toLocaleString()} – $${roadmap.estimated_roi_max?.toLocaleString()}`, cls: "text-emerald-400" },
          { label: "Actual ROI", value: roadmap.actual_roi ? `$${roadmap.actual_roi.toLocaleString()}` : "—", cls: "text-white" },
          { label: "Started", value: roadmap.started_at ? formatDate(roadmap.started_at) : "—", cls: "text-neutral-300" },
          { label: "Created", value: formatDate(roadmap.created_at), cls: "text-neutral-300" },
        ].map((s) => (
          <div key={s.label} className="bg-neutral-950 p-4 sm:p-5">
            <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1">{s.label}</div>
            <div className={`text-sm font-bold font-mono ${s.cls}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Meta edit / Notes */}
      {editingMeta ? (
        <div className="border border-neutral-800 bg-neutral-950 p-6 space-y-4">
          <div className="text-[10px] uppercase tracking-widest text-neutral-500 border-b border-neutral-900 pb-3 mb-3">// Edit Roadmap</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-1">Status</label>
              <select value={metaStatus} onChange={(e) => setMetaStatus(e.target.value as any)}
                className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-neutral-300 focus:border-neutral-600 focus:outline-none appearance-none">
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
                <option value="abandoned">Abandoned</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-1">Actual ROI ($)</label>
              <input value={metaActualRoi} onChange={(e) => setMetaActualRoi(e.target.value)} type="number"
                className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-neutral-300 placeholder:text-neutral-700 focus:border-neutral-600 focus:outline-none"
                placeholder="e.g. 420000" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-1">Notes</label>
            <textarea value={metaNotes} onChange={(e) => setMetaNotes(e.target.value)} rows={3}
              className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-neutral-300 placeholder:text-neutral-700 focus:border-neutral-600 focus:outline-none resize-none" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleMetaSave} disabled={busy}
              className="bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-emerald-400 disabled:opacity-40 transition-all flex items-center gap-2">
              {busy ? <Spinner label="Saving..." /> : "Save Changes"}
            </button>
            <button onClick={() => setEditingMeta(false)}
              className="border border-neutral-800 text-[10px] uppercase tracking-widest px-4 py-2 text-neutral-500 hover:text-white transition-all">Cancel</button>
          </div>
        </div>
      ) : roadmap.notes ? (
        <div className="border border-neutral-800 bg-neutral-950 p-5">
          <span className="text-[10px] uppercase tracking-widest text-neutral-600 block mb-2">Notes</span>
          <p className="text-xs text-neutral-400 leading-relaxed">{roadmap.notes}</p>
        </div>
      ) : null}

      {/* Phases */}
      <div>
        <div className="text-[10px] uppercase tracking-widest text-neutral-500 border-b border-neutral-900 pb-3 mb-6">// Phases ({roadmap.total_phases})</div>
        <div className="relative space-y-4">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-800" />
          {roadmap.phases.map((phase) => (
            <PhaseCard key={phase.id} phase={phase} roadmapId={roadmap.id} onUpdated={onUpdate} onToast={onToast} />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-800">
        {!editingMeta && (
          <button onClick={() => setEditingMeta(true)} className="border border-neutral-700 hover:border-white text-xs uppercase tracking-widest px-5 py-2.5 text-neutral-400 hover:text-white transition-all">Edit Roadmap</button>
        )}
        <button onClick={() => setShowConfirmReset(true)} className="border border-neutral-800 hover:border-amber-500/30 text-xs uppercase tracking-widest px-5 py-2.5 text-neutral-600 hover:text-amber-400 transition-all">Reset All Phases</button>
        <button onClick={() => setShowConfirmDelete(true)} className="border border-neutral-800 hover:border-red-500/30 text-xs uppercase tracking-widest px-5 py-2.5 text-neutral-700 hover:text-red-400 transition-all ml-auto">Delete Roadmap</button>
      </div>

      {showConfirmReset && (
        <div className="border border-amber-500/20 bg-amber-500/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-amber-400">This will reset all phases to &quot;not started&quot;. Are you sure?</p>
          <div className="flex gap-2">
            <button onClick={handleReset} disabled={busy} className="bg-amber-500 text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-amber-400 disabled:opacity-40 transition-all flex items-center gap-2">
              {busy ? <Spinner label="Resetting..." /> : "Confirm Reset"}
            </button>
            <button onClick={() => setShowConfirmReset(false)} className="border border-neutral-800 text-[10px] uppercase tracking-widest px-4 py-2 text-neutral-500 hover:text-white transition-all">Cancel</button>
          </div>
        </div>
      )}

      {showConfirmDelete && (
        <div className="border border-red-500/20 bg-red-500/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-red-400">This will permanently delete this roadmap and all its phases.</p>
          <div className="flex gap-2">
            <button onClick={handleDelete} disabled={busy} className="bg-red-500 text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-red-400 disabled:opacity-40 transition-all flex items-center gap-2">
              {busy ? <Spinner label="Deleting..." /> : "Delete Forever"}
            </button>
            <button onClick={() => setShowConfirmDelete(false)} className="border border-neutral-800 text-[10px] uppercase tracking-widest px-4 py-2 text-neutral-500 hover:text-white transition-all">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LIST VIEW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function RoadmapListView({ roadmaps, onSelect }: { roadmaps: RoadmapSummary[]; onSelect: (id: string) => void }) {
  if (roadmaps.length === 0) {
    return (
      <div className="border border-neutral-800 bg-neutral-950 p-16 text-center space-y-4">
        <div className="text-3xl">∅</div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">No roadmaps created</h3>
        <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
          Generate a report first, then create a trackable roadmap from it to monitor your implementation progress phase by phase.
        </p>
        <Link href="/report" className="inline-block mt-4 border border-neutral-700 hover:border-white text-xs uppercase tracking-widest px-6 py-3 text-neutral-400 hover:text-white transition-all">
          Start Consultation →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {roadmaps.map((rm) => (
        <button key={rm.id} onClick={() => onSelect(rm.id)}
          className="w-full text-left border border-neutral-800 bg-neutral-950 hover:border-neutral-600 hover:bg-neutral-900 transition-all group">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-bold text-neutral-200 group-hover:text-white transition-colors uppercase tracking-wider">{rm.title}</h3>
                <StatusPill status={rm.status} />
              </div>
              <span className="text-[10px] font-mono text-neutral-700">{formatDate(rm.updated_at)}</span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <ProgressBar percent={rm.progress_percent} size="sm" />
              <span className="text-xs font-mono text-emerald-400 flex-shrink-0">{rm.progress_percent.toFixed(0)}%</span>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
              <span>{rm.problem_domain ?? "—"}</span>
              <span>{rm.battery_type ?? "—"}</span>
              <span>{rm.completed_phases}/{rm.total_phases} phases</span>
              {rm.estimated_roi_min != null && (
                <span className="text-emerald-500/60">ROI: ${rm.estimated_roi_min.toLocaleString()} – ${rm.estimated_roi_max?.toLocaleString()}</span>
              )}
              <span className="ml-auto text-neutral-500 group-hover:text-white transition-colors">View →</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function RoadmapPage() {
  const { toasts, addToast, dismiss } = useToast();
  const [view, setView] = useState<"list" | "detail">("list");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roadmaps, setRoadmaps] = useState<RoadmapSummary[]>([]);
  const [selected, setSelected] = useState<RoadmapDetail | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [showCreate, setShowCreate] = useState(false);

  const loadList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await listRoadmaps(statusFilter);
      setRoadmaps(data);
      setView("list");
      setSelected(null);
    } catch (err: any) {
      setError(err.message);
      addToast("error", `Failed to load roadmaps: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, addToast]);

  useEffect(() => { loadList(); }, [loadList]);

  async function openDetail(id: string) {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRoadmap(id);
      setSelected(data);
      setView("detail");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setError(err.message);
      addToast("error", `Failed to load roadmap: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">

  {/* NAV */}
  <nav className="border-b border-neutral-800 bg-black/80 backdrop-blur-md px-8 py-4 flex items-center justify-between sticky top-0 z-50">
    <Link href="/" className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
      <span className="w-2 h-2 bg-white rounded-full" />
      AI Consultant.io
    </Link>
    <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-neutral-500">
      <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
      <Link href="/report"    className="hover:text-white transition-colors">New Report</Link>
      <Link href="/roadmap"   className="text-emerald-400 border-b border-emerald-400 pb-0.5">Roadmap</Link>
      <Link href="/feedback"  className="hover:text-white transition-colors">Feedback</Link>
    </div>
  </nav>

  <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 space-y-10">

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-4 pb-12 space-y-10">
        {view === "list" && !isLoading && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-8">
            <div>
              <p className="text-[10px] text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Implementation_Tracker
              </p>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter">ROADMAPS</h1>
              <p className="text-xs text-neutral-500 mt-2">{roadmaps.length} {roadmaps.length === 1 ? "roadmap" : "roadmaps"} tracked</p>
            </div>
            <button onClick={() => setShowCreate(true)}
              className="bg-emerald-500 text-black text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-emerald-400 active:scale-95 transition-all flex-shrink-0">
              + New Roadmap
            </button>
          </div>
        )}

        {view === "list" && !isLoading && !error && (
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: "All", value: undefined },
              { label: "Active", value: "active" },
              { label: "Paused", value: "paused" },
              { label: "Completed", value: "completed" },
              { label: "Abandoned", value: "abandoned" },
            ].map((f) => (
              <button key={f.label} onClick={() => setStatusFilter(f.value)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-widest border transition-all ${
                  statusFilter === f.value
                    ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/5"
                    : "border-neutral-800 text-neutral-600 hover:text-neutral-300 hover:border-neutral-600"
                }`}>
                {f.label}
              </button>
            ))}
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <Spinner label={view === "list" ? "Loading roadmaps..." : "Loading roadmap data..."} />
          </div>
        )}

        {error && !isLoading && (
          <div className="border border-red-500/30 bg-red-500/5 p-6 space-y-4 text-center">
            <p className="text-xs text-red-400 uppercase tracking-widest">Connection Error</p>
            <p className="text-sm text-neutral-400">{error}</p>
            <button onClick={loadList} className="border border-neutral-700 hover:border-white text-xs uppercase tracking-widest px-5 py-2.5 text-neutral-400 hover:text-white transition-all">Retry</button>
          </div>
        )}

        {!isLoading && !error && view === "list" && (
          <RoadmapListView roadmaps={roadmaps} onSelect={openDetail} />
        )}

        {!isLoading && !error && view === "detail" && selected && (
          <RoadmapDetailView roadmap={selected} onBack={loadList} onUpdate={(data) => setSelected(data)} onToast={addToast} />
        )}

        <div className="border-t border-neutral-900 pt-6 flex justify-between items-center text-[10px] text-neutral-700 uppercase tracking-widest">
          <span>AI Consultant.io // Roadmap Tracker</span>
          <span>{roadmaps.length} Roadmaps</span>
        </div>
      </div>

      {showCreate && (
        <CreateRoadmapModal
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); loadList(); }}
          onToast={addToast}
        />
      )}

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </div>
    </div>
  );
}