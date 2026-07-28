// app/sitemap.ts

import { MetadataRoute } from 'next'

// ⬇️ ВИПРАВЛЕНО - прибрано www, щоб відповідало metadataBase
const BASE_URL = 'https://landstarkbau.de'

const locales = ['de', 'en', 'uk']

const staticPages = [
  {
    path: '',
    priority: 1.0,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/projects',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/impressum',
    priority: 0.3,
    changeFrequency: 'yearly' as const,
  },
  {
    path: '/datenschutz',
    priority: 0.3,
    changeFrequency: 'yearly' as const,
  },
  {
    path: '/agb',
    priority: 0.3,
    changeFrequency: 'yearly' as const,
  },
]

const projects = [
  'cmqqwmynq0000n4uwecaeib90',
  'cmqqwmyw00001n4uw2acyzzhe',
  'cmqqwmz3x0002n4uwhguf4xqr',
  'cmqqwmzbz0003n4uwkymhnqol',
  'cmqqwmzk10004n4uw12ofb6ov',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = []

  // Статичні сторінки
  for (const locale of locales) {
    for (const page of staticPages) {
      sitemap.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            de: `${BASE_URL}/de${page.path}`,
            en: `${BASE_URL}/en${page.path}`,
            uk: `${BASE_URL}/uk${page.path}`,
          },
        },
      })
    }
  }

  // Сторінки проєктів
  for (const locale of locales) {
    for (const projectId of projects) {
      sitemap.push({
        url: `${BASE_URL}/${locale}/projects/${projectId}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            de: `${BASE_URL}/de/projects/${projectId}`,
            en: `${BASE_URL}/en/projects/${projectId}`,
            uk: `${BASE_URL}/uk/projects/${projectId}`,
          },
        },
      })
    }
  }

  return sitemap
}