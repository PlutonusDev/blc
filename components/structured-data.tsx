import type { Club } from "@/lib/clubs";
import { clubs, fullAddress } from "@/lib/clubs";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from local data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function clubNode(club: Club) {
  return {
    "@type": "BarOrPub",
    "@id": `${siteUrl}/clubs/${club.slug}`,
    name: club.name,
    description: club.blurb,
    url: `${siteUrl}/clubs/${club.slug}`,
    sameAs: [club.website],
    telephone: club.phone,
    image: `${siteUrl}${club.image.src}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: club.street,
      addressLocality: club.suburb,
      addressRegion: "QLD",
      postalCode: club.postcode.replace("QLD ", ""),
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: club.coords.lat,
      longitude: club.coords.lng,
    },
  };
}

export function OrganisationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        description: siteDescription,
        url: siteUrl,
        subOrganization: clubs.map(clubNode),
      }}
    />
  );
}

export function ClubSchema({ club }: { club: Club }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        ...clubNode(club),
        parentOrganization: { "@type": "Organization", name: siteName, url: siteUrl },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          fullAddress(club)
        )}`,
      }}
    />
  );
}

export function BreadcrumbSchema({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
        })),
      }}
    />
  );
}
