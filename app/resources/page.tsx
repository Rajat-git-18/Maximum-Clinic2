import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { FinalCta } from "@/components/home/FinalCta";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { clinic, getFaqs } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Patient resources",
  description: `Practical information for visiting ${clinic.name}, including how appointment requests work and what has not been published yet.`,
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient resources"
        title="Before you visit."
        lede="Practical information only. This page does not give medical advice, and it does not invent clinic policies that have not been confirmed."
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "Patient resources" },
        ]}
      />
      <section className="section">
        <Container narrow>
          <div className="prose">
            <p className="callout">{clinic.emergencyNote}</p>
            <h2>How an appointment is arranged</h2>
            <p>
              The <Link href="/book">appointment page</Link> collects a service, a preferred day, a preferred part of
              the day, and a way to reply. It does not show open slots, and it does not confirm the visit. The clinic
              confirms a time with you separately. You can also call{" "}
              {clinic.phones.map((item) => item.display).join(" or ")}.
            </p>
            <p>
              Until a booking inbox is connected, the form on this website is a preview and does not deliver the
              request.
            </p>
            <h2>A first visit</h2>
            <p>
              A checklist of what to bring has not been published. When a visit is confirmed, ask the clinic which
              documents or medicines to bring, and read the hours and location on the{" "}
              <Link href="/contact">contact page</Link>.
            </p>
            <h2>Changing a visit</h2>
            <p>
              This website cannot reschedule or cancel an appointment that the clinic has already agreed. Call{" "}
              {clinic.phones.map((item) => item.display).join(" or ")} and refer to the arrangement the clinic
              confirmed.
            </p>
            <h2>What this website is not</h2>
            <p>
              It is not a patient portal, a medical record, or a place to send a detailed history. Do not include
              sensitive health information in the appointment note.
            </p>
          </div>
        </Container>
      </section>
      <section className="section section-tight">
        <Container>
          <h2>Common questions</h2>
          <Accordion items={getFaqs()} />
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
