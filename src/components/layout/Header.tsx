'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';
import { QuoteWizardModal } from '@/components/quote-wizard/QuoteWizardModal';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/about' as const, label: t('about') },
    { href: '/products' as const, label: t('products') },
    { href: '/gallery' as const, label: t('gallery') },
    { href: '/contact' as const, label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300 text-header-foreground',
        scrolled
          ? 'h-16 bg-header-bg/90 backdrop-blur-md shadow-sm'
          : 'h-[5.5rem] bg-header-bg'
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-tartak.svg"
            alt="Tartak-Budrol"
            width={140}
            height={100}
            className={cn(
              'transition-all duration-300',
              scrolled ? 'h-10 w-auto' : 'h-14 w-auto'
            )}
            priority
          />
        </Link>

        {/* Desktop navigation — hidden on mobile */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-base font-medium tracking-wide text-header-foreground/80 transition-colors hover:bg-header-foreground/10 hover:text-header-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          {/* CTA: visible on desktop only */}
          <QuoteWizardModal>
            <Button
              variant="secondary"
              className="hidden md:inline-flex"
              size="sm"
            >
              {t('getQuote')}
            </Button>
          </QuoteWizardModal>

          {/* Hamburger trigger (mobile only) */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
