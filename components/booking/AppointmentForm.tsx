"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { submitAppointmentRequest } from "@/app/book/actions";
import { clinic } from "@/content/clinic";
import { formatDisplayDate } from "@/lib/dates";
import {
  TIME_OPTIONS,
  emptyAppointment,
  errorsForStep,
  stepForErrors,
  timeLabel,
  validateAppointment,
  type AppointmentErrors,
  type AppointmentValues,
} from "@/lib/validation";

const STEPS = ["Service", "Timing", "Details", "Review"];

export function AppointmentForm() {
  const params = useSearchParams();
  const [session, setSession] = useState(0);

  return (
    <AppointmentSession
      key={session}
      initialService={params.get("service") ?? ""}
      initialDoctor={params.get("doctor") ?? ""}
      onRestart={() => setSession((value) => value + 1)}
    />
  );
}

function AppointmentSession({
  initialService,
  initialDoctor,
  onRestart,
}: {
  initialService: string;
  initialDoctor: string;
  onRestart: () => void;
}) {
  const formId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<AppointmentValues>(() =>
    emptyAppointment({ service: initialService, doctor: initialDoctor }),
  );
  const [errors, setErrors] = useState<AppointmentErrors>({});
  const [errorNonce, setErrorNonce] = useState(0);
  const [state, formAction, pending] = useActionState(submitAppointmentRequest, null);
  const [trackedState, setTrackedState] = useState(state);

  if (state !== trackedState) {
    setTrackedState(state);
    if (state?.status === "invalid" && state.errors) {
      setErrors(state.errors);
      setStep(stepForErrors(state.errors));
      setErrorNonce((value) => value + 1);
    }
  }

  const terminal =
    state?.status === "not_configured" || state?.status === "delivered" || state?.status === "rejected";

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!terminal) headingRef.current?.focus();
  }, [step, terminal]);

  useEffect(() => {
    if (errorNonce > 0) summaryRef.current?.focus();
  }, [errorNonce]);

  useEffect(() => {
    if (terminal) resultRef.current?.focus();
  }, [terminal, state?.status]);

  function update<K extends keyof AppointmentValues>(key: K, value: AppointmentValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key as keyof AppointmentErrors];
      return next;
    });
  }

  function validateCurrentStep(): boolean {
    const result = validateAppointment(values);
    if (result.ok) {
      setErrors({});
      return true;
    }
    const stepErrors = errorsForStep(result.errors, step);
    if (Object.keys(stepErrors).length === 0) {
      setErrors({});
      return true;
    }
    setErrors(stepErrors);
    setErrorNonce((value) => value + 1);
    return false;
  }

  function goTo(nextStep: number) {
    if (nextStep > step && !validateCurrentStep()) return;
    if (nextStep < step) setErrors({});
    setStep(nextStep);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const result = validateAppointment(values);
    if (!result.ok) {
      event.preventDefault();
      setErrors(result.errors);
      setStep(stepForErrors(result.errors));
      setErrorNonce((value) => value + 1);
      return;
    }
    if (step < 3) {
      event.preventDefault();
      setStep((current) => Math.min(current + 1, 3));
    }
  }

  if (terminal && state) {
    const statusLabel =
      state.status === "delivered" ? "Request delivered" : state.status === "rejected" ? "Not accepted" : "Not sent";
    return (
      <div className="result" data-status={state.status} role="status">
        <p className="eyebrow">{statusLabel}</p>
        <h2 ref={resultRef} tabIndex={-1}>
          {state.status === "delivered" ? "The clinic has the request." : "No appointment was booked."}
        </h2>
        <p>{state.message}</p>
        {state.status !== "rejected" ? <Review values={values} /> : null}
        <div className="cta-row">
          <button type="button" className="btn btn-secondary" onClick={onRestart}>
            Start another request
          </button>
          <Link className="btn btn-primary" href="/">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const errorEntries = Object.values(errors).filter(Boolean);
  const singleDoctor = clinic.doctors.length === 1;

  return (
    <form className="book-layout" id={formId} action={formAction} onSubmit={handleSubmit} noValidate>
      <p className="sr-only" aria-live="polite">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>
      <ol className="step-nav" aria-label="Request steps">
        {STEPS.map((label, index) => (
          <li key={label} aria-current={index === step ? "step" : undefined}>
            <button type="button" onClick={() => goTo(index)} disabled={pending || index > step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
            </button>
          </li>
        ))}
      </ol>

      <div className="book-panel">
        <h2 ref={headingRef} tabIndex={-1} className="step-title">
          {step === 0 && "Choose a service"}
          {step === 1 && "Share a preferred time"}
          {step === 2 && "How should the clinic reply?"}
          {step === 3 && "Review the request"}
        </h2>

        {state?.status === "failed" ? (
          <div className="form-banner" role="alert">
            {state.message}
          </div>
        ) : null}

        {errorEntries.length > 0 ? (
          <div className="form-banner" role="alert" tabIndex={-1} ref={summaryRef}>
            {errorEntries.length === 1
              ? errorEntries[0]
              : `${errorEntries.length} details need attention before continuing.`}
          </div>
        ) : (
          <div ref={summaryRef} tabIndex={-1} className="sr-only" />
        )}

        <div hidden={step !== 0}>
          <fieldset aria-describedby={errors.service ? `${formId}-service-error` : undefined}>
            <legend>Service</legend>
            <div className="choice-list">
              {clinic.services.map((service) => (
                <label className="choice" key={service.slug}>
                  <input
                    type="radio"
                    name="service"
                    value={service.slug}
                    checked={values.service === service.slug}
                    onChange={() => update("service", service.slug)}
                  />
                  <span>
                    <span className="choice-title">{service.name}</span>
                    <span className="choice-copy">{service.summary}</span>
                  </span>
                </label>
              ))}
            </div>
            {errors.service ? (
              <p id={`${formId}-service-error`} className="field-error">
                {errors.service}
              </p>
            ) : null}
          </fieldset>

          {clinic.doctors.length === 0 ? (
            <p className="field-help">
              The clinic has not published individual doctor names, so this request does not name a doctor.
            </p>
          ) : singleDoctor ? (
            <div className="solo-doctor">
              <p className="hero-card-label">Doctor</p>
              <p>{clinic.doctors[0].name}</p>
              <p className="field-help">This clinic publishes one doctor, so the request names them.</p>
              <input type="hidden" name="doctor" value={values.doctor} />
            </div>
          ) : (
            <fieldset aria-describedby={errors.doctor ? `${formId}-doctor-error` : undefined}>
              <legend>Doctor</legend>
              <div className="choice-list">
                {clinic.doctors.map((doctor) => (
                  <label className="choice" key={doctor.slug}>
                    <input
                      type="radio"
                      name="doctor"
                      value={doctor.slug}
                      checked={values.doctor === doctor.slug}
                      onChange={() => update("doctor", doctor.slug)}
                    />
                    <span>
                      <span className="choice-title">{doctor.name}</span>
                      <span className="choice-copy">{doctor.speciality}</span>
                    </span>
                  </label>
                ))}
              </div>
              {errors.doctor ? (
                <p id={`${formId}-doctor-error`} className="field-error">
                  {errors.doctor}
                </p>
              ) : null}
            </fieldset>
          )}
        </div>

        <div hidden={step !== 1}>
          <div className={`field${errors.preferredDate ? " has-error" : ""}`}>
            <label htmlFor={`${formId}-date`}>Preferred date</label>
            <input
              id={`${formId}-date`}
              name="preferredDate"
              type="date"
              value={values.preferredDate}
              onChange={(event) => update("preferredDate", event.target.value)}
              aria-invalid={errors.preferredDate ? true : undefined}
              aria-describedby={
                errors.preferredDate ? `${formId}-date-help ${formId}-date-error` : `${formId}-date-help`
              }
              autoComplete="off"
            />
            <p id={`${formId}-date-help`} className="field-help">
              This is a preference, not an open appointment. The clinic may suggest another day.
            </p>
            {errors.preferredDate ? (
              <p id={`${formId}-date-error`} className="field-error">
                {errors.preferredDate}
              </p>
            ) : null}
          </div>
          <fieldset aria-describedby={errors.timeOfDay ? `${formId}-time-error` : `${formId}-time-help`}>
            <legend>Preferred part of the day</legend>
            <div className="choice-list choice-inline">
              {TIME_OPTIONS.map((option) => (
                <label className="choice" key={option.value}>
                  <input
                    type="radio"
                    name="timeOfDay"
                    value={option.value}
                    checked={values.timeOfDay === option.value}
                    onChange={() => update("timeOfDay", option.value)}
                  />
                  <span className="choice-title">{option.label}</span>
                </label>
              ))}
            </div>
            <p id={`${formId}-time-help`} className="field-help">
              These are not available slots. Nothing is held when you choose one.
            </p>
            {errors.timeOfDay ? (
              <p id={`${formId}-time-error`} className="field-error">
                {errors.timeOfDay}
              </p>
            ) : null}
          </fieldset>
        </div>

        <div hidden={step !== 2}>
          <div className={`field${errors.fullName ? " has-error" : ""}`}>
            <label htmlFor={`${formId}-name`}>Full name</label>
            <input
              id={`${formId}-name`}
              name="fullName"
              type="text"
              autoComplete="name"
              value={values.fullName}
              onChange={(event) => update("fullName", event.target.value)}
              aria-invalid={errors.fullName ? true : undefined}
              aria-describedby={errors.fullName ? `${formId}-name-error` : undefined}
              required={false}
            />
            {errors.fullName ? (
              <p id={`${formId}-name-error`} className="field-error">
                {errors.fullName}
              </p>
            ) : null}
          </div>
          <div className="field-row">
            <div className={`field${errors.phone ? " has-error" : ""}`}>
              <label htmlFor={`${formId}-phone`}>Phone</label>
              <input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(event) => update("phone", event.target.value)}
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
              />
              {errors.phone ? (
                <p id={`${formId}-phone-error`} className="field-error">
                  {errors.phone}
                </p>
              ) : null}
            </div>
            <div className={`field${errors.email ? " has-error" : ""}`}>
              <label htmlFor={`${formId}-email`}>Email, if you have one</label>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? `${formId}-email-error` : undefined}
              />
              {errors.email ? (
                <p id={`${formId}-email-error`} className="field-error">
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>
          <div className={`field${errors.note ? " has-error" : ""}`}>
            <label htmlFor={`${formId}-note`}>Note, if needed</label>
            <textarea
              id={`${formId}-note`}
              name="note"
              rows={4}
              maxLength={500}
              value={values.note}
              onChange={(event) => update("note", event.target.value)}
              aria-invalid={errors.note ? true : undefined}
              aria-describedby={`${formId}-note-help${errors.note ? ` ${formId}-note-error` : ""}`}
            />
            <p id={`${formId}-note-help`} className="field-help">
              {values.note.length} / 500. Optional. Do not include a detailed medical history.
            </p>
            {errors.note ? (
              <p id={`${formId}-note-error`} className="field-error">
                {errors.note}
              </p>
            ) : null}
          </div>
          <div className={`consent${errors.consent ? " has-error" : ""}`}>
            <label>
              <input
                type="checkbox"
                name="consent"
                value="yes"
                checked={values.consent}
                onChange={(event) => update("consent", event.target.checked)}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={`${formId}-consent-help`}
              />
              <span>The clinic may use these details only to reply about this appointment request.</span>
            </label>
            <p id={`${formId}-consent-help`} className="field-help">
              Read the <Link href="/privacy">privacy notice</Link>. This does not confirm a booking.
            </p>
            {errors.consent ? <p className="field-error">{errors.consent}</p> : null}
          </div>
        </div>

        <div hidden={step !== 3}>
          <p className="field-help">
            Check the details. Submitting sends the request only if a booking inbox is connected. It never confirms
            the appointment by itself.
          </p>
          <Review values={values} />
        </div>

        <div className="hp" aria-hidden="true">
          <label>
            Company
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={values.company}
              onChange={(event) => update("company", event.target.value)}
            />
          </label>
        </div>

        <div className="form-actions">
          {step > 0 ? (
            <button type="button" className="btn btn-secondary" onClick={() => goTo(step - 1)} disabled={pending}>
              Back
            </button>
          ) : null}
          {step < 3 ? (
            <button type="button" className="btn btn-primary" onClick={() => goTo(step + 1)} disabled={pending}>
              Continue
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={pending} aria-busy={pending}>
              {pending ? "Sending request…" : "Submit request"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function Review({ values }: { values: AppointmentValues }) {
  const serviceName = clinic.services.find((item) => item.slug === values.service)?.name;
  const doctorName = clinic.doctors.find((item) => item.slug === values.doctor)?.name;

  return (
    <dl className="review-list">
      <div>
        <dt>Service</dt>
        <dd>{serviceName || "Not selected"}</dd>
      </div>
      {clinic.doctors.length > 0 ? (
        <div>
          <dt>Doctor</dt>
          <dd>{doctorName || "Not selected"}</dd>
        </div>
      ) : null}
      <div>
        <dt>Preferred date</dt>
        <dd>{values.preferredDate ? formatDisplayDate(values.preferredDate) : "Not selected"}</dd>
      </div>
      <div>
        <dt>Preferred time</dt>
        <dd>{values.timeOfDay ? timeLabel(values.timeOfDay) : "Not selected"}</dd>
      </div>
      <div>
        <dt>Name</dt>
        <dd>{values.fullName || "Not entered"}</dd>
      </div>
      <div>
        <dt>Phone</dt>
        <dd>{values.phone || "Not entered"}</dd>
      </div>
      <div>
        <dt>Email</dt>
        <dd>{values.email || "Not provided"}</dd>
      </div>
      {values.note ? (
        <div>
          <dt>Note</dt>
          <dd>{values.note}</dd>
        </div>
      ) : null}
    </dl>
  );
}
