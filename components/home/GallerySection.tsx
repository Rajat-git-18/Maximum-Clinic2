import { ClinicPhoto } from "@/components/media/ClinicPhoto";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinic } from "@/content/clinic";

export function GallerySection() {
  if (clinic.gallery.length === 0) return null;

  return (
    <section className="section" aria-labelledby="gallery-heading">
      <Container wide>
        <SectionHeading
          id="gallery-heading"
          eyebrow={clinic.galleryPage.eyebrow}
          title={clinic.galleryPage.title}
          lede={clinic.galleryPage.lede}
          split
        />
        <ul className="gallery">
          {clinic.gallery.map((item, index) => (
            <li key={item.slug}>
              <ClinicPhoto photo={item} featured={index === 0} />
            </li>
          ))}
        </ul>
        <div className="cta-row">
          <Button href="/gallery">Open the gallery</Button>
          <Button href="/videos" variant="secondary">
            Watch videos
          </Button>
        </div>
      </Container>
    </section>
  );
}
