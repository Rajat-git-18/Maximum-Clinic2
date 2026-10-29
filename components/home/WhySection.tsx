import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinic } from "@/content/clinic";

export function WhySection() {
  return (
    <section className="section" aria-labelledby="why-heading">
      <Container>
        <div className="why-grid">
          <SectionHeading
            id="why-heading"
            eyebrow="The approach"
            title="What guides this practice."
            lede="The address, hours, and phone numbers you can use to plan a visit. They are not rankings or promises about results."
          />
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
        </div>
      </Container>
    </section>
  );
}
