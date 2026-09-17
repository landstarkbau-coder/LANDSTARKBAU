'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';

export function AnalyticsGate({ gaId }: { gaId: string }) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const stored = localStorage.getItem('cookie_consent');
      if (!stored) {
        setConsented(false);
        return;
      }
      try {
        const parsed = JSON.parse(stored);
        // GA завантажується лише якщо дозволено саме аналітику
        setConsented(parsed.analytics === true);
      } catch {
        setConsented(false);
      }
    };

    checkConsent();
    window.addEventListener('consent-updated', checkConsent);
    return () => window.removeEventListener('consent-updated', checkConsent);
  }, []);

  if (!consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}