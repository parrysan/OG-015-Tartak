import type { MetadataRoute } from 'next'

// REQUIRED for output: 'export' compatibility
export const dynamic = 'force-static'

const SITE = 'https://tartakplonsk.pl'
const LOCALES = ['pl', 'en', 'uk'] as const
const PAGES = ['', '/about', '/products', '/gallery', '/contact', '/privacy-policy'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE}/${locale}${path}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE}/${l}${path}/`])
        ),
      },
    }))
  )
}
