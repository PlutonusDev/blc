import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { RevealObserver } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Arms the reveal styles before first paint, so nothing flashes in and then
// hides. If JavaScript is off, or the reader prefers reduced motion, the class
// is never added and the page renders in its finished state. The timeout is a
// dead man's switch: if RevealObserver never mounts, the styles are dropped and
// everything shows rather than staying hidden.
const armReveal = [
  "try{",
  'var r=document.documentElement;',
  'if(matchMedia("(prefers-reduced-motion: reduce)").matches)throw 0;',
  'r.classList.add("js-reveal");',
  'setTimeout(function(){if(!r.hasAttribute("data-reveal-ready"))r.classList.remove("js-reveal")},4000);',
  "}catch(e){}",
].join("");

const defaultTitle = `${siteName} | Cairns, Innisfail, Townsville and Ipswich`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Hospitality",
  keywords: [
    "Brothers Leagues Club",
    "leagues club Queensland",
    "Brothers Cairns",
    "Brothers Innisfail",
    "Brothers Townsville",
    "Brothers Ipswich",
    "club bistro",
    "function rooms Queensland",
    "club membership",
    "rugby league club",
  ],
  alternates: { canonical: "/" },
  // The share images come from the app/opengraph-image.png and
  // app/twitter-image.png file conventions, with their .alt.txt captions.
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName,
    url: siteUrl,
    title: defaultTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d183f" },
    { media: "(prefers-color-scheme: dark)", color: "#03060f" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-AU"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper">
        <script dangerouslySetInnerHTML={{ __html: armReveal }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-gold focus:px-5 focus:py-3 focus:text-navy-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
