import { LegalPage } from "@/components/layout/LegalPage";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Terms of use",
  description: `Terms of use for the ${clinic.name} website, operated by ${clinic.legalName}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Use"
      lede="The terms that apply when you use the Maximum Healthcare Pvt. Ltd. website."
    >
      <h2>1. Acceptance of terms</h2>
      <p>
        By accessing and using this website, you agree to comply with and be bound by the following Terms of Use. This
        website is owned and operated by Maximum Healthcare Pvt. Ltd., located in Gandhi Nagar, Jammu, J&amp;K.
      </p>

      <h2>2. Informational purpose (no medical advice)</h2>
      <ul>
        <li>
          <strong>General information:</strong> all content published on this website, including treatment
          descriptions, service overviews, and video insights, is provided strictly for general informational and
          educational purposes.
        </li>
        <li>
          <strong>No doctor-patient relationship:</strong> browsing this site or submitting an online form does not
          establish a formal doctor-patient relationship. Content on this site is not a substitute for professional
          medical diagnosis, advice, or treatment. Always consult a qualified physician regarding any health condition.
        </li>
      </ul>

      <h2>3. Emergency care disclaimer</h2>
      <p>
        <strong>Not for emergencies.</strong> This website and its online forms are designed exclusively for routine
        OPD appointments and general inquiries. Do not use this site for medical emergencies. In case of a
        life-threatening emergency, please visit the nearest hospital emergency room or contact emergency medical
        services immediately.
      </p>

      <h2>4. Appointment requests and scheduling</h2>
      <ul>
        <li>
          <strong>Non-binding requests:</strong> submitting an appointment request form does not guarantee a confirmed
          appointment or a specific time slot.
        </li>
        <li>
          <strong>Confirmation process:</strong> a visit is considered official only after our clinic administrative
          team contacts you directly via phone or WhatsApp to confirm your appointment details.
        </li>
      </ul>

      <h2>5. Acceptable use policy</h2>
      <p>When utilizing our online forms, you agree to:</p>
      <ul>
        <li>Provide accurate and truthful contact information.</li>
        <li>Refrain from submitting third-party personal details without proper authorization.</li>
        <li>Avoid transmitting sensitive, confidential, or extensive medical histories through online web forms.</li>
        <li>Abstain from attempting to disrupt, overload, or compromise the technical security of the website.</li>
      </ul>

      <h2>6. Intellectual property and modifications</h2>
      <ul>
        <li>
          <strong>Content ownership:</strong> all branding elements, layout designs, media assets, and text content are
          the property of Maximum Healthcare Pvt. Ltd.
        </li>
        <li>
          <strong>Updates:</strong> Maximum Healthcare reserves the right to update or modify these Terms of Use and
          website content at any time without prior notice.
        </li>
      </ul>

      <h2>7. Contact information</h2>
      <p>For any formal inquiries or clarifications regarding these Terms of Use, please reach out to our office:</p>
      <ul>
        <li>
          <strong>Facility:</strong> Maximum Healthcare Pvt. Ltd.
        </li>
        <li>
          <strong>Address:</strong> Gole Market, 358/A, opp. Peer Baba, Apsara Road, Gandhi Nagar, Jammu, J&amp;K
          180004
        </li>
        <li>
          <strong>Phone helpdesk:</strong> <a href="tel:+919419029200">+91 94190 29200</a>
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
        </li>
      </ul>
    </LegalPage>
  );
}
