'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { QuoteWizardModal } from '@/components/quote-wizard/QuoteWizardModal';

export function Hero() {
  const t = useTranslations('HomePage.hero');

  return (
    <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden">
      <Image
        src="/images/img_6961.webp"
        alt="Tartak Płońsk — przetarcie drewna"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {t('headline')}
            </h1>
            <p className="mb-8 text-lg text-white/90 sm:text-xl">
              {t('subheading')}
            </p>
            <QuoteWizardModal>
              <Button size="lg">
                {t('cta')}
              </Button>
            </QuoteWizardModal>
          </div>
        </div>
      </div>
    </section>
  );
}
