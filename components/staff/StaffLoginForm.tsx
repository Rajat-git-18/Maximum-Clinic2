"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { loginStaff, type StaffLoginState } from "@/app/staff/actions";
import { clinic } from "@/content/clinic";

export function StaffLoginForm() {
  const params = useSearchParams();
  const rawNext = params.get("next") ?? "/staff";
  const nextPath = rawNext.startsWith("/staff") ? rawNext : "/staff";
  const [state, formAction, pending] = useActionState(loginStaff, null as StaffLoginState);

  return (
    <form className="staff-login-form" action={formAction} noValidate>
      <div className="staff-login-brand">
        <p className="eyebrow">Staff access</p>
        <h1>Maximum Healthcare staff login</h1>
        <p>Sign in to review appointment requests and career applications.</p>
      </div>

      {state?.message ? (
        <div className="form-banner" role="alert">
          {state.message}
        </div>
      ) : null}

      <input type="hidden" name="next" value={nextPath} />

      <div className="field">
        <label htmlFor="staff-username">Staff username</label>
        <input
          id="staff-username"
          name="username"
          type="text"
          autoComplete="username"
          required
          placeholder="Enter staff username"
        />
      </div>
      <div className="field">
        <label htmlFor="staff-password">Password</label>
        <input
          id="staff-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Enter password"
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={pending} aria-busy={pending}>
        {pending ? "Signing in…" : "Sign in to staff desk"}
      </button>

      <p className="staff-login-note">
        For clinic staff only. Patients should use Book an appointment or call {clinic.phones[0]?.display ?? "the clinic"}.
      </p>
    </form>
  );
}
