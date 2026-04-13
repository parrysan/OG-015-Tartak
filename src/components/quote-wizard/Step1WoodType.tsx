'use client';

import { useTranslations } from 'next-intl';
import type { WoodType } from '@/lib/quote-schema';

interface Step1WoodTypeProps {
  onSelect: (woodType: WoodType) => void;
  selected?: WoodType;
}

export function Step1WoodType({ onSelect, selected }: Step1WoodTypeProps) {
  const t = useTranslations('QuoteWizard.step1');

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-heading text-base font-semibold">{t('heading')}</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Softwood card */}
        <button
          type="button"
          onClick={() => onSelect('softwood')}
          className={`flex flex-col gap-2 rounded-lg border-2 p-4 text-left transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            selected === 'softwood'
              ? 'border-primary bg-primary/5'
              : 'border-border bg-card'
          }`}
        >
          <span className="text-2xl" aria-hidden="true">
            🪵
          </span>
          <span className="font-heading text-sm font-semibold">
            {t('softwood.title')}
          </span>
          <span className="text-xs text-muted-foreground leading-relaxed">
            {t('softwood.desc')}
          </span>
        </button>

        {/* Imported timber card */}
        <button
          type="button"
          onClick={() => onSelect('imported')}
          className={`flex flex-col gap-2 rounded-lg border-2 p-4 text-left transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            selected === 'imported'
              ? 'border-primary bg-primary/5'
              : 'border-border bg-card'
          }`}
        >
          <span className="text-2xl" aria-hidden="true">
            🏆
          </span>
          <span className="font-heading text-sm font-semibold">
            {t('imported.title')}
          </span>
          <span className="text-xs text-muted-foreground leading-relaxed">
            {t('imported.desc')}
          </span>
        </button>
      </div>
    </div>
  );
}
