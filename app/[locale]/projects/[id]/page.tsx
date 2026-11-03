// app/[locale]/projects/[id]/page.tsx
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getAlternates } from '@/lib/seo';
import ProjectDetailClient from './ProjectDetailClient';

// Функція для отримання даних проекту (для SEO)
async function getProject(id: string, locale: string) {
  try {
    // Використовуємо абсолютний URL для серверного запиту
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://landstarkbau.de';
    const res = await fetch(`${baseUrl}/api/projects/${id}?locale=${locale}`, {
      next: { revalidate: 3600 } // Кешуємо на 1 годину
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; id: string }> 
}) {
  const { locale, id } = await params;
  const project = await getProject(id, locale);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const t = await getTranslations({ locale, namespace: 'projects' });

  // Формуємо опис з наявних даних
  const description = project.subtitle 
    ? `${project.name} - ${project.subtitle}. ${project.description}` 
    : project.description;

  return {
    title: `${project.name} | ${t('title')}`, // Назва проекту + загальний заголовок
    description: description.slice(0, 160), // Обрізаємо до 160 символів
    alternates: getAlternates(locale, `/projects/${id}`), // Генерує canonical та hreflang
    openGraph: {
      title: project.name,
      description: description.slice(0, 160),
      images: project.imageUrl ? [{ url: project.imageUrl }] : [],
      type: 'article',
    },
  };
}

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ locale: string; id: string }> 
}) {
  const { id, locale } = await params;
  
  // Перевіряємо, чи існує проект (щоб уникнути рендеру 404)
  const project = await getProject(id, locale);
  if (!project) {
    notFound();
  }

  // Передаємо id в клієнтський компонент (він все одно зробить свій fetch для свіжих даних, 
  // або можете передати project як пропс, щоб уникнути подвійного запиту)
  return <ProjectDetailClient />;
}