// ─── Register form (all fields — required + optional) ────────────────────────
export interface RegisterFormValues {
  // 01 Identity
  firstName: string;
  lastName: string;
  // 02 Organisation
  email: string;
  companyName: string;
  companySize: string;
  country: string;
  // 03 Domain
  batteryDomain: string;
  yearsInIndustry: string;   // string for input, cast to int on submit
  // 04 Security
  password: string;
}

// ─── Login form ───────────────────────────────────────────────────────────────
export interface LoginFormValues {
  email: string;
  password: string;
}

// ─── Per-field error maps ─────────────────────────────────────────────────────
export type FieldErrors      = Partial<Record<keyof RegisterFormValues, string>>;
export type LoginFieldErrors = Partial<Record<keyof LoginFormValues,    string>>;

// ─── API payload (what FastAPI expects) ───────────────────────────────────────
export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  company_name?: string;
  company_size?: string;
  country?: string;
  battery_domain?: string;
  years_in_industry?: number;
}

// ─── Shared API response shapes ───────────────────────────────────────────────
export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  company_name?: string;
  company_size?: string;
  country?: string;
  battery_domain?: string;
  years_in_industry?: number;
  reports_generated: number;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
  message: string;
}