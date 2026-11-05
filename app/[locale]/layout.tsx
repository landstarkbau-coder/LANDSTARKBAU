// app/[locale]/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "@/app/globals.css";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToHash } from "./components/ScrollToHash";
import { ThemeProvider } from "./../context/ThemeContext";
import { StickyContact } from "./components/StickyContact";
import { CookieConsent } from "./components/CookieConsent";
import { AnalyticsGate } from "./components/AnalyticsGate";
import { ConsentScript } from "./components/ConsentScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- JSON-LD КОМПОНЕНТ ---
function JsonLd({ locale }: { locale: string }) {
  const descriptions: Record<string, string> = {
    de: "Professioneller Garten- und Landschaftsbau in Bonn und Umgebung. LANDSTARKBAU realisiert hochwertige Gärten, Terrassen, Pflasterarbeiten, Außenanlagen und Bauprojekte für Privat- und Gewerbekunden.",
    en: "Professional garden and landscape construction in Bonn and surroundings. LANDSTARKBAU creates high-quality gardens, terraces, paving, outdoor facilities, and construction projects for private and commercial clients.",
    ru: "Профессиональное садово-ландшафтное строительство в Бонне и окрестностях. LANDSTARKBAU создает качественные сады, террасы, мощеные площадки и внешние объекты для частных и коммерческих клиентов.",
    uk: "Професійне садово-ландшафтне будівництво в Бонні та околицях. LANDSTARKBAU створює якісні сади, тераси, мощені майданчики та зовнішні об'єкти для приватних і комерційних клієнтів.",
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://landstarkbau.de/#organization",
    "name": "LANDSTARKBAU",
    "description": descriptions[locale] || descriptions.de,
    "url": "https://landstarkbau.de",
    "telephone": "+491601101030",
    "email": "landstarkbau@gmail.com",
    "priceRange": "$$",
    "image": "https://landstarkbau.de/og-image.png", // <-- Змінено на .png
    "logo": "https://landstarkbau.de/logoheader1.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kölnstraße 502",
      "addressLocality": "Bonn",
      "postalCode": "53117",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.7565,
      "longitude": 7.0785 
    },
    "areaServed": {
      "@type": "City",
      "name": "Bonn"
    },
    "sameAs": [
      "https://www.instagram.com/landstarkbau",
      "https://www.facebook.com/share/1HM4GpLDBU"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// --- ГЕНЕРАЦІЯ МЕТАДАНИХ ---
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;

  const ogLocales: Record<string, string> = {
    de: "de_DE",
    en: "en_US",
    ru: "ru_RU",
    uk: "uk_UA",
  };

  return {
    metadataBase: new URL("https://landstarkbau.de"),
    title: {
      default: "LANDSTARKBAU | Garten- und Landschaftsbau in Bonn",
      template: "%s | LANDSTARKBAU",
    },
    description:
      "Professioneller Garten- und Landschaftsbau in Bonn. LANDSTARKBAU realisiert hochwertige Gärten, Terrassen, Pflasterarbeiten, Außenanlagen und Bauprojekte für Privat- und Gewerbekunden.",
    applicationName: "LANDSTARKBAU",
    authors: [{ name: "LANDSTARKBAU", url: "https://landstarkbau.de" }],
    creator: "LANDSTARKBAU",
    publisher: "LANDSTARKBAU",
    category: "Construction",
    keywords: [
      "Gartenbau Bonn",
      "Landschaftsbau Bonn",
      "Garten- und Landschaftsbau Bonn",
      "Gartengestaltung Bonn",
      "Terrassenbau Bonn",
      "Pflasterarbeiten Bonn",
      "Außenanlagen Bonn",
      "Bauunternehmen Bonn",
      "Gartenbau NRW",
      "Landschaftsbau NRW",
      "Deutschland"
    ],
    openGraph: {
      title: "LANDSTARKBAU | Garten- und Landschaftsbau in Bonn",
      description:
        "Professioneller Garten- und Landschaftsbau in Bonn. Hochwertige Gartengestaltung, Terrassen, Pflasterarbeiten und Außenanlagen.",
      siteName: "LANDSTARKBAU",
      locale: ogLocales[locale] || "de_DE",
      type: "website",
      images: [
        {
          url: "/og-image.png", // <-- Змінено на .png
          width: 1200,
          height: 630,
          alt: "LANDSTARKBAU - Garten- und Landschaftsbau in Bonn",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "LANDSTARKBAU | Garten- und Landschaftsbau in Bonn",
      description: "Professioneller Garten- und Landschaftsbau in Bonn.",
      images: ["/og-image.png"], // <-- Змінено на .png
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

// --- ГОЛОВНИЙ ЛЕЙАУТ ---
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* JSON-LD Schema */}
        <JsonLd locale={locale} />

        {/* Consent Mode default */}
        <ConsentScript />

        <AnalyticsGate gaId="G-LPX6LEGMTD" />

        <ThemeProvider>
          <CookieConsent />
          <NextIntlClientProvider messages={messages}>
            <Header />

            <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              {children}
            </main>

            <Footer />

            <ScrollToHash />
            <StickyContact />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}