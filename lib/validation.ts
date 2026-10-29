import { clinic } from "@/content/clinic";
import { isPreferredDateAcceptable, isRealIsoDate } from "@/lib/dates";

export const TIME_OPTIONS = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "no-preference", label: "No preference" },
] as const;

export type TimeOfDay = (typeof TIME_OPTIONS)[number]["value"];

export type AppointmentValues = {
  service: string;
  doctor: string;
  preferredDate: string;
  timeOfDay: string;
  fullName: string;
  phone: string;
  email: string;
  note: string;
  consent: boolean;
  company: string;
};

export type AppointmentField = Exclude<keyof AppointmentValues, "company" | "consent"> | "consent";

export type AppointmentErrors = Partial<Record<AppointmentField, string>>;

export type SanitizedAppointment = {
  service: string;
  doctor: string;
  preferredDate: string;
  timeOfDay: TimeOfDay;
  fullName: string;
  phone: string;
  email: string;
  note: string;
};

const TIME_VALUES = new Set<string>(TIME_OPTIONS.map((option) => option.value));

export function emptyAppointment(initial?: { service?: string; doctor?: string }): AppointmentValues {
  const service = clinic.services.some((item) => item.slug === initial?.service) ? initial?.service ?? "" : "";
  const requestedDoctor = clinic.doctors.some((item) => item.slug === initial?.doctor)
    ? initial?.doctor ?? ""
    : "";
  const doctor = requestedDoctor || (clinic.doctors.length === 1 ? clinic.doctors[0].slug : "");

  return {
    service,
    doctor,
    preferredDate: "",
    timeOfDay: "",
    fullName: "",
    phone: "",
    email: "",
    note: "",
    consent: false,
    company: "",
  };
}

export function timeLabel(value: string): string {
  return TIME_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function validateAppointment(
  values: AppointmentValues,
  now = new Date(),
): { ok: true; value: SanitizedAppointment } | { ok: false; errors: AppointmentErrors } {
  const errors: AppointmentErrors = {};
  const service = values.service.trim();
  const doctor = values.doctor.trim();
  const preferredDate = values.preferredDate.trim();
  const timeOfDay = values.timeOfDay.trim();
  const fullName = values.fullName.trim().replace(/\s+/g, " ");
  const phone = values.phone.trim();
  const email = values.email.trim();
  const note = values.note.trim();

  if (!clinic.services.some((item) => item.slug === service)) {
    errors.service = "Choose a service.";
  }
  if (clinic.doctors.length > 0 && !clinic.doctors.some((item) => item.slug === doctor)) {
    errors.doctor = "Choose a doctor.";
  }
  if (!preferredDate) {
    errors.preferredDate = "Choose a preferred date.";
  } else if (!isRealIsoDate(preferredDate) || !isPreferredDateAcceptable(preferredDate, now)) {
    errors.preferredDate = "Choose a current or future date within the next year. This is still only a preference.";
  }
  if (!TIME_VALUES.has(timeOfDay)) {
    errors.timeOfDay = "Choose a preferred part of the day, or no preference.";
  }
  if (fullName.length < 2 || fullName.length > 80) {
    errors.fullName = "Enter your full name, using 2 to 80 characters.";
  } else if (!/^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u.test(fullName)) {
    errors.fullName = "Use letters, spaces, apostrophes, or hyphens in the name.";
  }
  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 8 || phoneDigits.length > 15 || !/^[+\d(][\d\s().-]{6,22}$/.test(phone)) {
    errors.phone = "Enter a phone number with 8 to 15 digits.";
  }
  if (email && (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    errors.email = "Enter a valid email address, or leave it blank.";
  }
  if (note.length > 500) {
    errors.note = "Keep the note to 500 characters. Do not include a detailed medical history.";
  }
  if (!values.consent) {
    errors.consent = "Confirm that the clinic may use these details to reply about this request.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      service,
      doctor,
      preferredDate,
      timeOfDay: timeOfDay as TimeOfDay,
      fullName,
      phone,
      email,
      note,
    },
  };
}

export function stepForErrors(errors: AppointmentErrors): number {
  if (errors.service || errors.doctor) return 0;
  if (errors.preferredDate || errors.timeOfDay) return 1;
  if (errors.fullName || errors.phone || errors.email || errors.note || errors.consent) return 2;
  return 3;
}

export function errorsForStep(errors: AppointmentErrors, step: number): AppointmentErrors {
  const fields: AppointmentField[][] = [
    ["service", "doctor"],
    ["preferredDate", "timeOfDay"],
    ["fullName", "phone", "email", "note", "consent"],
  ];
  const allowed = new Set(fields[step] ?? []);
  return Object.fromEntries(
    Object.entries(errors).filter(([key]) => allowed.has(key as AppointmentField)),
  ) as AppointmentErrors;
}
