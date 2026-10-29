import { clinic } from "@/content/clinic";

export function DraftNotice() {
  if (clinic.readyToPublish) return null;
  return (
    <p className="draft-note" role="note">
      Draft website. Details in square brackets are placeholders. Credentials, reviews, and statistics are not
      shown unless the clinic has confirmed them. Appointment requests are not delivered until a booking inbox is
      connected.
    </p>
  );
}
