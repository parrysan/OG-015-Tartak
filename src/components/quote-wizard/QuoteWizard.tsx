'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { QuoteFormData, WoodType } from '@/lib/quote-schema';
import { Step1WoodType } from './Step1WoodType';
import { Step2Dimensions } from './Step2Dimensions';
import { Step3Contact } from './Step3Contact';
import { Step4Confirmation } from './Step4Confirmation';

type Step2Data = Pick<QuoteFormData, 'thickness' | 'width' | 'length' | 'quantity'>;
type Step3Data = Pick<QuoteFormData, 'name' | 'phone' | 'email' | 'notes' | 'gdpr'>;

// Type declaration for Meta Pixel fbq global — guard required because fbq only exists after consent
type WindowWithFbq = Window & { fbq?: (...args: unknown[]) => void };

interface QuoteWizardProps {
  onComplete?: () => void;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export function QuoteWizard({ onComplete, utmSource, utmMedium, utmCampaign }: QuoteWizardProps) {
  const t = useTranslations('QuoteWizard');

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [woodType, setWoodType] = useState<WoodType | undefined>(undefined);
  const [step2Data, setStep2Data] = useState<Step2Data | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  function handleStep1Select(selected: WoodType) {
    setWoodType(selected);
    setStep(2);
  }

  function handleStep2Submit(data: Step2Data) {
    setStep2Data(data);
    setStep(3);
  }

  async function handleStep3Submit(data: Step3Data) {
    setIsSubmitting(true);
    setSubmitError(undefined);

    const submitUrl = process.env.NEXT_PUBLIC_SUBMIT_LEAD_URL;

    if (!submitUrl) {
      setSubmitError('Submit URL not configured. Set NEXT_PUBLIC_SUBMIT_LEAD_URL env var.');
      setIsSubmitting(false);
      return;
    }

    const body: QuoteFormData = {
      woodType: woodType!,
      ...step2Data!,
      ...data,
      ...(utmSource && { utmSource }),
      ...(utmMedium && { utmMedium }),
      ...(utmCampaign && { utmCampaign }),
    };

    try {
      const res = await fetch(submitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.status === 429) {
        setSubmitError(t('step3.errors.rateLimited'));
        setIsSubmitting(false);
        return;
      }

      if (!res.ok) {
        let msg = t('step3.errors.serverError');
        try {
          const json = await res.json();
          if (json?.error) msg = json.error;
        } catch {
          // ignore parse errors
        }
        setSubmitError(msg);
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setStep(4);
      onComplete?.();

      // Fire Meta Pixel Lead conversion — guard required because fbq only exists after consent
      // Source: https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking/
      if (typeof window !== 'undefined' && typeof (window as WindowWithFbq).fbq === 'function') {
        (window as WindowWithFbq).fbq!('track', 'Lead');
      }
    } catch {
      setSubmitError(t('step3.errors.networkError'));
      setIsSubmitting(false);
    }
  }

  function handleBack() {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Progress indicator */}
      {step < 4 && (
        <div className="flex items-center gap-2">
          {([1, 2, 3] as const).map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                s <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-muted-foreground whitespace-nowrap">
            {t('stepOf', { step, total: 3 })}
          </span>
        </div>
      )}

      {/* Step content */}
      {step === 1 && (
        <Step1WoodType onSelect={handleStep1Select} selected={woodType} />
      )}

      {step === 2 && (
        <Step2Dimensions
          onSubmit={handleStep2Submit}
          defaultValues={step2Data}
          onBack={handleBack}
        />
      )}

      {step === 3 && (
        <Step3Contact
          onSubmit={handleStep3Submit}
          onBack={handleBack}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}

      {step === 4 && <Step4Confirmation />}
    </div>
  );
}
