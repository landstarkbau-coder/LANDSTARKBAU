// components/cleaning/CleaningGallery.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/app/context/ThemeContext'

export function CleaningGallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const t = useTranslations('cleaning.gallery')
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const items = [
    { key: 'item1', before: '/cleaning/kitchenBefore.jpg', after: '/cleaning/kitchenAfter.jpg' },
    { key: 'item2', before: '/cleaning/livingRoomBefore.jpg', after: '/cleaning/livingRoomAfter.jpg' },
    { key: 'item3', before: '/cleaning/officeBefore.jpg', after: '/cleaning/officeAfter.jpg' },
    { key: 'item4', before: '/cleaning/batthroomBefore.jpg', after: '/cleaning/batthroomAfter.jpg' },
    { key: 'item5', before: '/cleaning/windowBefore.jpg', after: '/cleaning/windowAfter.jpg' },
    { key: 'item6', before: '/cleaning/comercialBefore.jpg', after: '/cleaning/comercialAfter.jpg' },
  ]

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

  // Автопрокрутка
  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isVisible, items.length])

  const goTo = (idx: number) => {
    setActiveIndex((idx + items.length) % items.length)
  }

  const next = () => goTo(activeIndex + 1)
  const prev = () => goTo(activeIndex - 1)

  // Свайп (touch)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  const active = items[activeIndex]

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 md:py-28 overflow-hidden ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}
    >
      {/* Декоративний фон */}
      <div className="absolute inset-0 opacity-20">
        <div
          className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-white' : 'bg-gray-400'
          }`}
        />
        <div
          className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-white' : 'bg-gray-400'
          }`}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 relative z-10">

        {/* Заголовок */}
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

        {/* Карусель */}
        <div
          className="max-w-5xl mx-auto"
          style={{
            animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none',
            opacity: 0,
          }}
        >
          <div
            className={`relative rounded-2xl overflow-hidden border transition-colors duration-300 ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white/60 border-gray-200'
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Слайд: До / Після */}
            <div className="relative grid grid-cols-2 aspect-[16/9] md:aspect-[21/9]">
              {/* ДО */}
              <div className="relative">
                <Image
                  src={active.before}
                  alt={`${t(active.key)} - ${t('before')}`}
                  fill
                  className="object-cover grayscale opacity-70 transition-all duration-700"
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  priority={activeIndex === 0}
                />
                <span
                  className={`absolute top-3 left-3 text-[10px] md:text-xs tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-sm ${
                    isDark
                      ? 'bg-black/60 text-white/80'
                      : 'bg-white/80 text-gray-700'
                  }`}
                >
                  {t('before')}
                </span>
              </div>

              {/* ПІСЛЯ */}
              <div
                className={`relative border-l ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <Image
                  src={active.after}
                  alt={`${t(active.key)} - ${t('after')}`}
                  fill
                  className="object-cover transition-all duration-700"
                  sizes="(max-width: 1024px) 50vw, 40vw"
                />
                <span
                  className={`absolute top-3 left-3 text-[10px] md:text-xs tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-sm ${
                    isDark
                      ? 'bg-white/80 text-gray-900'
                      : 'bg-gray-900/80 text-white'
                  }`}
                >
                  {t('after')}
                </span>
              </div>
            </div>

            {/* Підпис під слайдом */}
            <div
              className={`flex items-center justify-between px-5 py-4 border-t ${
                isDark ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <p
                className={`text-sm md:text-base font-medium ${
                  isDark ? 'text-white/80' : 'text-gray-800'
                }`}
              >
                {t(active.key)}
              </p>
              <span
                className={`text-xs tracking-wider ${
                  isDark ? 'text-white/40' : 'text-gray-500'
                }`}
              >
                {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
            </div>

            {/* Стрілки (desktop) */}
            <button
              onClick={prev}
              aria-label="Previous"
              className={`hidden md:flex absolute top-1/2 left-3 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                isDark
                  ? 'bg-black/40 text-white hover:bg-black/60'
                  : 'bg-white/70 text-gray-800 hover:bg-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className={`hidden md:flex absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                isDark
                  ? 'bg-black/40 text-white hover:bg-black/60'
                  : 'bg-white/70 text-gray-800 hover:bg-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Мініатюри */}
          {/* <div className="flex gap-2 md:gap-3 mt-6 overflow-x-auto pb-2 scrollbar-thin">
            {items.map((item, idx) => (
              <button
                key={item.key}
                onClick={() => goTo(idx)}
                className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  activeIndex === idx
                    ? isDark
                      ? 'border-white/60 scale-105'
                      : 'border-gray-800 scale-105'
                    : isDark
                      ? 'border-white/10 opacity-50 hover:opacity-80'
                      : 'border-gray-200 opacity-50 hover:opacity-80'
                }`}
              >
                <Image
                  src={item.after}
                  alt={t(item.key)}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div> */}

          {/* Крапки (mobile) */}
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx
                    ? isDark
                      ? 'w-8 h-2 bg-white/60'
                      : 'w-8 h-2 bg-gray-600'
                    : isDark
                      ? 'w-2 h-2 bg-white/20 hover:bg-white/40'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}