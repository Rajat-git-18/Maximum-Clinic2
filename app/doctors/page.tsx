import { redirect } from "next/navigation";
import { DoctorFacts } from "@/components/doctors/DoctorFacts";
import { FinalCta } from "@/components/home/FinalCta";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Doctors",
  description: `Doctors at ${clinic.name}. Profiles list only the qualifications supplied by the clinic.`,
  path: "/doctors",
});

export default function DoctorsPage() {
  if (clinic.doctors.length === 1) {
    redirect(`/doctors/${clinic.doctors[0].slug}`);
  }

  return (
    <>
      <PageHero
        eyebrow="Doctors"
        title={clinic.doctors.length === 0 ? "Doctor profiles" : "The people you would see."}
        lede="Each profile shows only details entered from confirmed records."
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "Doctors" },
        ]}
      />
      <section className="section">
        <Container>
          {clinic.doctors.length === 0 ? (
            <p className="empty-note">
              Maximum Clinics has not published individual doctor names or qualifications. Call the clinic to ask who
              you will see.
            </p>
          ) : (
            <div className="doctor-stack">
              {clinic.doctors.map((doctor) => (
                <article className="doctor-grid" key={doctor.slug}>
                  <PlaceholderMedia
                    label="Portrait"
                    caption={`Placeholder for a professional portrait of ${doctor.name}. Not a photograph of this clinician.`}
                    motif="arch"
                    tone="green"
                    ratio="portrait"
                  />
                  <div>
                    <h2>{doctor.name}</h2>
                    <DoctorFacts doctor={doctor} />
                    <Button href={`/doctors/${doctor.slug}`}>View profile</Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
