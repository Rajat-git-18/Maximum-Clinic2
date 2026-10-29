import type { Doctor } from "@/content/clinic";

export function DoctorFacts({ doctor }: { doctor: Doctor }) {
  return (
    <dl className="doctor-meta">
      <div>
        <dt>Qualifications</dt>
        <dd>{doctor.qualifications}</dd>
      </div>
      <div>
        <dt>Speciality</dt>
        <dd>{doctor.speciality}</dd>
      </div>
      <div>
        <dt>Experience</dt>
        <dd>{doctor.experience}</dd>
      </div>
      {doctor.languages.length > 0 ? (
        <div>
          <dt>Languages</dt>
          <dd>{doctor.languages.join(", ")}</dd>
        </div>
      ) : null}
    </dl>
  );
}
