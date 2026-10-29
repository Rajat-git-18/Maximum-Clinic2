import { clinic } from "@/content/clinic";

const PLACEHOLDER = /^\[[A-Z0-9][A-Z0-9_ ,./-]*\]$/;

export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true;
  return PLACEHOLDER.test(value.trim());
}

export function isPublishable(): boolean {
  if (!clinic.readyToPublish) return false;
  const required = [clinic.name, clinic.speciality, clinic.cityCountry, clinic.phone];
  return required.every((value) => !isPlaceholder(value)) && clinic.phones.length > 0;
}

export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    return new URL(raw).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** Returns an E.164 number only when the configured value is a real international phone number. */
export function e164Phone(value: string): string | null {
  if (isPlaceholder(value)) return null;
  const compact = value.replace(/[^\d+]/g, "");
  if (!/^\+[1-9]\d{7,14}$/.test(compact)) return null;
  return compact;
}

export function telHref(value: string): string | null {
  const e164 = e164Phone(value);
  if (e164) return `tel:${e164}`;
  if (isPlaceholder(value)) return null;
  const compact = value.replace(/[^\d+]/g, "");
  if (!/^\+?[1-9]\d{7,14}$/.test(compact)) return null;
  return `tel:${compact}`;
}

export function whatsappHref(value: string): string | null {
  const e164 = e164Phone(value);
  if (!e164) return null;
  const text = encodeURIComponent(
    "Hello, I would like to enquire about arranging a visit. This message does not include medical details.",
  );
  return `https://wa.me/${e164.slice(1)}?text=${text}`;
}

export function isValidEmail(value: string): boolean {
  if (isPlaceholder(value)) return false;
  return value.length <= 120 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function mailtoHref(value: string): string | null {
  if (!isValidEmail(value)) return null;
  return `mailto:${value}`;
}

export function locationLabel(): string {
  const { street, locality, region, postalCode, country } = clinic.address;
  const parts = [street, locality, region, postalCode, country].map((part) => part.trim()).filter(Boolean);
  if (parts.length > 0 && parts.every((part) => !isPlaceholder(part))) {
    return parts.join(", ");
  }
  return clinic.cityCountry;
}

export function mapsHref(): string | null {
  if (clinic.mapsUrl) return clinic.mapsUrl;
  const { street, locality, country } = clinic.address;
  if (!street.trim() || !locality.trim() || !country.trim()) return null;
  if ([street, locality, country].some(isPlaceholder)) return null;
  const query = locationLabel();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function hasVerifiedAddress(): boolean {
  return mapsHref() !== null;
}

export function localBusinessJsonLd(): Record<string, unknown> | null {
  if (!isPublishable()) return null;
  const phone = e164Phone(clinic.phone) ?? telHref(clinic.phone)?.replace("tel:", "") ?? null;
  const { street, locality, region, postalCode, country } = clinic.address;
  if (!phone || !street.trim() || !locality.trim() || !country.trim()) return null;
  if ([clinic.name, street, locality, country].some(isPlaceholder)) return null;

  const doctors = clinic.doctors
    .filter((doctor) => !isPlaceholder(doctor.name))
    .map((doctor) => ({
      "@type": "Physician",
      name: doctor.name,
      medicalSpecialty: isPlaceholder(doctor.speciality) ? undefined : doctor.speciality,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: clinic.name,
    url: siteUrl(),
    image: `${siteUrl()}/brand/logo-mark.jpg`,
    telephone: phone,
    email: isValidEmail(clinic.email) ? clinic.email : undefined,
    medicalSpecialty: isPlaceholder(clinic.speciality) ? undefined : "Orthopedic",
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: locality,
      addressRegion: region || undefined,
      postalCode: postalCode || undefined,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.geo.latitude,
      longitude: clinic.geo.longitude,
    },
    hasMap: clinic.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "15:30",
      },
    ],
    sameAs: clinic.social.map((item) => item.href),
    employee: doctors.length > 0 ? doctors : undefined,
  };
}
