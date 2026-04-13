'use client';

/**
 * CookieBanner — GDPR cookie consent banner.
 *
 * Shows on first visit (consent === null). Dispatches a CustomEvent
 * 'consentChange' so AnalyticsProvider can react without prop drilling.
 *
 * Polish law (Electronic Communications Act 2024) requires equal visual
 * prominence for Accept and Reject buttons — same size, same font weight,
 * same number of clicks. Both buttons are rendered at the same size using
 * outline (Reject) and solid (Accept) variants — this is the accepted
 * equal-prominence pattern under EU GDPR enforcement.
 *
 * Hydration safety: visible state starts false, set to true in useEffect
 * only if getConsent() === null. Banner is never in the static HTML.
 */

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getConsent, setConsent as persistConsent, type ConsentState } from '@/lib/consent';

export function CookieBanner() {
  const t = useTranslations('CookieBanner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show banner if no consent decision has been made yet.
    // Runs after hydration — localStorage is safe to access here.
    if (getConsent() === null) {
      setVisible(true);
    }
  }, []);

  const handleDecision = (decision: 'granted' | 'denied') => {
    persistConsent(decision);
    setVisible(false);
    // Notify AnalyticsProvider via CustomEvent — no prop drilling needed.
    window.dispatchEvent(
      new CustomEvent<ConsentState>('consentChange', { detail: decision })
    );
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t('ariaLabel')}
      className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg"
    >
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm text-gray-700">
          {t('message')}{' '}
          <Link
            href="/privacy-policy"
            className="underline text-brand-green hover:text-green-700"
          >
            {t('privacyLink')}
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          {/* Reject — outline variant. Equal size and weight to Accept (Polish law requirement). */}
          <button
            onClick={() => handleDecision('denied')}
            className="border border-brand-green text-brand-green bg-white hover:bg-gray-50 px-6 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {t('reject')}
          </button>
          {/* Accept — solid variant. Same physical dimensions as Reject. */}
          <button
            onClick={() => handleDecision('granted')}
            className="bg-brand-green text-white hover:bg-green-700 px-6 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
