import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Accessibility",
  description: `Accessibility information for the ${clinic.name} website, including what has been built and what is still limited.`,
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Access"
      title="Accessibility"
      lede="This website aims to meet WCAG 2.2 AA. That is a design target, not a formal certification."
    >
      <h2>What is in place</h2>
      <ul>
        <li>Pages use headings, landmarks, and labels in a consistent order.</li>
        <li>The menu, form, and questions can be used with a keyboard.</li>
        <li>Focus is visible, and colour is not the only way an error is shown.</li>
        <li>Text and background colours were checked for contrast.</li>
        <li>Motion is reduced when the device asks for that.</li>
        <li>Image frames that are not photographs are described that way, and they are not presented as the clinic.</li>
        <li>Clinic films use a native player with controls. Each film loads only after you press play, and none autoplay with sound.</li>
      </ul>
      <h2>Known limits</h2>
      <ul>
        <li>Gallery photographs are clinic-supplied stills. They are labelled by room, not as a live view of the clinic.</li>
        <li>Written transcripts for the clinic films have not been published yet.</li>
        <li>The appointment form cannot be completed as a real booking until an inbox is connected.</li>
        <li>The interface is in English. Hindi can be added when translations are supplied.</li>
        <li>A public email address has not been published. Individual doctor profiles are not listed on this website.</li>
      </ul>
      <h2>If something blocks you</h2>
      <p>
        Call {clinic.phones.map((item) => item.display).join(" or ")}. Say which page you were on and what you were
        trying to do. You can also start from the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
      <h2>Clinic access</h2>
      <p>
        Physical access to the building — step-free entry, parking, and assistance — will be described here only when
        the clinic confirms it. It is not guessed on this page.
      </p>
    </LegalPage>
  );
}
