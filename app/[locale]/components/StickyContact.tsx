// app/components/StickyContact.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/app/context/ThemeContext'

export function StickyContact() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const footerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Знаходимо футер на сторінці
    const findFooter = () => {
      // Шукаємо футер за різними селекторами
      const footerSelectors = [
        'footer',
        '[data-footer]',
        '.footer',
        '#footer',
        'main + footer',
        'div:last-child > footer'
      ]
      
      for (const selector of footerSelectors) {
        const element = document.querySelector(selector) as HTMLElement
        if (element) {
          footerRef.current = element
          return element
        }
      }
      
      // Якщо футер не знайдено, шукаємо останній елемент перед кінцем сторінки
      const allElements = document.querySelectorAll('body > *')
      if (allElements.length > 0) {
        const lastElement = allElements[allElements.length - 1] as HTMLElement
        // Перевіряємо, чи це схоже на футер
        if (lastElement.tagName.toLowerCase() !== 'header') {
          footerRef.current = lastElement
          return lastElement
        }
      }
      
      return null
    }

    const handleScroll = () => {
      const footer = footerRef.current || findFooter()
      
      if (!footer) {
        // Якщо футер не знайдено, використовуємо стару логіку
        setIsVisible(window.scrollY > 300)
        return
      }

      const footerRect = footer.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Обчислюємо відстань до футера
      const distanceToFooter = footerRect.top - windowHeight + 100 // 100px - відступ для плавного зникнення
      
      // Кнопка видима, якщо:
      // 1. Прогорнули більше 300px
      // 2. Футер ще не досягнуто (або видима частина менше 100px)
      const shouldBeVisible = window.scrollY > 300 && distanceToFooter > 0
      
      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible)
        if (!shouldBeVisible) {
          setIsOpen(false) // Закриваємо меню при зникненні
        }
      }
    }

    // Знаходимо футер при монтуванні
    setTimeout(findFooter, 100) // Невелика затримка для завантаження DOM

    // Додаємо обробник з passive: true для кращої продуктивності
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Додаємо обробник для ресайзу (може змінити позицію футера)
    window.addEventListener('resize', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isVisible])

  // Додатковий ефект для відстеження змін у DOM (якщо футер додається динамічно)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const footer = document.querySelector('footer, [data-footer], .footer, #footer')
      if (footer) {
        footerRef.current = footer as HTMLElement
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => observer.disconnect()
  }, [])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const contactMethods = [
    {
      id: 'phone',
      name: 'Phone',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      href: 'tel:+491601101030',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'viber',
      name: 'Viber',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.153 2.078c-3.95-.087-7.185 1.643-8.521 4.854C2.216 9.982 2.49 13.7 4.23 16.84c.18.32.37.63.58.93l-1.13 3.867 4.08-1.537c.42.27.85.51 1.29.72 1.45.69 3.02.97 4.64.92 3.89-.12 7.12-1.99 8.43-5.16 1.3-3.17.68-6.67-1.4-9.25-1.6-1.99-3.97-3.26-6.75-3.28h-.01zm.01 2.47c2.17.02 4.25 1.07 5.57 2.97 1.58 2.28 1.98 5.56.97 8.22-.81 2.13-2.92 3.79-5.45 4.18-2.25.35-4.56.04-6.57-.86-.21-.1-.42-.2-.62-.31l-2.84 1.07.8-2.73c-.25-.42-.48-.86-.68-1.31-1.61-3.61-.98-7.32 1.33-9.78 1.35-1.44 3.32-2.41 5.69-2.45h-.2z"/>
        </svg>
      ),
      href: 'viber://chat?number=+491601101030',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      href: 'https://t.me/landstarkbau',
      color: 'bg-sky-500 hover:bg-sky-600',
    },
  ]

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Контейнер для іконок */}
      <div className={`flex flex-col items-end gap-3 mb-3 transition-all duration-300 ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
      }`}>
        {contactMethods.map((method, idx) => (
          <a
            key={method.id}
            href={method.href}
            target={method.id !== 'phone' ? '_blank' : undefined}
            rel={method.id !== 'phone' ? 'noopener noreferrer' : undefined}
            className={`
              flex items-center gap-3 px-4 py-2.5 rounded-full shadow-lg
              text-white text-sm font-medium transition-all duration-300
              ${method.color}
              animate-slide-in-right
              ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
            `}
            style={{
              animationDelay: `${idx * 50}ms`,
            }}
          >
            {method.icon}
            <span>{method.name}</span>
          </a>
        ))}
      </div>

      {/* Головна кнопка - ТЕЛЕФОН */}
      <button
        onClick={toggleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center
          transition-all duration-500
          ${isOpen 
            ? 'bg-red-600 hover:bg-red-700 rotate-90' 
            : 'bg-[#111827] hover:bg-[#1a2332]'
          }
          ${isHovered ? 'scale-110' : 'scale-100'}
        `}
        aria-label="Contact"
      >
        {/* Іконка телефону */}
        <div className="relative w-7 h-7">
          {/* Іконка відкриття (телефон) */}
          <span className={`
            absolute inset-0 flex items-center justify-center transition-all duration-500
            ${isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
          `}>
            <svg className="w-7 h-7 text-[#D4A853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </span>
          
          {/* Іконка закриття (хрестик) */}
          <span className={`
            absolute inset-0 flex items-center justify-center transition-all duration-500
            ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
          `}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>

        {/* Пульсуюча анімація з золотим кольором */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent animate-pulse-ring" style={{
          borderColor: 'rgba(212, 168, 83, 0.3)'
        }} />
        
        {/* Декоративне кільце при ховері */}
        <div className={`absolute -inset-2 rounded-full border-2 transition-all duration-500 ${
          isHovered 
            ? 'border-[#D4A853]/40 scale-100 opacity-100' 
            : 'border-[#D4A853]/0 scale-75 opacity-0'
        }`} />
      </button>
    </div>
  )
}