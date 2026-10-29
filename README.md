# Clinic website

A premium clinic site built with Next.js. Factual clinic details are placeholders in `content/clinic.ts`. The site does not invent credentials, reviews, statistics, or a confirmed booking.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Before publication

1. Replace every bracketed value in `content/clinic.ts` with verified clinic information.
2. Add real photography by extending the media components, and remove the placeholder frames.
3. Add testimonials only when a patient has authorised the quote and professional rules allow it.
4. Set `readyToPublish` to `true` after the name, speciality, location, phone, and email are real. Until then the site sends `noindex` and `robots.txt` disallows crawling.
5. Set `NEXT_PUBLIC_SITE_URL` to the public https address.
6. Have the privacy and terms pages reviewed. They are drafts and do not claim regulatory compliance.
7. Add a street address only when it is verified. The map link appears after `address.street`, `address.locality`, and `address.country` are filled. No map is embedded for a guessed location.
8. A WhatsApp link appears only when the phone number is a real international number beginning with `+`.
9. Hindi can be added when translations are supplied. The interface is English.

## Appointment requests

The form is a preview until an intake service is connected. It validates the request, then tells the visitor that nothing was sent and nothing was stored. It does not invent open slots or a successful booking.

To deliver requests, set these server environment variables (see `.env.example`):

- `APPOINTMENT_INTAKE_URL` — an `https://` endpoint you control. `http://localhost` is allowed for development.
- `APPOINTMENT_INTAKE_SECRET` — optional bearer token. It is sent only from the server.

The server posts JSON:

```json
{
  "type": "appointment_request",
  "clinic": "[CLINIC_NAME]",
  "service": "service-slug",
  "doctor": "doctor-slug",
  "preferredDate": "2026-11-02",
  "timeOfDay": "morning",
  "fullName": "Ada Lovelace",
  "phone": "+910000000000",
  "email": "ada@example.com",
  "note": "",
  "submittedAt": "2026-10-29T00:00:00.000Z"
}
```

A successful HTTP response means the request was delivered, not that an appointment is confirmed. Add rate limiting and monitoring on the intake service. The form includes a honeypot, but that is not a complete spam defence.

Do not put patient details in analytics. This project does not include an analytics script.

## Deployment

Host the app on any Node.js platform that supports Next.js, and serve it over HTTPS. `poweredByHeader` is disabled, and basic security headers are set in `next.config.ts`. HTTPS itself is the host’s responsibility.
