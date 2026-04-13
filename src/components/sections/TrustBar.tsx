import { useTranslations } from 'next-intl';
import { Star, Calendar, Truck, Award } from 'lucide-react';

export function TrustBar() {
  const t = useTranslations('HomePage.trustBar');

  return (
    <section className="border-y bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0">
          <div className="flex flex-col items-center gap-1 px-4 py-6 text-center">
            <Star className="h-6 w-6 text-secondary" aria-hidden="true" />
            <p className="text-2xl font-bold">4.7/5</p>
            <p className="text-sm text-muted-foreground">{t('googleRating')}</p>
            <p className="text-xs text-muted-foreground">{t('reviewCount')}</p>
          </div>
          <div className="flex flex-col items-center gap-1 px-4 py-6 text-center">
            <Calendar className="h-6 w-6 text-secondary" aria-hidden="true" />
            <p className="text-2xl font-bold">{t('since')}</p>
            <p className="text-sm text-muted-foreground">{t('sinceLabel')}</p>
          </div>
          <div className="flex flex-col items-center gap-1 px-4 py-6 text-center">
            <Truck className="h-6 w-6 text-secondary" aria-hidden="true" />
            <p className="text-2xl font-bold">{t('localDelivery')}</p>
            <p className="text-sm text-muted-foreground">{t('localDeliveryDesc')}</p>
          </div>
          <div className="flex flex-col items-center gap-1 px-4 py-6 text-center">
            <Award className="h-6 w-6 text-secondary" aria-hidden="true" />
            <p className="text-2xl font-bold">{t('c24Cert')}</p>
            <p className="text-sm text-muted-foreground">{t('c24CertDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
