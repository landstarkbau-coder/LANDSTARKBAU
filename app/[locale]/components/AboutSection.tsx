// app/[locale]/components/AboutSection.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/app/context/ThemeContext'

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [showBrandbook, setShowBrandbook] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('about')
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const toggleBrandbook = () => {
    setShowBrandbook(!showBrandbook)
  }

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
    setCurrentImageIndex((prev) => (prev + 1) % brandbookImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + brandbookImages.length) % brandbookImages.length)
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
  }, [isLightboxOpen])

  // Масив зображень брендбуку
  const brandbookImages = [
    '/brandbook1.jpg',
    '/brandbook2.jpg',
    '/brandbook3.jpg',
    '/brandbook4.jpg',
    '/brandbook5.jpg',
  ]

  return (
    <section id="about-us" ref={sectionRef} className={`relative py-20 md:py-28 overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      
      {/* Декоративний фон */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-gray-800 to-gray-900' : 'from-gray-100 to-gray-200'}`} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Ліва колонка - текст */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <p className={`text-sm tracking-[0.3em] uppercase mb-3 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                {t('subtitle')}
              </p>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('title')}
              </h2>
              <div className={`w-16 h-px ${isDark ? 'bg-white/20' : 'bg-gray-300'} mt-4`} />
            </div>
            
            <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
              {t('description1')}
            </p>
            
            <p className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              {t('description2')}
            </p>
            
            {/* Статистика */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div>
                <div className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>15+</div>
                <div className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t('years')}</div>
              </div>
              <div>
                <div className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>250+</div>
                <div className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t('projects')}</div>
              </div>
              <div>
                <div className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>100%</div>
                <div className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t('satisfaction')}</div>
              </div>
            </div>
            
            {/* Кнопка "MEHR ÜBER UNS" */}
            <button 
              onClick={toggleBrandbook}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 ${
                isDark 
                  ? 'bg-white/10 text-white/80 hover:bg-white/20' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <span>{t('moreAbout')}</span>
              <svg className={`w-4 h-4 transition-transform duration-300 ${showBrandbook ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {/* Права колонка - зображення / брендбук */}
          <div className="w-full lg:w-1/2">
            {!showBrandbook ? (
              <div className="relative">
                <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/ourTeam.png"
                    alt="LANDSTARKBAU Team"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={`absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10 ${isDark ? 'bg-white/5' : 'bg-gray-200/50'}`} />
                <div className={`absolute -top-4 -left-4 w-24 h-24 rounded-2xl -z-10 ${isDark ? 'bg-white/5' : 'bg-gray-200/50'}`} />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('brandbookTitle')}</h3>
                  <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t('brandbookDesc')}</p>
                  <div className={`w-12 h-px ${isDark ? 'bg-white/20' : 'bg-gray-300'} mt-2`} />
                </div>
                
                {/* Галерея з підтримкою теми */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  {brandbookImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => openLightbox(idx)}
                      className={`relative aspect-square overflow-hidden rounded-lg group ${
                        isDark ? 'bg-white/5' : 'bg-gray-200'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Brandbook ${idx + 1}`}
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
                
                <button 
                  onClick={toggleBrandbook}
                  className={`text-sm transition-colors flex items-center gap-1 mt-2 ${
                    isDark ? 'text-white/40 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span>Schließen</span>
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
      
      {/* LIGHTBOX - з підтримкою теми */}
      {isLightboxOpen && (
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
              src={brandbookImages[currentImageIndex]}
              alt={`Brandbook ${currentImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white/80 text-sm z-20">
              {currentImageIndex + 1} / {brandbookImages.length}
            </div>
          </div>
        </div>
      )}
      
    </section>
  )
}