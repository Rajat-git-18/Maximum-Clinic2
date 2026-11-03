import type { ServiceIcon } from "@/content/clinic";

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.7 10.7c1.5 2.9 3.9 5.3 6.8 6.8l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.1 2.8Z"
      />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2c-5.5 0-10 4.4-10 9.9 0 1.7.4 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3.1 1.2 4.7 1.2h.1c5.5 0 10-4.5 10-9.9C22.1 6.4 17.6 2 12.04 2Zm5.8 14.1c-.2.7-1.4 1.3-1.9 1.4-.5.1-1.1.1-3.5-.7-2.9-1.2-4.8-4.1-4.9-4.3-.2-.2-1.6-2.1-1.6-4s1-2.8 1.3-3.2c.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .7.6l1 2.3c.1.2 0 .5-.2.7l-.5.6c-.2.2-.4.4-.2.8.3.4 1 1.6 2.2 2.6 1.5 1.2 2.7 1.6 3.1 1.8.4.1.6.1.8-.1l.9-1.2c.2-.3.5-.2.8-.1l2.5 1.2c.3.1.5.2.6.5.1.7 0 1.8-.4 2.6Z"
      />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16.5L20.2 20.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CallbackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 4a8 8 0 1 1-7.4 4.9.9.9 0 0 1 1.7.6A6.2 6.2 0 1 0 12 5.8V8l4-3.2L12 1.5V4Z"
      />
    </svg>
  );
}

export function StaffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 12a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12Zm0 2.2c-3.6 0-8 1.8-8 4.3V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-2.5-4.4-4.3-8-4.3Z"
      />
    </svg>
  );
}

function JointMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="22" fill="var(--sage)" />
      <path d="M24 14c6 8 6 28 0 36" fill="none" stroke="var(--green)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M40 14c-6 8-6 28 0 36" fill="none" stroke="var(--green)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M22 32h20" fill="none" stroke="var(--accent)" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="32" cy="32" r="5" fill="var(--accent)" />
    </svg>
  );
}

function SpineMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="22" fill="var(--sage)" />
      <path d="M32 12c4 6-4 8 0 14s-4 8 0 14-4 8 0 12" fill="none" stroke="var(--green)" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="32" cy="20" r="3.2" fill="var(--accent)" />
      <circle cx="32" cy="32" r="3.2" fill="var(--accent)" />
      <circle cx="32" cy="44" r="3.2" fill="var(--accent)" />
    </svg>
  );
}

function ArthritisMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="22" fill="var(--sage)" />
      <path d="M22 40c4-16 16-16 20 0" fill="none" stroke="var(--green)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M26 24c2 6 10 6 12 0" fill="none" stroke="var(--green)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="38" cy="22" r="4" fill="var(--accent)" />
      <path d="M42 16l4-5M46 22h6M42 28l4 5" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function FootMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="22" fill="var(--sage)" />
      <path d="M18 38c8-2 16-12 28-10 4 8-2 18-14 18-8 0-14-4-14-8Z" fill="none" stroke="var(--green)" strokeWidth="3" />
      <path d="M28 30c2 4 8 6 14 4" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const marks: Record<ServiceIcon, () => ReturnType<typeof JointMark>> = {
  joint: JointMark,
  spine: SpineMark,
  arthritis: ArthritisMark,
  foot: FootMark,
};

export function ServiceMark({ icon }: { icon: ServiceIcon }) {
  const Mark = marks[icon];
  return <Mark />;
}

export function ProcedureDot() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="var(--sage)" />
      <path d="M8 12.5l2.4 2.4 5.2-5.4" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
