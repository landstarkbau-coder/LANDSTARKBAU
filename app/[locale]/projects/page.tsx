// app/[locale]/projects/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from '@/app/context/ThemeContext'

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const locale = useLocale()
  const t = useTranslations('projects')
  const { theme } = useTheme()
  const isDark = theme === 'dark'

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
      <main className={`min-h-screen pt-32 pb-20 flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`w-12 h-12 border-2 rounded-full animate-spin ${isDark ? 'border-white/20 border-t-white' : 'border-gray-300 border-t-gray-900'}`} />
      </main>
    )
  }

  return (
    <main className={`min-h-screen pt-32 pb-20 ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-gray-50 to-gray-100'
    }`}>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        
        {/* Заголовок */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className={`text-sm tracking-[0.3em] uppercase mb-3 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
            {t('subtitle')}
          </p>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('title')}
          </h1>
          <div className={`w-16 h-px ${isDark ? 'bg-white/20' : 'bg-gray-300'} mx-auto`} />
          <p className={`text-base md:text-lg mt-6 ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
            {t('description')}
          </p>
        </div>
        
        {/* Сітка проектів */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div 
              key={project.id}
              className={`group relative backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 ${
                isDark 
                  ? 'bg-white/5 border-white/10 hover:border-white/20' 
                  : 'bg-white/60 border-gray-200 hover:border-gray-300'
              }`}
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
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-gray-900 via-gray-900/50' : 'from-gray-100 via-gray-100/1'} to-transparent`} />
                </div>
              </Link>
              
              <div className="p-5 space-y-2">
                <h3 className={`text-xl font-bold transition-colors ${isDark ? 'text-white group-hover:text-white/90' : 'text-gray-900 group-hover:text-gray-700'}`}>
                  {project.name}
                </h3>
                {project.subtitle && (
                  <p className={`text-sm tracking-wide ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                    {project.subtitle}
                  </p>
                )}
                <p className={`text-sm leading-relaxed line-clamp-2 ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
                  {project.description}
                </p>
                
                <div className="flex justify-between items-center pt-3">
                  <div className={`flex gap-3 text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                    {project.area && <span>{project.area}</span>}
                    {project.year && <span>{project.year}</span>}
                  </div>
                  <Link href={`/${locale}/projects/${project.id}`}>
                    <button className={`text-xs flex items-center gap-1 transition-colors ${isDark ? 'text-white/50 group-hover:text-white/80' : 'text-gray-500 group-hover:text-gray-800'}`}>
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
            <p className={isDark ? 'text-white/50' : 'text-gray-600'}>
              {locale === 'de' 
                ? 'Keine Projekte gefunden.'
                : locale === 'en'
                ? 'No projects found.'
                : 'Проектів не знайдено.'}
            </p>
          </div>
        )}
        
      </div>
      
    </main>
  )
}