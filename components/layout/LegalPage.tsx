import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export function LegalPage({
  title,
  lede,
  eyebrow = "Draft policy",
  children,
}: {
  title: string;
  lede: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: title },
        ]}
      />
      <section className="section">
        <Container narrow>
          <div className="prose">{children}</div>
        </Container>
      </section>
    </>
  );
}
