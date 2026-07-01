// app/[locale]/components/TestimonialsSection.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/app/context/ThemeContext'

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('testimonials')
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Масив відгуків з ПОВНИМИ перекладами
  const testimonials = [
    {
      id: 1,
      name: 'Maria Schmidt',
      location: 'München',
      project: t('project1'),
      text: t('text1'),
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      date: 'März 2024',
    },
    {
      id: 2,
      name: 'Thomas Weber',
      location: 'Stuttgart',
      project: t('project2'),
      text: t('text2'),
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      date: 'Januar 2024',
    },
    {
      id: 3,
      name: 'Claudia Hoffmann',
      location: 'Berlin',
      project: t('project3'),
      text: t('text3'),
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      date: 'November 2023',
    },
    {
      id: 4,
      name: 'Dr. Andreas Fischer',
      location: 'Hamburg',
      project: t('project4'),
      text: t('text4'),
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      date: 'September 2023',
    },
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Автоматичне перемикання відгуків
  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isVisible])

  const activeTestimonial = testimonials[activeIndex]

  return (
    <section id="testimonials" ref={sectionRef} className={`relative py-20 md:py-28 overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
        : 'bg-gradient-to-b from-gray-100 to-gray-200'
    }`}>
      
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${
          isDark ? 'bg-white' : 'bg-gray-400'
        }`} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        
        {/* Заголовок секції */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className={`text-sm tracking-[0.3em] uppercase mb-3 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
            {t('subtitle')}
          </p>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('title')}
          </h2>
          <div className={`w-16 h-px ${isDark ? 'bg-white/20' : 'bg-gray-300'} mx-auto`} />
          <p className={`text-base md:text-lg mt-6 ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
            {t('description')}
          </p>
        </div>
        
        {/* Головний відгук */}
        <div className="max-w-4xl mx-auto">
          <div 
            className={`backdrop-blur-sm rounded-2xl p-8 md:p-10 border transition-colors ${
              isDark 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white/60 border-gray-200'
            }`}
            style={{
              animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none',
              opacity: 0,
            }}
          >
            {/* Зірки */}
            <div className="flex gap-1 mb-6">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-500/70 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            {/* Текст відгуку */}
            <p className={`text-lg md:text-xl leading-relaxed italic mb-8 ${
              isDark ? 'text-white/80' : 'text-gray-700'
            }`}>
              "{activeTestimonial.text}"
            </p>
            
            {/* Інформація про клієнта */}
            <div className={`flex items-center justify-between flex-wrap gap-4 pt-4 border-t ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={activeTestimonial.imageUrl}
                    alt={activeTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {activeTestimonial.name}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                    {activeTestimonial.location}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
                  {activeTestimonial.project}
                </p>
                <p className={`text-xs ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                  {activeTestimonial.date}
                </p>
              </div>
            </div>
          </div>
          
          {/* Навігація */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx 
                    ? isDark ? 'w-8 h-2 bg-white/60' : 'w-8 h-2 bg-gray-600'
                    : isDark ? 'w-2 h-2 bg-white/20 hover:bg-white/40' : 'w-2 h-2 bg-gray-300 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
        
      </div>
      
    </section>
  )
}