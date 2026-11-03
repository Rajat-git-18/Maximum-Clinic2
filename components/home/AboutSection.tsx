import { ClinicPhoto } from "@/components/media/ClinicPhoto";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinic } from "@/content/clinic";

export function AboutSection() {
  return (
    <section className="section" aria-labelledby="about-heading">
      <Container>
        <div className="about-grid">
          <div>
            <SectionHeading
              id="about-heading"
              eyebrow={clinic.about.eyebrow}
              title={clinic.about.title}
              lede={clinic.about.lede}
            />
            <div className="prose">
              {clinic.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="cta-row">
              <Button href="/about">Read more about us</Button>
            </div>
          </div>
          <ClinicPhoto photo={clinic.gallery[0]} />
        </div>
      </Container>
    </section>
  );
}
