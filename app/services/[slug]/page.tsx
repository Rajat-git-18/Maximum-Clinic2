import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmphasizedText } from "@/components/ui/EmphasizedText";
import { PageHero } from "@/components/ui/PageHero";
import { clinic } from "@/content/clinic";
import { plainText, siteUrl, telHref } from "@/lib/clinic-facts";
import { pageMeta } from "@/lib/metadata";

export function generateStaticParams() {
  return clinic.services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = clinic.services.find((item) => item.slug === slug);
  if (!service) return {};
  return pageMeta({
    title: service.pageTitle ?? service.name,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = clinic.services.find((item) => item.slug === slug);
  if (!service) notFound();

  const others = clinic.services.filter((item) => item.slug !== service.slug);
  const detailed = Boolean(service.offerings?.length);
  const callHref = telHref(clinic.phone);
  const callLabel = clinic.phones[0]?.display ?? "94190 29200";

  const pageTitle = service.pageTitle ?? service.name;

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: plainText(pageTitle),
          description: plainText(service.summary),
          url: `${siteUrl()}/services/${service.slug}`,
          about: {
            "@type": "MedicalClinic",
            name: clinic.name,
            url: siteUrl(),
          },
        }}
      />
      <PageHero
        eyebrow="Service"
        title={service.pageTitle ?? service.name}
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
              <p key={paragraph}>
                <EmphasizedText text={paragraph} />
              </p>
            ))}
            {service.offerings && service.offerings.length > 0 ? (
              <>
                <h2 className="service-offerings-title">
                  {service.offeringsTitle ?? "Core procedures and specialties"}
                </h2>
                <ul className="service-offerings">
                  {service.offerings.map((offering) => (
                    <li className="service-offering" key={offering.title}>
                      <h3>{offering.title}</h3>
                      <p>
                        <EmphasizedText text={offering.body} />
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            ) : service.procedures.length > 0 ? (
              <ul>
                {service.procedures.map((procedure) => (
                  <li key={procedure}>{procedure}</li>
                ))}
              </ul>
            ) : null}
            {service.guidance ? (
              <aside className="service-guidance">
                <p className="eyebrow">Clinical note</p>
                <p>
                  <EmphasizedText text={service.guidance} />
                </p>
              </aside>
            ) : (
              <p className="callout">
                Fees, duration, and clinical outcomes are not listed until the clinic publishes them.
              </p>
            )}
          </div>
          {detailed ? (
            <div className="cta-row">
              <Button className="btn-capsule" href={`/book?service=${service.slug}#appointment-form`}>
                Request Appointment
              </Button>
              {callHref ? (
                <a className="btn btn-glass btn-capsule" href={callHref}>
                  {service.callLabel ?? "Call Medical Desk"}: +91 {callLabel}
                </a>
              ) : null}
            </div>
          ) : (
            <div className="cta-row">
              <Button href={`/book?service=${service.slug}`}>Request this service</Button>
              <Button href="/contact" variant="secondary">
                Contact the clinic
              </Button>
            </div>
          )}
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
