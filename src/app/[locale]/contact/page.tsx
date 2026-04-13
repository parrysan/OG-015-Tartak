import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getHreflangAlternates, SITE_URL } from '@/lib/metadata';
import { buildBreadcrumbSchema, BREADCRUMB_HOME } from '@/lib/structured-data';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Users } from 'lucide-react';

const CONTACT_PAGE_NAME: Record<string, string> = {
  pl: 'Kontakt',
  en: 'Contact',
  uk: 'Контакт',
};

const pageMetadata: Record<string, { title: string; description: string }> = {
  pl: {
    title: 'Kontakt — Tartak-Budrol Płońsk',
    description:
      'Skontaktuj się z Tartak-Budrol: telefon, e-mail, adres tartaku i biura, godziny otwarcia, przedstawiciele handlowi.',
  },
  en: {
    title: 'Contact — Tartak-Budrol Płońsk',
    description:
      'Contact Tartak-Budrol: phone, email, sawmill and office address, opening hours, sales representatives.',
  },
  uk: {
    title: 'Контакт — Tartak-Budrol Płońsk',
    description:
      'Зв\'яжіться з Tartak-Budrol: телефон, email, адреса лісопильні та офісу, години роботи, торгові представники.',
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
    alternates: getHreflangAlternates('/contact'),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${locale}/contact/`,
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

function ContactContent() {
  const t = useTranslations('ContactPage');

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 timber-bg timber-bg--bottom-right timber-bg--lg">
      {/* Page header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-3">{t('title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">{t('subtitle')}</p>
      </div>

      {/* Two-column layout: contact details (left) + map (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

        {/* Left column — contact details */}
        <div className="space-y-8">

          {/* Sawmill section */}
          <section className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-foreground">{t('sawmill.title')}</h2>
            </div>
            <p className="text-muted-foreground mb-4">{t('sawmill.address')}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                <a
                  href="tel:504251535"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t('sawmill.phone1')}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                <a
                  href="tel:505202500"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t('sawmill.phone2')}
                </a>
              </div>
            </div>
          </section>

          {/* Office section */}
          <section className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-foreground">{t('office.title')}</h2>
            </div>
            <p className="text-muted-foreground mb-4">{t('office.address')}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                <a
                  href="tel:+48236624962"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t('office.phone1')}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                <a
                  href="tel:+48236625591"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t('office.phone2')}
                </a>
              </div>
            </div>
          </section>

          {/* Email section */}
          <section className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-foreground">{t('email.title')}</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <a
                  href="mailto:tartak@bud-rol.com.pl"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t('email.tartak')}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="mailto:biuro@bud-rol.com.pl"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t('email.biuro')}
                </a>
              </div>
            </div>
          </section>

          {/* Opening hours section */}
          <section className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-foreground">{t('hours.title')}</h2>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p>{t('hours.weekdays')}</p>
              <p>{t('hours.saturday')}</p>
              <p>{t('hours.sunday')}</p>
            </div>
          </section>

          {/* Sales representatives section */}
          <section className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-foreground">{t('salesReps.title')}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground">{t('salesReps.rep1.name')}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                  <a
                    href="tel:+48797598121"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t('salesReps.rep1.phone')}
                  </a>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground">{t('salesReps.rep2.name')}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                  <a
                    href="tel:+48797598120"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t('salesReps.rep2.phone')}
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right column — Google Maps embed */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">{t('map.title')}</h2>
            <div className="rounded-lg overflow-hidden border shadow-sm w-full h-[400px] lg:h-full lg:min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.1234!2d20.355121899999998!3d52.604547900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDM2JzE2LjQiTiAyMMKwMjEnMTguNCJF!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tartak-Budrol location map"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Quote CTA section */}
      <div className="text-center bg-muted/30 rounded-lg p-8 lg:p-12">
        <p className="text-xl text-foreground mb-6">{t('quotePrompt')}</p>
        <Button asChild size="lg">
          <Link href="/contact">{t('quoteCta')}</Link>
        </Button>
      </div>

    </div>
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumb = buildBreadcrumbSchema([
    { name: BREADCRUMB_HOME[locale] ?? 'Home', url: `${SITE_URL}/${locale}/` },
    {
      name: CONTACT_PAGE_NAME[locale] ?? 'Contact',
      url: `${SITE_URL}/${locale}/contact/`,
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
      <ContactContent />
    </>
  );
}
