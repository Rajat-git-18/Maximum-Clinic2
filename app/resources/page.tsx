import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { FinalCta } from "@/components/home/FinalCta";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { clinic, getFaqs } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Patient resources",
  description: `Practical information for visiting ${clinic.name}, including appointments, first-visit guidance, and clinic contact details.`,
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient resources"
        title="Before you visit."
        lede="Practical guidance for appointments, first visits, and contacting Maximum Healthcare in Gandhi Nagar, Jammu."
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
              Use the <Link href="/book">appointment page</Link> to share your preferred service, day, and part of the
              day, along with a contact number. Our team reviews the request and calls you back to confirm a suitable
              visit time. You can also call {clinic.phones.map((item) => item.display).join(" or ")} directly.
            </p>
            <h2>A first visit</h2>
            <p>
              Please bring a government-issued ID, previous reports or imaging related to your concern, a list of
              current medicines, and any referral or insurance papers you hold. Check hours and directions on the{" "}
              <Link href="/contact">contact page</Link> before you travel.
            </p>
            <h2>Changing a visit</h2>
            <p>
              To reschedule or cancel a confirmed appointment, call{" "}
              {clinic.phones.map((item) => item.display).join(" or ")} and share the details already confirmed with
              you. Our administrative team will help arrange a new time.
            </p>
            <h2>Privacy during online requests</h2>
            <p>
              Please keep appointment notes brief. Do not include a detailed medical history or sensitive health
              information in the online form. Share clinical details only during your consultation with the care team.
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
