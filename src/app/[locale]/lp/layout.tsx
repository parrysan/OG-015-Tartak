import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { LandingNav } from '@/components/layout/LandingNav';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LandingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LandingNav />
      <div className="pt-14">{children}</div>
    </>
  );
}
