import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getHreflangAlternates, SITE_URL } from '@/lib/metadata';
import { buildBreadcrumbSchema, BREADCRUMB_HOME } from '@/lib/structured-data';
import { AdShowcase } from './AdShowcase';

/* ------------------------------------------------------------------ */
/* Static params & metadata                                           */
/* ------------------------------------------------------------------ */

const AD_EXAMPLES_PAGE_NAME: Record<string, string> = {
  pl: 'Przykłady reklam',
  en: 'Ad Examples',
  uk: 'Приклади реклами',
};

const pageMetadata: Record<string, { title: string; description: string }> = {
  pl: {
    title: 'Przykłady reklam Facebook — Tartak-Budrol Płońsk',
    description:
      'Przykładowe kampanie reklamowe Facebook dla Tartak-Budrol: budujący domy, remonty i ekipy budowlane.',
  },
  en: {
    title: 'Facebook Ad Examples — Tartak-Budrol Płońsk',
    description:
      'Sample Facebook ad campaigns for Tartak-Budrol sawmill: homebuilders, renovations and construction crews.',
  },
  uk: {
    title: 'Приклади реклами Facebook — Tartak-Budrol Płońsk',
    description:
      'Зразки рекламних кампаній Facebook для лісопильні Tartak-Budrol: будівництво, ремонт та будівельні бригади.',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = pageMetadata[locale] ?? pageMetadata['pl'];

  return {
    title: meta.title,
    description: meta.description,
    alternates: getHreflangAlternates('/ad-examples'),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${locale}/ad-examples/`,
      siteName: 'Tartak-Budrol',
      locale: locale === 'uk' ? 'uk_UA' : locale === 'en' ? 'en_US' : 'pl_PL',
      type: 'website',
      images: [
        {
          url: '/og/tartak-og.png',
          width: 1200,
          height: 630,
          alt: 'Tartak-Budrol — Tartak Plonsk',
        },
      ],
    },
  };
}

/* ------------------------------------------------------------------ */
/* Page export                                                        */
/* ------------------------------------------------------------------ */

export default async function AdExamplesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumb = buildBreadcrumbSchema([
    { name: BREADCRUMB_HOME[locale] ?? 'Home', url: `${SITE_URL}/${locale}/` },
    {
      name: AD_EXAMPLES_PAGE_NAME[locale] ?? 'Ad Examples',
      url: `${SITE_URL}/${locale}/ad-examples/`,
    },
  ]);

  return (
    <>
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />
      <AdShowcase />
    </>
  );
}
