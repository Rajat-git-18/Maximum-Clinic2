import { Fragment, type ReactNode } from "react";
import { AddressLink } from "@/components/ui/AddressLink";
import { clinic } from "@/content/clinic";
import { mapsHref } from "@/lib/clinic-facts";

/** Renders text with optional `**important**` markers as brand-coloured emphasis. */
export function EmphasizedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          const inner = part.slice(2, -2);
          return (
            <strong key={`${part}-${index}`} className="em-brand">
              {linkAddressFragments(inner)}
            </strong>
          );
        }
        return <Fragment key={`${part}-${index}`}>{linkAddressFragments(part)}</Fragment>;
      })}
    </>
  );
}

function addressNeedles(): string[] {
  const needles = [clinic.address.street.trim(), "Gole Market, 358/A"].filter(Boolean);
  return [...new Set(needles)].sort((a, b) => b.length - a.length);
}

function linkAddressFragments(text: string): ReactNode {
  const maps = mapsHref();
  if (!maps || !text) return text;

  const needles = addressNeedles();
  if (needles.length === 0) return text;

  const pattern = new RegExp(`(${needles.map(escapeRegExp).join("|")})`, "g");
  const chunks = text.split(pattern).filter((chunk) => chunk.length > 0);
  if (chunks.length === 1) return text;

  return chunks.map((chunk, index) => {
    if (needles.includes(chunk)) {
      return (
        <AddressLink key={`${chunk}-${index}`} href={maps}>
          {chunk}
        </AddressLink>
      );
    }
    return <Fragment key={`${chunk}-${index}`}>{chunk}</Fragment>;
  });
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
