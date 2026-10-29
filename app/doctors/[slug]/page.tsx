import { notFound } from "next/navigation";
import { DoctorFacts } from "@/components/doctors/DoctorFacts";
import { FinalCta } from "@/components/home/FinalCta";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export function generateStaticParams() {
  return clinic.doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = clinic.doctors.find((item) => item.slug === slug);
  if (!doctor) return {};
  return pageMeta({
    title: doctor.name,
    description: `Profile for ${doctor.name} at ${clinic.name}. Qualifications are shown only as published by the clinic.`,
    path: `/doctors/${doctor.slug}`,
  });
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = clinic.doctors.find((item) => item.slug === slug);
  if (!doctor) notFound();

  return (
    <>
      <PageHero
        eyebrow="The doctor"
        title={doctor.name}
        lede={doctor.speciality}
        breadcrumb={
          clinic.doctors.length === 1
            ? [
                { href: "/", label: "Home" },
                { label: doctor.name },
              ]
            : [
                { href: "/", label: "Home" },
                { href: "/doctors", label: "Doctors" },
                { label: doctor.name },
              ]
        }
      />
      <section className="section">
        <Container>
          <article className="doctor-grid">
            <PlaceholderMedia
              label="Portrait"
              caption={`Placeholder for a professional portrait of ${doctor.name}. Not a photograph of this clinician.`}
              motif="arch"
              tone="green"
              ratio="portrait"
            />
            <div>
              <DoctorFacts doctor={doctor} />
              <div className="prose">
                {doctor.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="cta-row">
                <Button href={`/book?doctor=${doctor.slug}`}>Request an appointment</Button>
                <Button href="/services" variant="secondary">
                  View services
                </Button>
              </div>
            </div>
          </article>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
