import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinic } from "@/content/clinic";

export function PatientJourney() {
  return (
    <section className="section" id="visit" aria-labelledby="journey-heading">
      <Container>
        <SectionHeading
          id="journey-heading"
          eyebrow="A visit"
          title="Four steps, without a false confirmation."
          lede="The website can take a request. Only the clinic can agree the time."
        />
        <ol className="journey-list">
          {clinic.journey.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
