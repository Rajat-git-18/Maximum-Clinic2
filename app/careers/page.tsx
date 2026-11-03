import { CareerForm } from "@/components/careers/CareerForm";
import { Container } from "@/components/ui/Container";
import { EmphasizedText } from "@/components/ui/EmphasizedText";
import { PageHero } from "@/components/ui/PageHero";
import { clinic } from "@/content/clinic";
import { mailtoHref, telHref } from "@/lib/clinic-facts";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Careers",
  description: clinic.careers.lede,
  path: "/careers",
});

export default function CareersPage() {
  const callHref = telHref(clinic.phone);
  const emailHref = mailtoHref(clinic.email);

  return (
    <>
      <PageHero
        eyebrow={clinic.careers.eyebrow}
        title={clinic.careers.title}
        lede={clinic.careers.lede}
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "Careers" },
        ]}
      />
      <section className="section">
        <Container>
          <div className="prose career-intro">
            {clinic.careers.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <EmphasizedText text={paragraph} />
              </p>
            ))}
          </div>
          <h2 className="career-steps-title">{clinic.careers.stepsTitle}</h2>
          <ol className="career-steps">
            {clinic.careers.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>
                  <EmphasizedText text={step.body} />
                </p>
              </li>
            ))}
          </ol>
          <div className="career-layout">
            <aside className="career-contact">
              <p className="eyebrow">Contact</p>
              <h2>{clinic.careers.contact.title}</h2>
              <dl>
                <div>
                  <dt>Location</dt>
                  <dd>{clinic.careers.contact.location}</dd>
                </div>
                <div>
                  <dt>{clinic.careers.contact.phoneLabel}</dt>
                  <dd>
                    {callHref ? (
                      <a href={callHref}>+91 {clinic.phones[0]?.display ?? "94190 29200"}</a>
                    ) : (
                      `+91 ${clinic.phones[0]?.display ?? "94190 29200"}`
                    )}
                  </dd>
                </div>
                {emailHref ? (
                  <div>
                    <dt>{clinic.careers.contact.emailLabel}</dt>
                    <dd>
                      <a href={emailHref}>{clinic.email}</a>
                    </dd>
                  </div>
                ) : null}
              </dl>
              <p>{clinic.careers.contact.note}</p>
            </aside>
            <CareerForm />
          </div>
        </Container>
      </section>
    </>
  );
}
