'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { QuoteWizard } from '@/components/quote-wizard/QuoteWizard';

function QuoteWizardWithUTM() {
  const searchParams = useSearchParams();
  const utmSource = searchParams.get('utm_source') ?? undefined;
  const utmMedium = searchParams.get('utm_medium') ?? undefined;
  const utmCampaign = searchParams.get('utm_campaign') ?? undefined;

  return (
    <QuoteWizard
      utmSource={utmSource}
      utmMedium={utmMedium}
      utmCampaign={utmCampaign}
    />
  );
}

export function InlineQuoteWizard() {
  return (
    <Suspense fallback={<div className="h-48 animate-pulse bg-muted rounded-lg" />}>
      <QuoteWizardWithUTM />
    </Suspense>
  );
}
