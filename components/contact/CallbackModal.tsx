"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { submitCallbackRequest } from "@/app/book/actions";
import { clinic } from "@/content/clinic";
import { CloseIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { telHref, whatsappHref } from "@/lib/clinic-facts";
import { emptyCallback, validateCallback, type CallbackErrors, type CallbackValues } from "@/lib/validation";

const STORAGE_KEY = "mc-callback-dismissed";
const EVENT_NAME = "mc-callback";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT_NAME, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(EVENT_NAME, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}

function setDismissed() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* Ignore private-mode storage failures. */
  }
  window.dispatchEvent(new Event(EVENT_NAME));
}

function clearDismissed() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* Ignore private-mode storage failures. */
  }
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function openCallback() {
  clearDismissed();
}

export function useCallbackOpen() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function CallbackModal() {
  const open = useCallbackOpen();
  return open ? <CallbackDialog onClose={setDismissed} /> : null;
}

function CallbackChannels() {
  const primary = clinic.phones[0];
  const call = primary ? telHref(primary.e164) : null;
  const whatsapp = primary ? whatsappHref(primary.e164) : null;

  return (
    <div className="callback-channels">
      {call ? (
        <a className="callback-channel" href={call}>
          <span className="callback-channel-icon">
            <PhoneIcon />
          </span>
          <span>
            Call: {primary.display}
          </span>
        </a>
      ) : null}
      {whatsapp ? (
        <a className="callback-channel callback-channel-wa" href={whatsapp} target="_blank" rel="noopener noreferrer">
          <span className="callback-channel-icon callback-channel-icon-wa">
            <WhatsAppIcon />
          </span>
          <span>
            WhatsApp: {primary.display}
            <span className="sr-only"> (opens in a new tab)</span>
          </span>
        </a>
      ) : null}
    </div>
  );
}

function CallbackDialog({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const formId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [values, setValues] = useState<CallbackValues>(emptyCallback);
  const [errors, setErrors] = useState<CallbackErrors>({});
  const [state, formAction, pending] = useActionState(submitCallbackRequest, null);
  const [trackedState, setTrackedState] = useState(state);

  if (state !== trackedState) {
    setTrackedState(state);
    if (state?.status === "invalid" && state.errors) {
      setErrors(state.errors as CallbackErrors);
    }
  }

  const terminal =
    state?.status === "not_configured" || state?.status === "delivered" || state?.status === "rejected";

  useEffect(() => {
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const selectors = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(selectors));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  function onChange<K extends keyof CallbackValues>(key: K, value: CallbackValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="callback-layer" role="presentation">
      <button className="callback-scrim" type="button" tabIndex={-1} aria-label="Close callback form" onClick={onClose} />
      <div
        className="callback-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
      >
        <button className="callback-close" type="button" onClick={onClose} ref={closeRef} aria-label="Close">
          <CloseIcon />
        </button>
        {terminal ? (
          <div className={`callback-result${state?.status === "delivered" ? " is-thanks" : ""}`}>
            {state?.status === "delivered" ? (
              <div className="thank-you-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            ) : null}
            <p className="eyebrow">{state?.status === "delivered" ? "Thank you" : "Not sent"}</p>
            <h2 id={titleId}>
              {state?.status === "delivered"
                ? "We will call you back."
                : "The clinic has not received this yet."}
            </h2>
            <p>{state?.message}</p>
            <CallbackChannels />
            <button className="btn btn-secondary btn-block" type="button" onClick={onClose}>
              Continue to the website
            </button>
          </div>
        ) : (
          <>
            <h2 id={titleId}>Need help finding what you were looking for?</h2>
            <p className="callback-lede">Get a call back from the clinic</p>
            <form className="callback-form" action={formAction} noValidate>
              <input className="hp" name="company" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="consent" value="yes" />
              <div className={`field${errors.phone ? " has-error" : ""}`}>
                <label className="sr-only" htmlFor={`${formId}-phone`}>
                  Phone
                </label>
                <input
                  id={`${formId}-phone`}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="Phone*"
                  value={values.phone}
                  onChange={(event) => onChange("phone", event.target.value)}
                />
                {errors.phone ? <p className="field-error">{errors.phone}</p> : null}
              </div>
              <div className={`field${errors.fullName ? " has-error" : ""}`}>
                <label className="sr-only" htmlFor={`${formId}-name`}>
                  Name
                </label>
                <input
                  id={`${formId}-name`}
                  name="fullName"
                  autoComplete="name"
                  required
                  placeholder="Name*"
                  value={values.fullName}
                  onChange={(event) => onChange("fullName", event.target.value)}
                />
                {errors.fullName ? <p className="field-error">{errors.fullName}</p> : null}
              </div>
              <div className={`field${errors.email ? " has-error" : ""}`}>
                <label className="sr-only" htmlFor={`${formId}-email`}>
                  Email, optional
                </label>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={(event) => onChange("email", event.target.value)}
                />
                {errors.email ? <p className="field-error">{errors.email}</p> : null}
              </div>
              <div className={`field${errors.service ? " has-error" : ""}`}>
                <label className="sr-only" htmlFor={`${formId}-service`}>
                  Speciality
                </label>
                <select
                  id={`${formId}-service`}
                  name="service"
                  required
                  value={values.service}
                  onChange={(event) => onChange("service", event.target.value)}
                >
                  <option value="">Search or select speciality*</option>
                  {clinic.services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.name}
                    </option>
                  ))}
                </select>
                {errors.service ? <p className="field-error">{errors.service}</p> : null}
              </div>
              {state?.status === "failed" ? <p className="field-error">{state.message}</p> : null}
              {errors.consent ? <p className="field-error">{errors.consent}</p> : null}
              <button
                className="btn btn-primary btn-block"
                type="submit"
                disabled={pending}
                formAction={formAction}
                onClick={(event) => {
                  const next = validateCallback({ ...values, consent: true });
                  if (!next.ok) {
                    event.preventDefault();
                    setErrors(next.errors);
                  }
                }}
              >
                {pending ? "Sending…" : "Request a Callback"}
              </button>
              <p className="callback-legal">
                By requesting a callback you agree to our{" "}
                <Link href="/privacy">privacy policy</Link> and <Link href="/terms">terms of use</Link>.
              </p>
            </form>
            <p className="callback-or">or</p>
            <CallbackChannels />
          </>
        )}
      </div>
    </div>
  );
}
