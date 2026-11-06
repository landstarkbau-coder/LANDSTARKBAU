// app/[locale]/components/Footer.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { CookieSettingsButton } from './CookieSettingsButton'

export function Footer() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const t = useTranslations('footer')
  const locale = useLocale()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          locale,
          name: 'Newsletter Abonnent'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: data.message || t('subscribed')
        })
        setEmail('')
        setTimeout(() => {
          setStatus({ type: null, message: '' })
        }, 5000)
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Ein Fehler ist aufgetreten.'
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const navItems = [
    { name: t('navProjects'), href: `/${locale}/projects` },
    { name: t('navServices'), href: `/${locale}#services` },
    { name: t('navProcess'), href: `/${locale}/cleaning` },
    { name: t('navAbout'), href: `/${locale}#about-us` },
    { name: t('navTestimonials'), href: `/${locale}#testimonials` },
    { name: t('navFaq'), href: `/${locale}#faq` },
    { name: t('navContact'), href: `/${locale}#contact` },
  ]

  return (
    <footer className="relative border-t border-line bg-surface-2 transition-colors duration-300">

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-12 md:py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          {/* КОЛОНКА 1 - Логотип та опис */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="group inline-flex items-center justify-center gap-2">
              <div className="relative">
                <Image
                  src="/LogoFooter.png"
                  width={250}
                  height={250}
                  alt="LANDSTARKBAU Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs text-ink-muted">
              {t('description')}
            </p>

            {/* Соціальні мережі */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.facebook.com/share/1HM4GpLDBU"
                className="w-8 h-8 rounded-full border border-line-strong hover:bg-surface-card hover:border-ink flex items-center justify-center transition-all duration-300 group"
              >
                <svg
                  className="w-4 h-4 text-ink-muted group-hover:text-ink transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="mailto:landstarkbau@gmail.com"
                className="w-8 h-8 rounded-full border border-line-strong hover:bg-surface-card hover:border-ink flex items-center justify-center transition-all duration-300 group"
              >
                <svg
                  className="w-4 h-4 text-ink-muted group-hover:text-ink transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/landstarkbau.de?srtk=MTc5NW5meWw1dXAzZA=="
                className="w-8 h-8 rounded-full border border-line-strong hover:bg-surface-card hover:border-ink flex items-center justify-center transition-all duration-300 group"
              >
                <svg
                  className="w-4 h-4 text-ink-muted group-hover:text-ink transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* КОЛОНКА 2 - Навігація */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-4 text-ink">
              {t('navigation')}
            </h3>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted hover:text-ink transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* КОЛОНКА 3 - Контакти */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-4 text-ink">
              {t('contact')}
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0 text-ink-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-ink-muted">
                  {t('address')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0 text-ink-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href="tel:+491601101030"
                  className="text-sm text-ink-muted hover:text-ink transition-colors"
                >
                  {t('phone')}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0 text-ink-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:landstarkbau@gmail.com"
                  className="text-sm text-ink-muted hover:text-ink transition-colors"
                >
                  {t('email')}
                </a>
              </li>
            </ul>
          </div>

          {/* КОЛОНКА 4 - Newsletter з підпискою через API */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-4 text-ink">
              {t('newsletter')}
            </h3>
            <p className="text-sm mb-4 leading-relaxed text-ink-muted">
              {t('newsletterDesc')}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="w-full px-4 py-2.5 rounded-lg text-sm bg-surface-input border border-line text-ink placeholder:text-ink-muted focus:border-ink-2 focus:outline-none transition-all duration-300"
                  required
                  disabled={isLoading}
                />
              </div>

              {status.type && (
                <div
                  className={`p-2 rounded-lg text-xs border ${
                    status.type === 'success'
                      ? 'bg-success/20 text-success border-success/20'
                      : 'bg-error/20 text-error border-error/20'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2.5 rounded-lg text-sm tracking-wider transition-all duration-300 font-medium bg-brand/10 border border-line-strong text-ink-2 hover:bg-brand/20 hover:text-ink disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" />
                    <span>Wird gesendet...</span>
                  </div>
                ) : (
                  t('subscribe')
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Нижня лінія з копірайтом */}
        <div className="mt-12 pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs tracking-wider text-ink-muted">
            © 2026 LANDSTARKBAU. {t('copyright')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href={`/${locale}/impressum`}
              className="text-xs text-ink-muted hover:text-ink transition-colors"
            >
              {t('impressum')}
            </Link>
            <Link
              href={`/${locale}/datenschutz`}
              className="text-xs text-ink-muted hover:text-ink transition-colors"
            >
              {t('datenschutz')}
            </Link>
            <Link
              href={`/${locale}/agb`}
              className="text-xs text-ink-muted hover:text-ink transition-colors"
            >
              {t('agb')}
            </Link>

            {/* GDPR: кнопка для зміни/відкликання згоди на cookies */}
            <CookieSettingsButton />
          </div>
        </div>

      </div>

      {/* Декоративна верхня лінія */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />

    </footer>
  )
}