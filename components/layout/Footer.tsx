import Link from "next/link";
import { AccreditationStrip } from "@/components/home/AccreditationStrip";
import { Logo } from "@/components/layout/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { clinic } from "@/content/clinic";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { locationLabel, mapsHref, telHref, whatsappHref } from "@/lib/clinic-facts";
import { policyNav, primaryNav } from "@/lib/navigation";

export function Footer() {
  const maps = mapsHref();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="footer-summary">{clinic.footerSummary}</p>
          <AccreditationStrip />
          <SocialLinks />
        </div>
        <nav aria-label="Footer">
          <p className="footer-label">Explore</p>
          <ul className="footer-links">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="footer-label">Services</p>
          <ul className="footer-links">
            {clinic.services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-label">Contact</p>
          <ul className="footer-links">
            <li>{locationLabel()}</li>
            {clinic.phones.map((item) => {
              const href = telHref(item.e164);
              return (
                <li key={item.e164}>{href ? <a href={href}>{item.display}</a> : item.display}</li>
              );
            })}
            {clinic.whatsappEnabled && whatsappHref(clinic.phone) ? (
              <li>
                <a
                  className="footer-whatsapp"
                  href={whatsappHref(clinic.phone) ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ) : null}
            {clinic.schedule.map((item) => (
              <li key={item.days}>
                {item.days}: {item.hours}
              </li>
            ))}
            {maps ? (
              <li>
                <a href={maps} target="_blank" rel="noopener noreferrer">
                  Directions
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="container footer-base">
        <ul className="footer-links footer-policies">
          {policyNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <p>
          © {clinic.copyrightYear} {clinic.legalName} · {clinic.name}. All rights reserved.
        </p>
        <p className="footer-emergency">{clinic.emergencyNote}</p>
      </div>
    </footer>
  );
}
