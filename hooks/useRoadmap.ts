/**
 * hooks/useRoadmap.ts
 * ───────────────────
 * API helpers for roadmap CRUD operations.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

function getToken(): string | null {
  return typeof window !== "undefined"
    ? localStorage.getItem("access_token")
    : null;
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleRes<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    const msg =
      typeof data?.detail === "string"
        ? data.detail
        : "Request failed. Please try again.";
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RoadmapPhase {
  id: string;
  phase_number: number;
  title: string;
  duration_weeks: number | null;
  key_activities: string[];
  deliverable: string | null;
  status: "not_started" | "in_progress" | "completed" | "blocked" | "skipped";
  progress_notes: string | null;
  blocker: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RoadmapSummary {
  id: string;
  report_id: string;
  title: string;
  status: "active" | "completed" | "paused" | "abandoned";
  problem_domain: string | null;
  battery_type: string | null;
  total_phases: number;
  completed_phases: number;
  progress_percent: number;
  estimated_roi_min: number | null;
  estimated_roi_max: number | null;
  actual_roi: number | null;
  created_at: string;
  updated_at: string;
}

export interface RoadmapDetail extends RoadmapSummary {
  user_id: string;
  notes: string | null;
  started_at: string | null;
  target_completion: string | null;
  completed_at: string | null;
  phases: RoadmapPhase[];
}

// ── API calls ─────────────────────────────────────────────────────────────────

/** List all roadmaps for current user */
export async function listRoadmaps(
  status?: string,
): Promise<RoadmapSummary[]> {
  const url = new URL(`${API_BASE}/roadmaps/`);
  if (status) url.searchParams.append("status", status);

  const res = await fetch(url.toString(), { headers: authHeaders() });
  return handleRes<RoadmapSummary[]>(res);
}

/** Get single roadmap with phases */
export async function getRoadmap(id: string): Promise<RoadmapDetail> {
  const res = await fetch(`${API_BASE}/roadmaps/${id}`, {
    headers: authHeaders(),
  });
  return handleRes<RoadmapDetail>(res);
}

/** Create a roadmap from a report */
export async function createRoadmap(
  reportId: string,
  title?: string,
  notes?: string,
): Promise<RoadmapDetail> {
  const res = await fetch(`${API_BASE}/roadmaps/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      report_id: reportId,
      title: title || undefined,
      notes: notes || undefined,
    }),
  });
  return handleRes<RoadmapDetail>(res);
}

/** Update roadmap metadata */
export async function updateRoadmap(
  id: string,
  data: {
    title?: string;
    status?: string;
    notes?: string;
    actual_roi?: number;
    target_completion?: string;
  },
): Promise<RoadmapDetail> {
  const res = await fetch(`${API_BASE}/roadmaps/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return handleRes<RoadmapDetail>(res);
}

/** Delete a roadmap */
export async function deleteRoadmap(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/roadmaps/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error("Failed to delete roadmap");
  }
}

/** Update a single phase */
export async function updatePhase(
  roadmapId: string,
  phaseId: string,
  data: {
    status?: string;
    progress_notes?: string;
    blocker?: string;
  },
): Promise<RoadmapDetail> {
  const res = await fetch(
    `${API_BASE}/roadmaps/${roadmapId}/phases/${phaseId}`,
    {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(data),
    },
  );
  return handleRes<RoadmapDetail>(res);
}

/** Reset all phases */
export async function resetRoadmap(id: string): Promise<RoadmapDetail> {
  const res = await fetch(`${API_BASE}/roadmaps/${id}/reset`, {
    method: "POST",
    headers: authHeaders(),
  });
  return handleRes<RoadmapDetail>(res);
}