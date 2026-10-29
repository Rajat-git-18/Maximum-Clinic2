import Link from "next/link";
import { DoctorFacts } from "@/components/doctors/DoctorFacts";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinic } from "@/content/clinic";

export function DoctorsSection() {
  const doctors = clinic.doctors;
  const single = doctors.length === 1;

  if (doctors.length === 0) {
    return (
      <section className="section" id="specialists" aria-labelledby="doctors-heading">
        <Container>
          <SectionHeading
            id="doctors-heading"
            eyebrow="Specialist doctors"
            title="Orthopaedic care, by speciality."
            lede="These are the specialist areas named on the clinic’s public listing. Individual doctor names have not been published, so they are not shown here."
          />
          <ul className="specialist-grid">
            {clinic.services.map((service, index) => (
              <li className="specialist-card" key={service.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>
                  <Link href={`/services/${service.slug}`}>{service.name}</Link>
                </h3>
                <p>{service.summary}</p>
                {service.procedures.length > 0 ? (
                  <ul>
                    {service.procedures.map((procedure) => (
                      <li key={procedure}>{procedure}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    );
  }

  return (
    <section className="section doctor-band" aria-labelledby="doctors-heading">
      <Container>
        {single ? (
          <article className="doctor-grid">
            <PlaceholderMedia
              label="Portrait"
              caption="Placeholder for a professional portrait of the doctor. Not a photograph of this clinician."
              motif="arch"
              tone="green"
              ratio="portrait"
            />
            <div>
              <p className="eyebrow">The doctor</p>
              <h2 id="doctors-heading">{doctors[0].name}</h2>
              <DoctorFacts doctor={doctors[0]} />
              <p className="lede">{doctors[0].paragraphs[0]}</p>
              <div className="cta-row">
                <Button href={`/doctors/${doctors[0].slug}`}>View profile</Button>
                <Button href={`/book?doctor=${doctors[0].slug}`} variant="secondary">
                  Request an appointment
                </Button>
              </div>
            </div>
          </article>
        ) : (
          <>
            <p className="eyebrow">Doctors</p>
            <h2 id="doctors-heading">The people you would see.</h2>
            <div className="doctor-stack">
              {doctors.map((doctor) => (
                <article className="doctor-grid" key={doctor.slug}>
                  <PlaceholderMedia
                    label="Portrait"
                    caption={`Placeholder for a professional portrait of ${doctor.name}. Not a photograph of this clinician.`}
                    motif="arch"
                    tone="green"
                    ratio="portrait"
                  />
                  <div>
                    <h3>{doctor.name}</h3>
                    <DoctorFacts doctor={doctor} />
                    <div className="cta-row">
                      <Button href={`/doctors/${doctor.slug}`}>View profile</Button>
                      <Button href={`/book?doctor=${doctor.slug}`} variant="secondary">
                        Request an appointment
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
