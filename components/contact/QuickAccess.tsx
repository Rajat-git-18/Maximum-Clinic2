"use client";

import { openCallback, useCallbackOpen } from "@/components/contact/CallbackModal";
import { CallbackIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { clinic } from "@/content/clinic";
import { telHref, whatsappHref } from "@/lib/clinic-facts";

export function QuickAccess() {
  const callbackOpen = useCallbackOpen();
  const call = telHref(clinic.phone);
  const whatsapp = clinic.whatsappEnabled ? whatsappHref(clinic.phone) : null;

  if (callbackOpen) return null;

  return (
    <div className="quick-access" role="navigation" aria-label="Quick access">
      {whatsapp ? (
        <a
          className="quick-btn quick-btn-wa"
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp the clinic (opens in a new tab)"
        >
          <WhatsAppIcon />
        </a>
      ) : null}
      {call ? (
        <a className="quick-btn quick-btn-call" href={call} aria-label={`Call ${clinic.phones[0]?.display ?? "the clinic"}`}>
          <PhoneIcon />
        </a>
      ) : null}
      <button className="quick-btn quick-btn-callback" type="button" onClick={openCallback} aria-label="Request a callback">
        <CallbackIcon />
      </button>
    </div>
  );
}
