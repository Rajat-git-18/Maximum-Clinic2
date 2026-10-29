import type { AppointmentErrors } from "@/lib/validation";

export type ActionResult = {
  status: "invalid" | "not_configured" | "delivered" | "failed" | "rejected";
  message: string;
  errors?: AppointmentErrors;
};
