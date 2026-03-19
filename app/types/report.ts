// ─── Report request (mirrors API exactly) ────────────────────────────────────
export interface ReportFormValues {
  problem_text: string;
  company_name: string;
  company_size: string;
  annual_production_gwh: string;   // string for input, cast to float on submit
  battery_chemistry: string;
  battery_application: string;
  current_tools_in_use: string;
  budget_range: string;
  country: string;
  years_in_industry: string;       // string for input, cast to int on submit
  primary_goal: string;
  data_availability: string;
  timeline_months: string;         // string for input, cast to int on submit
}

export type ReportFieldErrors = Partial<Record<keyof ReportFormValues, string>>;

// ─── API response shapes ──────────────────────────────────────────────────────
export interface ToolRecommendation {
  tool_name: string;
  why_recommended: string;
  fit_score: number;
  roi_range: string;
  implementation_weeks: string;
  pricing_tier: string;
  website: string;
}

export interface RoadmapPhase {
  phase_number: number;
  title: string;
  duration: string;
  key_activities: string[];
  deliverable: string;
}

export interface ReportResult {
  session_id: string;
  status: string;
  problem_domain: string;
  battery_type: string;
  impact_level: string;
  recommended_tools: ToolRecommendation[];
  roi_range: string;
  roi_metric: string;
  payback_period: string;
  confidence_score: number;
  confidence_level: string;
  roadmap: RoadmapPhase[];
  executive_summary: string;
  caveats: string[];
  agents_completed: string[];
  errors: string[];
  generated_at: string;
}