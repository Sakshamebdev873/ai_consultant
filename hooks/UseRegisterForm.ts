'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { RegisterFormValues, FieldErrors, AuthResponse } from '@/types/auth';

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL_VALUES: RegisterFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  companySize: '',
  country: '',
  batteryDomain: '',
  yearsInIndustry: '',
  password: '',
};

// ─── Validation (only required fields enforced) ───────────────────────────────

function validate(v: RegisterFormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!v.firstName.trim())  errors.firstName = 'First name is required';
  if (!v.lastName.trim())   errors.lastName  = 'Last name is required';

  if (!v.email.trim())
    errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    errors.email = 'Enter a valid email address';

  if (!v.password)
    errors.password = 'Password is required';
  else if (v.password.length < 8)
    errors.password = 'Minimum 8 characters required';

  if (v.yearsInIndustry !== '') {
    const n = Number(v.yearsInIndustry);
    if (isNaN(n) || n < 0 || n > 50)
      errors.yearsInIndustry = 'Enter a number between 0 – 50';
  }

  return errors;
}

// ─── API call ─────────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

async function registerUser(v: RegisterFormValues): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      full_name:         `${v.firstName.trim()} ${v.lastName.trim()}`,
      email:             v.email.trim().toLowerCase(),
      password:          v.password,
      company_name:      v.companyName      || undefined,
      company_size:      v.companySize      || undefined,
      country:           v.country          || undefined,
      battery_domain:    v.batteryDomain    || undefined,
      years_in_industry: v.yearsInIndustry  ? Number(v.yearsInIndustry) : undefined,
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
          : 'Registration failed. Please try again.',
    );
  }

  return data as AuthResponse;
}

// ─── State ────────────────────────────────────────────────────────────────────

interface FormState {
  values:      RegisterFormValues;
  fieldErrors: FieldErrors;
  globalError: string | null;
  isLoading:   boolean;
  isSuccess:   boolean;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useRegisterForm() {
  const router = useRouter();

  const [state, setState] = useState<FormState>({
    values: INITIAL_VALUES,
    fieldErrors: {},
    globalError: null,
    isLoading: false,
    isSuccess: false,
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        return;
      }

      setState(prev => ({ ...prev, isLoading: true, globalError: null }));

      try {
        await registerUser(state.values);
        // Don't store token — redirect to login so user authenticates properly
        setState(prev => ({ ...prev, isLoading: false, isSuccess: true }));
        setTimeout(() => router.push('/login'), 1200);
      } catch (err) {
        setState(prev => ({
          ...prev,
          isLoading: false,
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
    isSuccess:   state.isSuccess,
    handleChange,
    handleSubmit,
  };
}