// app/[locale]/projects/page.tsx
import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/seo';
import ProjectsClient from './ProjectsClient';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  // Використовуємо namespace 'projects' для отримання заголовку сторінки
  const t = await getTranslations({ locale, namespace: 'projects' });

  return {
    title: t('title'), // Беремо заголовок з ваших перекладів
    description: t('description'), // Беремо опис з ваших перекладів
    alternates: getAlternates(locale, "/projects"), // Генерує canonical та hreflang
  };
}

export default function ProjectsPage() {
  // Рендеримо ваш клієнтський компонент
  return <ProjectsClient />;
}