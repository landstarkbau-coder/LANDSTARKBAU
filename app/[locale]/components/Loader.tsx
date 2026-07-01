// app/components/Loader.tsx
'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/app/context/ThemeContext'

export function Loader() {
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleStop = () => setIsLoading(false)

    window.addEventListener('beforeunload', handleStart)
    window.addEventListener('load', handleStop)
    
    // Для навігації Next.js
    const originalPush = history.pushState
    history.pushState = function(...args) {
      setIsLoading(true)
      originalPush.apply(this, args)
      setTimeout(() => setIsLoading(false), 500)
    }

    return () => {
      window.removeEventListener('beforeunload', handleStart)
      window.removeEventListener('load', handleStop)
      history.pushState = originalPush
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ${
      isDark ? 'bg-black/70' : 'bg-white/70'
    }`}>
      <div className="relative">
        {/* Спиннер */}
        <div className={`w-16 h-16 border-4 rounded-full animate-spin ${
          isDark 
            ? 'border-white/20 border-t-white' 
            : 'border-gray-300 border-t-gray-900'
        }`} />
        {/* Декоративні кільця */}
        <div className={`absolute inset-0 w-16 h-16 border-4 rounded-full animate-ping ${
          isDark ? 'border-white/10' : 'border-gray-200'
        }`} />
        <div className={`absolute -inset-4 w-24 h-24 border rounded-full animate-pulse ${
          isDark ? 'border-white/20' : 'border-gray-300'
        }`} />
      </div>
    </div>
  )
}