import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import "../globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haceyjeong.com";

// Cormorant Garamond — classic Renaissance serif with conventional J letterform.
// (Fraunces 144 opsz makes the J look weird — swapped 2026-04-25 per user feedback.)
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(BASE_URL),
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/logo/favicon.ico", sizes: "any" },
        { url: "/logo/favicon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/logo/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/logo/favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/logo/favicon-96.png", sizes: "96x96", type: "image/png" },
        { url: "/logo/favicon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/logo/favicon-512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/logo/favicon.ico",
      apple: "/logo/apple-touch-icon.png",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: "en_CA",
      siteName: "Hacey Jeong, REALTOR®",
      url: `${BASE_URL}/${locale}`,
      images: [
        {
          url: "/images/editorial/hero-light.jpg",
          width: 1536,
          height: 1024,
          alt: "Soft morning light on Vancouver Island.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/editorial/hero-light.jpg"],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#c88262",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const realEstateAgentSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${BASE_URL}/#hacey-jeong`,
  name: "Hacey Jeong",
  alternateName: "Hacey Jeong, REALTOR®",
  url: BASE_URL,
  image: `${BASE_URL}/images/editorial/realtor-portrait-bw.jpg`,
  telephone: "+16047290317",
  priceRange: "$$$",
  knowsLanguage: ["en", "ko"],
  areaServed: [
    { "@type": "City", name: "Nanaimo" },
    { "@type": "City", name: "Parksville" },
    { "@type": "City", name: "Qualicum Beach" },
    { "@type": "City", name: "Ladysmith" },
    { "@type": "City", name: "Duncan" },
    { "@type": "City", name: "Victoria" },
  ],
  worksFor: {
    "@type": "RealEstateAgent",
    name: "Royal LePage Nanaimo Realty",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nanaimo",
      addressRegion: "BC",
      addressCountry: "CA",
    },
  },
  sameAs: ["https://www.instagram.com/haceyjeong/"],
  description:
    "Bilingual REALTOR® with Royal LePage Nanaimo Realty. Background in chemical engineering, global oil & gas, and small-business ownership. Serving Vancouver Island.",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Google tag (gtag.js) — GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BJB0KR4VYC"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BJB0KR4VYC');
          `}
        </Script>
        <NextIntlClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <JsonLd schema={realEstateAgentSchema} />
      </body>
    </html>
  );
}
