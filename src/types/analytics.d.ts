/**
 * Global type declarations for analytics window globals.
 * Prevents TypeScript errors when calling window.gtag() or window.fbq().
 */
interface Window {
  gtag: (...args: unknown[]) => void;
  fbq: (...args: unknown[]) => void;
  dataLayer: unknown[];
}
