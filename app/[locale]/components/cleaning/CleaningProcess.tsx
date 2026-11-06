// components/cleaning/CleaningProcess.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

export function CleaningProcess() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('cleaning.process')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const steps = ['step1', 'step2', 'step3', 'step4']

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-surface"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 relative z-10">

        {/* Заголовок */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-sm tracking-[0.3em] uppercase mb-3 text-ink-muted">
            {t('subtitle')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-ink">
            {t('title')}
          </h2>
          <div className="w-16 h-px bg-line-strong mx-auto" />
          <p className="text-base md:text-lg mt-6 text-ink-2">
            {t('description')}
          </p>
        </div>

        {/* Кроки */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step}
              className="relative"
              style={{
                animation: isVisible
                  ? `fadeInUp 0.5s ease-out ${idx * 0.1}s both`
                  : 'none',
                opacity: isVisible ? 1 : 0,
              }}
            >
              <div className="p-6 rounded-2xl border border-line bg-surface-card hover:bg-surface-card-hover h-full transition-colors duration-300">
                <div className="text-5xl font-bold mb-4 text-line-strong">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-ink">
                  {t(`${step}Title`)}
                </h3>
                <p className="text-sm leading-relaxed text-ink-2">
                  {t(`${step}Desc`)}
                </p>
              </div>

              {/* Стрілка між кроками (desktop) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-line-strong" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}