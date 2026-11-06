// app/[locale]/agb/page.tsx
import { getAlternates } from '@/lib/seo';
import AgbClient from './AgbClient';

// Ви можете винести цей об'єкт у спільний файл (наприклад, agbContent.ts), 
// щоб не дублювати його в клієнтському та серверному компонентах.
// Але для простоти залишимо тут мінімальну частину.
const seoContent = {
  de: {
    title: 'Allgemeine Geschäftsbedingungen',
    description: 'Die folgenden Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, Leistungen und Angebote der LANDSTARKBAU.',
  },
  en: {
    title: 'Terms & Conditions',
    description: 'The following Terms & Conditions apply to all contracts, services and offers of LANDSTARKBAU.',
  },
  ua: {
    title: 'Загальні умови',
    description: 'Наступні Загальні умови (AGB) застосовуються до всіх договорів, послуг та пропозицій LANDSTARKBAU.',
  },
  ru: { // Додав російську, бо вона є в конфігурації
    title: 'Общие условия',
    description: 'Следующие Общие условия (AGB) применяются ко всем договорам, услугам и предложениям LANDSTARKBAU.',
  }
};

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  // Беремо контент для поточної мови, якщо немає - беремо німецьку
  const content = seoContent[locale as keyof typeof seoContent] || seoContent.de;

  return {
    title: `${content.title} | LANDSTARKBAU`,
    description: content.description,
    alternates: getAlternates(locale, "/agb"), // Генерує canonical та hreflang
  };
}

export default function AgbPage() {
  return <AgbClient />;
}