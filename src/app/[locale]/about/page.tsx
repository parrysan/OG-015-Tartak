import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getHreflangAlternates, SITE_URL } from '@/lib/metadata';
import { buildBreadcrumbSchema, BREADCRUMB_HOME } from '@/lib/structured-data';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

const ABOUT_PAGE_NAME: Record<string, string> = {
  pl: 'O nas',
  en: 'About Us',
  uk: 'Про нас',
};

const pageMetadata: Record<string, { title: string; description: string }> = {
  pl: {
    title: 'O nas — Tartak-Budrol Płońsk',
    description:
      'Poznaj historię tartaku Tartak-Budrol: założony w 2007 roku, piła TrakMet, certyfikat C24 i drewno szwedzkie Södra.',
  },
  en: {
    title: 'About Us — Tartak-Budrol Płońsk',
    description:
      'Learn about Tartak-Budrol sawmill: founded in 2007, TrakMet band saw, C24 certification and Södra Swedish timber.',
  },
  uk: {
    title: 'Про нас — Tartak-Budrol Płońsk',
    description:
      'Дізнайтесь про лісопильню Tartak-Budrol: заснована у 2007 році, пила TrakMet, сертифікат C24 та шведська деревина Södra.',
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
    alternates: getHreflangAlternates('/about'),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${locale}/about/`,
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

function AboutContent() {
  const t = useTranslations('AboutPage');

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 timber-bg timber-bg--top-right timber-bg--lg">
      {/* Page header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-3">{t('title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">{t('subtitle')}</p>
      </div>

      {/* Story section */}
      <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">{t('story.title')}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t('story.p1')}</p>
            <p>{t('story.p2')}</p>
            <p>{t('story.p3')}</p>
          </div>
        </div>
        <div className="relative h-96 lg:h-[28rem] rounded-lg overflow-hidden">
          <Image
            src="/images/img_7031.webp"
            alt={t('owners.alt')}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Equipment section */}
      <section className="mb-16 bg-muted/30 rounded-lg p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-72 rounded-lg overflow-hidden order-last lg:order-first">
            <Image
              src="/images/img_6961.webp"
              alt="TrakMet band saw"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t('equipment.title')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('equipment.content')}</p>
          </div>
        </div>
      </section>

      {/* Certifications section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8">{t('certifications.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm">
                C24
              </span>
              <h3 className="font-semibold text-foreground">EN 338 — C24</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{t('certifications.c24')}</p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold text-sm">
                S
              </span>
              <h3 className="font-semibold text-foreground">Södra</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{t('certifications.sodra')}</p>
          </div>
        </div>
      </section>

      {/* Additional services section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t('services.title')}</h2>
        <p className="text-muted-foreground leading-relaxed">{t('services.items')}</p>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Button asChild size="lg">
          <Link href="/contact">{t('cta')}</Link>
        </Button>
      </div>
    </div>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumb = buildBreadcrumbSchema([
    { name: BREADCRUMB_HOME[locale] ?? 'Home', url: `${SITE_URL}/${locale}/` },
    {
      name: ABOUT_PAGE_NAME[locale] ?? 'About Us',
      url: `${SITE_URL}/${locale}/about/`,
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
      <AboutContent />
    </>
  );
}
