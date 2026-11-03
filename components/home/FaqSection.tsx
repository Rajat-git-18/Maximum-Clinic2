import { JsonLdScript } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFaqs } from "@/content/clinic";
import { plainText } from "@/lib/clinic-facts";

export function FaqSection() {
  const faqs = getFaqs();
  if (faqs.length === 0) return null;

  return (
    <section className="section" aria-labelledby="faq-heading">
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: plainText(item.question),
            acceptedAnswer: {
              "@type": "Answer",
              text: plainText(item.answer),
            },
          })),
        }}
      />
      <Container>
        <div className="faq-layout">
          <SectionHeading
            id="faq-heading"
            eyebrow="Questions"
            title="Common questions about Maximum Healthcare."
            lede="Clear answers on appointments, visits, services, and how to reach the clinic in **Jammu, Srinagar, and Rajouri**."
          />
          <Accordion items={faqs} />
        </div>
      </Container>
    </section>
  );
}
