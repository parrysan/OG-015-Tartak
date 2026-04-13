'use client';

import { forwardRef } from 'react';
import { useLocale } from 'next-intl';

/**
 * Drop-in replacement for next-intl's Link that uses plain <a> tags.
 * Avoids Next.js client-side RSC routing which breaks on static exports
 * deployed to Firebase Hosting.
 */

interface StaticLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  locale?: string;
  prefetch?: boolean;
  scroll?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, StaticLinkProps>(
  ({ href, locale, prefetch: _prefetch, scroll: _scroll, ...props }, ref) => {
    const currentLocale = useLocale();
    const resolvedLocale = locale || currentLocale;

    let resolvedHref: string;
    if (href === '/') {
      resolvedHref = `/${resolvedLocale}/`;
    } else {
      const clean = href.startsWith('/') ? href : `/${href}`;
      const withSlash = clean.endsWith('/') ? clean : `${clean}/`;
      resolvedHref = `/${resolvedLocale}${withSlash}`;
    }

    return <a ref={ref} href={resolvedHref} {...props} />;
  },
);
Link.displayName = 'Link';
