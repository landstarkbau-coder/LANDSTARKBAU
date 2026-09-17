// app/[locale]/components/CleaningSection.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/app/context/ThemeContext'

export function CleaningSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('cleaning')
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

  const services = [
    { key: 'service1', icon: '🏢' },
    { key: 'service2', icon: '🏠' },
    { key: 'service3', icon: '🪟' },
    { key: 'service4', icon: '🧹' },
  ]

  return (
    <section
      id="cleaning"
      ref={sectionRef}
      className={`relative py-20 md:py-28 overflow-hidden ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      {/* Декоративний фон */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-gradient-to-bl ${
            isDark ? 'from-gray-900 to-gray-800' : 'from-white to-gray-100'
          }`}
        />
      </div>

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

          {/* Права колонка - текст */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-6">
            <div>
              <p
                className={`text-sm tracking-[0.3em] uppercase mb-3 ${
                  isDark ? 'text-white/40' : 'text-gray-500'
                }`}
              >
                {t('subtitle')}
              </p>
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t('title')}
              </h2>
              <div
                className={`w-16 h-px ${isDark ? 'bg-white/20' : 'bg-gray-300'} mt-4`}
              />
            </div>

            <p
              className={`text-base md:text-lg leading-relaxed ${
                isDark ? 'text-white/70' : 'text-gray-700'
              }`}
            >
              {t('description1')}
            </p>

            <p
              className={`text-base leading-relaxed ${
                isDark ? 'text-white/60' : 'text-gray-600'
              }`}
            >
              {t('description2')}
            </p>

            {/* Список послуг */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {services.map((service) => (
                <div
                  key={service.key}
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-colors duration-300 ${
                    isDark
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg ${
                      isDark ? 'bg-white/10' : 'bg-gray-200'
                    }`}
                  >
                    {service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm font-semibold mb-1 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {t(`${service.key}Title`)}
                    </div>
                    <div
                      className={`text-xs leading-relaxed ${
                        isDark ? 'text-white/50' : 'text-gray-500'
                      }`}
                    >
                      {t(`${service.key}Desc`)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA кнопка */}
            <a
              href="#contact"
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 ${
                isDark
                  ? 'bg-white/10 text-white/80 hover:bg-white/20'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
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
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}