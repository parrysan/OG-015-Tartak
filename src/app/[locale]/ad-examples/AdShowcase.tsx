'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Tabs } from 'radix-ui';
import { Home, Wrench, HardHat, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';

/* ------------------------------------------------------------------ */
/* Types & data                                                        */
/* ------------------------------------------------------------------ */

const customerTypes = ['homebuilders', 'renovators', 'pros'] as const;
type CustomerType = (typeof customerTypes)[number];

interface Campaign {
  key: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  reactions: number;
  comments: number;
  shares: number;
}

const campaignsByType: Record<CustomerType, Campaign[]> = {
  homebuilders: [
    { key: 'homebuilders1', image: '/images/fb-ad-homebuilders.png', imageWidth: 2752, imageHeight: 1536, reactions: 12, comments: 3, shares: 1 },
    { key: 'homebuilders2', image: '/images/fb-ad-homebuilders-2.png', imageWidth: 2752, imageHeight: 1536, reactions: 18, comments: 5, shares: 3 },
    { key: 'homebuilders3', image: '/images/fb-ad-homebuilders-3.png', imageWidth: 2752, imageHeight: 1536, reactions: 9, comments: 2, shares: 1 },
  ],
  renovators: [
    { key: 'renovators1', image: '/images/fb-ad-renovation.png', imageWidth: 2752, imageHeight: 1536, reactions: 8, comments: 2, shares: 1 },
    { key: 'renovators2', image: '/images/fb-ad-renovation-2.png', imageWidth: 2752, imageHeight: 1536, reactions: 22, comments: 7, shares: 4 },
    { key: 'renovators3', image: '/images/fb-ad-renovation-3.png', imageWidth: 2752, imageHeight: 1536, reactions: 11, comments: 3, shares: 2 },
  ],
  pros: [
    { key: 'pros1', image: '/images/fb-ad-construction.png', imageWidth: 2752, imageHeight: 1536, reactions: 15, comments: 5, shares: 2 },
    { key: 'pros2', image: '/images/fb-ad-construction-2.png', imageWidth: 2752, imageHeight: 1536, reactions: 13, comments: 4, shares: 3 },
    { key: 'pros3', image: '/images/fb-ad-construction-3.png', imageWidth: 2752, imageHeight: 1536, reactions: 19, comments: 6, shares: 2 },
  ],
};

const tabIcons: Record<CustomerType, React.ReactNode> = {
  homebuilders: <Home className="h-4 w-4 shrink-0" />,
  renovators: <Wrench className="h-4 w-4 shrink-0" />,
  pros: <HardHat className="h-4 w-4 shrink-0" />,
};

/* ------------------------------------------------------------------ */
/* Facebook ad mockup                                                  */
/* ------------------------------------------------------------------ */

function FacebookAdMockup({ campaign }: { campaign: Campaign }) {
  const t = useTranslations('AdExamplesPage');

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header: logo + page name + sponsored */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <Image
          src="/images/logo-tartak.svg"
          alt="Tartak-Budrol logo"
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground leading-tight">
            Tartak-Budrol
          </span>
          <span className="text-xs text-muted-foreground leading-tight">
            {t('sponsored')}
          </span>
        </div>
      </div>

      {/* Ad body text */}
      <div className="px-4 pb-3">
        <p className="text-sm text-foreground leading-relaxed">
          {t(`ads.${campaign.key}.copy`)}
        </p>
      </div>

      {/* Full-width image */}
      <div className="relative w-full">
        <Image
          src={campaign.image}
          alt={t(`ads.${campaign.key}.headline`)}
          width={campaign.imageWidth}
          height={campaign.imageHeight}
          sizes="(max-width: 480px) 100vw, 480px"
          className="w-full h-auto"
        />
      </div>

      {/* Link preview bar */}
      <div className="bg-muted/50 px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            tartakplonsk.pl
          </p>
          <p className="text-sm font-semibold text-foreground leading-snug truncate">
            {t(`ads.${campaign.key}.headline`)}
          </p>
          <p className="text-xs text-muted-foreground leading-snug truncate">
            {t(`ads.${campaign.key}.description`)}
          </p>
        </div>
        <span className="shrink-0 bg-muted text-foreground font-semibold text-sm px-4 py-2 rounded-md">
          {t(`ads.${campaign.key}.cta`)}
        </span>
      </div>

      {/* Reactions row */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border">
        <div className="flex items-center gap-1">
          <span aria-hidden="true">&#128077;&#10084;&#65039;</span>
          <span>
            {campaign.reactions} {t('reactions')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>
            {campaign.comments} {t('comments')}
          </span>
          <span>
            {campaign.shares} {t('shares')}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Strategy panel (left side)                                          */
/* ------------------------------------------------------------------ */

function StrategyPanel({ campaignKey }: { campaignKey: string }) {
  const t = useTranslations('AdExamplesPage');

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold text-foreground lg:text-3xl">
        {t(`ads.${campaignKey}.headline`)}
      </h3>
      <p className="text-foreground-body leading-relaxed">
        {t(`ads.${campaignKey}.copy`)}
      </p>
      <div className="space-y-3 rounded-lg border border-border bg-muted/30 px-5 py-4">
        <div>
          <span className="text-sm font-semibold text-foreground">
            {t('targetLabel')}
          </span>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t(`ads.${campaignKey}.target`)}
          </p>
        </div>
        <div>
          <span className="text-sm font-semibold text-foreground">
            {t('whyLabel')}
          </span>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t(`ads.${campaignKey}.why`)}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Carousel controls                                                   */
/* ------------------------------------------------------------------ */

function CarouselNav({
  current,
  total,
  onPrev,
  onNext,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const t = useTranslations('AdExamplesPage');

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        type="button"
        onClick={onPrev}
        aria-label={t('prev')}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === current ? 'bg-primary' : 'bg-border'
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label={t('next')}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tab content with carousel                                           */
/* ------------------------------------------------------------------ */

function TabCarousel({
  type,
  currentIndex,
  onIndexChange,
}: {
  type: CustomerType;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}) {
  const campaigns = campaignsByType[type];
  const campaign = campaigns[currentIndex];
  const t = useTranslations('AdExamplesPage');

  const goPrev = () =>
    onIndexChange((currentIndex - 1 + campaigns.length) % campaigns.length);
  const goNext = () =>
    onIndexChange((currentIndex + 1) % campaigns.length);

  return (
    <div className="relative">
      {/* Side nav arrows */}
      <button
        type="button"
        onClick={goPrev}
        aria-label={t('prev')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 hidden lg:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors shadow-sm"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label={t('next')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 hidden lg:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors shadow-sm"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Two-column layout: strategy left, ad right */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start px-4 lg:px-8">
        <StrategyPanel campaignKey={campaign.key} />
        <div className="w-full max-w-[480px] mx-auto lg:mx-0">
          <FacebookAdMockup campaign={campaign} />
        </div>
      </div>

      {/* Carousel dots + mobile nav */}
      <CarouselNav
        current={currentIndex}
        total={campaigns.length}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main showcase component                                             */
/* ------------------------------------------------------------------ */

export function AdShowcase() {
  const t = useTranslations('AdExamplesPage');
  const [indices, setIndices] = useState<Record<CustomerType, number>>({
    homebuilders: 0,
    renovators: 0,
    pros: 0,
  });

  const updateIndex = (type: CustomerType) => (index: number) => {
    setIndices((prev) => ({ ...prev, [type]: index }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Back link */}
      <Link
        href="/o-stronie"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('backToAbout')}
      </Link>

      {/* Page header — left-aligned */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          {t('title')}
        </h1>
      </div>

      <Tabs.Root defaultValue="homebuilders">
        {/* Tab triggers */}
        <Tabs.List className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6 mb-4 border-b border-border pb-3">
          {customerTypes.map((type) => (
            <Tabs.Trigger
              key={type}
              value={type}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {tabIcons[type]}
              {t(`tabs.${type}`)}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Tab content panels */}
        {customerTypes.map((type) => (
          <Tabs.Content key={type} value={type}>
            <div className="rounded-2xl bg-muted/40 p-6 lg:p-8">
              <TabCarousel
                type={type}
                currentIndex={indices[type]}
                onIndexChange={updateIndex(type)}
              />
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}
