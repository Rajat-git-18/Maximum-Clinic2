import { Accreditations } from "@/components/home/Accreditations";
import { FinalCta } from "@/components/home/FinalCta";
import { PromiseGrid } from "@/components/home/PromiseGrid";
import { Container } from "@/components/ui/Container";
import { EmphasizedText } from "@/components/ui/EmphasizedText";
import { PageHero } from "@/components/ui/PageHero";
import { clinic } from "@/content/clinic";
import { plainText } from "@/lib/clinic-facts";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "About",
  description: `${clinic.about.title}. ${plainText(clinic.about.lede)} ${clinic.name} in ${clinic.cityCountry}, operated by ${clinic.legalName}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={clinic.about.eyebrow}
        title={clinic.about.title}
        lede={clinic.about.lede}
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "About" },
        ]}
      />
      <section className="section">
        <Container>
          <div className="prose about-copy">
            {clinic.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <EmphasizedText text={paragraph} />
              </p>
            ))}
            <p className="callout">
              <EmphasizedText text={clinic.quality.tagline} />
            </p>
          </div>
        </Container>
      </section>
      <section className="section" aria-labelledby="about-specialties-heading">
        <Container>
          <h2 id="about-specialties-heading">{clinic.about.specialtiesTitle}</h2>
          <ul className="about-specialties">
            {clinic.services.map((service) => (
              <li key={service.slug}>
                <h3>{service.name}</h3>
                <p>
                  <EmphasizedText text={service.summary} />
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="section" aria-labelledby="about-expect-heading">
        <Container>
          <h2 id="about-expect-heading">What patients can expect at Maximum Healthcare</h2>
          <PromiseGrid />
        </Container>
      </section>
      <Accreditations />
      <FinalCta />
    </>
  );
}
