import { clinic } from "@/content/clinic";

export type NavItem = {
  href: string;
  label: string;
};

export function doctorsHref(): string {
  if (clinic.doctors.length === 1) {
    return `/doctors/${clinic.doctors[0].slug}`;
  }
  return "/doctors";
}

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  ...(clinic.doctors.length > 0 ? [{ href: doctorsHref(), label: "Doctors" }] : []),
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Patient resources" },
  { href: "/contact", label: "Contact" },
];

export const policyNav: NavItem[] = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
  { href: "/accessibility", label: "Accessibility" },
];

export function isNavActive(pathname: string, item: NavItem): boolean {
  if (item.label === "Doctors" || item.href.startsWith("/doctors")) {
    return pathname.startsWith("/doctors");
  }
  if (item.href === "/") return pathname === "/";
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
