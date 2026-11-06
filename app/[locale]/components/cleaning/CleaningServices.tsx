// components/cleaning/CleaningServices.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function CleaningServices() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('cleaning.services')

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
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const services = [
    { key: 'service1', icon: '🏢' },
    { key: 'service2', icon: '🏠' },
    { key: 'service3', icon: '🪟' },
    { key: 'service4', icon: '🧹' },
  ]

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="cleaning"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-surface"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Ліва колонка - зображення */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="relative">
              <div className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/cleaning.png"
                  alt="Cleaning Service"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl -z-10 bg-line-subtle" />
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl -z-10 bg-line-subtle" />
            </div>
          </div>

          {/* Права колонка - текст */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-sm tracking-[0.3em] uppercase mb-3 text-ink-muted">
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

            {/* Список послуг */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {services.map((service, idx) => (
                <div
                  key={service.key}
                  className="flex items-start gap-3 p-4 rounded-xl border border-line bg-surface-card hover:bg-surface-card-hover transition-colors duration-300"
                  style={{
                    animation: isVisible
                      ? `fadeInUp 0.5s ease-out ${idx * 0.1}s both`
                      : 'none',
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg bg-surface-2">
                    {service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold mb-1 text-ink">
                      {t(`${service.key}Title`)}
                    </div>
                    <div className="text-xs leading-relaxed text-ink-muted">
                      {t(`${service.key}Desc`)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA кнопка */}
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 bg-brand/10 text-ink-2 hover:bg-brand/20 hover:text-ink"
            >
              <span>{t('cta')}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}