import Link from "next/link";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { EmphasizedText } from "@/components/ui/EmphasizedText";
import { plainText, siteUrl } from "@/lib/clinic-facts";

export type Crumb = {
  href?: string;
  label: string;
};

export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  breadcrumb?: Crumb[];
}) {
  const breadcrumbData =
    breadcrumb && breadcrumb.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumb.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: plainText(item.label),
            ...(item.href ? { item: `${siteUrl()}${item.href}` } : {}),
          })),
        }
      : null;

  return (
    <header className="page-hero">
      <JsonLdScript data={breadcrumbData} />
      <div className="container">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ol>
              {breadcrumb.map((item, index) => {
                const last = index === breadcrumb.length - 1;
                return (
                  <li key={`${item.label}-${index}`}>
                    {item.href && !last ? (
                      <Link href={item.href}>{item.label}</Link>
                    ) : (
                      <span aria-current={last ? "page" : undefined}>{item.label}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>
          <EmphasizedText text={title} />
        </h1>
        {lede ? (
          <p className="lede">
            <EmphasizedText text={lede} />
          </p>
        ) : null}
      </div>
    </header>
  );
}
