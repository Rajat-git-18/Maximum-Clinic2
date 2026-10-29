import { SocialLinks } from "@/components/ui/SocialLinks";
import { clinic } from "@/content/clinic";
import { locationLabel, mailtoHref, mapsHref, telHref, whatsappHref } from "@/lib/clinic-facts";

export function ContactDetails({ titleLevel = "h2" }: { titleLevel?: "h2" | "h3" }) {
  const Title = titleLevel;
  const email = mailtoHref(clinic.email);
  const maps = mapsHref();

  return (
    <div className="contact-grid">
      <div>
        <Title>Visit or call</Title>
        <dl className="doctor-meta">
          <div>
            <dt>Location</dt>
            <dd>{locationLabel()}</dd>
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
          {clinic.whatsappEnabled
            ? clinic.phones.map((item) => {
                const href = whatsappHref(item.e164);
                return href ? (
                  <a className="btn btn-secondary" href={href} key={`wa-${item.e164}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp {item.display}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null;
              })
            : null}
        </div>
        <SocialLinks />
      </div>
      <div className="map-panel">
        <p className="eyebrow">Directions</p>
        <h3>Maximum Clinics on the map</h3>
        <p>The pin is the Google Maps place for this address.</p>
        <iframe
          className="map-frame"
          title="Map of Maximum Clinics, Gandhi Nagar, Jammu"
          src={clinic.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {maps ? (
          <a className="text-link" href={maps} target="_blank" rel="noopener noreferrer">
            Get directions<span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : null}
        <p className="map-emergency">{clinic.emergencyNote}</p>
      </div>
    </div>
  );
}
