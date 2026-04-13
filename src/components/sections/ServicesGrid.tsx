import { useTranslations } from 'next-intl';
import { Axe, TreePine, Droplets } from 'lucide-react';

export function ServicesGrid() {
  const t = useTranslations('HomePage.services');

  const services = [
    {
      icon: Axe,
      titleKey: 'cutting.title' as const,
      descKey: 'cutting.desc' as const,
    },
    {
      icon: TreePine,
      titleKey: 'timber.title' as const,
      descKey: 'timber.desc' as const,
    },
    {
      icon: Droplets,
      titleKey: 'impregnation.title' as const,
      descKey: 'impregnation.desc' as const,
    },
  ];

  return (
    <section className="py-16 timber-bg timber-bg--top-left">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-4xl font-bold">{t('title')}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <Icon className="mb-4 h-10 w-10 text-primary" aria-hidden="true" />
              <h3 className="mb-2 text-xl font-semibold">{t(titleKey)}</h3>
              <p className="text-muted-foreground">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
