// app/components/Loader.tsx
'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function Loader() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    setIsAnimatingOut(false)

    const timer = setTimeout(() => {
      setIsAnimatingOut(true)
      setTimeout(() => setIsLoading(false), 500) // Час на анімацію зникнення
    }, 400) // Мінімальний час показу

    return () => clearTimeout(timer)
  }, [pathname])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface/95 backdrop-blur-xl transition-all duration-500 ease-in-out ${
        isAnimatingOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative flex flex-col items-center gap-10">
        
        {/* Геометрична анімація */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          
          {/* Зовнішнє статичне коло (ледь помітне) */}
          <div className="absolute inset-0 rounded-full border border-line/50" />
          
          {/* Середнє коло, що обертається */}
          <svg 
            className="absolute inset-0 w-full h-full animate-[spin_4s_linear_infinite] text-brand" 
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="60 240"
              strokeLinecap="round"
            />
          </svg>

          {/* Внутрішнє коло, що обертається в інший бік */}
          <svg 
            className="absolute inset-4 w-20 h-20 animate-[spin_3s_linear_infinite_reverse] text-ink-muted" 
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="40 200"
              strokeLinecap="round"
            />
          </svg>

          {/* Центральна точка */}
          <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
        </div>

        {/* Назва бренду з ефектом проявлення */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.4em] text-ink uppercase animate-fade-in-up">
            LANDSTARKBAU
          </h1>
          <div className="w-16 h-px bg-brand/30 animate-fade-in-up animation-delay-200" />
          <p className="text-[10px] tracking-[0.2em] text-ink-muted uppercase animate-fade-in-up animation-delay-300">
            Garden & Landscape
          </p>
        </div>

      </div>
    </div>
  )
}