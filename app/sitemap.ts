import type { MetadataRoute } from "next";
import { clinic } from "@/content/clinic";
import { siteUrl } from "@/lib/clinic-facts";
import { doctorsHref } from "@/lib/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = [
    "/",
    "/about",
    ...(clinic.doctors.length > 0 ? [doctorsHref()] : []),
    "/services",
    ...clinic.services.map((service) => `/services/${service.slug}`),
    ...clinic.doctors.map((doctor) => `/doctors/${doctor.slug}`),
    "/book",
    "/resources",
    "/contact",
    "/careers",
    "/videos",
    "/gallery",
    "/privacy",
    "/terms",
    "/accessibility",
  ];

  return [...new Set(paths)].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" || path.startsWith("/services") ? "weekly" : "monthly",
    priority: sitemapPriority(path),
  }));
}

function sitemapPriority(path: string): number {
  if (path === "/") return 1;
  if (path === "/services" || path.startsWith("/services/")) return 0.9;
  if (path === "/contact" || path === "/book" || path === "/about") return 0.8;
  if (path === "/privacy" || path === "/terms" || path === "/accessibility") return 0.3;
  return 0.6;
}
