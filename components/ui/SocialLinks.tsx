import type { ReactElement } from "react";
import { clinic } from "@/content/clinic";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.2 21v-7.1h2.4l.4-2.8h-2.8V9.3c0-.8.2-1.4 1.4-1.4H17V5.4c-.2 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2h-2.3v2.8H11.4V21h2.8Z"
      />
    </svg>
  );
}

const icons: Record<string, () => ReactElement> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
};

export function SocialLinks() {
  if (clinic.social.length === 0) return null;

  return (
    <ul className="social-row">
      {clinic.social.map((item) => {
        const Icon = icons[item.label];
        return (
          <li key={item.href}>
            <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
              {Icon ? <Icon /> : item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
