import { FinalCta } from "@/components/home/FinalCta";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "About",
  description: `${clinic.name} is a ${clinic.speciality} practice in ${clinic.cityCountry}. This page describes the approach to care without unverified claims.`,
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
              <p className="callout">
                Doctor names, qualifications, and a longer clinic history are not published here because they are not
                on the clinic’s public profiles.
              </p>
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
      <section className="section section-tight">
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
