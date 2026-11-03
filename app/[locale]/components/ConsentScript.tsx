// app/[locale]/components/ConsentScript.tsx
'use client';

import { useServerInsertedHTML } from 'next/navigation';

export function ConsentScript() {
  useServerInsertedHTML(() => (
    <script
      id="consent-default"
      dangerouslySetInnerHTML={{
        __html: `
          if (!window.dataLayer) {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
          }
        `,
      }}
    />
  ));

  return null;
}