// app/[locale]/components/ServicesSection.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/app/context/ThemeContext'

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('services')
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // ВСІ послуги з JSON (16 сервісів)
  const allServices = [
    {
      id: '1',
      title: t('pflasterarbeiten'),
      description: t('pflasterarbeitenDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h16v4H4v-4z" />
        </svg>
      ),
    },
    {
      id: '2',
      title: t('randsteine'),
      description: t('randsteineDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 20h16M4 4h16M4 8h16M4 12h16M4 16h16" />
        </svg>
      ),
    },
    {
      id: '3',
      title: t('gelandeplanung'),
      description: t('gelandeplanungDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: '4',
      title: t('grundstucksreinigung'),
      description: t('grundstucksreinigungDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
    },
    {
      id: '5',
      title: t('entwasserung'),
      description: t('entwasserungDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 14.899A7 7 0 119 21h-5a2 2 0 01-2-2v-4.101zM12 3l1 1-1 1-1-1 1-1zM15 6l1 1-1 1-1-1 1-1zM18 9l1 1-1 1-1-1 1-1z" />
        </svg>
      ),
    },
    {
      id: '6',
      title: t('terrassenbau'),
      description: t('terrassenbauDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1M5 21v-4M19 21v-4" />
        </svg>
      ),
    },
    {
      id: '7',
      title: t('zaunbau'),
      description: t('zaunbauDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        </svg>
      ),
    },
    {
      id: '8',
      title: t('rollrasen'),
      description: t('rollrasenDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 4h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zM5 14h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 011-1zM3 9h18M3 19h18" />
        </svg>
      ),
    },
    {
      id: '9',
      title: t('hochdruckreinigung'),
      description: t('hochdruckreinigungDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4M12 4v16M8 8l4-4 4 4M8 16l4 4 4-4" />
        </svg>
      ),
    },
    {
      id: '10',
      title: t('gehölzschnitt'),
      description: t('gehölzschnittDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
    },
    {
      id: '11',
      title: t('materiallieferung'),
      description: t('materiallieferungDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
    },
    {
      id: '12',
      title: t('geratevermietung'),
      description: t('geratevermietungDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: '13',
      title: t('3d_visualisierung'),
      description: t('3d_visualisierungDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      id: '14',
      title: t('entsorgung'),
      description: t('entsorgungDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 7V4h16v3M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M8 12h8" />
        </svg>
      ),
    },
    {
      id: '15',
      title: t('aussenbeleuchtung'),
      description: t('aussenbeleuchtungDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: '16',
      title: t('gartenmobel'),
      description: t('gartenmobelDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 20h16M4 4h16M4 8h16M4 12h16M4 16h16M12 4v16M8 4v16M16 4v16" />
        </svg>
      ),
    },
  ]

  // Перші 6 для початкового показу
  const initialServices = allServices.slice(0, 6)
  const hiddenServices = allServices.slice(6)

  return (
    <section id='services' ref={sectionRef} className={`relative py-16 md:py-24 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      
      {/* Декоративний фон з підтримкою теми */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-gray-900 via-gray-800 to-gray-900' : 'from-gray-100 via-white to-gray-50'}`} />
      </div>
      
      {/* Анімовані геометричні фігури з підтримкою теми */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -left-40 w-80 h-80 ${isDark ? 'bg-white/5' : 'bg-gray-300/20'} rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute -bottom-40 -right-40 w-96 h-96 ${isDark ? 'bg-white/5' : 'bg-gray-300/20'} rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute top-1/3 right-1/4 w-32 h-32 ${isDark ? 'bg-white/3' : 'bg-gray-300/10'} rounded-full blur-2xl`} />
        <div className={`absolute bottom-1/4 left-1/3 w-40 h-40 ${isDark ? 'bg-white/3' : 'bg-gray-300/10'} rounded-full blur-2xl`} />
        
        <svg className="absolute bottom-0 left-0 w-full opacity-5" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill={isDark ? '#ffffff' : '#000000'} fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,176C672,171,768,181,864,197.3C960,213,1056,235,1152,234.7C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
        </svg>
      </div>
      
      {/* Тонка сітка з підтримкою теми */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${isDark ? '%23ffffff' : '%23000000'}' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
      
      <div className="relative container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 z-10">
        
        {/* Заголовок секції */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className={`text-sm tracking-[0.3em] uppercase mb-3 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
            {t('subtitle')}
          </p>
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('title')}
          </h2>
          <div className={`w-12 h-px bg-gradient-to-r from-transparent ${isDark ? 'via-white/30' : 'via-gray-400'} to-transparent mx-auto mt-4`} />
        </div>
        
        {/* Сітка послуг */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialServices.map((service, idx) => (
            <div 
              key={service.id}
              className={`group relative rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 border ${
                isDark 
                  ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-white/30' 
                  : 'bg-white/60 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-gray-300'
              }`}
              style={{
                animation: isVisible ? `fadeInUp 0.5s ease-out ${idx * 0.1}s forwards` : 'none',
                opacity: 0,
              }}
            >
              <div className={`transition-all duration-500 mb-4 flex justify-center ${
                isDark 
                  ? 'text-white/30 group-hover:text-white/60' 
                  : 'text-gray-400 group-hover:text-gray-600'
              }`}>
                {service.icon}
              </div>
              <h3 className={`font-semibold text-lg mb-2 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {service.title}
              </h3>
              <p className={`text-sm leading-relaxed text-center transition-colors ${
                isDark 
                  ? 'text-white/40 group-hover:text-white/50' 
                  : 'text-gray-500 group-hover:text-gray-600'
              }`}>
                {service.description}
              </p>
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-500 group-hover:w-12 rounded-full ${
                isDark ? 'bg-white/40' : 'bg-gray-400'
              }`} />
            </div>
          ))}
        </div>

        {/* Акардеон з прихованими послугами */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 transition-all duration-500 overflow-hidden ${
            isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          {hiddenServices.map((service, idx) => (
            <div 
              key={service.id}
              className={`group relative rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 border ${
                isDark 
                  ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-white/30' 
                  : 'bg-white/60 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-gray-300'
              }`}
              style={{
                animation: isVisible && isExpanded ? `fadeInUp 0.5s ease-out ${idx * 0.05}s forwards` : 'none',
                opacity: 0,
              }}
            >
              <div className={`transition-all duration-500 mb-4 flex justify-center ${
                isDark 
                  ? 'text-white/30 group-hover:text-white/60' 
                  : 'text-gray-400 group-hover:text-gray-600'
              }`}>
                {service.icon}
              </div>
              <h3 className={`font-semibold text-lg mb-2 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {service.title}
              </h3>
              <p className={`text-sm leading-relaxed text-center transition-colors ${
                isDark 
                  ? 'text-white/40 group-hover:text-white/50' 
                  : 'text-gray-500 group-hover:text-gray-600'
              }`}>
                {service.description}
              </p>
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-500 group-hover:w-12 rounded-full ${
                isDark ? 'bg-white/40' : 'bg-gray-400'
              }`} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`group transition-colors inline-flex items-center gap-2 text-sm ${
              isDark 
                ? 'text-white/40 hover:text-white' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <span>{isExpanded ? 'SHOW LESS' : t('allServices')}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:translate-x-1'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? 'M5 15l7-7 7 7' : 'M17 8l4 4m0 0l-4 4m4-4H3'} />
            </svg>
          </button>
        </div>
        
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
    </section>
  )
}