import { ClinicVideo } from "@/components/media/ClinicVideo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmphasizedText } from "@/components/ui/EmphasizedText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinic } from "@/content/clinic";

export function VideosSection() {
  const featured = clinic.videos.items[0];
  if (!featured) return null;

  return (
    <section className="section videos-band" aria-labelledby="videos-heading">
      <Container>
        <div className="video-feature">
          <div>
            <SectionHeading
              id="videos-heading"
              eyebrow={clinic.videos.eyebrow}
              title={clinic.videos.home.title}
              lede={clinic.videos.home.lede}
            />
            <div className="prose">
              {clinic.videos.home.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <EmphasizedText text={paragraph} />
                </p>
              ))}
            </div>
            <div className="cta-row">
              <Button href="/videos">Open the videos page</Button>
              <Button href="/book" variant="secondary">
                Book an appointment
              </Button>
            </div>
          </div>
          <ClinicVideo video={featured} />
        </div>
      </Container>
    </section>
  );
}
