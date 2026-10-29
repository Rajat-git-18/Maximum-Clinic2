import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/home/FinalCta";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export function generateStaticParams() {
  return clinic.services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = clinic.services.find((item) => item.slug === slug);
  if (!service) return {};
  return pageMeta({
    title: service.name,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = clinic.services.find((item) => item.slug === slug);
  if (!service) notFound();

  const others = clinic.services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.name}
        lede={service.summary}
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { label: service.name },
        ]}
      />
      <section className="section">
        <Container narrow>
          <div className="prose">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {service.procedures.length > 0 ? (
              <ul>
                {service.procedures.map((procedure) => (
                  <li key={procedure}>{procedure}</li>
                ))}
              </ul>
            ) : null}
            <p className="callout">
              Fees, duration, and clinical outcomes are not listed until the clinic publishes them.
            </p>
          </div>
          <div className="cta-row">
            <Button href={`/book?service=${service.slug}`}>Request this service</Button>
            <Button href="/contact" variant="secondary">
              Contact the clinic
            </Button>
          </div>
          {others.length > 0 ? (
            <div className="related">
              <h2>Other services</h2>
              <ul className="footer-links">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/services/${item.slug}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
