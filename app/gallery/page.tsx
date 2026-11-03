import { ClinicPhoto } from "@/components/media/ClinicPhoto";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { clinic } from "@/content/clinic";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Gallery",
  description: clinic.galleryPage.lede,
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow={clinic.galleryPage.eyebrow}
        title={clinic.galleryPage.title}
        lede={clinic.galleryPage.lede}
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "Gallery" },
        ]}
      />
      <section className="section">
        <Container>
          <div className="prose gallery-intro">
            {clinic.galleryPage.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
        <Container wide>
          <ul className="gallery">
            {clinic.gallery.map((item, index) => (
              <li key={item.slug}>
                <ClinicPhoto photo={item} featured={index === 0} priority={index === 0} />
              </li>
            ))}
          </ul>
          <div className="cta-row">
            <Button href="/videos">Watch the clinic videos</Button>
            <Button href="/contact" variant="secondary">
              Contact the clinic
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
