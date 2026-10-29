import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceList } from "@/components/home/ServiceList";

export function ServicesSection() {
  return (
    <section className="section" id="services" aria-labelledby="services-heading">
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow="Services"
          title="Care, named plainly."
          lede="These are the services named on the clinic’s public listing. Call to ask which one fits the visit."
          split
        />
        <ServiceList />
      </Container>
    </section>
  );
}
