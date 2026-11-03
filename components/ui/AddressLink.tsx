import type { ReactNode } from "react";

export function AddressLink({
  href,
  children,
  className = "address-link",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens Google Maps in a new tab)</span>
    </a>
  );
}
