import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Privacy policy",
  description: `Draft privacy notice for ${clinic.name}. It describes the appointment preview and must be reviewed before publication.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      lede="This is a draft notice for the website, not a claim of regulatory compliance. A lawyer should review it before the clinic relies on it."
    >
      <p>
        Status: draft template, not yet adopted by the clinic. It explains what this version of the site actually
        does.
      </p>
      <h2>Who the site is for</h2>
      <p>
        The site publishes information about {clinic.name} and lets someone prepare an appointment request. It is not
        a patient portal and it does not hold a medical record.
      </p>
      <h2>What the appointment form asks for</h2>
      <p>The form asks only for details needed to reply about a visit:</p>
      <ul>
        <li>Service</li>
        <li>Doctor, only when the clinic has published a doctor profile</li>
        <li>Preferred date and part of the day</li>
        <li>Name and phone number</li>
        <li>Email, if you choose to leave one</li>
        <li>An optional short note</li>
      </ul>
      <p>
        Do not use the note for a detailed medical history. The form is not a secure clinical messaging system.
      </p>
      <h2>What happens when you submit</h2>
      <p>
        If no booking inbox has been connected, the form checks the details and then stops. Nothing is emailed,
        stored in a database, or saved in the browser. The confirmation on screen will say that the request was not
        sent.
      </p>
      <p>
        If the clinic later connects an intake address, the same details are sent from the server to that address
        over HTTPS so the clinic can reply. Delivery still does not confirm an appointment. The server does not put
        those details into analytics.
      </p>
      <h2>What this site does not do</h2>
      <ul>
        <li>It does not run advertising or analytics that receive patient details.</li>
        <li>It does not store the appointment form in local storage.</li>
        <li>It does not set tracking cookies.</li>
        <li>It does not sell contact details.</li>
      </ul>
      <h2>How long details would be kept</h2>
      <p>
        This template does not keep a copy. Once an intake service is connected, the clinic must decide how long it
        keeps request messages, who can read them, and how people can ask for a correction or deletion. Those rules
        are not stated here because they have not been set.
      </p>
      <h2>Contact</h2>
      <p>
        The clinic has not published an email address. Privacy questions can be asked by phone. The numbers are on
        the <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
