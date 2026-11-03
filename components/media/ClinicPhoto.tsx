import Image from "next/image";
import type { GalleryItem } from "@/content/clinic";

export function ClinicPhoto({
  photo,
  featured = false,
  priority = false,
}: {
  photo: GalleryItem;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <figure className={`gallery-photo${featured ? " is-featured" : ""}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={featured ? "(max-width: 720px) 100vw, 1120px" : "(max-width: 720px) 100vw, 560px"}
        priority={priority}
      />
      <figcaption>
        <strong>{photo.title}</strong>
        <span>{photo.caption}</span>
      </figcaption>
    </figure>
  );
}
