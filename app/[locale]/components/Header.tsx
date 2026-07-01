// app/[locale]/components/Header.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useTheme } from '@/app/context/ThemeContext'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('header')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLanguage = (newLocale: string) => {
    let newPathname = pathname
    if (pathname.startsWith(`/${locale}`)) {
      newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
    } else {
      newPathname = `/${newLocale}${pathname}`
    }
    router.push(newPathname)
    setIsLanguageDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { name: t('projects'), href: `/${locale}/projects`, type: 'link' },
    { name: t('services'), href: `/${locale}#services`, type: 'anchor' },
    { name: t('ourProcess'), href: `/${locale}#our-process`, type: 'anchor' },
    { name: t('aboutUs'), href: `/${locale}#about-us`, type: 'anchor' },
    { name: t('testimonials'), href: `/${locale}#testimonials`, type: 'anchor' },
    { name: t('faq'), href: `/${locale}#faq`, type: 'anchor' },
    { name: t('contact'), href: `/${locale}#contact`, type: 'anchor' },
  ]

  const languages = [
    { code: 'de', label: 'DE', fullLabel: 'Deutsch' },
    { code: 'en', label: 'EN', fullLabel: 'English' },
    { code: 'ua', label: 'UA', fullLabel: 'Українська' },
  ]

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  const isDark = theme === 'dark'

  return (
    <>
      <header 
     className={`
  fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
  ${
    isScrolled 
      ? `${isDark ? "bg-gray-900/90" : "bg-white/90"} backdrop-blur-md shadow-lg py-3`
      : "bg-transparent py-5"
  }
`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between">
           
            <Link 
              href={`/${locale}`}
              className="group relative z-10 flex items-center"
            >
              <div className="relative w-[300px] h-[63px]">
                <Image
                  src="/logoHeader1.png"
                  alt="LandStarkBau Logo"
                  className="object-contain"
                  fill
                  priority
                />
              </div> 
            </Link>
            
            {/* Навігація */}
            <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href.includes('#') && pathname === `/${locale}`)
                
                const textColor = isDark 
                  ? (isActive ? 'text-white' : 'text-white/60 hover:text-white')
                  : (isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900')
                
                const lineColor = isDark 
                  ? (isActive ? 'bg-white' : 'bg-white/40')
                  : (isActive ? 'bg-gray-900' : 'bg-gray-400')
                
                if (item.type === 'anchor') {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`relative px-3 lg:px-4 py-2 text-sm tracking-wider transition-all duration-300 ${textColor} group`}
                    >
                      {item.name}
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 ${lineColor} rounded-full transition-all duration-300 group-hover:w-6`} />
                    </a>
                  )
                }
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-3 lg:px-4 py-2 text-sm tracking-wider transition-all duration-300 ${textColor} group`}
                  >
                    {item.name}
                    {isActive && (
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 ${isDark ? 'bg-white/60' : 'bg-gray-900'} rounded-full`} />
                    )}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 ${isDark ? 'bg-white/40' : 'bg-gray-400'} rounded-full transition-all duration-300 group-hover:w-6`} />
                  </Link>
                )
              })}
            </nav>
            
            {/* Десктопний дропдаун + перемикач теми */}
            <div className="hidden xl:flex items-center gap-3">
              {/* Перемикач теми */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg border transition-all duration-300 backdrop-blur-sm ${
                  isDark 
                    ? 'border-white/30 hover:border-white/50 text-white/80 hover:text-white bg-white/5' 
                    : 'border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 bg-white/10'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Дропдаун мови */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm transition-all duration-300 rounded-lg backdrop-blur-sm ${
                    isDark 
                      ? 'text-white/80 hover:text-white border-white/30 hover:border-white/50 bg-white/5' 
                      : 'text-gray-700 hover:text-gray-900 border-gray-300 hover:border-gray-400 bg-white/10'
                  } border`}
                >
                  <span>{currentLanguage.label}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isLanguageDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-40 rounded-xl border shadow-2xl overflow-hidden z-20 ${
                    isDark 
                      ? 'bg-gray-900/95 border-white/10' 
                      : 'bg-white border-gray-200'
                  }`}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code)}
                        className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                          locale === lang.code 
                            ? isDark ? 'text-white bg-white/5' : 'text-gray-900 bg-gray-50'
                            : isDark ? 'text-white/60 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{lang.label}</span>
                          <span className={isDark ? 'text-white/40' : 'text-gray-400'}>{lang.fullLabel}</span>
                          {locale === lang.code && (
                            <svg className="w-4 h-4 text-green-500 dark:text-green-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
              aria-label="Menu"
            >
              <span className={`w-6 h-0.5 ${isDark ? 'bg-white' : 'bg-gray-900'} transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 ${isDark ? 'bg-white' : 'bg-gray-900'} transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 ${isDark ? 'bg-white' : 'bg-gray-900'} transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
            
          </div>
        </div>
      </header>
      
      {/* МОБІЛЬНЕ МЕНЮ */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out xl:hidden ${
          isDark ? 'bg-gray-900' : 'bg-white'
        } ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
          
          <nav className="flex flex-col items-center gap-4 w-full max-w-xs pt-8">
            {/* Мобільний перемикач мови */}
            <div className="flex gap-3 w-full justify-center py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    locale === lang.code 
                      ? isDark 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : 'bg-gray-200 text-gray-900 border border-gray-300'
                      : isDark
                        ? 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {lang.fullLabel}
                </button>
              ))}
            </div>

            {/* Мобільний перемикач теми */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all border ${
                isDark 
                  ? 'bg-white/5 text-white/60 hover:text-white border-white/10' 
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900 border-gray-200'
              }`}
            >
              {isDark ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className={isDark ? 'text-white/80' : 'text-gray-700'}>Light Mode</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span className={isDark ? 'text-white/80' : 'text-gray-700'}>Dark Mode</span>
                </>
              )}
            </button>

            {/* Навігація */}
            {navItems.map((item, idx) => {
              const textColor = isDark 
                ? 'text-white/60 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
              
              if (item.type === 'anchor') {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full text-center py-3 text-base tracking-wider transition-all duration-300 ${textColor}`}
                    style={{
                      animation: isMobileMenuOpen ? `fadeInUp 0.4s ease-out ${idx * 0.05}s forwards` : 'none',
                      opacity: 0,
                    }}
                  >
                    {item.name}
                  </a>
                )
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full text-center py-3 text-base tracking-wider transition-all duration-300 ${textColor}`}
                  style={{
                    animation: isMobileMenuOpen ? `fadeInUp 0.4s ease-out ${idx * 0.05}s forwards` : 'none',
                    opacity: 0,
                  }}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
          
          {/* <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className={isDark ? 'text-white/30' : 'text-gray-400'}>
              © 2024 LANDSTARKBAU
            </p>
          </div> */}
        </div>
      </div>
      
    </>
  )
}