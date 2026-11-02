import { Button } from "@/components/ui/Button";
import { ConsultationSketch } from "@/components/ui/ConsultationSketch";

export function BookWindow() {
  return (
    <aside className="book-window" aria-labelledby="book-window-heading">
      <div className="book-window-copy">
        <p className="eyebrow">Appointments</p>
        <h2 id="book-window-heading">Need a visit?</h2>
        <p>Request a preferred time. The clinic confirms it with you. The form does not book the slot by itself.</p>
        <Button href="/book">Book an appointment</Button>
      </div>
      <div className="book-window-art">
        <ConsultationSketch />
      </div>
    </aside>
  );
}
