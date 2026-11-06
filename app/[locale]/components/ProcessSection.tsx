// app/[locale]/components/ProcessSection.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export function ProcessSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('process')
  const locale = useLocale()

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Масив етапів з перекладами з JSON
  const processSteps = [
    {
      number: '01',
      title: t('step1'),
      subtitle: t('step1Sub'),
      description: t('step1Desc'),
      duration: t('step1Duration'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: t('step2'),
      subtitle: t('step2Sub'),
      description: t('step2Desc'),
      duration: t('step2Duration'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: t('step3'),
      subtitle: t('step3Sub'),
      description: t('step3Desc'),
      duration: t('step3Duration'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1M5 21v-4M19 21v-4" />
        </svg>
      ),
    },
    {
      number: '04',
      title: t('step4'),
      subtitle: t('step4Sub'),
      description: t('step4Desc'),
      duration: t('step4Duration'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 4h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zM5 14h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 011-1zM3 9h18M3 19h18" />
        </svg>
      ),
    },
  ]

  return (
    <section
      id="our-process"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-surface"
    >

      {/* Декоративні плями */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl bg-line-subtle" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl bg-line-subtle" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 relative z-10">

        {/* Заголовок секції */}
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

        {/* ROADMAP - без ліній та точок */}
        <div className="max-w-4xl mx-auto">
          {processSteps.map((step, idx) => (
            <div
              key={step.number}
              className="relative flex flex-col md:flex-row gap-6 md:gap-8 pb-12 md:pb-16"
              style={{
                animation: isVisible ? `fadeInUp 0.5s ease-out ${idx * 0.15}s forwards` : 'none',
                opacity: 0,
              }}
            >

              {/* Ліва частина - номер та іконка */}
              <div className="md:w-1/3 relative">
                <div className="text-6xl md:text-7xl font-bold mb-2 text-line-strong">
                  {step.number}
                </div>

                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs mt-2 bg-surface-2 text-ink-muted">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{step.duration}</span>
                </div>
              </div>

              {/* Права частина - контент */}
              <div className="md:w-2/3 pb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-surface-2 text-ink-muted">
                  {step.icon}
                </div>

                <h3 className="text-2xl font-bold mb-1 text-ink">
                  {step.title}
                </h3>
                <p className="text-sm mb-3 text-ink-muted">
                  {step.subtitle}
                </p>

                <p className="text-base leading-relaxed text-ink-2">
                  {step.description}
                </p>
              </div>

            </div>
          ))}

          {/* Фінальна точка */}
          <div className="flex justify-center mt-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-2">
              <svg className="w-6 h-6 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

        </div>

        {/* CTA з якірним посиланням на контакт */}
        <div className="text-center mt-12">
          <Link href={`/${locale}#contact`}>
            <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 bg-transparent border border-line-strong text-ink-2 hover:bg-surface-2 hover:border-ink hover:text-ink">
              <span>{t('consultation')}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        </div>

      </div>

    </section>
  )
}