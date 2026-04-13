import { useTranslations, useLocale } from 'next-intl';
import { TESTIMONIALS } from '@/lib/testimonials';
import { TestimonialSlider } from '@/components/ui/testimonial-slider';

export function Testimonials() {
  const t = useTranslations('HomePage.testimonials');
  const locale = useLocale() as 'pl' | 'en' | 'uk';

  const sliderData = TESTIMONIALS.map((testimonial) => ({
    id: testimonial.id,
    quote: testimonial.text[locale],
    author: testimonial.author,
    rating: testimonial.rating,
    date: testimonial.date,
  }));

  return (
    <section className="py-16 timber-bg timber-bg--bottom-right timber-bg--lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-4xl font-bold">{t('title')}</h2>
        <TestimonialSlider testimonials={sliderData} />
      </div>
    </section>
  );
}
