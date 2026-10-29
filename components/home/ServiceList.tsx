import Link from "next/link";
import { clinic } from "@/content/clinic";

export function ServiceList() {
  if (clinic.services.length === 0) {
    return (
      <p className="empty-note">
        Services will be listed here once they are added to the clinic configuration.
      </p>
    );
  }

  return (
    <ol className="service-list">
      {clinic.services.map((service, index) => (
        <li key={service.slug} className="service-row">
          <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>
              <Link href={`/services/${service.slug}`}>{service.name}</Link>
            </h3>
            <p>{service.summary}</p>
          </div>
          <Link className="text-link service-link" href={`/services/${service.slug}`}>
            Learn more<span className="sr-only"> about {service.name}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
