"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { SiteSearch } from "@/components/layout/SiteSearch";
import { PhoneIcon, StaffIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { clinic } from "@/content/clinic";
import { telHref, whatsappHref } from "@/lib/clinic-facts";
import { isNavActive, primaryNav } from "@/lib/navigation";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openPath, setOpenPath] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  if (pathname !== openPath) {
    setOpenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1180) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previouslyFocused = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const selectors = 'a[href], button:not([disabled])';
    const items = panel ? Array.from(panel.querySelectorAll<HTMLElement>(selectors)) : [];
    items[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(selectors));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  const callHref = telHref(clinic.phone);
  const whatsapp = clinic.whatsappEnabled ? whatsappHref(clinic.phone) : null;
  const onStaffRoute = pathname.startsWith("/staff");

  if (onStaffRoute) return null;

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="header-inner">
        <Logo />
        <div className="header-nav-cluster">
          <SiteSearch />
          <nav className="desktop-nav" aria-label="Primary">
            <ul>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link"
                    aria-current={isNavActive(pathname, item) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="header-actions">
          {whatsapp ? (
            <a
              className="header-icon header-icon-wa"
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp the clinic"
            >
              <WhatsAppIcon />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
          {callHref ? (
            <a className="header-icon" href={callHref} aria-label={`Call ${clinic.phones[0]?.display ?? "the clinic"}`}>
              <PhoneIcon />
            </a>
          ) : null}
          <Link href="/book" className="btn btn-primary header-book" aria-label="Book an appointment">
            <span className="btn-full">Book an appointment</span>
            <span className="btn-short">Book</span>
          </Link>
        </div>
        <Link href="/staff/login" className="header-icon header-staff" aria-label="Staff login">
          <StaffIcon />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="menu-bars" aria-hidden="true" />
        </button>
      </div>
      {open ? (
        <div
          id="mobile-navigation"
          ref={panelRef}
          className="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <nav aria-label="Mobile">
            <ul>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="mobile-link"
                    aria-current={isNavActive(pathname, item) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-quick">
            <Link href="/staff/login" className="btn btn-secondary">
              Staff login
            </Link>
            {callHref ? (
              <a className="btn btn-secondary" href={callHref}>
                Call
              </a>
            ) : null}
            {whatsapp ? (
              <a className="btn btn-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>
          <Link href="/book" className="btn btn-primary mobile-book">
            Book an appointment
          </Link>
        </div>
      ) : null}
    </header>
  );
}
