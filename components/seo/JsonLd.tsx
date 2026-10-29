import { localBusinessJsonLd } from "@/lib/clinic-facts";

export function JsonLd() {
  const data = localBusinessJsonLd();
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
