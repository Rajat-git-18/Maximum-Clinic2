"use client";

import { useActionState, useEffect, useRef } from "react";
import { updateStaffPassword, type StaffPasswordState } from "@/app/staff/actions";

export function StaffPasswordForm({ onCancel }: { onCancel?: () => void }) {
  const [state, formAction, pending] = useActionState(updateStaffPassword, null as StaffPasswordState);
  const formRef = useRef<HTMLFormElement>(null);
  const status = state?.status;

  useEffect(() => {
    if (status === "success") formRef.current?.reset();
  }, [status]);

  return (
    <section className="staff-password-card" aria-labelledby="staff-password-heading">
      <div className="staff-password-card-head">
        <div>
          <p className="eyebrow">Account security</p>
          <h2 id="staff-password-heading">Change password</h2>
          <p>
            After you save, <strong>only the new password will work</strong>. The old password will stop working right
            away.
          </p>
        </div>
        {onCancel ? (
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={pending}>
            Back to inbox
          </button>
        ) : null}
      </div>

      <ol className="staff-password-steps" aria-label="Password change steps">
        <li>
          <span>1</span>
          Current password
        </li>
        <li>
          <span>2</span>
          New password
        </li>
        <li>
          <span>3</span>
          Confirm once more
        </li>
      </ol>

      <form ref={formRef} className="staff-password-form" action={formAction} noValidate>
        {state?.message ? (
          <p
            className={`staff-password-banner${status === "success" ? " is-success" : ""}`}
            role={status === "success" ? "status" : "alert"}
          >
            {state.message}
          </p>
        ) : null}

        <div className="staff-password-fields">
          <div className="field">
            <label htmlFor="staff-current-password">Current password</label>
            <input
              id="staff-current-password"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              required
              disabled={pending}
            />
          </div>

          <div className="staff-password-new-block">
            <div className="field">
              <label htmlFor="staff-new-password">New password</label>
              <input
                id="staff-new-password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                minLength={10}
                required
                disabled={pending}
              />
              <p className="field-help">At least 10 characters. Choose something you have not used here before.</p>
            </div>
            <div className="field">
              <label htmlFor="staff-confirm-password">Confirm new password</label>
              <input
                id="staff-confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={10}
                required
                disabled={pending}
              />
            </div>
          </div>
        </div>

        <div className="staff-password-actions">
          <button type="submit" className="btn btn-primary" disabled={pending} aria-busy={pending}>
            {pending ? "Saving new password…" : "Save new password"}
          </button>
          {onCancel ? (
            <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={pending}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}
