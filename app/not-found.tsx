import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <header className="page-hero">
      <Container>
        <p className="eyebrow">404</p>
        <h1>This page is not on the site.</h1>
        <p className="lede">The address may be mistyped, or the page may have been moved.</p>
        <div className="cta-row">
          <Button href="/">Back to home</Button>
          <Button href="/book" variant="secondary">
            Book an appointment
          </Button>
          <Button href="/contact" variant="secondary">
            Contact
          </Button>
        </div>
      </Container>
    </header>
  );
}
