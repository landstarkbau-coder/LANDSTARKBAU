// components/cleaning/CleaningWhyUs.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/app/context/ThemeContext'

export function CleaningWhyUs() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('cleaning.whyUs')
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

  const items = [
    { key: 'item1', icon: '🌿' },
    { key: 'item2', icon: '👥' },
    { key: 'item3', icon: '🛡️' },
    { key: 'item4', icon: '⏰' },
    { key: 'item5', icon: '🧴' },
    { key: 'item6', icon: '⭐' },
  ]

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 md:py-28 overflow-hidden ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}
    >
      <div className="absolute inset-0 opacity-30">
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-white' : 'bg-gray-400'
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-white' : 'bg-gray-400'
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={item.key}
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/10'
                  : 'bg-white/60 border-gray-200 hover:bg-white'
              }`}
              style={{
                animation: isVisible
                  ? `fadeInUp 0.5s ease-out ${idx * 0.08}s both`
                  : 'none',
                opacity: isVisible ? 1 : 0,
              }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${
                  isDark ? 'bg-white/10' : 'bg-gray-200'
                }`}
              >
                {item.icon}
              </div>
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t(`${item.key}Title`)}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  isDark ? 'text-white/50' : 'text-gray-600'
                }`}
              >
                {t(`${item.key}Desc`)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}