import { BookWindow } from "@/components/home/BookWindow";
import { SpecialtiesGrid } from "@/components/home/SpecialtiesGrid";
import { Container } from "@/components/ui/Container";

export function ServicesSection() {
  return (
    <section className="section specialties-section" id="services" aria-labelledby="services-heading">
      <Container>
        <div className="specialties-heading">
          <h2 id="services-heading">
            Our <span>Specialties</span>
          </h2>
          <p>Bone and joint care, spine care and rehabilitation, arthritis treatment, and foot and ankle care.</p>
        </div>
        <SpecialtiesGrid />
        <BookWindow />
      </Container>
    </section>
  );
}
