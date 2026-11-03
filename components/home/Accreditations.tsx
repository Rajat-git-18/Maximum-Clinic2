import { Container } from "@/components/ui/Container";
import { EmphasizedText } from "@/components/ui/EmphasizedText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccreditationMark } from "@/components/ui/AccreditationMarks";
import { clinic } from "@/content/clinic";

export function Accreditations() {
  return (
    <section className="section accreditations" id="accreditations" aria-labelledby="accreditations-heading">
      <Container>
        <SectionHeading
          id="accreditations-heading"
          eyebrow={clinic.quality.eyebrow}
          title={clinic.quality.title}
          lede={clinic.quality.intro}
        />
        <ul className="accreditation-grid">
          {clinic.accreditations.map((item) => (
            <li className="accreditation-card" key={item.id}>
              <AccreditationMark id={item.id} variant="full" />
              <h3>{item.short}</h3>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
        <p className="accreditations-body">
          <EmphasizedText text={clinic.quality.body} />
        </p>
        <p className="accreditations-body">
          <EmphasizedText text={clinic.quality.associations} />
        </p>
        <p className="quality-quote">
          <EmphasizedText text={clinic.quality.tagline} />
        </p>
      </Container>
    </section>
  );
}
