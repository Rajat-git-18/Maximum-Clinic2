import type { ReactNode } from "react";

type MarkId = "nabh" | "nabl" | "afi" | string;

function Seal({ children }: { children: ReactNode }) {
  return (
    <svg className="accreditation-mark" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="var(--sage)" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="var(--green)" strokeWidth="2.4" />
      <circle cx="60" cy="60" r="42" fill="none" stroke="var(--green)" strokeWidth="0.8" opacity="0.45" />
      {children}
    </svg>
  );
}

function NabhMark() {
  return (
    <Seal>
      <rect x="55" y="28" width="10" height="38" rx="2" fill="var(--accent)" />
      <rect x="41" y="42" width="38" height="10" rx="2" fill="var(--accent)" />
      <path d="M38 78h44" fill="none" stroke="var(--green)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M44 86h32" fill="none" stroke="var(--green)" strokeWidth="2.2" strokeLinecap="round" />
    </Seal>
  );
}

function NablMark() {
  return (
    <Seal>
      <path
        d="M48 34h24l6 40H42l6-40Z"
        fill="none"
        stroke="var(--green)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M52 48h16M50 58h20" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="60" cy="82" r="6" fill="var(--accent)" />
    </Seal>
  );
}

function AfiMark() {
  return (
    <Seal>
      <path d="M42 78c6-28 30-28 36 0" fill="none" stroke="var(--green)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M48 50c4 10 20 10 24 0" fill="none" stroke="var(--green)" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="68" cy="44" r="7" fill="var(--accent)" />
      <path
        d="M74 34l6-8M80 44h8M74 54l6 8"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </Seal>
  );
}

export function AccreditationMark({ id }: { id: MarkId }) {
  if (id === "nabh") return <NabhMark />;
  if (id === "nabl") return <NablMark />;
  return <AfiMark />;
}
