import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getHreflangAlternates, SITE_URL } from '@/lib/metadata';
import { Zap, Globe, FileText, Search, ArrowRight, BrainCircuit, Megaphone } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const pageMetadata: Record<string, { title: string; description: string }> = {
  pl: {
    title: 'O stronie - Tartak Budrol',
    description:
      'Jak powstala strona internetowa Tartaku Budrol w Plonsku. Nowoczesna strona dla firmy z brazy drzewnej.',
  },
  en: {
    title: 'About this site - Tartak Budrol',
    description:
      'How the Tartak Budrol website was built. A modern website for a timber industry business.',
  },
  uk: {
    title: 'Про цей сайт - Tartak Budrol',
    description:
      'Як було створено сайт Tartak Budrol. Сучасний сайт для підприємства деревообробної галузі.',
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
    alternates: getHreflangAlternates('/o-stronie'),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${locale}/o-stronie/`,
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

function OStronieContent() {
  const t = useTranslations('OStroniePage');

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 timber-bg timber-bg--top-right timber-bg--lg">
      {/* Page header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-3">{t('title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">{t('subtitle')}</p>
      </div>

      {/* Built-by intro */}
      <p className="mb-16 text-muted-foreground leading-relaxed max-w-3xl">{t('intro')}</p>

      {/* About the site section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6">{t('about.heading')}</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed max-w-3xl">
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <p>{t('about.p3')}</p>
          <p>{t('about.p4')}</p>
        </div>
      </section>

      {/* Features grid — 2x3: four standard cards + two larger cards */}
      <section className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Row 1–2: four standard feature cards */}
          <div className="feature-card rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{t('features.speed.title')}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{t('features.speed.desc')}</p>
          </div>
          <div className="feature-card rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{t('features.languages.title')}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{t('features.languages.desc')}</p>
          </div>
          <div className="feature-card rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{t('features.quotes.title')}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{t('features.quotes.desc')}</p>
          </div>
          <div className="feature-card rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Search className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{t('features.seo.title')}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{t('features.seo.desc')}</p>
          </div>

          {/* Row 3: two larger feature cards */}
          <div className="feature-card rounded-lg border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">{t('features.aeo.title')}</h3>
            </div>
            <p className="text-muted-foreground">{t('features.aeo.desc')}</p>
          </div>
          <Link
            href="/ad-examples"
            className="feature-card group rounded-lg border bg-card p-8 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Megaphone className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">{t('features.fbAds.title')}</h3>
              </div>
              <p className="text-muted-foreground">{t('features.fbAds.desc')}</p>
            </div>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
              {t('features.fbAds.cta')}
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default async function OStroniePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OStronieContent />;
}
