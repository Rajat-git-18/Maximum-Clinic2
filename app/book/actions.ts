"use server";

import { clinic } from "@/content/clinic";
import type { ActionResult } from "@/lib/appointment";
import { saveInboxRecord } from "@/lib/staff-inbox";
import {
  validateAppointment,
  validateCallback,
  validateCareer,
  type AppointmentValues,
  type CallbackValues,
  type CareerValues,
} from "@/lib/validation";

const LIMITS = {
  service: 80,
  doctor: 80,
  preferredDate: 10,
  timeOfDay: 20,
  fullName: 80,
  phone: 24,
  email: 120,
  note: 500,
  company: 200,
  role: 40,
  qualification: 120,
  experience: 20,
  city: 80,
} as const;

function readField(formData: FormData, key: keyof typeof LIMITS): { value: string; tooLong: boolean } {
  const raw = formData.get(key);
  if (typeof raw !== "string") return { value: "", tooLong: false };
  return { value: raw, tooLong: raw.length > LIMITS[key] };
}

function intakeEndpoint(): { url: URL } | { error: string } {
  const raw = process.env.APPOINTMENT_INTAKE_URL;
  if (!raw) return { error: "missing" };
  try {
    const url = new URL(raw);
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol !== "https:" && !local) return { error: "insecure" };
    if (url.username || url.password) return { error: "invalid" };
    return { url };
  } catch {
    return { error: "invalid" };
  }
}

export async function submitAppointmentRequest(
  _previous: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const company = readField(formData, "company");
  if (company.value.trim()) {
    return {
      status: "rejected",
      message: "The request could not be accepted. Nothing has been booked.",
    };
  }

  const fields = {
    service: readField(formData, "service"),
    doctor: readField(formData, "doctor"),
    preferredDate: readField(formData, "preferredDate"),
    timeOfDay: readField(formData, "timeOfDay"),
    fullName: readField(formData, "fullName"),
    phone: readField(formData, "phone"),
    email: readField(formData, "email"),
    note: readField(formData, "note"),
  };

  if (Object.values(fields).some((field) => field.tooLong)) {
    return {
      status: "invalid",
      message: "Some details are too long. Shorten them and try again. Nothing has been booked.",
      errors: {},
    };
  }

  const values: AppointmentValues = {
    service: fields.service.value,
    doctor: fields.doctor.value,
    preferredDate: fields.preferredDate.value,
    timeOfDay: fields.timeOfDay.value,
    fullName: fields.fullName.value,
    phone: fields.phone.value,
    email: fields.email.value,
    note: fields.note.value,
    consent: formData.get("consent") === "yes",
    company: "",
  };

  const validated = validateAppointment(values);
  if (!validated.ok) {
    return {
      status: "invalid",
      message: "Some details need attention before this request can continue. Nothing has been booked.",
      errors: validated.errors,
    };
  }

  const submittedAt = new Date().toISOString();
  try {
    await saveInboxRecord({
      type: "appointment_request",
      submittedAt,
      ...validated.value,
    });
  } catch (error) {
    console.error("Could not save appointment request to the staff inbox.", {
      name: error instanceof Error ? error.name : "Error",
    });
    return {
      status: "failed",
      message:
        "The request could not be saved. Nothing has been booked. Please try again, or call the clinic on a published number.",
    };
  }

  const endpoint = intakeEndpoint();
  if (!("error" in endpoint)) {
    await postIntake(
      {
        type: "appointment_request",
        clinic: clinic.name,
        ...validated.value,
        submittedAt,
      },
      {
        delivered: "",
        failed: "",
      },
    );
  } else if (endpoint.error !== "missing") {
    console.error("Appointment intake URL is missing or is not a safe https address.");
  }

  return {
    status: "delivered",
    message:
      "Your appointment request has reached Maximum Healthcare. This is not a confirmed booking yet. Our team will review your details and call you back to confirm a suitable visit time.",
  };
}

