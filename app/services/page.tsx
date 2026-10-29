import { FinalCta } from "@/components/home/FinalCta";
import { ServiceList } from "@/components/home/ServiceList";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Services",
  description: `Services named on the public listing for ${clinic.name} in Gandhi Nagar, Jammu.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Care, named plainly."
        lede="Choose a service to read the short description, then request an appointment if it is the right pathway."
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "Services" },
        ]}
      />
      <section className="section">
        <Container>
          <ServiceList />
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
