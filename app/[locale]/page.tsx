// app/[locale]/page.tsx

import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/seo';

import { Hero } from './components/Hero'
import { ServicesSection } from './components/ServicesSection'
import { AboutSection } from './components/AboutSection'
import { ProcessSection } from './components/ProcessSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { FAQSection } from './components/FAQSection'
import { ContactSection } from './components/ContactSection'
import { CleaningSection } from './components/CleaningSection'

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  // Вказуємо 'metadata' (маленькими літерами) — як у вашому JSON-файлі
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),       // Беремо ключ 'title' з JSON
    description: t('description'), // Беремо ключ 'description'
    alternates: getAlternates(locale, "/"), // Генерує hreflang та canonical
  };
}

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <CleaningSection/>
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </main>
  )
}