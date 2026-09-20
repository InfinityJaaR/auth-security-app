"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";
import type { ActionState } from "@/types/auth";

type AuthFormProps = {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
  children: ReactNode;
  successLink?: ReactNode;
};

export function AuthForm({ action, submitLabel, children, successLink }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction} className="form-card">
      {children}
      {state.error && <p className="message error" role="alert">{state.error}</p>}
      {state.success && <p className="message success" role="status">{state.success}</p>}
      <button className="button" disabled={pending} type="submit">
        {pending ? "Procesando..." : submitLabel}
      </button>
      {successLink}
    </form>
  );
}

export function Field({ name, label, type = "text", autoComplete }: { name: string; label: string; type?: string; autoComplete?: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input required name={name} type={type} autoComplete={autoComplete} maxLength={72} />
    </label>
  );
}
