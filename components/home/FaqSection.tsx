import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFaqs } from "@/content/clinic";

export function FaqSection() {
  const faqs = getFaqs();
  if (faqs.length === 0) return null;

  return (
    <section className="section" aria-labelledby="faq-heading">
      <Container>
        <div className="faq-layout">
          <SectionHeading
            id="faq-heading"
            eyebrow="Questions"
            title="Answers from what is actually published."
            lede="Where a policy has not been confirmed, the answer says so."
          />
          <Accordion items={faqs} />
        </div>
      </Container>
    </section>
  );
}
