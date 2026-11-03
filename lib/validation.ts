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
    errors.preferredDate = "Choose today or a future date within the next year. Past dates cannot be requested.";
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

export type CallbackValues = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  consent: boolean;
  company: string;
};

export type CallbackField = "fullName" | "phone" | "email" | "service" | "consent";
export type CallbackErrors = Partial<Record<CallbackField, string>>;

export type SanitizedCallback = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
};

export function emptyCallback(): CallbackValues {
  return {
    fullName: "",
    phone: "",
    email: "",
    service: "",
    consent: false,
    company: "",
  };
}

export function validateCallback(
  values: CallbackValues,
): { ok: true; value: SanitizedCallback } | { ok: false; errors: CallbackErrors } {
  const errors: CallbackErrors = {};
  const fullName = values.fullName.trim().replace(/\s+/g, " ");
  const phone = values.phone.trim();
  const email = values.email.trim();
  const service = values.service.trim();

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
  if (!clinic.services.some((item) => item.slug === service)) {
    errors.service = "Choose a speciality.";
  }
  if (!values.consent) {
    errors.consent = "Confirm that the clinic may use these details to return this call.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: { fullName, phone, email, service },
  };
}

export const CAREER_ROLES = [
  { value: "clinical", label: "Clinical / doctor" },
  { value: "nursing", label: "Nursing" },
  { value: "physiotherapy", label: "Physiotherapy" },
  { value: "administration", label: "Administration / front desk" },
  { value: "other", label: "Other" },
] as const;

export const CAREER_EXPERIENCE = [
  { value: "0-1", label: "Under 1 year" },
  { value: "1-3", label: "1 to 3 years" },
  { value: "3-5", label: "3 to 5 years" },
  { value: "5-10", label: "5 to 10 years" },
  { value: "10-plus", label: "More than 10 years" },
] as const;

export type CareerValues = {
  fullName: string;
  phone: string;
  email: string;
  role: string;
  qualification: string;
  experience: string;
  city: string;
  note: string;
  consent: boolean;
  company: string;
};

export type CareerField = Exclude<keyof CareerValues, "company">;
export type CareerErrors = Partial<Record<CareerField, string>>;

export type SanitizedCareer = {
  fullName: string;
  phone: string;
  email: string;
  role: string;
  qualification: string;
  experience: string;
  city: string;
  note: string;
};

const CAREER_ROLE_VALUES = new Set<string>(CAREER_ROLES.map((item) => item.value));
const CAREER_EXPERIENCE_VALUES = new Set<string>(CAREER_EXPERIENCE.map((item) => item.value));

export function emptyCareer(): CareerValues {
  return {
    fullName: "",
    phone: "",
    email: "",
    role: "",
    qualification: "",
    experience: "",
    city: "",
    note: "",
    consent: false,
    company: "",
  };
}

export function careerRoleLabel(value: string): string {
  return CAREER_ROLES.find((item) => item.value === value)?.label ?? value;
}

export function careerExperienceLabel(value: string): string {
  return CAREER_EXPERIENCE.find((item) => item.value === value)?.label ?? value;
}

export function validateCareer(
  values: CareerValues,
): { ok: true; value: SanitizedCareer } | { ok: false; errors: CareerErrors } {
  const errors: CareerErrors = {};
  const fullName = values.fullName.trim().replace(/\s+/g, " ");
  const phone = values.phone.trim();
  const email = values.email.trim();
  const role = values.role.trim();
  const qualification = values.qualification.trim().replace(/\s+/g, " ");
  const experience = values.experience.trim();
  const city = values.city.trim().replace(/\s+/g, " ");
  const note = values.note.trim();

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
  if (!CAREER_ROLE_VALUES.has(role)) {
    errors.role = "Choose the kind of role you are interested in.";
  }
  if (qualification.length > 120) {
    errors.qualification = "Keep the qualification to 120 characters.";
  }
  if (!CAREER_EXPERIENCE_VALUES.has(experience)) {
    errors.experience = "Choose how long you have worked.";
  }
  if (city.length > 80) {
    errors.city = "Keep the city to 80 characters.";
  } else if (city && !/^[\p{L}\p{M}0-9 .,'-]{2,80}$/u.test(city)) {
    errors.city = "Use letters, numbers, or common punctuation in the city.";
  }
  if (note.length > 500) {
    errors.note = "Keep the note to 500 characters.";
  }
  if (!values.consent) {
    errors.consent = "Confirm that the clinic may use these details to reply about this application.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: { fullName, phone, email, role, qualification, experience, city, note },
  };
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
