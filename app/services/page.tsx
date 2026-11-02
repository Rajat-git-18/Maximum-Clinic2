import { BookWindow } from "@/components/home/BookWindow";
import { FinalCta } from "@/components/home/FinalCta";
import { SpecialtiesGrid } from "@/components/home/SpecialtiesGrid";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Services",
  description: `Bone and joint care, spine care, arthritis treatment, and foot and ankle care at ${clinic.name} in Gandhi Nagar, Jammu.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Our specialties."
        lede="Choose a specialty to read the short description, then call or request a callback if it is the right visit."
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "Services" },
        ]}
      />
      <section className="section">
        <Container>
          <SpecialtiesGrid />
          <BookWindow />
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
