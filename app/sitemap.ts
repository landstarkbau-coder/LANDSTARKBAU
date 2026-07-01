// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://landstarkbau.de'
  
  // Статичні сторінки
  const routes = ['', '/projects'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Динамічні сторінки проектів (якщо потрібно)
  // const projects = await getProjects()
  // const projectRoutes = projects.map((project) => ({
  //   url: `${baseUrl}/projects/${project.id}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [...routes]
}