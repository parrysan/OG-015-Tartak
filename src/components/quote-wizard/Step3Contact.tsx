'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { step3Schema } from '@/lib/quote-schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

type Step3Data = z.infer<typeof step3Schema>;

interface Step3ContactProps {
  onSubmit: (data: Step3Data) => void;
  onBack: () => void;
  isSubmitting: boolean;
  submitError?: string;
}

export function Step3Contact({
  onSubmit,
  onBack,
  isSubmitting,
  submitError,
}: Step3ContactProps) {
  const t = useTranslations('QuoteWizard');
  const t3 = useTranslations('QuoteWizard.step3');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3Data>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(step3Schema as any),
    defaultValues: {
      email: '',
      notes: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <h2 className="font-heading text-base font-semibold">{t3('heading')}</h2>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="name">
          {t3('name')}
        </label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{t3('errors.required')}</p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="phone">
          {t3('phone')}
        </label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          {...register('phone')}
        />
        {errors.phone && (
          <p className="text-xs text-destructive">{t3('errors.required')}</p>
        )}
      </div>

      {/* Email (optional) */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="email">
          {t3('emailOptional')}
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{t3('errors.required')}</p>
        )}
      </div>

      {/* Notes (optional) */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="notes">
          {t3('notes')}
        </label>
        <textarea
          id="notes"
          rows={3}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          {...register('notes')}
        />
      </div>

      {/* GDPR checkbox */}
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <input
            id="gdpr"
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
            {...register('gdpr')}
          />
          <label htmlFor="gdpr" className="text-sm leading-relaxed">
            {t3('gdpr')}{' '}
            <Link
              href="/privacy-policy"
              className="underline underline-offset-2 hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t3('gdprLink')}
            </Link>
          </label>
        </div>
        {errors.gdpr && (
          <p className="text-xs text-destructive">{t3('errors.required')}</p>
        )}
      </div>

      {/* Submit error */}
      {submitError && (
        <div
          role="alert"
          className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {submitError}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
          {t('back')}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
      </div>
    </form>
  );
}
