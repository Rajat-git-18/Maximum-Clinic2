import { ClinicVideo } from "@/components/media/ClinicVideo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { clinic } from "@/content/clinic";
import { telHref } from "@/lib/clinic-facts";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Videos",
  description: clinic.videos.lede,
  path: "/videos",
});

export default function VideosPage() {
  const callHref = telHref(clinic.videos.phone.e164);
  const phoneLabel = `+91 ${clinic.videos.phone.display}`;

  return (
    <>
      <PageHero
        eyebrow={clinic.videos.eyebrow}
        title={clinic.videos.title}
        lede={clinic.videos.lede}
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "Videos" },
        ]}
      />
      <section className="section">
        <Container>
          <div className="video-feature is-library">
            <div>
              <div className="prose">
                {clinic.videos.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="callout">
                  <strong>{clinic.videos.noteTitle}. </strong>
                  {clinic.videos.note}
                </p>
                <p>
                  {clinic.videos.questionsTitle} {clinic.videos.questions}
                </p>
              </div>
              <div className="cta-row">
                {callHref ? (
                  <a className="btn btn-secondary" href={callHref}>
                    Call {phoneLabel}
                  </a>
                ) : null}
                <Button href="/book">Book an appointment</Button>
              </div>
            </div>
            <ul className="video-library">
              {clinic.videos.items.map((video) => (
                <li key={video.slug}>
                  <ClinicVideo video={video} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
