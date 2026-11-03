// app/[locale]/datenschutz/page.tsx
import { getAlternates } from '@/lib/seo';
import DatenschutzClient from './DatenschutzClient';

const seoContent = {
  de: {
    title: 'Datenschutzerklärung',
    description: 'Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten bei LANDSTARKBAU gemäß DSGVO.',
  },
  en: {
    title: 'Privacy Policy',
    description: 'Information about data protection and the processing of personal data at LANDSTARKBAU in accordance with GDPR.',
  },
  ru: {
    title: 'Политика конфиденциальности',
    description: 'Информация о защите данных и обработке персональных данных в LANDSTARKBAU в соответствии с GDPR.',
  },
  uk: {
    title: 'Політика конфіденційності',
    description: 'Інформація про захист даних та обробку персональних даних у LANDSTARKBAU відповідно до GDPR.',
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
    alternates: getAlternates(locale, "/datenschutz"),
  };
}

export default function DatenschutzPage() {
  return <DatenschutzClient />;
}