// app/[locale]/components/AboutSection.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ImageGallery } from './ImageGallery'
import { ImageLightbox } from './ImageLightbox'

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [showBrandbook, setShowBrandbook] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('about')

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

  const brandbookImages = [
    '/brandbook1.jpg',
    '/brandbook2.jpg',
    '/brandbook3.jpg',
    '/brandbook4.jpg',
    '/brandbook5.jpg',
  ]

  return (
    <>
      <section
        id="about-us"
        ref={sectionRef}
        className="relative py-20 md:py-28 overflow-hidden bg-surface-2"
      >

        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            {/* Ліва колонка - текст */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <p className="text-lg tracking-[0.3em] uppercase mb-3 text-ink-muted">
                  {t('subtitle')}
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink">
                  {t('title')}
                </h2>
                <div className="w-16 h-px bg-line-strong mt-4" />
              </div>

              <p className="text-base md:text-lg leading-relaxed text-ink-2">
                {t('description1')}
              </p>

              <p className="text-base leading-relaxed text-ink-2">
                {t('description2')}
              </p>

              {/* Статистика */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-ink">15+</div>
                  <div className="text-xs text-ink-muted">{t('years')}</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-ink">250+</div>
                  <div className="text-xs text-ink-muted">{t('projects')}</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-ink">100%</div>
                  <div className="text-xs text-ink-muted">{t('satisfaction')}</div>
                </div>
              </div>

              {/* Кнопка "MEHR ÜBER UNS" */}
              <button
                onClick={toggleBrandbook}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 bg-brand/10 text-ink-2 hover:bg-brand/20 hover:text-ink"
              >
                <span>{t('moreAbout')}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${showBrandbook ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10 bg-line-subtle" />
                  <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl -z-10 bg-line-subtle" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-ink">{t('brandbookTitle')}</h3>
                    <p className="text-sm text-ink-muted">{t('brandbookDesc')}</p>
                    <div className="w-12 h-px bg-line-strong mt-2" />
                  </div>

                  {/* Галерея — тільки сітка, клік викликає setLightboxIndex */}
                  <ImageGallery
                    images={brandbookImages}
                    onImageClick={setLightboxIndex}
                    altPrefix="Brandbook"
                    columns={3}
                  />

                  <button
                    onClick={toggleBrandbook}
                    className="text-sm text-ink-muted hover:text-ink transition-colors flex items-center gap-1 mt-2"
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
      </section>

      {/* Lightbox — рендериться через Portal в <body>, поверх усього */}
      <ImageLightbox
        images={brandbookImages}
        openIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        altPrefix="Brandbook"
      />
    </>
  )
}