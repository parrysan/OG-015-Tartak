"use client";

import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import type { MediaItemType } from "@/components/ui/interactive-bento-gallery";
import { galleryPhotos } from "@/lib/gallery-photos";

// Assign bento grid spans based on photo orientation
const SPANS: Record<string, string> = {
  // Portrait photos: tall, single column
  portrait: "md:col-span-1 md:row-span-4 sm:col-span-1 sm:row-span-3",
  // Landscape photos: wide, double column
  landscape: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
};

// Alternate portrait spans to create visual variety
const PORTRAIT_ALT = "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2";

const mediaItems: MediaItemType[] = galleryPhotos.map((photo, index) => {
  const isLandscape = photo.width > photo.height;
  // Alternate between tall and short portrait spans for variety
  const span = isLandscape
    ? SPANS.landscape
    : index % 3 === 0
      ? PORTRAIT_ALT
      : SPANS.portrait;

  return {
    id: index + 1,
    type: "image",
    title: photo.alt,
    desc: "",
    url: photo.src,
    span,
  };
});

export function GalleryClient() {
  return <InteractiveBentoGallery mediaItems={mediaItems} />;
}
