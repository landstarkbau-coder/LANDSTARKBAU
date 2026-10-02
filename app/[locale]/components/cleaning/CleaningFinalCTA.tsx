// components/cleaning/CleaningFinalCTA.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/app/context/ThemeContext'

export function CleaningFinalCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('cleaning.finalCta')
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
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    document
      .getElementById('cleaning')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 md:py-28 overflow-hidden ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}
    >
      <div className="absolute inset-0 opacity-30">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl ${
            isDark ? 'bg-white' : 'bg-gray-400'
          }`}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 relative z-10">
        <div
          className="max-w-3xl mx-auto text-center"
          style={{
            animation: isVisible ? 'fadeInUp 0.7s ease-out forwards' : 'none',
            opacity: 0,
          }}
        >
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t('title')}
          </h2>
          <div
            className={`w-16 h-px ${
              isDark ? 'bg-white/20' : 'bg-gray-300'
            } mx-auto mb-6`}
          />
          <p
            className={`text-base md:text-lg leading-relaxed mb-10 ${
              isDark ? 'text-white/60' : 'text-gray-600'
            }`}
          >
            {t('description')}
          </p>
          <button
            onClick={scrollToTop}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm tracking-wider transition-all duration-300 ${
              isDark
                ? 'bg-white text-gray-900 hover:bg-white/90'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            <span>{t('button')}</span>
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
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}