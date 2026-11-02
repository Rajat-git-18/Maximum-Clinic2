import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { clinic } from "@/content/clinic";
import { whatsappHref } from "@/lib/clinic-facts";

export function FinalCta() {
  const whatsapp = clinic.whatsappEnabled ? whatsappHref(clinic.phone) : null;

  return (
    <section className="final-cta band-dark" aria-labelledby="final-cta-heading">
      <Container>
        <p className="eyebrow">{clinic.finalCta.eyebrow}</p>
        <h2 id="final-cta-heading">{clinic.finalCta.title}</h2>
        <p className="lede">{clinic.finalCta.body}</p>
        <div className="cta-row">
          <Button href="/book" variant="inverse">
            {clinic.finalCta.cta}
          </Button>
          {whatsapp ? (
            <a className="btn btn-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
