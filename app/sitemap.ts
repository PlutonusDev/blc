import type { MetadataRoute } from "next";
import { clubs } from "@/lib/clubs";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/clubs", "/membership", "/community", "/about", "/careers", "/contact"];
  const lastModified = new Date();

  return [
    ...routes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...clubs.map((club) => ({
      url: `${siteUrl}/clubs/${club.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
