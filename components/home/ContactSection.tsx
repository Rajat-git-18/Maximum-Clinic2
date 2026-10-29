import { ContactDetails } from "@/components/contact/ContactDetails";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactSection() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <Container>
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title="Find the clinic."
          lede="Call either published number, or send an appointment request. The form does not confirm a visit by itself."
        />
        <ContactDetails titleLevel="h3" />
      </Container>
    </section>
  );
}
