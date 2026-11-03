import { localBusinessJsonLd } from "@/lib/clinic-facts";

export function JsonLdScript({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function JsonLd() {
  return <JsonLdScript data={localBusinessJsonLd()} />;
}
