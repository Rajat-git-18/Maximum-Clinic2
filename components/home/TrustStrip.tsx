import { EmphasizedText } from "@/components/ui/EmphasizedText";
import { clinic } from "@/content/clinic";

export function TrustStrip() {
  const doctor = clinic.doctors[0];
  const items = [
    { label: "Speciality", value: "**Orthopaedic clinic**" },
    doctor ? { label: "Experience", value: `**${doctor.experience}**` } : null,
    doctor ? { label: "Qualifications", value: `**${doctor.qualifications}**` } : null,
    { label: "Location", value: "**Jammu**, **Srinagar** & **Rajouri**" },
    { label: "Hours", value: "**Mon–Sat** **10 am–6 pm**, **Sun** **9 am–3:30 pm**" },
  ].filter((item): item is { label: string; value: string } => Boolean(item?.value));

  if (items.length === 0) return null;

  return (
    <section className="trust" aria-label="Clinic information">
      <div className="container">
        <dl className="trust-grid">
          {items.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>
                <EmphasizedText text={item.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
