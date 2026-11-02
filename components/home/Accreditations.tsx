import { Container } from "@/components/ui/Container";
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
              <AccreditationMark id={item.id} />
              <h3>{item.short}</h3>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
        <p className="accreditations-body">{clinic.quality.body}</p>
        <p className="accreditations-body">{clinic.quality.associations}</p>
        <p className="quality-quote">{clinic.quality.tagline}</p>
      </Container>
    </section>
  );
}
