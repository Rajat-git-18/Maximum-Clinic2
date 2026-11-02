"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { AccreditationMark } from "@/components/ui/AccreditationMarks";
import { clinic } from "@/content/clinic";

function jumpToHash(event: MouseEvent<HTMLAnchorElement>, href: string) {
  const target = document.querySelector(href);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "instant", block: "start" });
  window.history.replaceState(null, "", href);
}

export function AccreditationStrip({ href = "/about" }: { href?: string }) {
  const hash = href.startsWith("#");

  return (
    <ul className="accreditation-strip">
      {clinic.accreditations.map((item) => {
        const content = (
          <>
            <AccreditationMark id={item.id} />
            <span>
              <strong>{item.short}</strong>
              <small>{item.name}</small>
            </span>
          </>
        );

        return (
          <li key={item.id}>
            {hash ? (
              <a className="accreditation-tag" href={href} title={item.name} onClick={(event) => jumpToHash(event, href)}>
                {content}
              </a>
            ) : (
              <Link className="accreditation-tag" href={href} title={item.name}>
                {content}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
