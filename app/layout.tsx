import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import Analytics from "@/components/analytics";
import CookieNotice from "@/components/cookie-notice";
import { site } from "@/lib/site";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { paletteItems, sectionLinks } from "@/lib/nav";
import CommandPalette from "@/components/command-palette";
import { SoundProvider } from "@/components/sound";
import { formatDate, getAllNotes } from "@/lib/notes";
import { now } from "@/lib/now";
import { MotionProvider } from "@/components/fade-in";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: "400",
  style: ["normal", "italic"],
});

// JetBrains Mono is self-hosted (app/fonts, OFL-1.1, from @fontsource/jetbrains-mono 5.3.0) rather than
// fetched from Google Fonts at build time: Google sometimes serves this font at URLs without a file
// extension, which next/font/google can't handle, and the deploy build fails.
const mono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

/** Short descriptions shown next to each entry in the ⌘K menu. */
function paletteHints(): Record<string, string> {
  const latest = getAllNotes()[0];
  return {
    "/notes": latest ? `latest: ${latest.title}` : "",
    "/now": `updated ${formatDate(now.updated)}`,
    "/#chapter-foundation": "Minerva · 7 cities",
    "/#chapter-data": "Neuron Mobility · AWS",
    "/#chapter-operations": "Neuron Mobility · fleet ops",
    "/#chapter-entrepreneurship": "fitness franchise",
    "/#chapter-markets": "ASEAN and North Asia",
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    title: site.title,
    description: "From data pipelines to portfolios — a builder at heart.",
    url: site.url,
    siteName: site.name,
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: "From data pipelines to portfolios — a builder at heart.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${mono.variable}`}>
      <head>
        {/* Upgrade any stray http:// subresource to https:// */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body>
        <SoundProvider>
          <MotionProvider>
            <SiteHeader links={sectionLinks()} />
            {children}
            <SiteFooter />
          </MotionProvider>
          <CommandPalette items={paletteItems(paletteHints())} />
        </SoundProvider>
        <CookieNotice />
        <Analytics />
      </body>
    </html>
  );
}
