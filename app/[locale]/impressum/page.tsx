// app/[locale]/impressum/page.tsx
import { getAlternates } from '@/lib/seo';
import ImpressumClient from './ImpressumClient';

const seoContent = {
  de: {
    title: 'Impressum',
    description: 'Impressum und rechtliche Angaben von LANDSTARKBAU gemäß § 5 TMG. Kontakt, Geschäftsführung und Haftungsausschluss.',
  },
  en: {
    title: 'Imprint',
    description: 'Imprint and legal information of LANDSTARKBAU according to § 5 TMG. Contact, management and disclaimer.',
  },
  ru: {
    title: 'Импрессум',
    description: 'Выходные данные и юридическая информация LANDSTARKBAU согласно § 5 TMG. Контакты, руководство и отказ от ответственности.',
  },
  uk: {
    title: 'Імпресум',
    description: 'Вихідні дані та юридична інформація LANDSTARKBAU згідно з § 5 TMG. Контакти, керівництво та відмова від відповідальності.',
  },
};

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const content = seoContent[locale as keyof typeof seoContent] || seoContent.de;

  return {
    title: content.title,
    description: content.description,
    alternates: getAlternates(locale, "/impressum"),
  };
}

export default function ImpressumPage() {
  return <ImpressumClient />;
}