'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { LoginFormValues, LoginFieldErrors, AuthResponse } from '@/types/auth';

const INITIAL_VALUES: LoginFormValues = { email: '', password: '' };

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(v: LoginFormValues): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  if (!v.email.trim())
    errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    errors.email = 'Enter a valid email address';
  if (!v.password)
    errors.password = 'Password is required';
  else if (v.password.length < 8)
    errors.password = 'Minimum 8 characters';
  return errors;
}

// ─── API call ─────────────────────────────────────────────────────────────────

async function loginUser(v: LoginFormValues): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email:    v.email.trim().toLowerCase(),
      password: v.password,
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
          : 'Login failed. Please try again.',
    );
  }

  return data as AuthResponse;
}

// ─── State ────────────────────────────────────────────────────────────────────

interface LoginFormState {
  values:      LoginFormValues;
  fieldErrors: LoginFieldErrors;
  globalError: string | null;
  isLoading:   boolean;
  isSuccess:   boolean;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLoginForm() {
  const router = useRouter();

  const [state, setState] = useState<LoginFormState>({
    values: INITIAL_VALUES,
    fieldErrors: {},
    globalError: null,
    isLoading: false,
    isSuccess: false,
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const { access_token, user } = await loginUser(state.values);

        // Persist session for dashboard and protected pages
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('user', JSON.stringify(user));

        setState(prev => ({ ...prev, isLoading: false, isSuccess: true }));
        setTimeout(() => router.push('/dashboard'), 1000);
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