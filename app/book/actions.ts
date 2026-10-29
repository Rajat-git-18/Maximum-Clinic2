"use server";

import { clinic } from "@/content/clinic";
import type { ActionResult } from "@/lib/appointment";
import { validateAppointment, type AppointmentValues } from "@/lib/validation";

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

  const endpoint = intakeEndpoint();
  if ("error" in endpoint && endpoint.error === "missing") {
    return {
      status: "not_configured",
      message:
        "Nothing was sent. This form is a preview because the clinic has not connected a booking inbox. No appointment has been requested or confirmed, and these details were not stored.",
    };
  }

  if ("error" in endpoint) {
    console.error("Appointment intake URL is missing or is not a safe https address.");
    return {
      status: "failed",
      message:
        "The booking intake is not configured correctly on the server. Nothing was sent and no appointment has been booked.",
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
      body: JSON.stringify({
        type: "appointment_request",
        clinic: clinic.name,
        ...validated.value,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error("Appointment intake returned a non-success status.", { status: response.status });
      return {
        status: "failed",
        message:
          "The request could not be delivered. Nothing has been booked. You can try again, or contact the clinic once a phone number or email is published.",
      };
    }

    return {
      status: "delivered",
      message:
        "Your request was delivered to the clinic’s intake service. This is not a confirmed appointment. The clinic still needs to contact you to agree a time.",
    };
  } catch (error) {
    console.error("Appointment intake request failed.", {
      name: error instanceof Error ? error.name : "Error",
    });
    return {
      status: "failed",
      message:
        "The request could not be delivered. Nothing has been booked. You can try again, or contact the clinic once a phone number or email is published.",
    };
  }
}
