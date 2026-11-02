import { CareerForm } from "@/components/careers/CareerForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Careers",
  description: `Send an application of interest to ${clinic.name} in ${clinic.cityCountry}. A current vacancies list has not been published, and the form does not offer a job.`,
  path: "/careers",
});

export default function CareersPage() {
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
          <div className="career-layout">
            <div className="prose">
              <h2>How this form works</h2>
              <p>
                {clinic.legalName} operates {clinic.name} in Gandhi Nagar, Jammu. Use the form if you want the clinic
                to have your contact details and the kind of work you are interested in.
              </p>
              <ul>
                <li>This is not a list of open jobs.</li>
                <li>Submitting does not offer you a role or start a hiring process by itself.</li>
                <li>Do not attach a CV here. If the clinic wants documents, they will ask when they reply.</li>
                <li>
                  Until a careers inbox is connected, the form is a preview and does not send your details.
                </li>
              </ul>
              <p className="callout">
                Prefer to speak first? Call {clinic.phones.map((item) => item.display).join(" or ")}.
              </p>
            </div>
            <CareerForm />
          </div>
        </Container>
      </section>
    </>
  );
}
