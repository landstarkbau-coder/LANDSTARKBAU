// app/admin/projects/[id]/edit/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '../../../components/ImageUpload'
import GalleryUpload from '../../../components/GalleryUpload'

type Locale = 'ua' | 'de' | 'en' | 'ru'

const locales: { code: Locale; label: string }[] = [
  { code: 'ua', label: '🇺🇦 Українська (основна)' },
  { code: 'de', label: '🇩🇪 Deutsch' },
  { code: 'en', label: '🇬🇧 English' },
  { code: 'ru', label: '🇷🇺 Русский' },
]

const getSuffix = (loc: Locale) => loc.charAt(0).toUpperCase() + loc.slice(1)

export default function EditProjectPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Locale>('ua')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    nameUa: '', nameDe: '', nameEn: '', nameRu: '',
    subtitleUa: '', subtitleDe: '', subtitleEn: '', subtitleRu: '',
    locationUa: '', locationDe: '', locationEn: '', locationRu: '',
    descriptionUa: '', descriptionDe: '', descriptionEn: '', descriptionRu: '',
    categoryUa: '', categoryDe: '', categoryEn: '', categoryRu: '',
    servicesUa: '', servicesDe: '', servicesEn: '', servicesRu: '',
    materialsUa: '', materialsDe: '', materialsEn: '', materialsRu: '',
    imageUrl: '', imagePublicId: '',
    thumbnailUrl: '', thumbnailPublicId: '',
    region: '', area: '', year: '',
    gallery: [] as { url: string; publicId: string }[],
  })

  // Завантаження проєкту
  useEffect(() => {
    fetch(`/api/admin/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load')
        return res.json()
      })
      .then((data) => {
        setFormData({
          nameUa: data.nameUa || '',
          nameDe: data.nameDe || '',
          nameEn: data.nameEn || '',
          nameRu: data.nameRu || '',
          subtitleUa: data.subtitleUa || '',
          subtitleDe: data.subtitleDe || '',
          subtitleEn: data.subtitleEn || '',
          subtitleRu: data.subtitleRu || '',
          locationUa: data.locationUa || '',
          locationDe: data.locationDe || '',
          locationEn: data.locationEn || '',
          locationRu: data.locationRu || '',
          descriptionUa: data.descriptionUa || '',
          descriptionDe: data.descriptionDe || '',
          descriptionEn: data.descriptionEn || '',
          descriptionRu: data.descriptionRu || '',
          categoryUa: data.categoryUa || '',
          categoryDe: data.categoryDe || '',
          categoryEn: data.categoryEn || '',
          categoryRu: data.categoryRu || '',
          servicesUa: (data.servicesUa || []).join(', '),
          servicesDe: (data.servicesDe || []).join(', '),
          servicesEn: (data.servicesEn || []).join(', '),
          servicesRu: (data.servicesRu || []).join(', '),
          materialsUa: (data.materialsUa || []).join(', '),
          materialsDe: (data.materialsDe || []).join(', '),
          materialsEn: (data.materialsEn || []).join(', '),
          materialsRu: (data.materialsRu || []).join(', '),
          imageUrl: data.imageUrl || '',
          imagePublicId: data.imagePublicId || '',
          thumbnailUrl: data.thumbnailUrl || '',
          thumbnailPublicId: data.thumbnailPublicId || '',
          region: data.region || '',
          area: data.area || '',
          year: data.year ? String(data.year) : '',
          gallery: Array.isArray(data.gallery) ? data.gallery : [],
        })
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Не вдалося завантажити проєкт')
        setLoading(false)
      })
  }, [id])

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // --- ПЕРЕКЛАД З UA ---
  const handleTranslate = async (targetLocale: Locale) => {
    if (targetLocale === 'ua') return
    setSaving(true)
    setError('')

    try {
      const targetSuffix = getSuffix(targetLocale)
      const fieldsToTranslate = [
        { sourceKey: 'nameUa', targetKey: `name${targetSuffix}` },
        { sourceKey: 'subtitleUa', targetKey: `subtitle${targetSuffix}` },
        { sourceKey: 'locationUa', targetKey: `location${targetSuffix}` },
        { sourceKey: 'descriptionUa', targetKey: `description${targetSuffix}` },
        { sourceKey: 'categoryUa', targetKey: `category${targetSuffix}` },
        { sourceKey: 'servicesUa', targetKey: `services${targetSuffix}` },
        { sourceKey: 'materialsUa', targetKey: `materials${targetSuffix}` },
      ]

      const deeplLangMap: Record<string, string> = {
        de: 'DE',
        en: 'EN-US',
        ru: 'RU',
      }

      for (const field of fieldsToTranslate) {
        const sourceValue = (formData as any)[field.sourceKey]
        if (!sourceValue) continue

        const res = await fetch('/api/admin/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: sourceValue,
            from: 'UK',
            to: deeplLangMap[targetLocale],
          }),
        })

        if (res.ok) {
          const data = await res.json()
          handleChange(field.targetKey, data.translatedText)
        }
      }
    } catch (err: any) {
      setError('Помилка перекладу: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const payload = {
        id,
        ...formData,
        servicesUa: formData.servicesUa.split(',').map((s) => s.trim()).filter(Boolean),
        servicesDe: formData.servicesDe.split(',').map((s) => s.trim()).filter(Boolean),
        servicesEn: formData.servicesEn.split(',').map((s) => s.trim()).filter(Boolean),
        servicesRu: formData.servicesRu.split(',').map((s) => s.trim()).filter(Boolean),
        materialsUa: formData.materialsUa.split(',').map((s) => s.trim()).filter(Boolean),
        materialsDe: formData.materialsDe.split(',').map((s) => s.trim()).filter(Boolean),
        materialsEn: formData.materialsEn.split(',').map((s) => s.trim()).filter(Boolean),
        materialsRu: formData.materialsRu.split(',').map((s) => s.trim()).filter(Boolean),
      }

      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Помилка оновлення')
      }

      router.push('/admin/projects')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 rounded-full animate-spin border-line-strong border-t-ink" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="text-ink-muted hover:text-ink transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-ink">Редагувати проєкт</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Спільні поля */}
        <div className="bg-surface-card border border-line rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-ink border-b border-line pb-2">Загальні дані</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-1">Регіон</label>
              <input type="text" value={formData.region} onChange={(e) => handleChange('region', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-line bg-surface-input text-ink" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-1">Площа</label>
              <input type="text" value={formData.area} onChange={(e) => handleChange('area', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-line bg-surface-input text-ink" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-1">Рік</label>
              <input type="number" value={formData.year} onChange={(e) => handleChange('year', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-line bg-surface-input text-ink" />
            </div>
          </div>
        </div>

        {/* Фото та мініатюра */}
        <div className="bg-surface-card border border-line rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-ink border-b border-line pb-2">Фото</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-2">Головне фото</label>
              <ImageUpload
                value={formData.imageUrl}
                publicId={formData.imagePublicId}
                onChange={(url, id) => { handleChange('imageUrl', url); handleChange('imagePublicId', id) }}
                onRemove={() => { handleChange('imageUrl', ''); handleChange('imagePublicId', '') }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-2">Мініатюра</label>
              <ImageUpload
                value={formData.thumbnailUrl}
                publicId={formData.thumbnailPublicId}
                onChange={(url, id) => { handleChange('thumbnailUrl', url); handleChange('thumbnailPublicId', id) }}
                onRemove={() => { handleChange('thumbnailUrl', ''); handleChange('thumbnailPublicId', '') }}
              />
            </div>
          </div>
        </div>

        {/* Галерея */}
        <div className="bg-surface-card border border-line rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-ink border-b border-line pb-2">Галерея</h2>
          <GalleryUpload
            images={formData.gallery}
            onChange={(images) => handleChange('gallery', images)}
          />
        </div>

        {/* Вкладки для мов */}
        <div className="bg-surface-card border border-line rounded-2xl overflow-hidden">
          <div className="flex border-b border-line bg-surface-input overflow-x-auto">
            {locales.map((loc) => (
              <button
                key={loc.code}
                type="button"
                onClick={() => setActiveTab(loc.code)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === loc.code
                    ? 'border-brand text-brand bg-surface-card'
                    : 'border-transparent text-ink-muted hover:text-ink hover:bg-surface-card-hover'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-1">Назва</label>
              <input
                type="text"
                value={(formData as any)[`name${getSuffix(activeTab)}`]}
                onChange={(e) => handleChange(`name${getSuffix(activeTab)}`, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-line bg-surface-input text-ink"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-1">Підзаголовок</label>
              <input
                type="text"
                value={(formData as any)[`subtitle${getSuffix(activeTab)}`]}
                onChange={(e) => handleChange(`subtitle${getSuffix(activeTab)}`, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-line bg-surface-input text-ink"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-1">Локація</label>
              <input
                type="text"
                value={(formData as any)[`location${getSuffix(activeTab)}`]}
                onChange={(e) => handleChange(`location${getSuffix(activeTab)}`, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-line bg-surface-input text-ink"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-1">Опис</label>
              <textarea
                rows={4}
                value={(formData as any)[`description${getSuffix(activeTab)}`]}
                onChange={(e) => handleChange(`description${getSuffix(activeTab)}`, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-line bg-surface-input text-ink resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-1">Категорія</label>
              <input
                type="text"
                value={(formData as any)[`category${getSuffix(activeTab)}`]}
                onChange={(e) => handleChange(`category${getSuffix(activeTab)}`, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-line bg-surface-input text-ink"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-1">Послуги (через кому)</label>
              <input
                type="text"
                placeholder="Наприклад: Дизайн, Будівництво"
                value={(formData as any)[`services${getSuffix(activeTab)}`]}
                onChange={(e) => handleChange(`services${getSuffix(activeTab)}`, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-line bg-surface-input text-ink"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-1">Матеріали (через кому)</label>
              <input
                type="text"
                placeholder="Наприклад: Дерево, Камінь"
                value={(formData as any)[`materials${getSuffix(activeTab)}`]}
                onChange={(e) => handleChange(`materials${getSuffix(activeTab)}`, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-line bg-surface-input text-ink"
              />
            </div>

            {activeTab !== 'ua' && (
              <div className="pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={() => handleTranslate(activeTab)}
                  disabled={saving || !formData.nameUa}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand/10 text-brand hover:bg-brand/20 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Перекласти з UA
                </button>
              </div>
            )}
          </div>
        </div>

        {error && <p className="text-error text-sm bg-error/10 p-3 rounded-lg">{error}</p>}

        <div className="flex justify-end gap-4">
          <Link href="/admin/projects" className="px-6 py-2.5 rounded-full border border-line text-ink hover:bg-surface-card-hover transition-colors">
            Скасувати
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-brand text-ink-on-brand hover:bg-brand-hover transition-colors disabled:opacity-50"
          >
            {saving ? 'Збереження...' : 'Зберегти зміни'}
          </button>
        </div>
      </form>
    </div>
  )
}