// app/admin/components/GalleryUpload.tsx
'use client'

import { useState, useEffect } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'

interface GalleryImage {
  url: string
  publicId: string
}

interface GalleryUploadProps {
  images: GalleryImage[]
  onChange: (images: GalleryImage[]) => void
}

export default function GalleryUpload({ images, onChange }: GalleryUploadProps) {
  const [localImages, setLocalImages] = useState<GalleryImage[]>(images)

  // Синхронізація з батьком
  useEffect(() => {
    onChange(localImages)
  }, [localImages])

  const handleRemove = (index: number) => {
    setLocalImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {localImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {localImages.map((img, idx) => (
            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-line group bg-surface-2">
              <Image src={img.url} alt={`Gallery ${idx + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-error rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <CldUploadWidget
        uploadPreset="ml_default" // ЗАМІНІТЬ на ваш unsigned preset
        options={{ multiple: true, maxFiles: 10 }}
        onSuccess={(result: any) => {
          if (result.info) {
            setLocalImages((prev) => [...prev, { url: result.info.secure_url, publicId: result.info.public_id }])
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-lg border-2 border-dashed border-line hover:border-brand transition-colors bg-surface-input text-ink-muted hover:text-ink"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-medium">Додати фото до галереї</span>
          </button>
        )}
      </CldUploadWidget>
    </div>
  )
}