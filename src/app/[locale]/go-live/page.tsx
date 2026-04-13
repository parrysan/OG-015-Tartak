import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';

const pageMetadata: Record<string, { title: string; description: string }> = {
  pl: {
    title: 'Uruchomienie strony — Tartak-Budrol Płońsk',
    description: 'Plan uruchomienia strony tartakplonsk.pl na domenie klienta.',
  },
  en: {
    title: 'Getting Your Website Live — Tartak-Budrol Płońsk',
    description: 'Go-live plan for launching tartakplonsk.pl on the client domain.',
  },
  uk: {
    title: 'Запуск веб-сайту — Tartak-Budrol Płońsk',
    description: 'План запуску tartakplonsk.pl на домені клієнта.',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = pageMetadata[locale] ?? pageMetadata['pl'];

  return {
    title: meta.title,
    description: meta.description,
    robots: { index: false, follow: false },
  };
}

/* ------------------------------------------------------------------ */
/*  Shared components                                                  */
/* ------------------------------------------------------------------ */

function Phase({
  number,
  variant,
  children,
}: {
  number: string;
  variant: 'client' | 'phil' | 'result';
  children: React.ReactNode;
}) {
  const border =
    variant === 'client'
      ? 'border-amber-300/60'
      : variant === 'phil'
        ? 'border-green-300/60'
        : 'border-green-700 shadow-md shadow-green-700/10';

  const badge =
    variant === 'client'
      ? 'bg-amber-700'
      : variant === 'phil'
        ? 'bg-green-700'
        : 'bg-green-800';

  return (
    <div className={`flex-1 rounded-2xl border-2 bg-card ${border}`}>
      <div className="flex items-center gap-3 p-5 pb-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${badge}`}
        >
          {number}
        </span>
        {children}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden shrink-0 self-center pt-10 lg:flex">
      <svg
        className="h-6 w-6 text-muted-foreground/40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border-2 border-border bg-card p-6">
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{subtitle}</p>
      <div className="text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-4 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-muted-foreground/30">
      {children}
    </li>
  );
}

function Tag({ variant, children }: { variant: 'free' | 'ongoing'; children: React.ReactNode }) {
  const style =
    variant === 'free'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
  return (
    <span className={`mt-3 inline-block rounded px-2.5 py-0.5 text-xs font-bold ${style}`}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const GOOGLE_DOC_URL =
  'https://docs.google.com/document/d/150bAWOXCUY9xQjxqC4E_8kFnWfkoCtwbyJX6PDgQFR4/edit?usp=sharing';

function GoLiveContent() {
  const t = useTranslations('GoLivePage');

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">{t('title')}</h1>
        <p className="text-lg font-semibold text-primary">tartakplonsk.pl</p>
        <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      {/* CTA — shared Google Doc */}
      <div className="mb-12 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-foreground mb-2">{t('cta.title')}</h2>
        <p className="mb-5 max-w-2xl text-muted-foreground leading-relaxed">
          {t('cta.description')}
        </p>
        <a
          href={GOOGLE_DOC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
        >
          {t('cta.button')}
        </a>
      </div>

      {/* Timeline */}
      <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:gap-5">
        <Phase number="1" variant="client">
          <div>
            <p className="text-base font-bold text-foreground">{t('phase1.title')}</p>
            <span className="mt-1 inline-block rounded bg-amber-100 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              {t('phase1.badge')}
            </span>
          </div>
        </Phase>

        <Arrow />

        <Phase number="2" variant="phil">
          <div>
            <p className="text-base font-bold text-foreground">{t('phase2.title')}</p>
            <span className="mt-1 inline-block rounded bg-green-100 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-green-700 dark:bg-green-900/30 dark:text-green-400">
              {t('phase2.badge')}
            </span>
          </div>
        </Phase>

        <Arrow />

        <Phase number="3" variant="phil">
          <div>
            <p className="text-base font-bold text-foreground">{t('phase3.title')}</p>
            <span className="mt-1 inline-block rounded bg-green-100 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-green-700 dark:bg-green-900/30 dark:text-green-400">
              {t('phase3.badge')}
            </span>
          </div>
        </Phase>

        <Arrow />

        <Phase number="&#x2713;" variant="result">
          <div>
            <p className="text-base font-bold text-foreground">{t('phase4.title')}</p>
            <span className="mt-1 inline-block rounded bg-green-800 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
              {t('phase4.badge')}
            </span>
          </div>
        </Phase>
      </div>

      {/* Phase details */}
      <div className="mb-16 grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Phase 1 detail */}
        <div className="rounded-2xl border-2 border-amber-300/60 bg-card p-6">
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <Bullet>{t('phase1.item1')}</Bullet>
            <Bullet>{t('phase1.item2')}</Bullet>
            <Bullet>{t('phase1.item3')}</Bullet>
          </ul>
        </div>

        {/* Phase 2 detail */}
        <div className="rounded-2xl border-2 border-green-300/60 bg-card p-6">
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <Bullet>{t('phase2.item1')}</Bullet>
            <Bullet>{t('phase2.item2')}</Bullet>
            <Bullet>{t('phase2.item3')}</Bullet>
          </ul>
        </div>

        {/* Phase 3 detail */}
        <div className="rounded-2xl border-2 border-green-300/60 bg-card p-6">
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <Bullet>{t('phase3.item1')}</Bullet>
            <Bullet>{t('phase3.item2')}</Bullet>
            <Bullet>{t('phase3.item3')}</Bullet>
          </ul>
        </div>

        {/* Phase 4 detail */}
        <div className="rounded-2xl border-2 border-green-700 bg-card p-6">
          <ul className="space-y-2.5 text-sm font-medium text-foreground">
            <Bullet>{t('phase4.item1')}</Bullet>
            <Bullet>{t('phase4.item2')}</Bullet>
            <Bullet>{t('phase4.item3')}</Bullet>
          </ul>
        </div>
      </div>

      {/* Domain instructions — two columns */}
      <div className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border-2 border-amber-300/60 bg-card p-6 sm:p-8">
          <h2 className="text-lg font-bold text-foreground mb-1">
            {t('domain.needTitle')}
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">{t('domain.needSub')}</p>
          <ol className="space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-amber-700 text-[0.65rem] font-bold text-white">
                1
              </span>
              <span>
                <strong className="text-foreground">{t('domain.q1Title')}</strong>
                <br />
                {t('domain.q1Body')}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-amber-700 text-[0.65rem] font-bold text-white">
                2
              </span>
              <span>
                <strong className="text-foreground">{t('domain.q2Title')}</strong>
                <br />
                {t('domain.q2Body')}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-amber-700 text-[0.65rem] font-bold text-white">
                3
              </span>
              <span>
                <strong className="text-foreground">{t('domain.q3Title')}</strong>
                <br />
                {t('domain.q3Body')}
              </span>
            </li>
          </ol>
          <p className="mt-5 text-xs italic text-muted-foreground/70">
            {t('domain.needNote')}
          </p>
        </div>

        <div className="rounded-2xl border-2 border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-bold text-foreground mb-1">
            {t('domain.dnsTitle')}
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">{t('domain.dnsSub')}</p>
          <ol className="space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-muted-foreground/20 text-[0.65rem] font-bold text-foreground">
                1
              </span>
              <span>{t('domain.dns1')}</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-muted-foreground/20 text-[0.65rem] font-bold text-foreground">
                2
              </span>
              <span>{t('domain.dns2')}</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-muted-foreground/20 text-[0.65rem] font-bold text-foreground">
                3
              </span>
              <span>{t('domain.dns3')}</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-muted-foreground/20 text-[0.65rem] font-bold text-foreground">
                4
              </span>
              <span>{t('domain.dns4')}</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-muted-foreground/20 text-[0.65rem] font-bold text-foreground">
                5
              </span>
              <span>{t('domain.dns5')}</span>
            </li>
          </ol>
          <p className="mt-5 text-xs italic text-muted-foreground/70">
            {t('domain.dnsNote')}
          </p>
        </div>
      </div>

      {/* Service panels */}
      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Panel title={t('panels.hosting.title')} subtitle={t('panels.hosting.sub')}>
          <ul className="space-y-1.5">
            <Bullet>{t('panels.hosting.item1')}</Bullet>
            <Bullet>{t('panels.hosting.item2')}</Bullet>
            <Bullet>{t('panels.hosting.item3')}</Bullet>
            <Bullet>{t('panels.hosting.item4')}</Bullet>
          </ul>
        </Panel>

        <Panel title={t('panels.database.title')} subtitle={t('panels.database.sub')}>
          <ul className="space-y-1.5">
            <Bullet>{t('panels.database.item1')}</Bullet>
            <Bullet>{t('panels.database.item2')}</Bullet>
            <Bullet>{t('panels.database.item3')}</Bullet>
          </ul>
        </Panel>

        <Panel title={t('panels.seo.title')} subtitle={t('panels.seo.sub')}>
          <p className="mb-3">{t('panels.seo.body')}</p>
          <ul className="space-y-1.5">
            <Bullet>{t('panels.seo.item1')}</Bullet>
            <Bullet>{t('panels.seo.item2')}</Bullet>
            <Bullet>{t('panels.seo.item3')}</Bullet>
          </ul>
          <Tag variant="ongoing">{t('panels.seo.tag')}</Tag>
        </Panel>

        <Panel title={t('panels.ads.title')} subtitle={t('panels.ads.sub')}>
          <p className="mb-3">{t('panels.ads.body')}</p>
          <ul className="space-y-1.5">
            <Bullet>{t('panels.ads.item1')}</Bullet>
            <Bullet>{t('panels.ads.item2')}</Bullet>
            <Bullet>{t('panels.ads.item3')}</Bullet>
          </ul>
          <Tag variant="ongoing">{t('panels.ads.tag')}</Tag>
        </Panel>
      </div>

      {/* Footer line */}
      <div className="border-t border-border pt-6 text-sm text-muted-foreground">
        <p>
          {t('footer.hostedOn')}{' '}
          <a
            href="https://firebase.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            Google Firebase
          </a>
          {' · '}
          {t('footer.account')}{' '}
          <strong>jarooook@gmail.com</strong>
          {' · '}
          {t('footer.prepared')}
        </p>
      </div>
    </div>
  );
}

export default async function GoLivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GoLiveContent />;
}
