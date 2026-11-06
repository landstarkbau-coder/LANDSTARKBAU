// app/[locale]/projects/[id]/ProjectDetailClient.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

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

export default function ProjectDetailClient() {
  const params = useParams()
  const locale = useLocale()
  const t = useTranslations('projects')
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
      <main className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-surface-2">
        <div className="w-12 h-12 border-2 rounded-full animate-spin border-line-strong border-t-ink" />
      </main>
    )
  }

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-24 pb-20 bg-surface-2">

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        {/* Заголовок проекту */}
        <div className="mb-10">
          <p className="text-sm tracking-[0.3em] uppercase mb-3 text-ink-muted">
            {project.location}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-ink">
            {project.name}
          </h1>
          {project.subtitle && (
            <p className="text-xl text-ink-2">{project.subtitle}</p>
          )}
          <div className="w-16 h-px bg-line-strong mt-4" />
        </div>

        {/* Фотогалерея */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-ink">
            {t('gallery')}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {project.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => openLightbox(idx)}
                className="relative aspect-square overflow-hidden rounded-lg group bg-surface-card"
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
              <h2 className="text-2xl font-bold mb-4 text-ink">
                {t('about')}
              </h2>
              <p className="leading-relaxed whitespace-pre-line text-ink-2">
                {project.fullDescription || project.description}
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-bold mb-3 text-ink">
                {t('services')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1 rounded-full text-sm border border-line bg-surface-card text-ink-2"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-ink">
                {t('materials')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.materials.map((material) => (
                  <span
                    key={material}
                    className="px-3 py-1 rounded-full text-sm bg-surface-card text-ink-muted"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="backdrop-blur-sm rounded-2xl p-6 border border-line bg-surface-card">
              <h3 className="text-lg font-bold mb-4 text-ink">
                {t('details')}
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-ink-muted">
                    {locale === 'de' ? 'Kategorie' : locale === 'en' ? 'Category' : 'Категорія'}
                  </span>
                  <span className="text-sm text-ink-2">{project.category}</span>
                </div>
                {project.area && (
                  <div className="flex justify-between">
                    <span className="text-sm text-ink-muted">
                      {locale === 'de' ? 'Fläche' : locale === 'en' ? 'Area' : 'Площа'}
                    </span>
                    <span className="text-sm text-ink-2">{project.area}</span>
                  </div>
                )}
                {project.year && (
                  <div className="flex justify-between">
                    <span className="text-sm text-ink-muted">
                      {locale === 'de' ? 'Jahr' : locale === 'en' ? 'Year' : 'Рік'}
                    </span>
                    <span className="text-sm text-ink-2">{project.year}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex justify-between">
                    <span className="text-sm text-ink-muted">
                      {locale === 'de' ? 'Bauzeit' : locale === 'en' ? 'Duration' : 'Тривалість'}
                    </span>
                    <span className="text-sm text-ink-2">{project.duration}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-ink-muted">
                    {locale === 'de' ? 'Standort' : locale === 'en' ? 'Location' : 'Локація'}
                  </span>
                  <span className="text-sm text-ink-2">{project.location}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 border border-line bg-surface-card text-center">
              <p className="text-sm mb-4 text-ink-2">
                {t('interested')}
              </p>
              <Link href={`/${locale}/#contact`}>
                <button className="w-full py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 bg-brand/10 border border-line-strong text-ink hover:bg-brand hover:text-ink-on-brand">
                  {t('contactButton')}
                </button>
              </Link>
            </div>
          </div>

        </div>

        {/* Навігація */}
        <div className="mt-16 pt-8 border-t border-line flex justify-between">
          <Link
            href={`/${locale}/projects`}
            className="transition-colors flex items-center gap-2 text-ink-muted hover:text-ink"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('back')}
          </Link>
          <Link
            href={`/${locale}/#contact`}
            className="transition-colors flex items-center gap-2 text-ink-muted hover:text-ink"
          >
            {t('contact')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>

      {/* Lightbox — навмисно темний в обох темах */}
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