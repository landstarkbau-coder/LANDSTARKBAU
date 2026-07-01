// app/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css"; 
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToHash } from "./components/ScrollToHash";
import { ThemeProvider } from "../context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'LANDSTARKBAU | Construction & Landscaping',
    template: '%s | LANDSTARKBAU'
  },
  description: "Ihr zuverlässiger Partner für hochwertige Landschaftsgestaltung, Gartenbau und Bauprojekte in Deutschland.",
  keywords: ['Landschaftsarchitektur', 'Gartengestaltung', 'Bauprojekte', 'Deutschland', 'Bonn'],
  authors: [{ name: 'LANDSTARKBAU' }],
  openGraph: {
    title: 'LANDSTARKBAU | Construction & Landscaping',
    description: 'Ihr zuverlässiger Partner für hochwertige Landschaftsgestaltung, Gartenbau und Bauprojekte in Deutschland.',
    url: 'https://landstarkbau.de',
    siteName: 'LANDSTARKBAU',
    locale: 'de_DE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="de" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              {children}
            </main>
            <Footer />
            <ScrollToHash />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}