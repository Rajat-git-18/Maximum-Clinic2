import { Suspense } from "react";
import { StaffLoginForm } from "@/components/staff/StaffLoginForm";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Staff login",
  description: "Secure staff login for Maximum Healthcare appointment and career inbox.",
  path: "/staff/login",
  noIndex: true,
});

function LoginFallback() {
  return (
    <div className="staff-login-form" aria-hidden="true">
      <div className="staff-login-brand">
        <p className="eyebrow">Staff access</p>
        <h1>Maximum Healthcare staff login</h1>
        <p>Loading the secure staff sign-in form…</p>
      </div>
    </div>
  );
}

export default function StaffLoginPage() {
  return (
    <div className="staff-login-page">
      <Suspense fallback={<LoginFallback />}>
        <StaffLoginForm />
      </Suspense>
    </div>
  );
}
