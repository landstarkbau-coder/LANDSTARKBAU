// app/[locale]/projects/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from '@/app/context/ThemeContext'

interface Project {
  id: string
  number: number
  name: string
  subtitle: string | null
  location: string
  description: string
  fullDescription: string
  imageUrl: string
  thumbnailUrl: string
  category: string
  area: string | null
  year: number | null
  duration: string | null
  gallery: string[]
  services: string[]
  materials: string[]
}

export default function ProjectDetailPage() {
  const params = useParams()
  const locale = useLocale()
  const t = useTranslations('projects')
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}?locale=${locale}`)
        if (!response.ok) {
          notFound()
        }
        const data = await response.json()
        setProject(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching project:', error)
        setLoading(false)
        notFound()
      }
    }
    
    if (params.id) {
      fetchProject()
    }
  }, [params.id, locale])

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }

  const nextImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length)
    }
  }

  const prevImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, project])

  if (loading) {
    return (
      <main className={`min-h-screen pt-32 pb-20 flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`w-12 h-12 border-2 rounded-full animate-spin ${isDark ? 'border-white/20 border-t-white' : 'border-gray-300 border-t-gray-900'}`} />
      </main>
    )
  }

  if (!project) {
    notFound()
  }

  return (
    <main className={`min-h-screen pt-24 pb-20 ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-gray-50 to-gray-100'
    }`}>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        
        {/* Заголовок проекту */}
        <div className="mb-10">
          <p className={`text-sm tracking-[0.3em] uppercase mb-3 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
            {project.location}
          </p>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {project.name}
          </h1>
          {project.subtitle && (
            <p className={`text-xl ${isDark ? 'text-white/50' : 'text-gray-600'}`}>{project.subtitle}</p>
          )}
          <div className={`w-16 h-px ${isDark ? 'bg-white/20' : 'bg-gray-300'} mt-4`} />
        </div>
        
        {/* Фотогалерея */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('gallery')}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {project.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => openLightbox(idx)}
                className={`relative aspect-square overflow-hidden rounded-lg group ${isDark ? 'bg-white/5' : 'bg-gray-200'}`}
              >
                <Image
                  src={img}
                  alt={`Bild ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('about')}
              </h2>
              <p className={`leading-relaxed whitespace-pre-line ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                {project.fullDescription || project.description}
              </p>
            </div>
            
            <div className="pt-4">
              <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('services')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span key={service} className={`px-3 py-1 rounded-full text-sm ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-white/60' 
                      : 'bg-gray-200 border border-gray-300 text-gray-600'
                  }`}>
                    {service}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('materials')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.materials.map((material) => (
                  <span key={material} className={`px-3 py-1 rounded-full text-sm ${
                    isDark 
                      ? 'bg-white/5 text-white/50' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
              isDark 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white/60 border-gray-200'
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('details')}
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                    {locale === 'de' ? 'Kategorie' : locale === 'en' ? 'Category' : 'Категорія'}
                  </span>
                  <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-800'}`}>{project.category}</span>
                </div>
                {project.area && (
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                      {locale === 'de' ? 'Fläche' : locale === 'en' ? 'Area' : 'Площа'}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-800'}`}>{project.area}</span>
                  </div>
                )}
                {project.year && (
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                      {locale === 'de' ? 'Jahr' : locale === 'en' ? 'Year' : 'Рік'}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-800'}`}>{project.year}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                      {locale === 'de' ? 'Bauzeit' : locale === 'en' ? 'Duration' : 'Тривалість'}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-800'}`}>{project.duration}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                    {locale === 'de' ? 'Standort' : locale === 'en' ? 'Location' : 'Локація'}
                  </span>
                  <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-800'}`}>{project.location}</span>
                </div>
              </div>
            </div>
            
            <div className={`rounded-2xl p-6 border text-center ${
              isDark 
                ? 'bg-gradient-to-r from-white/5 to-white/5 border-white/10' 
                : 'bg-gradient-to-r from-gray-100 to-gray-100 border-gray-200'
            }`}>
              <p className={`text-sm mb-4 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                {t('interested')}
              </p>
              <Link href={`/${locale}/#contact`}>
                <button className={`w-full py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black' 
                    : 'bg-gray-200 border border-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-900'
                }`}>
                  {t('contactButton')}
                </button>
              </Link>
            </div>
          </div>
          
        </div>
        
        {/* Навігація */}
        <div className={`mt-16 pt-8 border-t flex justify-between ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <Link href={`/${locale}/projects`} className={`transition-colors flex items-center gap-2 ${isDark ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('back')}
          </Link>
          <Link href={`/${locale}/#contact`} className={`transition-colors flex items-center gap-2 ${isDark ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}>
            {t('contact')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
      </div>
      
      {/* Lightbox */}
      {isLightboxOpen && project && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center z-20"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center z-20"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center z-20"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div 
            className="relative w-full max-w-6xl h-[80vh] mx-0 md:mx-12"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={project.gallery[currentImageIndex]}
              alt={`Bild ${currentImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white/80 text-sm z-20">
              {currentImageIndex + 1} / {project.gallery.length}
            </div>
          </div>
        </div>
      )}
      
    </main>
  )
}