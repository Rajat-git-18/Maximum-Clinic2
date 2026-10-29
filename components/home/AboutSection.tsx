import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinic } from "@/content/clinic";

export function AboutSection() {
  return (
    <section className="section" aria-labelledby="about-heading">
      <Container>
        <div className="about-grid">
          <div>
            <SectionHeading id="about-heading" eyebrow={clinic.about.eyebrow} title={clinic.about.title} />
            <div className="prose">
              {clinic.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Button href="/about" variant="secondary">
              About the clinic
            </Button>
          </div>
          <PlaceholderMedia
            label="Clinic interior"
            caption="Placeholder for a photograph of the clinic. Not a picture of this practice."
            motif="window"
            tone="sage"
            ratio="landscape"
          />
        </div>
      </Container>
    </section>
  );
}
