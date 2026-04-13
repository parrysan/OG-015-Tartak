'use client';

/**
 * AnalyticsProvider — conditionally renders GA4 and Meta Pixel scripts.
 *
 * Only renders <Script> tags when consent is 'granted'. Returns null for
 * 'denied' or null consent states — no scripts load, no network requests.
 *
 * Listens for the 'consentChange' CustomEvent dispatched by CookieBanner
 * so analytics scripts load immediately after the user accepts, without
 * requiring a page reload.
 *
 * Google Consent Mode v2:
 * - Default-denied state is set by the beforeInteractive <Script> in layout.tsx
 *   BEFORE this component mounts (protects the window before hydration).
 * - When consent is granted, this component calls gtag('consent', 'update', ...)
 *   to unlock analytics and advertising storage.
 *
 * Meta Pixel GDPR pattern:
 * - Only loads when consent is 'granted' — the entire pixel factory is inside
 *   the consent-gated render path.
 * - fbq('consent', 'grant') is called before fbq('init', ...) per Meta GDPR docs.
 * - The <noscript><img> fallback is intentionally omitted — it would fire for
 *   all users regardless of consent (Pitfall 4 from research).
 *
 * IMPORTANT: GA4 must ONLY be loaded here. Do NOT use @next/third-parties
 * GoogleAnalytics — it has no Consent Mode v2 support (GitHub #66718).
 */

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { getConsent, type ConsentState } from '@/lib/consent';

interface AnalyticsProviderProps {
  ga4Id: string;
  metaPixelId: string;
}

export function AnalyticsProvider({ ga4Id, metaPixelId }: AnalyticsProviderProps) {
  const [consent, setConsentState] = useState<ConsentState>(null);

  useEffect(() => {
    // Read localStorage after hydration — prevents SSR mismatch.
    setConsentState(getConsent());

    // Listen for consent changes dispatched by CookieBanner.
    const handler = (e: Event) => {
      const decision = (e as CustomEvent<ConsentState>).detail;
      setConsentState(decision);

      // Update Consent Mode v2 when user grants consent.
      // The default-denied state was set by the beforeInteractive Script in layout.tsx.
      if (decision === 'granted' && typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        });
      }
    };

    window.addEventListener('consentChange', handler);
    return () => window.removeEventListener('consentChange', handler);
  }, []);

  // No scripts rendered until consent is explicitly granted.
  if (consent !== 'granted') return null;

  return (
    <>
      {/* ── Google Analytics 4 ─────────────────────────────────────────── */}
      {ga4Id && (
        <>
          <Script
            id="ga4-script"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4Id}', { send_page_view: true });
              `,
            }}
          />
        </>
      )}

      {/* ── Meta Pixel ────────────────────────────────────────────────── */}
      {/* Note: <noscript><img> fallback intentionally omitted — it fires  */}
      {/* without consent, violating GDPR (research Pitfall 4).           */}
      {metaPixelId && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document, 'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('consent', 'grant');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
    </>
  );
}
