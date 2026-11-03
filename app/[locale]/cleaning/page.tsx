// app/[locale]/cleaning/page.tsx
import { getAlternates } from '@/lib/seo'
import { CleaningHero } from './../components/cleaning/CleaningHero'
import { CleaningServices } from './../components/cleaning/CleaningServices'
import { CleaningWhyUs } from './../components/cleaning/CleaningWhyUs'
import { CleaningProcess } from './../components/cleaning/CleaningProcess'
import { CleaningGallery } from './../components/cleaning/CleaningGallery'
import { CleaningTestimonials } from './../components/cleaning/CleaningTestimonials'
import { CleaningFAQ } from './../components/cleaning/CleaningFAQ'
import { CleaningFinalCTA } from './../components/cleaning/CleaningFinalCTA'
import { ContactSection } from './../components/ContactSection'

// 1. Створюємо об'єкт з SEO-даними для кожної мови
const metaContent = {
  de: {
    title: "Professionelle Reinigung | LANDSTARKBAU",
    description: "Zuverlässige Gebäudereinigung und professionelle Reinigungsservices in Deutschland. Jetzt LANDSTARKBAU kontaktieren.",
  },
  en: {
    title: "Professional Cleaning Services | LANDSTARKBAU",
    description: "Reliable building cleaning and professional cleaning services in Germany. Contact LANDSTARKBAU now.",
  },
  ru: {
    title: "Профессиональная уборка | LANDSTARKBAU",
    description: "Надежная уборка зданий и профессиональные клининговые услуги в Германии. Свяжитесь с LANDSTARKBAU.",
  },
  uk: {
    title: "Професійне прибирання | LANDSTARKBAU",
    description: "Надійне прибирання будівель та професійні клінінгові послуги в Німеччині. Зв'яжіться з LANDSTARKBAU.",
  },
};

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  // Беремо дані з об'єкта
  const content = metaContent[locale as keyof typeof metaContent] || metaContent.de;

  return {
    title: content.title,
    description: content.description,
    alternates: getAlternates(locale, "/cleaning"),
  };
}

export default function CleaningPage() {
  return (
    <main className="min-h-screen">
      <CleaningHero />
      <CleaningServices />
      <CleaningWhyUs />
      <CleaningProcess />
      <CleaningGallery />
      <CleaningTestimonials />
      <CleaningFAQ />
      <ContactSection/>
    </main>
  )
}