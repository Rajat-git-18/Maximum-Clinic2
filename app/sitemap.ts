import type { MetadataRoute } from "next";
import { clinic } from "@/content/clinic";
import { siteUrl } from "@/lib/clinic-facts";
import { doctorsHref } from "@/lib/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = [
    "/",
    "/about",
    doctorsHref(),
    "/services",
    ...clinic.services.map((service) => `/services/${service.slug}`),
    ...clinic.doctors.map((doctor) => `/doctors/${doctor.slug}`),
    "/book",
    "/resources",
    "/contact",
    "/privacy",
    "/terms",
    "/accessibility",
  ];

  return [...new Set(paths)].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
