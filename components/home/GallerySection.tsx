import { Container } from "@/components/ui/Container";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinic } from "@/content/clinic";

export function GallerySection() {
  if (clinic.gallery.length === 0) return null;

  return (
    <section className="section" aria-labelledby="gallery-heading">
      <Container wide>
        <SectionHeading
          id="gallery-heading"
          eyebrow="The rooms"
          title="Photographs of the rooms come next."
          lede="The clinic’s own photographs are not on this website yet. These frames are waiting for them. They are not pictures of the premises."
          split
        />
        <ul className="gallery">
          {clinic.gallery.map((item) => (
            <li key={item.title}>
              <PlaceholderMedia
                label={item.title}
                caption={item.caption}
                motif={item.motif}
                tone={item.tone}
                ratio={item.ratio}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
