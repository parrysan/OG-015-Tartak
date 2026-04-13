'use client';

import { useTranslations } from 'next-intl';
import { CircleCheck } from 'lucide-react';

export function Step4Confirmation() {
  const t = useTranslations('QuoteWizard.step4');

  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <CircleCheck className="h-14 w-14 text-green-500" aria-hidden="true" />

      <h2 className="font-heading text-lg font-semibold">{t('heading')}</h2>

      <p className="text-sm text-muted-foreground max-w-xs">{t('message')}</p>

      <div className="mt-2 flex flex-col items-center gap-1">
        <p className="text-xs text-muted-foreground">{t('callUs')}</p>
        <a
          href={`tel:${t('phone').replace(/[\s\-\(\)]/g, '')}`}
          className="text-base font-semibold text-primary hover:underline"
        >
          {t('phone')}
        </a>
      </div>
    </div>
  );
}
