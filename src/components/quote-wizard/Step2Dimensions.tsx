'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { step2Schema } from '@/lib/quote-schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Step2Data = z.infer<typeof step2Schema>;

interface Step2DimensionsProps {
  onSubmit: (data: Step2Data) => void;
  onBack: () => void;
  defaultValues?: Step2Data;
}

export function Step2Dimensions({
  onSubmit,
  onBack,
  defaultValues,
}: Step2DimensionsProps) {
  const t = useTranslations('QuoteWizard');
  const t2 = useTranslations('QuoteWizard.step2');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Data>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(step2Schema as any),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <h2 className="font-heading text-base font-semibold">{t2('heading')}</h2>

      {/* Thickness */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="thickness">
          {t2('thickness')}{' '}
          <span className="text-muted-foreground">({t2('thicknessUnit')})</span>
        </label>
        <Input
          id="thickness"
          type="number"
          step="1"
          min="1"
          max="500"
          {...register('thickness', { valueAsNumber: true })}
        />
        {errors.thickness && (
          <p className="text-xs text-destructive">{t('step3.errors.required')}</p>
        )}
      </div>

      {/* Width */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="width">
          {t2('width')}{' '}
          <span className="text-muted-foreground">({t2('widthUnit')})</span>
        </label>
        <Input
          id="width"
          type="number"
          step="1"
          min="1"
          max="500"
          {...register('width', { valueAsNumber: true })}
        />
        {errors.width && (
          <p className="text-xs text-destructive">{t('step3.errors.required')}</p>
        )}
      </div>

      {/* Length */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="length">
          {t2('length')}{' '}
          <span className="text-muted-foreground">({t2('lengthUnit')})</span>
        </label>
        <Input
          id="length"
          type="number"
          step="0.1"
          min="0.1"
          max="15"
          {...register('length', { valueAsNumber: true })}
        />
        {errors.length && (
          <p className="text-xs text-destructive">{t('step3.errors.required')}</p>
        )}
      </div>

      {/* Quantity */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="quantity">
          {t2('quantity')}{' '}
          <span className="text-muted-foreground">({t2('quantityUnit')})</span>
        </label>
        <Input
          id="quantity"
          type="number"
          step="1"
          min="1"
          {...register('quantity', { valueAsNumber: true })}
        />
        {errors.quantity && (
          <p className="text-xs text-destructive">{t('step3.errors.required')}</p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onBack}>
          {t('back')}
        </Button>
        <Button type="submit">{t('next')}</Button>
      </div>
    </form>
  );
}
