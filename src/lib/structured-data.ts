/**
 * JSON-LD structured data builder functions.
 *
 * All functions return plain objects (not stringified).
 * Include @context: 'https://schema.org' in each returned object.
 *
 * Usage in pages:
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{
 *       __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
 *     }}
 *   />
 */

import { SITE_URL } from './metadata';
import { FAQ_DATA } from './faq-data';

// ---------------------------------------------------------------------------
// Breadcrumb locale names
// ---------------------------------------------------------------------------

export const BREADCRUMB_HOME: Record<string, string> = {
  pl: 'Strona główna',
  en: 'Home',
  uk: 'Головна',
};

// ---------------------------------------------------------------------------
// LocalBusiness schema
// ---------------------------------------------------------------------------

/**
 * Builds a LocalBusiness JSON-LD schema for Tartak-Budrol.
 *
 * TODO: Confirm exact geo coordinates with owner before launch.
 * TODO: Confirm opening hours with owner before launch.
 */
export function buildLocalBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Tartak-Budrol',
    url: `${SITE_URL}/pl/`,
    telephone: '+48504251535',
    email: 'tartak.budrol@wp.pl',
    description:
      'Tartak-Budrol to tartak i skład drewna w Płońsku. Oferujemy tarcicę iglastą na wymiar oraz szwedzkie drewno konstrukcyjne C24 marki Södra. Obsługujemy klientów indywidualnych i firmy budowlane.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Wyszogrodzka',
      addressLocality: 'Płońsk',
      addressRegion: 'Mazowieckie',
      postalCode: '09-100',
      addressCountry: 'PL',
    },
    geo: {
      // TODO: Confirm exact coordinates before launch
      '@type': 'GeoCoordinates',
      latitude: 52.6258,
      longitude: 20.3781,
    },
    openingHoursSpecification: [
      {
        // TODO: Confirm opening hours with owner before launch
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
    sameAs: ['https://www.facebook.com/tartakbudrol'],
  };
}

// ---------------------------------------------------------------------------
// FAQPage schema
// ---------------------------------------------------------------------------

/**
 * Builds a FAQPage JSON-LD schema for the given locale.
 * Requires FAQ_DATA to have at least 6 questions per locale (SEO-02).
 */
export function buildFAQSchema(locale: string): Record<string, unknown> {
  const validLocales = ['pl', 'en', 'uk'] as const;
  type ValidLocale = (typeof validLocales)[number];
  const effectiveLocale: ValidLocale = (validLocales as readonly string[]).includes(locale)
    ? (locale as ValidLocale)
    : 'pl';

  const mainEntity = FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.question[effectiveLocale] ?? item.question['pl'],
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer[effectiveLocale] ?? item.answer['pl'],
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList schema
// ---------------------------------------------------------------------------

/**
 * Builds a BreadcrumbList JSON-LD schema.
 *
 * @param items - Array of breadcrumb items with name and url.
 */
export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// Product schemas
// ---------------------------------------------------------------------------

/**
 * Builds an array of two Product JSON-LD schemas for the products offered.
 */
export function buildProductSchemas(): Array<Record<string, unknown>> {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Tarcica iglasta na wymiar',
      description:
        'Tarcica iglasta (sosna, świerk) cięta na wymiar w tartaku Tartak-Budrol w Płońsku. Belki, łaty, krokwie i deski na zamówienie.',
      brand: {
        '@type': 'Brand',
        name: 'Tartak-Budrol',
      },
      offers: {
        '@type': 'Offer',
        url: `${SITE_URL}/pl/products/`,
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'LocalBusiness',
          name: 'Tartak-Budrol',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Drewno konstrukcyjne C24 Södra',
      description:
        'Szwedzkie drewno konstrukcyjne klasy wytrzymałości C24 według normy EN 338 od Södry. Suszone komorowo, certyfikowane. Dostępne belki do 11,5 m.',
      brand: {
        '@type': 'Brand',
        name: 'Södra',
      },
      offers: {
        '@type': 'Offer',
        url: `${SITE_URL}/pl/products/`,
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'LocalBusiness',
          name: 'Tartak-Budrol',
        },
      },
    },
  ];
}
