"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PublicOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/staff")) return null;
  return children;
}
