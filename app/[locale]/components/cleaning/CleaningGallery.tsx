// components/cleaning/CleaningGallery.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function CleaningGallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const t = useTranslations('cleaning.gallery')

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
      className="relative py-20 md:py-28 overflow-hidden bg-surface-2"
    >
      {/* Декоративний фон */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl bg-line-strong" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl bg-line-strong" />
      </div>

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

        {/* Карусель */}
        <div
          className="max-w-5xl mx-auto"
          style={{
            animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none',
            opacity: 0,
          }}
        >
          <div
            className="relative rounded-2xl overflow-hidden border border-line bg-surface-card transition-colors duration-300"
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
                {/* Бейдж поверх зображення — навмисно нейтральний (не залежить від теми) */}
                <span className="absolute top-3 left-3 text-[10px] md:text-xs tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-sm bg-black/60 text-white/80">
                  {t('before')}
                </span>
              </div>

              {/* ПІСЛЯ */}
              <div className="relative border-l border-line">
                <Image
                  src={active.after}
                  alt={`${t(active.key)} - ${t('after')}`}
                  fill
                  className="object-cover transition-all duration-700"
                  sizes="(max-width: 1024px) 50vw, 40vw"
                />
                {/* Бейдж поверх зображення — навмисно світлий (не залежить від теми) */}
                <span className="absolute top-3 left-3 text-[10px] md:text-xs tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-sm bg-white/80 text-gray-900">
                  {t('after')}
                </span>
              </div>
            </div>

            {/* Підпис під слайдом */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-line">
              <p className="text-sm md:text-base font-medium text-ink">
                {t(active.key)}
              </p>
              <span className="text-xs tracking-wider text-ink-muted">
                {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
            </div>

            {/* Стрілки (desktop) — навмисно нейтральні (поверх зображень) */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="hidden md:flex absolute top-1/2 left-3 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center backdrop-blur-sm transition-all duration-300 bg-black/40 text-white hover:bg-black/60"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="hidden md:flex absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center backdrop-blur-sm transition-all duration-300 bg-black/40 text-white hover:bg-black/60"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Мініатюри (закоментовані в оригіналі — залишено як є) */}
          {/* <div className="flex gap-2 md:gap-3 mt-6 overflow-x-auto pb-2 scrollbar-thin">
            {items.map((item, idx) => (
              <button
                key={item.key}
                onClick={() => goTo(idx)}
                className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  activeIndex === idx
                    ? 'border-ink scale-105'
                    : 'border-line opacity-50 hover:opacity-80'
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
                    ? 'w-8 h-2 bg-ink-2'
                    : 'w-2 h-2 bg-line-strong hover:bg-ink-muted'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}