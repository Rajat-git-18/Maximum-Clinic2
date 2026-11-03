import { LegalPage } from "@/components/layout/LegalPage";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Privacy policy",
  description: `How ${clinic.legalName} handles personal information collected through the ${clinic.name} website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy & Data Protection Notice"
      lede="How Maximum Healthcare Pvt. Ltd. handles personal information collected through this website."
    >
      <h2>1. Overview &amp; scope</h2>
      <p>
        At Maximum Healthcare Pvt. Ltd. (Gandhi Nagar, Jammu), we value your privacy and are committed to protecting
        your personal information. This Privacy Notice outlines how data collected through our official website is
        handled.
      </p>
      <p>
        This website serves as an informational platform and appointment request interface. It does not store personal
        health records (EHR) or function as a clinical patient portal.
      </p>

      <h2>2. Information we collect</h2>
      <p>We only request details strictly necessary to facilitate your visit or career inquiry:</p>
      <ul>
        <li>
          <strong>Appointment requests:</strong> preferred service or specialty, preferred date and time, full name,
          phone number, optional email address, and brief visit notes. Please avoid sharing sensitive or extensive
          clinical history via online forms.
        </li>
        <li>
          <strong>Career inquiries:</strong> full name, contact phone number, optional email, areas of professional
          interest, qualifications, and years of experience.
        </li>
      </ul>

      <h2>3. How your information is used and transmitted</h2>
      <ul>
        <li>
          <strong>Communication and scheduling:</strong> information provided in our forms is used solely by our
          administrative team to contact you, confirm appointment availability, or respond to employment inquiries.
        </li>
        <li>
          <strong>Secure transmission:</strong> all submissions are transmitted securely via encrypted protocols
          (HTTPS).
        </li>
        <li>
          <strong>No third-party sharing:</strong> we do not sell, rent, trade, or share your contact details with
          external advertising networks or data brokers.
        </li>
        <li>
          <strong>Zero tracking cookies:</strong> this website does not deploy invasive tracking cookies or third-party
          behavioral advertising scripts to harvest personal patient data.
        </li>
      </ul>

      <h2>4. Data security and retention</h2>
      <p>
        Form submissions are handled directly by Maximum Healthcare’s administrative helpdesk for direct follow-ups.
      </p>
      <p>
        We do not maintain unencrypted public databases of online form requests. Patient communication records are
        retained in accordance with standard clinical administrative practices.
      </p>

      <h2>5. Privacy inquiries and contact</h2>
      <p>
        If you have any questions regarding your data privacy or wish to update your contact preferences, please reach
        out to our administrative office directly:
      </p>
      <ul>
        <li>
          <strong>Facility:</strong> Maximum Healthcare Pvt. Ltd.
        </li>
        <li>
          <strong>Address:</strong> Gole Market, 358/A, opp. Peer Baba, Apsara Road, Gandhi Nagar, Jammu, J&amp;K
          180004
        </li>
        <li>
          <strong>Phone assistance:</strong> <a href="tel:+919419029200">+91 94190 29200</a>
        </li>
      </ul>
    </LegalPage>
  );
}
