"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { clinic } from "@/content/clinic";

function jumpToHash(event: MouseEvent<HTMLAnchorElement>, href: string) {
  const target = document.querySelector(href);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "instant", block: "start" });
  window.history.replaceState(null, "", href);
}

export function AccreditationBar() {
  const pathname = usePathname();
  const hashHref = "#accreditations";
  const href = pathname === "/" ? hashHref : `/${hashHref}`;
  const label = clinic.accreditations.map((item) => `${item.short}, ${item.name}`).join(". ");

  return (
    <div className="accreditation-bar" role="region" aria-label="Accreditations">
      <a
        className="accreditation-ribbon"
        href={href}
        aria-label={`${label}. Open accreditation details.`}
        onClick={pathname === "/" ? (event) => jumpToHash(event, hashHref) : undefined}
      >
        {clinic.accreditations.map((item) => (
          <span key={item.id} className="accreditation-chip" title={item.name}>
            {item.short}
          </span>
        ))}
      </a>
    </div>
  );
}
