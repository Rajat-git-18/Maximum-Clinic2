import { AddressLink } from "@/components/ui/AddressLink";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { clinic } from "@/content/clinic";
import { clinicLocationLinks, mailtoHref, mapsHref, telHref, whatsappHref } from "@/lib/clinic-facts";

export function ContactDetails({ titleLevel = "h2" }: { titleLevel?: "h2" | "h3" }) {
  const Title = titleLevel;
  const email = mailtoHref(clinic.email);
  const maps = mapsHref();
  const locations = clinicLocationLinks();

  return (
    <div className="contact-grid">
      <div>
        <Title>Visit or call</Title>
        <dl className="doctor-meta">
          <div>
            <dt>Locations</dt>
            <dd>
              {locations.map((item) => (
                <span key={item.key} className="contact-line">
                  <AddressLink href={item.href}>{item.text}</AddressLink>
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt>Telephone</dt>
            <dd>
              {clinic.phones.map((item) => {
                const href = telHref(item.e164);
                return (
                  <span key={item.e164} className="contact-line">
                    {href ? <a href={href}>{item.display}</a> : item.display}
                  </span>
                );
              })}
            </dd>
          </div>
          {email ? (
            <div>
              <dt>Email</dt>
              <dd>
                <a href={email}>{clinic.email}</a>
              </dd>
            </div>
          ) : null}
          <div>
            <dt>Hours</dt>
            <dd>
              {clinic.schedule.map((item) => (
                <span key={item.days} className="contact-line">
                  {item.days}: {item.hours}
                </span>
              ))}
            </dd>
          </div>
          {clinic.parking ? (
            <div>
              <dt>Parking</dt>
              <dd>{clinic.parking}</dd>
            </div>
          ) : null}
          {clinic.publicTransport ? (
            <div>
              <dt>Public transport</dt>
              <dd>{clinic.publicTransport}</dd>
            </div>
          ) : null}
        </dl>
        <div className="cta-row">
          {clinic.phones.map((item) => {
            const href = telHref(item.e164);
            return href ? (
              <a className="btn btn-primary" href={href} key={item.e164}>
                Call {item.display}
              </a>
            ) : null;
          })}
          {clinic.whatsappEnabled && whatsappHref(clinic.phone) ? (
            <a
              className="btn btn-whatsapp"
              href={whatsappHref(clinic.phone) ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
        <SocialLinks />
      </div>
      <div className="map-panel">
        <p className="eyebrow">Directions</p>
        <h3>Maximum Healthcare on the map</h3>
        <p>The pin is the Google Maps place for this address.</p>
        <iframe
          className="map-frame"
          title="Map of Maximum Healthcare, Jammu"
          src={clinic.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {maps ? (
          <AddressLink className="text-link" href={maps}>
            Get directions
          </AddressLink>
        ) : null}
        <p className="map-emergency">{clinic.emergencyNote}</p>
      </div>
    </div>
  );
}
