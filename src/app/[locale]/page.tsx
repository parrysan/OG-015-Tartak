import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getHreflangAlternates, SITE_URL } from '@/lib/metadata';
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
  BREADCRUMB_HOME,
} from '@/lib/structured-data';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ProductTeaser } from '@/components/sections/ProductTeaser';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaSection } from '@/components/sections/CtaSection';

// Locale-specific page metadata
const pageMetadata: Record<
  string,
  { title: string; description: string }
> = {
  pl: {
    title: 'Tartak-Budrol — Tartak Płońsk',
    description: 'Tartak i skład drewna w Płońsku',
  },
  en: {
    title: 'Tartak-Budrol — Sawmill Płońsk',
    description: 'Sawmill and timber yard in Płońsk',
  },
  uk: {
    title: 'Tartak-Budrol — Лісопильня Плоньськ',
    description: 'Лісопильня та склад деревини у Плоньську',
  },
};

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
    alternates: getHreflangAlternates('/'),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${locale}/`,
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // CRITICAL: Must be called before any translations
  setRequestLocale(locale);

  const localBusiness = buildLocalBusinessSchema();
  const breadcrumb = buildBreadcrumbSchema([
    { name: BREADCRUMB_HOME[locale] ?? 'Home', url: `${SITE_URL}/${locale}/` },
  ]);

  return (
    <>
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusiness).replace(/</g, '\\u003c'),
        }}
      />
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <ProductTeaser />
      <Testimonials />
      <CtaSection />
    </>
  );
}
