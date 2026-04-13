'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const navLinks = [
    { href: '/' as const, label: tNav('home') },
    { href: '/about' as const, label: tNav('about') },
    { href: '/products' as const, label: tNav('products') },
    { href: '/gallery' as const, label: tNav('gallery') },
    { href: '/contact' as const, label: tNav('contact') },
    { href: '/o-stronie' as const, label: tNav('oStronie') },
  ];

  return (
    <footer className="bg-header-bg text-header-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start">

          {/* Left column: Logo, description, social */}
          <div className="flex w-full flex-col gap-5 lg:max-w-sm">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src="/images/logo-tartak.svg"
                  alt="Tartak-Budrol"
                  width={100}
                  height={72}
                  className="h-10 w-auto"
                />
              </Link>
              <h2 className="text-xl font-semibold text-header-foreground">Tartak-Budrol</h2>
            </div>
            <p className="max-w-[70%] text-sm text-header-foreground/60">
              {t('description')}
            </p>
            <ul className="flex items-center gap-5">
              <li>
                <a
                  href="https://www.facebook.com/tartakbudrol"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-header-foreground/60 transition-colors hover:text-header-foreground"
                >
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Right columns */}
          <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">

            {/* Navigation column */}
            <div>
              <h3 className="mb-4 font-bold text-header-foreground">{t('navTitle')}</h3>
              <ul className="space-y-3 text-sm">
                {navLinks.map(({ href, label }, i) => (
                  <li key={href}>
                    {i === navLinks.length - 1 && (
                      <hr className="mb-3 border-header-foreground/20" />
                    )}
                    <Link
                      href={href}
                      className="text-header-foreground/60 transition-colors hover:text-header-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <h3 className="mb-4 font-bold text-header-foreground">{t('contactTitle')}</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 size-4 shrink-0 text-header-foreground/40" />
                  <div className="text-header-foreground/60">
                    <span className="font-medium text-header-foreground">{t('sawmill')}:</span>{' '}
                    <a href="tel:504251535" className="hover:text-header-foreground">{t('phoneSawmill')}</a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 size-4 shrink-0 text-header-foreground/40" />
                  <div className="text-header-foreground/60">
                    <span className="font-medium text-header-foreground">{t('office')}:</span>{' '}
                    <a href="tel:+48236624962" className="hover:text-header-foreground">{t('phoneOffice')}</a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 size-4 shrink-0 text-header-foreground/40" />
                  <a href="mailto:tartak@bud-rol.com.pl" className="text-header-foreground/60 hover:text-header-foreground">
                    {t('emailAddress')}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="mt-0.5 size-4 shrink-0 text-header-foreground/40" />
                  <span className="text-header-foreground/60">{t('hoursValue')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-header-foreground/40" />
                  <span className="text-header-foreground/60">{t('addressSawmill')}</span>
                </li>
              </ul>
            </div>

            {/* Language column */}
            <div>
              <h3 className="mb-4 font-bold text-header-foreground">{t('changeLanguage')}</h3>
              <LanguageSwitcher />
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-header-foreground/20 pt-8 text-xs text-header-foreground/60 md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
          <Link href="/privacy-policy" className="hover:text-header-foreground">
            {t('privacyPolicy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
