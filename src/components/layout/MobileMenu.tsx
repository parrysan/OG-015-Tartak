'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { QuoteWizardModal } from '@/components/quote-wizard/QuoteWizardModal';

const LOCALES = [
  { code: 'pl' as const, label: 'PL' },
  { code: 'en' as const, label: 'EN' },
  { code: 'uk' as const, label: 'UK' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('nav');
  const tMenu = useTranslations('mobileMenu');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/about' as const, label: t('about') },
    { href: '/products' as const, label: t('products') },
    { href: '/gallery' as const, label: t('gallery') },
    { href: '/contact' as const, label: t('contact') },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label={tMenu('open')}
          className="flex items-center justify-center rounded-md p-2 text-header-foreground md:hidden"
        >
          <Menu className="size-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" showCloseButton={false} className="w-80 bg-background p-0">
        <div className="flex h-full flex-col">
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <span className="text-lg font-bold text-primary">Tartak-Budrol</span>
            <SheetClose asChild>
              <button
                aria-label={tMenu('close')}
                className="rounded-md p-1 text-foreground-muted hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </SheetClose>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 px-4 py-6" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }) => (
              <SheetClose asChild key={href}>
                <Link
                  href={href}
                  className="rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-accent hover:text-foreground"
                >
                  {label}
                </Link>
              </SheetClose>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Language switcher */}
          <div className="border-t border-border px-6 py-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-foreground-muted">
              PL / EN / UK
            </p>
            <div className="flex gap-2">
              {LOCALES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => {
                    router.replace(pathname, { locale: code });
                    setOpen(false);
                  }}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    locale === code
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground-muted hover:bg-accent hover:text-foreground'
                  )}
                  aria-current={locale === code ? 'true' : undefined}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="px-6 pb-6">
            <QuoteWizardModal>
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t('getQuote')}
              </Button>
            </QuoteWizardModal>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
