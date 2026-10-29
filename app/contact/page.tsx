import { ContactDetails } from "@/components/contact/ContactDetails";
import { FinalCta } from "@/components/home/FinalCta";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Contact",
  description: `Contact ${clinic.name} in ${clinic.cityCountry}. A map is shown only when a verified street address is published.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact and location."
        lede="Call either published number, or open directions for the Gandhi Nagar clinic. The appointment form does not confirm a visit by itself."
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "Contact" },
        ]}
      />
      <section className="section">
        <Container>
          <ContactDetails />
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
