// components/cleaning/CleaningHero.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/app/context/ThemeContext'

export function CleaningHero() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('cleaning.hero')
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
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const scrollToServices = () => {
    document.getElementById('cleaning')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className={`relative pt-22 pb-20 md:pt-32 md:pb-28 overflow-hidden ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      {/* Декоративний градієнтний фон */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-gradient-to-bl ${
            isDark ? 'from-gray-900 to-gray-800' : 'from-white to-gray-100'
          }`}
        />
        <div
          className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-white' : 'bg-gray-400'
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-white' : 'bg-gray-400'
          }`}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Текст */}
          <div
            className="w-full lg:w-1/2 space-y-6"
            style={{
              animation: isVisible ? 'fadeInUp 0.7s ease-out forwards' : 'none',
              opacity: 0,
            }}
          >
            <p
              className={`text-sm tracking-[0.3em] uppercase ${
                isDark ? 'text-white/40' : 'text-gray-500'
              }`}
            >
              {t('subtitle')}
            </p>
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t('title')}
            </h1>
            <div
              className={`w-16 h-px ${isDark ? 'bg-white/20' : 'bg-gray-300'}`}
            />
            <p
              className={`text-base md:text-lg leading-relaxed ${
                isDark ? 'text-white/70' : 'text-gray-700'
              }`}
            >
              {t('description')}
            </p>

            {/* CTA кнопки */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToContact}
                 className={`inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm tracking-wider transition-all duration-300 ${
                  isDark
                    ? 'bg-white/10 text-white/80 hover:bg-white/20'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                <span>{t('ctaPrimary')}</span>
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
              <button
                onClick={scrollToServices}
                className={`inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm tracking-wider transition-all duration-300 ${
                  isDark
                    ? 'bg-white/10 text-white/80 hover:bg-white/20'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                <span>{t('ctaSecondary')}</span>
              </button>
            </div>

            {/* Бейджі довіри */}
            <div
              className={`flex flex-wrap gap-6 pt-6 border-t ${
                isDark ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              {[t('badge1'), t('badge2'), t('badge3')].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isDark ? 'bg-white/40' : 'bg-gray-400'
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      isDark ? 'text-white/60' : 'text-gray-600'
                    }`}
                  >
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Зображення */}
          <div
            className="w-full lg:w-1/2"
            style={{
              animation: isVisible ? 'fadeInUp 0.7s ease-out 0.2s forwards' : 'none',
              opacity: 0,
            }}
          >
            <div className="relative">
              <div className="relative h-80 md:h-96 lg:h-[550px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/cleaningMain.png"
                  alt="Cleaning Service"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div
                className={`absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl -z-10 ${
                  isDark ? 'bg-white/5' : 'bg-gray-200/50'
                }`}
              />
              <div
                className={`absolute -top-4 -right-4 w-24 h-24 rounded-2xl -z-10 ${
                  isDark ? 'bg-white/5' : 'bg-gray-200/50'
                }`}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}