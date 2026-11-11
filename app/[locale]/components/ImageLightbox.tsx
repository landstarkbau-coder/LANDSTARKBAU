// app/[locale]/components/ImageLightbox.tsx
'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

interface ImageLightboxProps {
  images: string[]
  /** Індекс відкритого зображення (або null, якщо закрито) */
  openIndex: number | null
  onClose: () => void
  altPrefix?: string
}

export function ImageLightbox({
  images,
  openIndex,
  onClose,
  altPrefix = 'Image',
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  // SSR-сумісність: рендеримо портал тільки на клієнті
  useEffect(() => {
    setMounted(true)
  }, [])

  // Синхронізація зовнішнього openIndex
  useEffect(() => {
    if (openIndex !== null) {
      setCurrentIndex(openIndex)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [openIndex])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Keyboard + Escape
  useEffect(() => {
    if (openIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openIndex, onClose])

  if (!mounted || openIndex === null || images.length === 0) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center z-20"
        aria-label="Закрити"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center z-20"
            aria-label="Попереднє"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center z-20"
            aria-label="Наступне"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      <div
        className="relative w-full max-w-6xl h-[80vh] mx-0 md:mx-12"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`${altPrefix} ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
        />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white/80 text-sm z-20">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>,
    document.body
  )
}