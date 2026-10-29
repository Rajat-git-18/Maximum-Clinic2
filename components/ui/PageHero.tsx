import Link from "next/link";

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
  return (
    <header className="page-hero">
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
        <h1>{title}</h1>
        {lede ? <p className="lede">{lede}</p> : null}
      </div>
    </header>
  );
}
