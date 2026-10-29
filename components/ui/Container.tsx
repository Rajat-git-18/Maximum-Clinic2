import type { ReactNode } from "react";

export function Container({
  children,
  narrow = false,
  wide = false,
}: {
  children: ReactNode;
  narrow?: boolean;
  wide?: boolean;
}) {
  const width = narrow ? " container-narrow" : wide ? " container-wide" : "";
  return <div className={`container${width}`}>{children}</div>;
}
