"use client";

import { useState } from "react";
import { deleteInboxItem, logoutStaff } from "@/app/staff/actions";
import { StaffPasswordForm } from "@/components/staff/StaffPasswordForm";
import { clinic } from "@/content/clinic";
import { formatDisplayDate } from "@/lib/dates";
import type { AppointmentRecord, CallbackRecord, CareerRecord } from "@/lib/staff-inbox";
import { careerExperienceLabel, careerRoleLabel, timeLabel } from "@/lib/validation";

type Tab = "appointments" | "careers" | "callbacks";
type DeskView = "inbox" | "password";

function serviceName(slug: string) {
  return clinic.services.find((item) => item.slug === slug)?.name || slug || "Not specified";
}

function doctorName(slug: string) {
  if (!slug) return "Not specified";
  return clinic.doctors.find((item) => item.slug === slug)?.name ?? slug;
}

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9zm-1 12h12a1 1 0 0 0 1-1V8H5v12a1 1 0 0 0 1 1z"
      />
    </svg>
  );
}

function DeleteRequestButton({ id, label }: { id: string; label: string }) {
  return (
    <form
      action={deleteInboxItem}
      onSubmit={(event) => {
        if (!window.confirm(`Delete this ${label}? This cannot be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="staff-card-delete" aria-label={`Delete ${label}`} title="Delete">
        <TrashIcon />
      </button>
    </form>
  );
}

export function StaffDashboard({
  username,
  appointments,
  careers,
  callbacks,
}: {
  username: string;
  appointments: AppointmentRecord[];
  careers: CareerRecord[];
  callbacks: CallbackRecord[];
}) {
  const [tab, setTab] = useState<Tab>("appointments");
  const [view, setView] = useState<DeskView>("inbox");

  return (
    <div className="staff-shell">
      <header className="staff-topbar">
        <div>
          <p className="eyebrow">Staff desk</p>
          <h1>{view === "password" ? "Account security" : "Maximum Healthcare inbox"}</h1>
          <p>Signed in as {username}</p>
        </div>
        <div className="staff-topbar-actions">
          {view === "inbox" ? (
            <button type="button" className="btn btn-secondary" onClick={() => setView("password")}>
              Change password
            </button>
          ) : (
            <button type="button" className="btn btn-secondary" onClick={() => setView("inbox")}>
              Back to inbox
            </button>
          )}
          <form action={logoutStaff}>
            <button type="submit" className="btn btn-secondary">
              Sign out
            </button>
          </form>
        </div>
      </header>

      {view === "password" ? (
        <StaffPasswordForm onCancel={() => setView("inbox")} />
      ) : (
        <>
          <div className="staff-summary">
            <button
              type="button"
              className={`staff-stat${tab === "appointments" ? " is-active" : ""}`}
              onClick={() => setTab("appointments")}
            >
              <span>Appointments</span>
              <strong>{appointments.length}</strong>
            </button>
            <button
              type="button"
              className={`staff-stat${tab === "careers" ? " is-active" : ""}`}
              onClick={() => setTab("careers")}
            >
              <span>Career applications</span>
              <strong>{careers.length}</strong>
            </button>
            <button
              type="button"
              className={`staff-stat${tab === "callbacks" ? " is-active" : ""}`}
              onClick={() => setTab("callbacks")}
            >
              <span>Callback requests</span>
              <strong>{callbacks.length}</strong>
            </button>
          </div>

          {tab === "appointments" ? <AppointmentsPanel items={appointments} /> : null}
          {tab === "careers" ? <CareersPanel items={careers} /> : null}
          {tab === "callbacks" ? <CallbacksPanel items={callbacks} /> : null}
        </>
      )}
    </div>
  );
}

function AppointmentsPanel({ items }: { items: AppointmentRecord[] }) {
  if (items.length === 0) {
    return <EmptyState title="No appointment requests yet" body="When a patient submits the booking form, the request will appear here for the team to review and call back." />;
  }

  return (
    <section className="staff-panel" aria-labelledby="staff-appointments-heading">
      <div className="staff-panel-head">
        <h2 id="staff-appointments-heading">Appointment requests</h2>
        <p>Review preferred times, then call the patient to confirm a visit. These are requests, not booked slots.</p>
      </div>
      <ul className="staff-list">
        {items.map((item) => (
          <li className="staff-card" key={item.id}>
            <div className="staff-card-top">
              <div>
                <p className="staff-card-kicker">Appointment request</p>
                <h3>{item.fullName}</h3>
              </div>
              <div className="staff-card-actions">
                <time dateTime={item.submittedAt}>{formatWhen(item.submittedAt)}</time>
                <DeleteRequestButton id={item.id} label="appointment request" />
              </div>
            </div>
            <dl className="staff-meta">
              <div>
                <dt>Service</dt>
                <dd>{serviceName(item.service)}</dd>
              </div>
              <div>
                <dt>Preferred date</dt>
                <dd>{item.preferredDate ? formatDisplayDate(item.preferredDate) : "Not set"}</dd>
              </div>
              <div>
                <dt>Preferred time</dt>
                <dd>{item.timeOfDay ? timeLabel(item.timeOfDay) : "Not set"}</dd>
              </div>
              <div>
                <dt>Doctor</dt>
                <dd>{doctorName(item.doctor)}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${item.phone.replace(/\s+/g, "")}`}>{item.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{item.email || "Not provided"}</dd>
              </div>
            </dl>
            {item.note ? <p className="staff-note">{item.note}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CareersPanel({ items }: { items: CareerRecord[] }) {
  if (items.length === 0) {
    return <EmptyState title="No career applications yet" body="When someone submits the talent network form, their details will appear here for recruitment review." />;
  }

  return (
    <section className="staff-panel" aria-labelledby="staff-careers-heading">
      <div className="staff-panel-head">
        <h2 id="staff-careers-heading">Career applications</h2>
        <p>Applications of interest from the Careers page. These are not offers of employment.</p>
      </div>
      <ul className="staff-list">
        {items.map((item) => (
          <li className="staff-card" key={item.id}>
            <div className="staff-card-top">
              <div>
                <p className="staff-card-kicker">Career interest</p>
                <h3>{item.fullName}</h3>
              </div>
              <div className="staff-card-actions">
                <time dateTime={item.submittedAt}>{formatWhen(item.submittedAt)}</time>
                <DeleteRequestButton id={item.id} label="career application" />
              </div>
            </div>
            <dl className="staff-meta">
              <div>
                <dt>Preferred role</dt>
                <dd>{careerRoleLabel(item.role)}</dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>{careerExperienceLabel(item.experience)}</dd>
              </div>
              <div>
                <dt>Qualification</dt>
                <dd>{item.qualification || "Not provided"}</dd>
              </div>
              <div>
                <dt>City</dt>
                <dd>{item.city || "Not provided"}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${item.phone.replace(/\s+/g, "")}`}>{item.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{item.email || "Not provided"}</dd>
              </div>
            </dl>
            {item.note ? <p className="staff-note">{item.note}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CallbacksPanel({ items }: { items: CallbackRecord[] }) {
  if (items.length === 0) {
    return <EmptyState title="No callback requests yet" body="When a visitor asks for a callback, the request will appear here." />;
  }

  return (
    <section className="staff-panel" aria-labelledby="staff-callbacks-heading">
      <div className="staff-panel-head">
        <h2 id="staff-callbacks-heading">Callback requests</h2>
        <p>Return these calls during operational hours.</p>
      </div>
      <ul className="staff-list">
        {items.map((item) => (
          <li className="staff-card" key={item.id}>
            <div className="staff-card-top">
              <div>
                <p className="staff-card-kicker">Callback</p>
                <h3>{item.fullName}</h3>
              </div>
              <div className="staff-card-actions">
                <time dateTime={item.submittedAt}>{formatWhen(item.submittedAt)}</time>
                <DeleteRequestButton id={item.id} label="callback request" />
              </div>
            </div>
            <dl className="staff-meta">
              <div>
                <dt>Service interest</dt>
                <dd>{serviceName(item.service)}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${item.phone.replace(/\s+/g, "")}`}>{item.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{item.email || "Not provided"}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="staff-empty">
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}
