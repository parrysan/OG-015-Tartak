'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const LOCALES = [
  { code: 'pl' as const, label: 'PL' },
  { code: 'en' as const, label: 'EN' },
  { code: 'uk' as const, label: 'UK' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex gap-2" role="group" aria-label="Language selection">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => router.replace(pathname, { locale: code })}
          className={cn(
            'rounded px-3 py-1.5 text-sm font-medium transition-colors',
            locale === code
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground-muted hover:text-foreground'
          )}
          aria-current={locale === code ? 'true' : undefined}
          aria-label={`Switch to ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
