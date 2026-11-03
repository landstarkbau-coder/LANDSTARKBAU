// app/sitemap.ts

import { MetadataRoute } from 'next'

const BASE_URL = 'https://landstarkbau.de'
const locales = ['de', 'en', 'uk', 'ru']

const staticPages = [
  { path: '',           priority: 1.0, changeFrequency: 'weekly'  as const },
  { path: '/projects',  priority: 0.9, changeFrequency: 'weekly'  as const },
  { path: '/cleaning',  priority: 0.9, changeFrequency: 'weekly'  as const },
  { path: '/impressum', priority: 0.3, changeFrequency: 'yearly'  as const },
  { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/agb',       priority: 0.3, changeFrequency: 'yearly'  as const },
  { path: '/cookies',   priority: 0.3, changeFrequency: 'yearly'  as const },
]

// Допоміжна функція для генерації мовних alternates
function buildAlternates(path: string) {
  const languages: Record<string, string> = {}
  locales.forEach((locale) => {
    languages[locale] = `${BASE_URL}/${locale}${path}`
  })
  return { languages }
}

// Отримуємо список проектів з API (або з БД)
async function getProjects(): Promise<{ id: string; updatedAt?: string }[]> {
  try {
    // Якщо у вас є серверна функція для отримання проектів — використовуйте її.
    // Наприклад: import { getProjects } from '@/lib/db' — і викликайте напряму.
    
    // Якщо ні — робимо fetch до вашого API:
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || BASE_URL
    const res = await fetch(`${baseUrl}/api/projects`, {
      next: { revalidate: 3600 }, // кешуємо на 1 годину
    })
    
    if (!res.ok) return []
    const projects = await res.json()
    
    return projects.map((p: any) => ({
      id: p.id,
      updatedAt: p.updatedAt,
    }))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = []
  const now = new Date()

  // 1. Статичні сторінки
  for (const locale of locales) {
    for (const page of staticPages) {
      sitemap.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: buildAlternates(page.path),
      })
    }
  }

  // 2. Сторінки проектів (динамічно)
  const projects = await getProjects()
  
  for (const locale of locales) {
    for (const project of projects) {
      sitemap.push({
        url: `${BASE_URL}/${locale}/projects/${project.id}`,
        lastModified: project.updatedAt ? new Date(project.updatedAt) : now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: buildAlternates(`/projects/${project.id}`),
      })
    }
  }

  return sitemap
}