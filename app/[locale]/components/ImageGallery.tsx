// app/[locale]/components/ImageGallery.tsx
'use client'

import Image from 'next/image'

interface ImageGalleryProps {
  images: string[]
  onImageClick: (index: number) => void
  altPrefix?: string
  columns?: 2 | 3
  aspect?: 'square' | 'video'
}

export function ImageGallery({
  images,
  onImageClick,
  altPrefix = 'Image',
  columns = 3,
  aspect = 'square',
}: ImageGalleryProps) {
  if (!images || images.length === 0) return null

  const gridCols =
    columns === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'

  const aspectClass = aspect === 'square' ? 'aspect-square' : 'aspect-video'

  return (
    <div className={`grid ${gridCols} gap-2 md:gap-3`}>
      {images.map((img, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onImageClick(idx)}
          className={`relative ${aspectClass} overflow-hidden rounded-lg group bg-surface-card`}
          aria-label={`${altPrefix} ${idx + 1} — відкрити`}
        >
          <Image
            src={img}
            alt={`${altPrefix} ${idx + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}