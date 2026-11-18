// app/admin/components/ImageUpload.tsx
'use client'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'

interface ImageUploadProps {
  value: string | null
  publicId: string | null
  onChange: (url: string, publicId: string) => void
  onRemove: () => void
  label?: string
}

export default function ImageUpload({ value, publicId, onChange, onRemove, label = 'Завантажити фото' }: ImageUploadProps) {
  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-line group">
          <Image src={value} alt="Uploaded" fill className="object-cover" sizes="320px" />
          <button
            onClick={onRemove}
            type="button"
            className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-error rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset="ml_default" // ЗАМІНІТЬ на ваш unsigned preset
          onSuccess={(result: any) => {
            if (result.info) {
              onChange(result.info.secure_url, result.info.public_id)
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="flex flex-col items-center justify-center w-full max-w-xs aspect-video rounded-lg border-2 border-dashed border-line hover:border-brand transition-colors bg-surface-input text-ink-muted hover:text-ink"
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">{label}</span>
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  )
}