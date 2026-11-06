// app/[locale]/projects/ProjectsClient.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

interface Project {
  id: string
  number: number
  name: string
  subtitle: string | null
  location: string
  description: string
  imageUrl: string
  thumbnailUrl: string
  category: string
  area: string | null
  year: number | null
}

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const locale = useLocale()
  const t = useTranslations('projects')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/projects?locale=${locale}`)
        const data = await response.json()
        setProjects(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [locale])

  if (loading) {
    return (
      <main className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-surface-2">
        <div className="w-12 h-12 border-2 rounded-full animate-spin border-line-strong border-t-ink" />
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-surface-2">

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        {/* Заголовок */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm tracking-[0.3em] uppercase mb-3 text-ink-muted">
            {t('subtitle')}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-ink">
            {t('title')}
          </h1>
          <div className="w-16 h-px bg-line-strong mx-auto" />
          <p className="text-base md:text-lg mt-6 text-ink-2">
            {t('description')}
          </p>
        </div>

        {/* Сітка проектів */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="group relative backdrop-blur-sm rounded-2xl overflow-hidden border border-line bg-surface-card hover:border-line-strong transition-all duration-500 hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <Link href={`/${locale}/projects/${project.id}`}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/50 to-transparent" />
                </div>
              </Link>

              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold transition-colors text-ink group-hover:text-ink-2">
                  {project.name}
                </h3>
                {project.subtitle && (
                  <p className="text-sm tracking-wide text-ink-muted">
                    {project.subtitle}
                  </p>
                )}
                <p className="text-sm leading-relaxed line-clamp-2 text-ink-2">
                  {project.description}
                </p>

                <div className="flex justify-between items-center pt-3">
                  <div className="flex gap-3 text-xs text-ink-muted">
                    {project.area && <span>{project.area}</span>}
                    {project.year && <span>{project.year}</span>}
                  </div>
                  <Link href={`/${locale}/projects/${project.id}`}>
                    <button className="text-xs flex items-center gap-1 transition-colors text-ink-muted group-hover:text-ink">
                      {t('details')}
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink-2">
              {locale === 'de'
                ? 'Keine Projekte gefunden.'
                : locale === 'en'
                  ? 'No projects found.'
                  : locale === 'ru'
                    ? 'Проекты не найдены.'
                    : 'Проектів не знайдено.'}
            </p>
          </div>
        )}

      </div>

    </main>
  )
}