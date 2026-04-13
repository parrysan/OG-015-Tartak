import { setRequestLocale } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { TESTIMONIALS } from '@/lib/testimonials';
import { InlineQuoteWizard } from './UTMCapture';
import { Star, Award, Calendar, Truck } from 'lucide-react';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LandingPage' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

function TrustBar() {
  const t = useTranslations('LandingPage');

  return (
    <section className="border-y bg-muted/40">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          <div className="flex flex-col items-center gap-1 px-4 py-6 text-center">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-semibold">4.7/5</span>
            <span className="text-xs text-muted-foreground">{t('trust.googleRating')}</span>
            <span className="text-xs text-muted-foreground">{t('trust.reviewCount')}</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-4 py-6 text-center">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">{t('trust.since')}</span>
            <span className="text-xs text-muted-foreground">{t('trust.sinceLabel')}</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-4 py-6 text-center">
            <Truck className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">{t('trust.localDelivery')}</span>
            <span className="text-xs text-muted-foreground">{t('trust.localDeliveryDesc')}</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-4 py-6 text-center">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">{t('trust.c24Cert')}</span>
            <span className="text-xs text-muted-foreground">{t('trust.c24CertDesc')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const locale = useLocale() as 'pl' | 'en' | 'uk';
  const testimonials = TESTIMONIALS.slice(0, 3);

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-lg border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                &ldquo;{t.text[locale]}&rdquo;
              </p>
              <p className="text-sm font-semibold">{t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  const t = useTranslations('LandingPage');

  return (
    <section className="bg-primary/5 w-full">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-12 text-center sm:py-16">
        <h1 className="text-3xl font-bold sm:text-4xl">{t('hero.headline')}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{t('hero.subheadline')}</p>
      </div>
    </section>
  );
}

function WizardSection() {
  const t = useTranslations('LandingPage');

  return (
    <section className="py-8 bg-muted/20">
      <div className="mx-auto max-w-lg px-4">
        <h2 className="text-2xl font-bold text-center mb-6">{t('wizard.heading')}</h2>
        <InlineQuoteWizard />
      </div>
    </section>
  );
}

export default async function WycenaLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <TrustBar />
      <TestimonialsSection />
      <WizardSection />
    </>
  );
}
