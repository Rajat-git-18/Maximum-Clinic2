import type { MetadataRoute } from "next";
import { isPublishable, siteUrl } from "@/lib/clinic-facts";

export default function robots(): MetadataRoute.Robots {
  if (!isPublishable()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl()}/sitemap.xml`,
    host: siteUrl(),
  };
}