export async function submitCallbackRequest(
  _previous: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const company = readField(formData, "company");
  if (company.value.trim()) {
    return {
      status: "rejected",
      message: "The request could not be accepted. Nothing has been booked.",
    };
  }

  const fields = {
    service: readField(formData, "service"),
    fullName: readField(formData, "fullName"),
    phone: readField(formData, "phone"),
    email: readField(formData, "email"),
  };

  if (Object.values(fields).some((field) => field.tooLong)) {
    return {
      status: "invalid",
      message: "Some details are too long. Shorten them and try again. Nothing has been booked.",
      errors: {},
    };
  }

  const values: CallbackValues = {
    service: fields.service.value,
    fullName: fields.fullName.value,
    phone: fields.phone.value,
    email: fields.email.value,
    consent: formData.get("consent") === "yes",
    company: "",
  };

  const validated = validateCallback(values);
  if (!validated.ok) {
    return {
      status: "invalid",
      message: "Some details need attention before this request can continue. Nothing has been booked.",
      errors: validated.errors,
    };
  }

  const submittedAt = new Date().toISOString();
  try {
    await saveInboxRecord({
      type: "callback_request",
      submittedAt,
      ...validated.value,
    });
  } catch (error) {
    console.error("Could not save callback request to the staff inbox.", {
      name: error instanceof Error ? error.name : "Error",
    });
    return {
      status: "failed",
      message: "The request could not be saved. Nothing was sent. Call a published number instead.",
    };
  }

  const endpoint = intakeEndpoint();
  if (!("error" in endpoint)) {
    await postIntake(
      {
        type: "callback_request",
        clinic: clinic.name,
        ...validated.value,
        submittedAt,
      },
      { delivered: "", failed: "" },
    );
  } else if (endpoint.error !== "missing") {
    console.error("Callback intake URL is missing or is not a safe https address.");
  }

  return {
    status: "delivered",
    message:
      "Your callback request has reached Maximum Healthcare. This is not a booked appointment. Our team will call you back on the number you shared.",
  };
}

export async function submitCareerApplication(
  _previous: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const company = readField(formData, "company");
  if (company.value.trim()) {
    return {
      status: "rejected",
      message: "The application could not be accepted. Nothing was sent.",
    };
  }

  const fields = {
    fullName: readField(formData, "fullName"),
    phone: readField(formData, "phone"),
    email: readField(formData, "email"),
    role: readField(formData, "role"),
    qualification: readField(formData, "qualification"),
    experience: readField(formData, "experience"),
    city: readField(formData, "city"),
    note: readField(formData, "note"),
  };

  if (Object.values(fields).some((field) => field.tooLong)) {
    return {
      status: "invalid",
      message: "Some details are too long. Shorten them and try again. Nothing was sent.",
      errors: {},
    };
  }

  const values: CareerValues = {
    fullName: fields.fullName.value,
    phone: fields.phone.value,
    email: fields.email.value,
    role: fields.role.value,
    qualification: fields.qualification.value,
    experience: fields.experience.value,
    city: fields.city.value,
    note: fields.note.value,
    consent: formData.get("consent") === "yes",
    company: "",
  };

  const validated = validateCareer(values);
  if (!validated.ok) {
    return {
      status: "invalid",
      message: "Some details need attention before this application can continue. Nothing was sent.",
      errors: validated.errors,
    };
  }

  const submittedAt = new Date().toISOString();
  try {
    await saveInboxRecord({
      type: "career_application",
      submittedAt,
      ...validated.value,
    });
  } catch (error) {
    console.error("Could not save career application to the staff inbox.", {
      name: error instanceof Error ? error.name : "Error",
    });
    return {
      status: "failed",
      message: "The application could not be saved. Nothing was sent. Call a published number instead.",
    };
  }

  const endpoint = intakeEndpoint();
  if (!("error" in endpoint)) {
    await postIntake(
      {
        type: "career_application",
        clinic: clinic.name,
        ...validated.value,
        submittedAt,
      },
      { delivered: "", failed: "" },
    );
  } else if (endpoint.error !== "missing") {
    console.error("Career intake URL is missing or is not a safe https address.");
  }

  return {
    status: "delivered",
    message:
      "Your application of interest has reached Maximum Healthcare. This is not a job offer. If your profile matches an upcoming opening, the team will contact you.",
  };
}

async function postIntake(
  payload: Record<string, unknown>,
  copy: { delivered: string; failed: string },
): Promise<ActionResult> {
  const endpoint = intakeEndpoint();
  if ("error" in endpoint) {
    return {
      status: "failed",
      message: copy.failed,
    };
  }

  const secret = process.env.APPOINTMENT_INTAKE_SECRET;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (secret) headers.Authorization = `Bearer ${secret}`;

  try {
    const response = await fetch(endpoint.url, {
      method: "POST",
      headers,
      redirect: "error",
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Intake returned a non-success status.", { status: response.status });
      return { status: "failed", message: copy.failed };
    }

    return { status: "delivered", message: copy.delivered };
  } catch (error) {
    console.error("Intake request failed.", {
      name: error instanceof Error ? error.name : "Error",
    });
    return { status: "failed", message: copy.failed };
  }
}
