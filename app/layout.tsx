import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Suspense } from "react";
import { DraftNotice } from "@/components/layout/DraftNotice";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Logo } from "@/components/layout/Logo";
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
        <main id="main" tabIndex={-1}>
          <DraftNotice />
          {children}
        </main>
        <Footer />
        <JsonLd />
      </body>
    </html>
  );
}
