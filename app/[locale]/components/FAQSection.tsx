// app/[locale]/components/FAQSection.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useTheme } from '@/app/context/ThemeContext'

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('faq')
  const locale = useLocale()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Масив FAQ з перекладами з JSON
  const faqData = [
    {
      id: 1,
      question: t('question1'),
      answer: t('answer1')
    },
    {
      id: 2,
      question: t('question2'),
      answer: t('answer2')
    },
    {
      id: 3,
      question: t('question3'),
      answer: t('answer3')
    },
    {
      id: 4,
      question: t('question4'),
      answer: t('answer4')
    },
    {
      id: 5,
      question: t('question5'),
      answer: t('answer5')
    },
    {
      id: 6,
      question: t('question6'),
      answer: t('answer6')
    }
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

  const toggleQuestion = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id='faq' ref={sectionRef} className={`relative py-20 md:py-28 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      
      {/* Декоративний фон з підтримкою теми */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-white' : 'bg-gray-400'}`} />
        <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-white' : 'bg-gray-400'}`} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 relative z-10">
        
        {/* Заголовок секції */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
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
        
        {/* Сітка FAQ - два стовпці */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {faqData.map((item, idx) => (
            <div 
              key={item.id}
              className="group"
              style={{
                animation: isVisible ? `fadeInUp 0.5s ease-out ${idx * 0.05}s forwards` : 'none',
                opacity: 0,
              }}
            >
              <button
                onClick={() => toggleQuestion(item.id)}
                className={`w-full text-left rounded-xl border transition-all duration-300 overflow-hidden ${
                  isDark 
                    ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20' 
                    : 'bg-white/60 backdrop-blur-sm border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Заголовок питання */}
                <div className="flex justify-between items-center p-5 md:p-6">
                  <h3 className={`font-semibold text-base md:text-lg pr-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    openId === item.id ? 'rotate-180' : ''
                  } ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                    <svg className={`w-4 h-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Відповідь - з анімацією висоти */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openId === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`px-5 pb-6 pt-2 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
        
        {/* Додаткова інформація з якірним посиланням */}
        <div className="text-center mt-12">
          <p className={`text-sm mb-4 ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
            {t('moreQuestions')}
          </p>
          <Link href={`/${locale}#contact`}>
            <button className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 ${
              isDark 
                ? 'bg-white/10 border border-white/20 text-white/80 hover:bg-white/20' 
                : 'bg-gray-200 border border-gray-300 text-gray-800 hover:bg-gray-300'
            }`}>
              <span>{t('contactButton')}</span>
              <svg className={`w-4 h-4 ${isDark ? 'text-white/80' : 'text-gray-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        </div>
        
      </div>
      
    </section>
  )
}