'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { QuoteWizardModal } from '@/components/quote-wizard/QuoteWizardModal';

export function CtaSection() {
  const t = useTranslations('HomePage.cta');

  return (
    <section className="bg-cta-bg py-16 text-cta-foreground">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold">{t('title')}</h2>
        <p className="mb-8 text-lg text-cta-foreground/80">{t('desc')}</p>
        <QuoteWizardModal>
          <Button className="bg-header-bg text-header-foreground hover:bg-header-bg/90" size="lg">
            {t('button')}
          </Button>
        </QuoteWizardModal>
      </div>
    </section>
  );
}
