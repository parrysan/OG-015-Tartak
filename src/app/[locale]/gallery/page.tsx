import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { getHreflangAlternates, SITE_URL } from "@/lib/metadata";
import { buildBreadcrumbSchema, BREADCRUMB_HOME } from "@/lib/structured-data";
import { GalleryClient } from "@/components/gallery/GalleryClient";

const GALLERY_PAGE_NAME: Record<string, string> = {
  pl: "Galeria",
  en: "Gallery",
  uk: "Галерея",
};

const pageMetadata: Record<string, { title: string; description: string }> = {
  pl: {
    title: "Galeria — Tartak-Budrol Plonsk",
    description:
      "Przejrzyj zdjecia z produkcji Tartak-Budrol: od klody do gotowego drewna konstrukcyjnego.",
  },
  en: {
    title: "Gallery — Tartak-Budrol Plonsk",
    description:
      "Browse production photos from Tartak-Budrol sawmill: from log to finished structural timber.",
  },
  uk: {
    title: "Галерея — Tartak-Budrol Plonsk",
    description:
      "Перегляньте фотографії виробництва Tartak-Budrol: від колоди до готової деревини.",
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
  const meta = pageMetadata[locale] ?? pageMetadata["pl"];

  return {
    title: meta.title,
    description: meta.description,
    alternates: getHreflangAlternates("/gallery"),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${locale}/gallery/`,
      siteName: "Tartak-Budrol",
      locale: locale === "uk" ? "uk_UA" : locale === "en" ? "en_US" : "pl_PL",
      type: "website",
      images: [
        {
          url: "/og/tartak-og.png",
          width: 1200,
          height: 630,
          alt: "Tartak-Budrol — Tartak Plonsk",
        },
      ],
    },
  };
}

function GalleryContent() {
  const t = useTranslations("GalleryPage");

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-foreground mb-3">{t("title")}</h1>
      <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
        {t("subtitle")}
      </p>
      <GalleryClient />
    </div>
  );
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumb = buildBreadcrumbSchema([
    { name: BREADCRUMB_HOME[locale] ?? "Home", url: `${SITE_URL}/${locale}/` },
    {
      name: GALLERY_PAGE_NAME[locale] ?? "Gallery",
      url: `${SITE_URL}/${locale}/gallery/`,
    },
  ]);

  return (
    <>
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c"),
        }}
      />
      <GalleryContent />
    </>
  );
}
