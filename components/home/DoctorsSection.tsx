import Image from "next/image";
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
          <div className="doctors-empty">
            <div>
              <SectionHeading
                id="doctors-heading"
                eyebrow="Specialist doctors"
                title="Doctor profiles come next."
                lede="Individual doctor names have not been published on the clinic’s public listings, so they are not shown here. Call or use WhatsApp to ask who you would see."
              />
              <div className="cta-row">
                <Button href="/services" variant="secondary">
                  View specialties
                </Button>
                <Button href="/contact">Contact the clinic</Button>
              </div>
            </div>
            <div className="doctors-photo">
              <Image
                src="/media/consultation-stock.jpg"
                alt="Stock photograph of a clinician discussing a scan. Not a photograph of this clinic or its doctors."
                width={1400}
                height={933}
              />
            </div>
          </div>
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
