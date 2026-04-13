import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { routing } from '@/i18n/routing';
import { getHreflangAlternates, SITE_URL } from '@/lib/metadata';
import {
  buildProductSchemas,
  buildFAQSchema,
  buildBreadcrumbSchema,
  BREADCRUMB_HOME,
} from '@/lib/structured-data';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

const PRODUCTS_PAGE_NAME: Record<string, string> = {
  pl: 'Oferta',
  en: 'Products',
  uk: 'Продукція',
};

const pageMetadata: Record<string, { title: string; description: string }> = {
  pl: {
    title: 'Oferta — Tartak-Budrol Płońsk',
    description:
      'Drewno krajowe na wymiar i szwedzkie drewno konstrukcyjne C24 od Södry. Sosna, świerk, belki do 11,5 m, certyfikat EN 338.',
  },
  en: {
    title: 'Products — Tartak-Budrol Płońsk',
    description:
      'Custom-cut domestic timber and Swedish C24 structural timber from Södra. Pine, spruce, beams up to 11.5 m, EN 338 certified.',
  },
  uk: {
    title: 'Продукція — Tartak-Budrol Płońsk',
    description:
      'Вітчизняна деревина на замовлення та шведська конструктивна деревина C24 від Södra. Сосна, ялина, балки до 11,5 м, сертифікат EN 338.',
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
    alternates: getHreflangAlternates('/products'),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${locale}/products/`,
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

function ProductsContent() {
  const t = useTranslations('ProductsPage');

  const softwoodFeatureKeys = [
    'customDimensions',
    'beams',
    'battens',
    'trusses',
    'planed',
  ] as const;

  const swedishFeatureKeys = [
    'c24cert',
    'kilnDried',
    'sodra',
    'structural',
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 timber-bg timber-bg--top-left timber-bg--lg">
      {/* Page header */}
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-3">{t('title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">{t('subtitle')}</p>
      </div>

      {/* Section 1: Custom-cut domestic softwood */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">{t('softwood.title')}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>{t('softwood.desc1')}</p>
              <p>{t('softwood.desc2')}</p>
              <p>{t('softwood.desc3')}</p>
            </div>
            <ul className="space-y-3">
              {softwoodFeatureKeys.map((key) => (
                <li key={key} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span>{t(`softwood.features.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 lg:h-[480px] rounded-lg overflow-hidden">
            <Image
              src="/images/img_6964.webp"
              alt="Custom-cut domestic timber"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Swedish C24 timber */}
      <section className="mb-20 bg-muted/30 rounded-lg p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 lg:h-[480px] rounded-lg overflow-hidden order-last lg:order-first">
            <Image
              src="/images/img_6970.webp"
              alt="Swedish C24 structural timber"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">{t('swedish.title')}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>{t('swedish.desc1')}</p>
              <p>{t('swedish.desc2')}</p>
              <p>{t('swedish.desc3')}</p>
            </div>
            <ul className="space-y-3">
              {swedishFeatureKeys.map((key) => (
                <li key={key} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span>{t(`swedish.features.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: C24 grade explanation */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">{t('c24.title')}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t('c24.content1')}</p>
              <p>{t('c24.content2')}</p>
              <p>{t('c24.content3')}</p>
            </div>
          </div>
          <div>
            <div className="rounded-lg border bg-card p-6 shadow-sm mb-6">
              <h3 className="font-semibold text-foreground mb-3">{t('c24.badges')}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t('c24.badgesDesc')}</p>
              <div className="mt-4 flex gap-3">
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                  Södra
                </span>
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold">
                  C24
                </span>
              </div>
            </div>
            <div className="relative h-56 rounded-lg overflow-hidden">
              <Image
                src="/images/img_6971.webp"
                alt="C24 grade markings on timber"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-8">
        <Button asChild size="lg">
          <Link href="/contact">{t('cta')}</Link>
        </Button>
      </div>
    </div>
  );
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const productSchemas = buildProductSchemas();
  const faqSchema = buildFAQSchema(locale);
  const breadcrumb = buildBreadcrumbSchema([
    { name: BREADCRUMB_HOME[locale] ?? 'Home', url: `${SITE_URL}/${locale}/` },
    {
      name: PRODUCTS_PAGE_NAME[locale] ?? 'Products',
      url: `${SITE_URL}/${locale}/products/`,
    },
  ]);

  return (
    <>
      {productSchemas.map((schema, index) => (
        <script
          async
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
          }}
        />
      ))}
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />
      <ProductsContent />
    </>
  );
}
