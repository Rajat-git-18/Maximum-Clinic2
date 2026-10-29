import type { Metadata } from "next";
import { clinic } from "@/content/clinic";
import { isPublishable, siteUrl } from "@/lib/clinic-facts";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
};

export function pageMeta({ title, description, path, absoluteTitle = false }: PageMetaInput): Metadata {
  const publishable = isPublishable();
  const fullTitle = absoluteTitle ? title : `${title} | ${clinic.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: publishable
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: clinic.name,
      locale: "en",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function rootMetadata(): Metadata {
  const description = clinic.hero.description;
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
      locale: "en",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${clinic.name} | Patient-centred healthcare`,
      description,
    },
  };
}
