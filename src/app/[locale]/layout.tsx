import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getHreflangAlternates } from '@/lib/metadata';
import { LayoutShell } from '@/components/layout/LayoutShell';

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://tartakplonsk.pl'),
    alternates: getHreflangAlternates('/'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // CRITICAL: Must be called before any translations or rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        {/* Consent Mode v2 defaults — must run BEFORE any gtag.js loads. */}
        <Script
          id="consent-mode-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
            `,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <LayoutShell
            ga4Id={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? ''}
            metaPixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''}
          >
            {children}
          </LayoutShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
