import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { clinic } from "@/content/clinic";

export function FinalCta() {
  return (
    <section className="final-cta band-dark" aria-labelledby="final-cta-heading">
      <Container>
        <p className="eyebrow">{clinic.finalCta.eyebrow}</p>
        <h2 id="final-cta-heading">{clinic.finalCta.title}</h2>
        <p className="lede">{clinic.finalCta.body}</p>
        <Button href="/book" variant="inverse">
          {clinic.finalCta.cta}
        </Button>
      </Container>
    </section>
  );
}
