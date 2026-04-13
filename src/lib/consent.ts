/**
 * Consent state machine for GDPR cookie consent.
 *
 * Stores consent decision in localStorage under CONSENT_KEY.
 * All reads are SSR-safe (guarded by typeof window check).
 *
 * NOTE: GA4 and Meta Pixel must ONLY be loaded via AnalyticsProvider.
 * Do NOT use @next/third-parties GoogleAnalytics — it has no Consent Mode v2 support.
 */

export type ConsentState = 'granted' | 'denied' | null;

/**
 * The localStorage key for storing the user's consent decision.
 * Import this constant everywhere — never hardcode the string in two places.
 */
export const CONSENT_KEY = 'tartak_cookie_consent';

/**
 * Read the current consent state from localStorage.
 * Returns null if no decision has been made yet, or if running on the server.
 */
export function getConsent(): ConsentState {
  if (typeof window === 'undefined') return null; // SSR guard
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'granted' || stored === 'denied') return stored;
  return null;
}

/**
 * Persist a consent decision to localStorage.
 * Call this when the user clicks Accept or Reject in the CookieBanner.
 */
export function setConsent(state: 'granted' | 'denied'): void {
  localStorage.setItem(CONSENT_KEY, state);
}
