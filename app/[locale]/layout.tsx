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
import { ConsentScript } from "./components/ConsentScript"; // Перевірте, щоб цей файл існував

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      default: "LANDSTARKBAU | Garten- und Landschaftsbau",
      template: "%s | LANDSTARKBAU",
    },
    description:
      "Professioneller Garten- und Landschaftsbau in Deutschland. LANDSTARKBAU realisiert hochwertige Gärten, Terrassen, Pflasterarbeiten, Außenanlagen und Bauprojekte für Privat- und Gewerbekunden.",
    applicationName: "LANDSTARKBAU",
    authors: [{ name: "LANDSTARKBAU", url: "https://landstarkbau.de" }],
    creator: "LANDSTARKBAU",
    publisher: "LANDSTARKBAU",
    category: "Construction",
    keywords: [
      "Gartenbau",
      "Landschaftsbau",
      "Garten- und Landschaftsbau",
      "Gartengestaltung",
      "Terrassenbau",
      "Pflasterarbeiten",
      "Außenanlagen",
      "Bauunternehmen",
      "Deutschland",
      "Mainz",
    ],
    // canonical ТУТ НЕ ВКАЗУЄМО! Він генерується на кожній сторінці окремо.
    openGraph: {
      title: "LANDSTARKBAU | Garten- und Landschaftsbau",
      description:
        "Professioneller Garten- und Landschaftsbau in Deutschland. Hochwertige Gartengestaltung, Terrassen, Pflasterarbeiten und Außenanlagen.",
      siteName: "LANDSTARKBAU",
      locale: ogLocales[locale] || "de_DE",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "LANDSTARKBAU",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "LANDSTARKBAU | Garten- und Landschaftsbau",
      description: "Professioneller Garten- und Landschaftsbau in Deutschland.",
      images: ["/og-image.jpg"],
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
        {/* 1. Consent Mode default — без помилки React */}
        <ConsentScript />

        {/* 2. Google Analytics — завантажується ТІЛЬКИ після згоди */}
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