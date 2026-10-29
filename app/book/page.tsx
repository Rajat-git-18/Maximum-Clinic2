import { Suspense } from "react";
import { AppointmentForm } from "@/components/booking/AppointmentForm";
import { PageHero } from "@/components/ui/PageHero";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Book an appointment",
  description: `Request an appointment at ${clinic.name}. The form does not confirm a time, and a preview submission is not delivered.`,
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Request an appointment."
        lede="Four short steps. A preferred time is not a reservation. Until a booking inbox is connected, submitting the form does not send your details."
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "Book an appointment" },
        ]}
      />
      <section className="section">
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
