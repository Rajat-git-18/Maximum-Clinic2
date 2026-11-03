import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Suspense } from "react";
import { CallbackModal } from "@/components/contact/CallbackModal";
import { QuickAccess } from "@/components/contact/QuickAccess";
import { AccreditationBar } from "@/components/layout/AccreditationBar";
import { DraftNotice } from "@/components/layout/DraftNotice";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Logo } from "@/components/layout/Logo";
import { PublicOnly } from "@/components/layout/PublicOnly";
import { CookieNotice } from "@/components/analytics/CookieNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = rootMetadata();

export const viewport: Viewport = {
  themeColor: "#1A3878",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Suspense
          fallback={
            <header className="site-header">
              <div className="header-inner">
                <Logo />
              </div>
            </header>
          }
        >
          <Header />
        </Suspense>
        <PublicOnly>
          <AccreditationBar />
        </PublicOnly>
        <main id="main" tabIndex={-1}>
          <PublicOnly>
            <DraftNotice />
          </PublicOnly>
          {children}
        </main>
        <PublicOnly>
          <Footer />
          <CallbackModal />
          <QuickAccess />
          <JsonLd />
          <CookieNotice />
        </PublicOnly>
      </body>
    </html>
  );
}
