import { clinic, getFaqs } from "@/content/clinic";

export type SearchHit = {
  href: string;
  title: string;
  hint: string;
  kind: "service" | "procedure" | "page";
  terms: string;
};

function hit(item: Omit<SearchHit, "terms"> & { terms?: string }): SearchHit {
  const terms = [item.title, item.hint, item.terms ?? ""].join(" ").toLowerCase();
  return { ...item, terms };
}

export function searchIndex(): SearchHit[] {
  const services = clinic.services.flatMap((service) => [
    hit({
      href: `/services/${service.slug}`,
      title: service.name,
      hint: "Specialty",
      kind: "service",
      terms: `${service.summary} ${service.procedures.join(" ")}`,
    }),
    ...service.procedures.map((procedure) =>
      hit({
        href: `/services/${service.slug}`,
        title: procedure,
        hint: service.name,
        kind: "procedure",
      }),
    ),
  ]);

  const pages = [
    hit({ href: "/", title: "Home", hint: "Overview", kind: "page", terms: "home start clinic" }),
    hit({
      href: "/book",
      title: "Book an appointment",
      hint: "Request a visit",
      kind: "page",
      terms: "book appointment request visit slot",
    }),
    hit({ href: "/services", title: "Services", hint: "All specialties", kind: "page" }),
    hit({
      href: "/about",
      title: "About Maximum Healthcare",
      hint: "The practice",
      kind: "page",
      terms: `${clinic.legalName} ${clinic.about.title} ${clinic.about.lede} orthopaedic musculoskeletal jammu`,
    }),
    hit({
      href: "/about",
      title: "Our Accreditations & Affiliations",
      hint: clinic.accreditations.map((item) => item.short).join(", "),
      kind: "page",
      terms: "nabh nabl arthritis foundation of india quality patient safety",
    }),
    hit({ href: "/contact", title: "Contact", hint: "Call, map, hours", kind: "page", terms: "phone address map directions" }),
    hit({
      href: "/careers",
      title: "Careers",
      hint: "Talent network",
      kind: "page",
      terms: "job vacancy hiring work career application nursing physiotherapy talent network",
    }),
    hit({
      href: "/videos",
      title: "Videos",
      hint: "Patient education",
      kind: "page",
      terms: "video film spine care arthritis education watch",
    }),
    hit({
      href: "/gallery",
      title: "Gallery",
      hint: "Photographs of the rooms",
      kind: "page",
      terms: "gallery photo rooms waiting lounge entrance walkway consultation",
    }),
    hit({ href: "/resources", title: "Patient resources", hint: "Before a visit", kind: "page", terms: "faq questions hours" }),
    hit({
      href: "/contact",
      title: "Opening hours",
      hint: clinic.hoursShort,
      kind: "page",
      terms: `hours timing open ${clinic.hours}`,
    }),
    hit({
      href: "/contact",
      title: clinic.cityCountry,
      hint: "Clinic location",
      kind: "page",
      terms: `address map ${clinic.address.street} jammu gandhi nagar`,
    }),
    ...getFaqs().map((item) =>
      hit({
        href: "/resources",
        title: item.question,
        hint: "Question",
        kind: "page",
        terms: item.answer,
      }),
    ),
  ];

  return [...services, ...pages];
}

export function searchCatalog(query: string, limit = 8): SearchHit[] {
  const needle = query.trim().toLowerCase();
  const index = searchIndex();
  if (!needle) {
    return index.filter((item) => item.kind === "service" || item.href === "/book" || item.href === "/contact").slice(0, 6);
  }
  return index
    .map((item) => {
      const title = item.title.toLowerCase();
      const score = title.startsWith(needle) ? 3 : title.includes(needle) ? 2 : item.terms.includes(needle) ? 1 : 0;
      return { item, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map((row) => row.item);
}
