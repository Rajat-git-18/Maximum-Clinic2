import { clinic } from "@/content/clinic";
import { locationLabel } from "@/lib/clinic-facts";

export function TrustStrip() {
  const doctor = clinic.doctors[0];
  const items = [
    { label: "Speciality", value: clinic.speciality },
    doctor ? { label: "Experience", value: doctor.experience } : null,
    doctor ? { label: "Qualifications", value: doctor.qualifications } : null,
    { label: "Location", value: locationLabel() },
    { label: "Hours", value: clinic.hoursShort },
  ].filter((item): item is { label: string; value: string } => Boolean(item?.value));

  if (items.length === 0) return null;

  return (
    <section className="trust" aria-label="Clinic information">
      <div className="container">
        <dl className="trust-grid">
          {items.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
