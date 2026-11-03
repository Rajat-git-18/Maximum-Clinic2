import { Fragment } from "react";

/** Renders text with optional `**important**` markers as brand-coloured emphasis. */
export function EmphasizedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return (
            <strong key={`${part}-${index}`} className="em-brand">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
      })}
    </>
  );
}
