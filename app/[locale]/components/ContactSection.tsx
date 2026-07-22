// app/[locale]/components/ContactSection.tsx
'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/app/context/ThemeContext'
import { useLocale } from 'next-intl'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const t = useTranslations('contact')
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const locale = useLocale()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale: locale,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: data.message || t('successMessage')
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'An error occurred. Please try again.'
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'An error occurred. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className={`relative py-20 md:py-28 overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
        : 'bg-gradient-to-b from-gray-100 to-gray-200'
    }`}>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Ліва колонка */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <p className={`text-sm tracking-[0.3em] uppercase mb-3 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                {t('subtitle')}
              </p>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('title')}
              </h2>
              <div className={`w-16 h-px ${isDark ? 'bg-white/20' : 'bg-gray-300'} mt-4`} />
            </div>
            
            <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
              {t('description')}
            </p>
            
            {/* Контактна інформація */}
            <div className="space-y-4 pt-4">
              {/* Адреса */}
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-200'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-white/40' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t('visit')}</p>
                  <p className={isDark ? 'text-white' : 'text-gray-900'}>{t('address')}</p>
                </div>
              </div>
              
              {/* Телефон */}
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-200'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-white/40' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t('call')}</p>
                  <a href="tel:+49161101030" className={`${isDark ? 'text-white hover:text-white/80' : 'text-gray-900 hover:text-gray-700'} transition-colors duration-300`}>
                    {t('phone')}
                  </a>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-200'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-white/40' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t('email')}</p>
                  <a href="mailto:landstarkbau@gmail.com" className={`${isDark ? 'text-white hover:text-white/80' : 'text-gray-900 hover:text-gray-700'} transition-colors duration-300`}>
                    {t('emailAddress')}
                  </a>
                </div>
              </div>
              
              {/* Instagram */}
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-200'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-white/40' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Instagram</p>
                  <a 
                    href={t('instagramLink')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${isDark ? 'text-white hover:text-white/80' : 'text-gray-900 hover:text-gray-700'} transition-colors duration-300`}
                  >
                    @landstarkbau_
                  </a>
                </div>
              </div>
              
              {/* Facebook */}
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-200'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-white/40' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Facebook</p>
                  <a 
                    href={t('facebookLink')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${isDark ? 'text-white hover:text-white/80' : 'text-gray-900 hover:text-gray-700'} transition-colors duration-300`}
                  >
                    landstarkbau
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Права колонка - форма */}
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className={`backdrop-blur-sm rounded-2xl p-6 md:p-8 border space-y-5 ${
              isDark 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white/60 border-gray-200'
            }`}>
              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{t('name')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg transition-colors duration-300 focus:outline-none ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/30' 
                      : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500'
                  }`}
                  placeholder={t('namePlaceholder')}
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{t('emailField')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg transition-colors duration-300 focus:outline-none ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/30' 
                      : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500'
                  }`}
                  placeholder={t('emailPlaceholder')}
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{t('message')}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg transition-colors duration-300 focus:outline-none resize-none ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/30' 
                      : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500'
                  }`}
                  placeholder={t('messagePlaceholder')}
                  required
                />
              </div>
              
              {status.type && (
                <div className={`p-3 rounded-lg text-sm ${
                  status.type === 'success' 
                    ? 'bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/20' 
                    : 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20'
                }`}>
                  {status.message}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-full text-sm tracking-wider transition-all duration-300 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                } ${
                  isDark 
                    ? 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black' 
                    : 'bg-gray-200 border border-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-900'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  t('sendButton')
                )}
              </button>
            </form>
          </div>
          
        </div>
      </div>
      
    </section>
  )
}