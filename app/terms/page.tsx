import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Terms of use",
  description: `Draft terms for the ${clinic.name} website. They explain the limits of the appointment form and need legal review.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      lede="Draft terms for this website. They are not legal advice and they do not choose a governing law. The clinic should have them reviewed before publication."
    >
      <p>Status: draft template, not yet adopted by the clinic.</p>
      <h2>Information, not personal medical advice</h2>
      <p>
        Pages on this site describe how to find the clinic and how to request a visit. They are not a diagnosis, a
        treatment plan, or a substitute for a consultation. Clinical decisions belong in a conversation with a
        qualified clinician.
      </p>
      <h2>Emergencies</h2>
      <p>{clinic.emergencyNote}</p>
      <h2>Appointments</h2>
      <p>
        Sending the <Link href="/book">appointment form</Link> does not create a confirmed appointment. A time is
        agreed only when the clinic tells you so. If the form says the request was not sent, the clinic has not
        received it.
      </p>
      <h2>Acceptable use</h2>
      <p>
        Do not use the form to send another person’s details without their permission, to send a medical history, or
        to disrupt the site.
      </p>
      <h2>Liability</h2>
      <p>
        A limitation of liability, and the law that governs these terms, must be added for the clinic’s jurisdiction.
        Neither has been specified, so this draft does not pretend that a particular limit applies.
      </p>
      <h2>Changes</h2>
      <p>Replace this page when the clinic adopts a reviewed set of terms, and add the date of that review.</p>
    </LegalPage>
  );
}
