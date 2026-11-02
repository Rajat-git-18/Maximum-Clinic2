"use client";

import { useActionState, useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { submitCareerApplication } from "@/app/book/actions";
import {
  CAREER_EXPERIENCE,
  CAREER_ROLES,
  careerExperienceLabel,
  careerRoleLabel,
  emptyCareer,
  validateCareer,
  type CareerErrors,
  type CareerValues,
} from "@/lib/validation";

export function CareerForm() {
  const [session, setSession] = useState(0);
  return <CareerSession key={session} onRestart={() => setSession((value) => value + 1)} />;
}

function CareerSession({ onRestart }: { onRestart: () => void }) {
  const formId = useId();
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const [values, setValues] = useState<CareerValues>(emptyCareer);
  const [errors, setErrors] = useState<CareerErrors>({});
  const [errorNonce, setErrorNonce] = useState(0);
  const [state, formAction, pending] = useActionState(submitCareerApplication, null);
  const [trackedState, setTrackedState] = useState(state);

  if (state !== trackedState) {
    setTrackedState(state);
    if (state?.status === "invalid" && state.errors) {
      setErrors(state.errors);
      setErrorNonce((value) => value + 1);
    }
  }

  const terminal =
    state?.status === "not_configured" || state?.status === "delivered" || state?.status === "rejected";

  useEffect(() => {
    if (errorNonce > 0) summaryRef.current?.focus();
  }, [errorNonce]);

  useEffect(() => {
    if (terminal) resultRef.current?.focus();
  }, [terminal, state?.status]);

  function update<K extends keyof CareerValues>(key: K, value: CareerValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key as keyof CareerErrors];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const result = validateCareer(values);
    if (!result.ok) {
      event.preventDefault();
      setErrors(result.errors);
      setErrorNonce((value) => value + 1);
    }
  }

  if (terminal && state) {
    const statusLabel =
      state.status === "delivered" ? "Application delivered" : state.status === "rejected" ? "Not accepted" : "Not sent";
    return (
      <div className="result" data-status={state.status} role="status">
        <p className="eyebrow">{statusLabel}</p>
        <h2 ref={resultRef} tabIndex={-1}>
          {state.status === "delivered" ? "The clinic has the application." : "No application was sent."}
        </h2>
        <p>{state.message}</p>
        {state.status !== "rejected" ? <CareerReview values={values} /> : null}
        <div className="cta-row">
          <button type="button" className="btn btn-secondary" onClick={onRestart}>
            Send another application
          </button>
          <Link className="btn btn-primary" href="/">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const errorEntries = Object.values(errors).filter(Boolean);

  return (
    <form className="book-panel career-form" action={formAction} onSubmit={handleSubmit} noValidate>
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

      <div className={`field${errors.role ? " has-error" : ""}`}>
        <label htmlFor={`${formId}-role`}>Role you are interested in</label>
        <select
          id={`${formId}-role`}
          name="role"
          value={values.role}
          onChange={(event) => update("role", event.target.value)}
          aria-invalid={errors.role ? true : undefined}
          aria-describedby={errors.role ? `${formId}-role-error` : `${formId}-role-help`}
        >
          <option value="">Choose a role area</option>
          {CAREER_ROLES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <p id={`${formId}-role-help`} className="field-help">
          These are interest areas, not advertised vacancies.
        </p>
        {errors.role ? (
          <p id={`${formId}-role-error`} className="field-error">
            {errors.role}
          </p>
        ) : null}
      </div>

      <div className="field-row">
        <div className={`field${errors.qualification ? " has-error" : ""}`}>
          <label htmlFor={`${formId}-qualification`}>Highest qualification</label>
          <input
            id={`${formId}-qualification`}
            name="qualification"
            type="text"
            autoComplete="off"
            value={values.qualification}
            onChange={(event) => update("qualification", event.target.value)}
            aria-invalid={errors.qualification ? true : undefined}
            aria-describedby={
              errors.qualification ? `${formId}-qualification-help ${formId}-qualification-error` : `${formId}-qualification-help`
            }
          />
          <p id={`${formId}-qualification-help`} className="field-help">
            Optional. Example: BPT, GNM, or MBA.
          </p>
          {errors.qualification ? (
            <p id={`${formId}-qualification-error`} className="field-error">
              {errors.qualification}
            </p>
          ) : null}
        </div>
        <div className={`field${errors.experience ? " has-error" : ""}`}>
          <label htmlFor={`${formId}-experience`}>Experience</label>
          <select
            id={`${formId}-experience`}
            name="experience"
            value={values.experience}
            onChange={(event) => update("experience", event.target.value)}
            aria-invalid={errors.experience ? true : undefined}
            aria-describedby={errors.experience ? `${formId}-experience-error` : undefined}
          >
            <option value="">Choose a range</option>
            {CAREER_EXPERIENCE.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          {errors.experience ? (
            <p id={`${formId}-experience-error`} className="field-error">
              {errors.experience}
            </p>
          ) : null}
        </div>
      </div>

      <div className={`field${errors.city ? " has-error" : ""}`}>
        <label htmlFor={`${formId}-city`}>Current city, if you want to share it</label>
        <input
          id={`${formId}-city`}
          name="city"
          type="text"
          autoComplete="address-level2"
          value={values.city}
          onChange={(event) => update("city", event.target.value)}
          aria-invalid={errors.city ? true : undefined}
          aria-describedby={errors.city ? `${formId}-city-help ${formId}-city-error` : `${formId}-city-help`}
        />
        <p id={`${formId}-city-help`} className="field-help">
          Optional.
        </p>
        {errors.city ? (
          <p id={`${formId}-city-error`} className="field-error">
            {errors.city}
          </p>
        ) : null}
      </div>

      <div className={`field${errors.note ? " has-error" : ""}`}>
        <label htmlFor={`${formId}-note`}>Brief note</label>
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
          {values.note.length} / 500. Optional. Do not attach a CV here. If the clinic wants documents, they will ask
          when they reply.
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
          <span>The clinic may use these details only to reply about this application of interest.</span>
        </label>
        <p id={`${formId}-consent-help`} className="field-help">
          Read the <Link href="/privacy">privacy notice</Link>. Submitting does not offer you a job.
        </p>
        {errors.consent ? <p className="field-error">{errors.consent}</p> : null}
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
        <button type="submit" className="btn btn-primary" disabled={pending} aria-busy={pending}>
          {pending ? "Sending application…" : "Submit application"}
        </button>
      </div>
    </form>
  );
}

function CareerReview({ values }: { values: CareerValues }) {
  return (
    <dl className="review-list">
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
      <div>
        <dt>Role interest</dt>
        <dd>{values.role ? careerRoleLabel(values.role) : "Not selected"}</dd>
      </div>
      <div>
        <dt>Qualification</dt>
        <dd>{values.qualification || "Not provided"}</dd>
      </div>
      <div>
        <dt>Experience</dt>
        <dd>{values.experience ? careerExperienceLabel(values.experience) : "Not selected"}</dd>
      </div>
      <div>
        <dt>City</dt>
        <dd>{values.city || "Not provided"}</dd>
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
