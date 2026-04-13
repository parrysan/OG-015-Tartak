import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getHreflangAlternates, SITE_URL } from '@/lib/metadata';
import { buildBreadcrumbSchema, BREADCRUMB_HOME } from '@/lib/structured-data';

const PRIVACY_PAGE_NAME: Record<string, string> = {
  pl: 'Polityka prywatności',
  en: 'Privacy Policy',
  uk: 'Політика конфіденційності',
};

const pageMetadata: Record<string, { title: string; description: string }> = {
  pl: {
    title: 'Polityka prywatności — Tartak-Budrol Płońsk',
    description:
      'Polityka prywatności i ochrony danych osobowych serwisu Tartak-Budrol zgodna z RODO.',
  },
  en: {
    title: 'Privacy Policy — Tartak-Budrol Płońsk',
    description:
      'Privacy policy and personal data protection for the Tartak-Budrol website, compliant with GDPR.',
  },
  uk: {
    title: 'Політика конфіденційності — Tartak-Budrol Płońsk',
    description:
      'Політика конфіденційності та захисту персональних даних веб-сайту Tartak-Budrol відповідно до GDPR.',
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
    alternates: getHreflangAlternates('/privacy-policy'),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${locale}/privacy-policy/`,
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

function PrivacyContent() {
  const t = useTranslations('PrivacyPage');

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-3">{t('title')}</h1>
        <p className="text-sm text-muted-foreground">{t('lastUpdated')}</p>
      </header>

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">{t('controller.title')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('controller.content')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">{t('dataCollected.title')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('dataCollected.content')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">{t('purpose.title')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('purpose.content')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">{t('legalBasis.title')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('legalBasis.content')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">{t('retention.title')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('retention.content')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">{t('rights.title')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('rights.content')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">{t('authority.title')}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('authority.content')}{' '}
            <a
              href="https://uodo.gov.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              uodo.gov.pl
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">{t('cookies.title')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('cookies.content')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">{t('contact.title')}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('contact.content')}{' '}
            <a
              href="mailto:biuro@bud-rol.com.pl"
              className="text-primary hover:underline"
            >
              biuro@bud-rol.com.pl
            </a>
          </p>
        </section>

      </div>
    </article>
  );
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumb = buildBreadcrumbSchema([
    { name: BREADCRUMB_HOME[locale] ?? 'Home', url: `${SITE_URL}/${locale}/` },
    {
      name: PRIVACY_PAGE_NAME[locale] ?? 'Privacy Policy',
      url: `${SITE_URL}/${locale}/privacy-policy/`,
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
      <PrivacyContent />
    </>
  );
}
