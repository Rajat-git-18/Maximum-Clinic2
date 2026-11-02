import Link from "next/link";
import { ProcedureDot, ServiceMark } from "@/components/ui/Icons";
import { clinic } from "@/content/clinic";

export function SpecialtiesGrid() {
  return (
    <ul className="specialty-grid">
      {clinic.services.map((service) => (
        <li className="specialty-card" key={service.slug}>
          <div className="specialty-mark" aria-hidden="true">
            <ServiceMark icon={service.icon} />
          </div>
          <h3>
            <Link href={`/services/${service.slug}`}>{service.name}</Link>
          </h3>
          <ul className="specialty-items">
            {service.procedures.map((procedure) => (
              <li key={procedure}>
                <ProcedureDot />
                <span>{procedure}</span>
              </li>
            ))}
          </ul>
          <Link className="specialty-more" href={`/services/${service.slug}`}>
            View More <span aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
