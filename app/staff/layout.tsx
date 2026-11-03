import type { ReactNode } from "react";

export default function StaffLayout({ children }: { children: ReactNode }) {
  return <div className="staff-route">{children}</div>;
}
