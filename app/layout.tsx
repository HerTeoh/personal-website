import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Her Teoh — Assistant Portfolio Manager",
  description:
    "Personal website of Her Teoh, an Assistant Portfolio Manager based in Singapore. Data. Operations. Entrepreneurship. Now markets.",
  openGraph: {
    title: "Her Teoh — Assistant Portfolio Manager",
    description:
      "Data. Operations. Entrepreneurship. Now markets.",
    type: "website",
    url: "https://herteoh.com",
    images: [
      {
        url: "https://herteoh.com/her-portrait.jpg",
        width: 800,
        height: 800,
        alt: "Her Teoh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Her Teoh — Assistant Portfolio Manager",
    description:
      "Data. Operations. Entrepreneurship. Now markets.",
    images: ["https://herteoh.com/her-portrait.jpg"],
  },
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Her Teoh",
              jobTitle: "Assistant Portfolio Manager",
              url: "https://herteoh.com",
              image: "https://herteoh.com/her-portrait.jpg",
              description:
                "Assistant Portfolio Manager at Singular Asset Management, focused on public equities across Asia.",
              worksFor: {
                "@type": "Organization",
                name: "Singular Asset Management",
              },
              sameAs: [
                "https://www.linkedin.com/in/herteoh/",
                "https://github.com/HerTeoh",
                "https://github.com/JHTeoh",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Minerva University",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
