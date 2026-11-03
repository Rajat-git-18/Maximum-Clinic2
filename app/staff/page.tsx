import { Suspense } from "react";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { StaffDashboard } from "@/components/staff/StaffDashboard";
import { STAFF_COOKIE, verifyStaffSessionToken } from "@/lib/staff-auth";
import { appointmentsFrom, callbacksFrom, careersFrom, listInboxRecords } from "@/lib/staff-inbox";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Staff desk",
  description: "Staff inbox for appointment requests and career applications at Maximum Healthcare.",
  path: "/staff",
  noIndex: true,
});

async function StaffDeskContent() {
  await connection();
  const jar = await cookies();
  const session = verifyStaffSessionToken(jar.get(STAFF_COOKIE)?.value);
  if (!session) redirect("/staff/login");

  const records = await listInboxRecords();

  return (
    <StaffDashboard
      username={session.username}
      appointments={appointmentsFrom(records)}
      careers={careersFrom(records)}
      callbacks={callbacksFrom(records)}
    />
  );
}

export default function StaffDeskPage() {
  return (
    <Suspense
      fallback={
        <div className="staff-shell">
          <div className="staff-empty">
            <h2>Loading staff desk…</h2>
            <p>Preparing appointment and career records.</p>
          </div>
        </div>
      }
    >
      <StaffDeskContent />
    </Suspense>
  );
}
