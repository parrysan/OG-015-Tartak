import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function ProductTeaser() {
  const t = useTranslations('HomePage.productTeaser');

  const products = [
    {
      key: 'softwood' as const,
      image: '/images/img_6964.webp',
      alt: 'Drewno krajowe na wymiar',
    },
    {
      key: 'swedish' as const,
      image: '/images/img_6970.webp',
      alt: 'Drewno szwedzkie C24',
    },
  ];

  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-4xl font-bold">{t('title')}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {products.map(({ key, image, alt }) => (
            <Link
              key={key}
              href="/products"
              className="group relative block overflow-hidden rounded-lg"
              style={{ minHeight: '320px' }}
            >
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="mb-3 text-2xl font-bold text-white">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-lg font-medium text-white/90 leading-relaxed">
                  {t(`${key}.descLine1`)}
                </p>
                <p className="mb-5 text-lg font-medium text-white/90 leading-relaxed">
                  {t(`${key}.descLine2`)}
                </p>
                <span className="inline-flex items-center rounded-md bg-secondary px-5 py-2.5 text-base font-semibold text-secondary-foreground transition-colors group-hover:bg-secondary-hover">
                  {t(`${key}.cta`)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
