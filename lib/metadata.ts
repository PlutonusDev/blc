import type { Metadata } from "next";
import { siteName, siteUrl } from "./site";

type Share = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

type PageMeta = {
  /** Page title, without the site name. The template appends that. */
  title: string;
  description: string;
  /** Root relative path, used for the canonical and og:url. */
  path: string;
  /** Omit to inherit the site wide card from app/opengraph-image.png. */
  image?: Share;
};

/**
 * Builds a complete metadata block for a page: canonical, Open Graph and a
 * large summary Twitter card. Open Graph and Twitter titles and descriptions
 * are written out rather than left to inherit, so what gets shared is never a
 * surprise.
 */
export function pageMetadata({ title, description, path, image }: PageMeta): Metadata {
  const shareTitle = `${title} | ${siteName}`;
  const images = image
    ? [
        {
          url: image.url,
          width: image.width ?? 1200,
          height: image.height ?? 630,
          alt: image.alt,
          type: "image/png",
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName,
      url: `${siteUrl}${path === "/" ? "" : path}`,
      title: shareTitle,
      description,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      ...(images ? { images } : {}),
    },
  };
}
