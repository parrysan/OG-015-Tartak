'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CookieBanner } from '@/components/consent/CookieBanner';
import { AnalyticsProvider } from '@/components/consent/AnalyticsProvider';
import { ChatbotTeaser } from '@/components/chatbot/ChatbotTeaser';

interface LayoutShellProps {
  children: React.ReactNode;
  ga4Id: string;
  metaPixelId: string;
}

export function LayoutShell({ children, ga4Id, metaPixelId }: LayoutShellProps) {
  const segment = useSelectedLayoutSegment();
  const isLandingPage = segment === 'lp';

  return (
    <>
      {!isLandingPage && <Header />}
      <main className={isLandingPage ? '' : 'pt-[5.5rem]'}>{children}</main>
      {!isLandingPage && <Footer />}
      {/* CookieBanner: always rendered on all routes including landing pages (GDPR requirement) */}
      <CookieBanner />
      {/* AnalyticsProvider: always rendered — needed for fbq Lead event on landing pages */}
      <AnalyticsProvider ga4Id={ga4Id} metaPixelId={metaPixelId} />
      {/* ChatbotTeaser: floating bubble rendered on all pages */}
      <ChatbotTeaser />
    </>
  );
}
