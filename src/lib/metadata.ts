/**
 * Shared metadata helpers for all pages.
 *
 * next-intl does NOT auto-generate hreflang tags in static export mode.
 * Call `getHreflangAlternates(path)` inside every page's `generateMetadata`
 * to satisfy FOUND-04.
 */

export const SITE_URL = 'https://tartakplonsk.pl';

/**
 * Returns the `alternates.languages` object for Next.js metadata.
 *
 * @param path - The page path with leading slash (e.g. `/` or `/o-nas/`).
 *               For locale-prefixed routing (`localePrefix: 'always'`), the
 *               locale segment is prepended automatically.
 *
 * @example
 * // In generateMetadata for the home page:
 * return {
 *   alternates: getHreflangAlternates('/'),
 * };
 */
export function getHreflangAlternates(path: string): {
  languages: Record<string, string>;
} {
  return {
    languages: {
      pl: `${SITE_URL}/pl${path}`,
      en: `${SITE_URL}/en${path}`,
      uk: `${SITE_URL}/uk${path}`,
      'x-default': `${SITE_URL}/pl${path}`,
    },
  };
}
