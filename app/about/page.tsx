import { Accreditations } from "@/components/home/Accreditations";
import { FinalCta } from "@/components/home/FinalCta";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "About",
  description: `${clinic.legalName} operates ${clinic.name}, a ${clinic.speciality} practice in ${clinic.cityCountry}. Quality-driven, ethical and patient-centric care, with NABH, NABL, and Arthritis Foundation of India affiliations.`,
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
          <div className="about-grid">
            <div className="prose">
              {clinic.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="callout">{clinic.quality.tagline}</p>
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
      <Accreditations />
      <section className="section">
        <Container>
          <h2>What patients can expect</h2>
          <ol className="principle-list">
            {clinic.principles.map((principle, index) => (
              <li key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
