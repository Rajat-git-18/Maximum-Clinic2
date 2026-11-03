import { Suspense } from "react";
import { AppointmentForm } from "@/components/booking/AppointmentForm";
import { PageHero } from "@/components/ui/PageHero";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Book an appointment",
  description: `Request an appointment at ${clinic.name}. Our team reviews your preferred time and calls you back to confirm the visit.`,
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Request an appointment."
        lede="Four short steps. Share your preferred day and time, and our team will call you back to confirm a suitable visit."
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "Book an appointment" },
        ]}
      />
      <section className="section" id="appointment-form">
        <div className="container container-wide">
          <p className="callout book-note">{clinic.emergencyNote}</p>
          <Suspense fallback={<p className="form-loading">Loading the request form…</p>}>
            <AppointmentForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
