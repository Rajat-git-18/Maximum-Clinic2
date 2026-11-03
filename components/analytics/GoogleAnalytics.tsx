import Script from "next/script";

export function measurementId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
  return /^G-[A-Z0-9]+$/.test(raw) ? raw : null;
}

export function GoogleAnalytics({ id }: { id: string }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
