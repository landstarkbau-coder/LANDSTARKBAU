// components/cleaning/CleaningProcess.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/app/context/ThemeContext'

export function CleaningProcess() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('cleaning.process')
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

  const steps = ['step1', 'step2', 'step3', 'step4']

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 md:py-28 overflow-hidden ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-gradient-to-bl ${
            isDark ? 'from-gray-900 to-gray-800' : 'from-white to-gray-100'
          }`}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p
            className={`text-sm tracking-[0.3em] uppercase mb-3 ${
              isDark ? 'text-white/40' : 'text-gray-500'
            }`}
          >
            {t('subtitle')}
          </p>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t('title')}
          </h2>
          <div
            className={`w-16 h-px ${isDark ? 'bg-white/20' : 'bg-gray-300'} mx-auto`}
          />
          <p
            className={`text-base md:text-lg mt-6 ${
              isDark ? 'text-white/50' : 'text-gray-600'
            }`}
          >
            {t('description')}
          </p>
        </div>

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
              <div
                className={`p-6 rounded-2xl border h-full transition-colors duration-300 ${
                  isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div
                  className={`text-5xl font-bold mb-4 ${
                    isDark ? 'text-white/10' : 'text-gray-200'
                  }`}
                >
                  0{idx + 1}
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {t(`${step}Title`)}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-white/50' : 'text-gray-600'
                  }`}
                >
                  {t(`${step}Desc`)}
                </p>
              </div>

              {/* Стрілка між кроками (desktop) */}
              {idx < steps.length - 1 && (
                <div
                  className={`hidden lg:block absolute top-1/2 -right-3 w-6 h-px ${
                    isDark ? 'bg-white/10' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}