import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IndiaFlag } from "@/components/ui/IndiaFlag";
import { clinic } from "@/content/clinic";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{clinic.hero.eyebrow}</p>
          <h1 id="hero-heading">{clinic.hero.title}</h1>
          <p className="lede">{clinic.hero.description}</p>
          <div className="cta-row">
            <Button href="/book">{clinic.hero.primaryCta}</Button>
            <Button href="#services" variant="secondary">
              {clinic.hero.secondaryCta}
            </Button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="brand-panel">
            <IndiaFlag className="brand-flag" />
            <Image
              className="brand-logo"
              src="/brand/logo-mark.jpg"
              width={112}
              height={112}
              alt=""
              priority
            />
            <div className="brand-id">
              <p>{clinic.name}</p>
              <span className="brand-place">{clinic.cityCountry}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
