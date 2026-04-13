import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pl', 'en', 'uk'],
  defaultLocale: 'pl',
  localePrefix: 'always',
});
