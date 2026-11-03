import type { Metadata } from "next";
import { clinic } from "@/content/clinic";
import { isPublishable, plainText, siteUrl } from "@/lib/clinic-facts";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

const shareImage = "/brand/logo-mark.jpg";

export function pageMeta({ title, description, path, absoluteTitle = false, noIndex = false }: PageMetaInput): Metadata {
  const publishable = isPublishable() && !noIndex;
  const cleanTitle = plainText(title);
  const cleanDescription = plainText(description);
  const fullTitle = absoluteTitle ? cleanTitle : `${cleanTitle} | ${clinic.name}`;

  return {
    title: absoluteTitle ? { absolute: cleanTitle } : cleanTitle,
    description: cleanDescription,
    alternates: { canonical: path },
    robots: publishable
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      title: fullTitle,
      description: cleanDescription,
      url: path,
      siteName: clinic.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: shareImage, alt: clinic.name }],
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description: cleanDescription,
      images: [shareImage],
    },
  };
}

export function rootMetadata(): Metadata {
  const description = plainText(clinic.hero.description);
  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: `${clinic.name} | Patient-centred healthcare`,
      template: `%s | ${clinic.name}`,
    },
    description,
    applicationName: clinic.name,
    robots: isPublishable()
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      title: `${clinic.name} | Patient-centred healthcare`,
      description,
      siteName: clinic.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: shareImage, alt: clinic.name }],
    },
    twitter: {
      card: "summary",
      title: `${clinic.name} | Patient-centred healthcare`,
      description,
      images: [shareImage],
    },
  };
}
