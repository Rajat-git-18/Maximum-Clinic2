export type ActionResult = {
  status: "invalid" | "not_configured" | "delivered" | "failed" | "rejected";
  message: string;
  errors?: Record<string, string>;
};
