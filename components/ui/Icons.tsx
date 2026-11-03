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
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.012 2c-5.508 0-9.989 4.481-9.989 9.989 0 1.884.522 3.647 1.43 5.161l-1.517 5.541 5.688-1.492c1.463.8 3.125 1.258 4.888 1.258 5.508 0 9.989-4.481 9.989-9.989s-4.481-9.989-9.989-9.989zm5.908 14.127c-.247.693-1.229 1.272-1.987 1.343-.519.048-1.192.086-3.473-.858-2.919-1.208-4.795-4.186-4.94-4.38-.145-.194-1.185-1.579-1.185-3.011 0-1.432.747-2.138 1.012-2.428.265-.289.578-.362.771-.362.193 0 .386.002.554.01.181.008.422-.068.66.506.241.578.819 1.999.892 2.144.072.145.12.313.024.506-.096.193-.145.313-.289.482-.145.169-.304.378-.435.506-.145.145-.296.304-.127.593.169.289.751 1.238 1.613 2.007 1.109.988 2.045 1.294 2.334 1.439.289.145.458.12.626-.072.169-.193.723-.843.916-1.132.193-.289.386-.241.65-.145.265.096 1.686.795 1.975.939.289.145.482.217.554.337.072.12.072.698-.175 1.391z"
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
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M16 3h5v5" />
      <path d="M21 3l-7 7" />
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
