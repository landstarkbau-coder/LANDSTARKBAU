// app/admin/projects/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
  id: string
  number: number
  nameDe: string
  locationDe: string
  year: number | null
  thumbnailUrl: string
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized or error')
        return res.json()
      })
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  // --- ЛОГІКА ВИДАЛЕННЯ ---
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Ви впевнені, що хочете видалити проєкт "${name}"? Цю дію неможливо скасувати, а всі фотографії будуть видалені з Cloudinary.`)) {
      return
    }

    setDeletingId(id)

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Помилка видалення')
      }

      // Оновлюємо локальний стан, видаляючи проєкт
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err: any) {
      alert(err.message)
    } finally {
      setDeletingId(null)
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink">Проєкти</h1>
          <p className="text-sm text-ink-muted mt-1">Керуйте портфоліо ваших робіт</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand text-ink-on-brand hover:bg-brand-hover transition-all duration-300 shadow-lg shadow-brand/20 hover:shadow-brand/40 text-sm font-medium w-full sm:w-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Створити проєкт
        </Link>
      </div>

      {/* Desktop Table (Hidden on Mobile) */}
      <div className="hidden md:block bg-surface-card border border-line rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="border-b border-line bg-surface-input">
            <tr>
              <th className="p-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">#</th>
              <th className="p-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Фото</th>
              <th className="p-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Назва (DE)</th>
              <th className="p-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Локація (DE)</th>
              <th className="p-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Рік</th>
              <th className="p-4 text-xs font-semibold text-ink-muted uppercase tracking-wider text-right">Дії</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-surface-card-hover transition-colors group">
                <td className="p-4 text-sm text-ink-2 font-mono">{project.number}</td>
                <td className="p-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-surface-2 ring-1 ring-line group-hover:ring-brand/30 transition-all">
                    {project.thumbnailUrl && (
                      <Image src={project.thumbnailUrl} alt={project.nameDe} fill className="object-cover" sizes="56px" />
                    )}
                  </div>
                </td>
                <td className="p-4 text-sm font-medium text-ink">{project.nameDe}</td>
                <td className="p-4 text-sm text-ink-2">{project.locationDe}</td>
                <td className="p-4 text-sm text-ink-2">{project.year || '—'}</td>
                <td className="p-4 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-hover transition-colors mr-4"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Редагувати
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id, project.nameDe)}
                    disabled={deletingId === project.id}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-error hover:text-error/80 transition-colors disabled:opacity-50"
                  >
                    {deletingId === project.id ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                    {deletingId === project.id ? 'Видалення...' : 'Видалити'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-2 flex items-center justify-center">
              <svg className="w-8 h-8 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-ink-2 font-medium">Проєктів ще немає</p>
            <p className="text-sm text-ink-muted mt-1">Створіть свій перший проєкт, щоб він з'явився тут</p>
          </div>
        )}
      </div>

      {/* Mobile Cards (Hidden on Desktop) */}
      <div className="md:hidden space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-surface-card border border-line rounded-2xl p-4 shadow-sm">
            <div className="flex gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-surface-2 shrink-0 ring-1 ring-line">
                {project.thumbnailUrl && (
                  <Image src={project.thumbnailUrl} alt={project.nameDe} fill className="object-cover" sizes="80px" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-ink truncate">{project.nameDe}</h3>
                  <span className="text-xs font-mono text-ink-muted shrink-0">#{project.number}</span>
                </div>
                <p className="text-sm text-ink-2 truncate mt-0.5">{project.locationDe}</p>
                {project.year && <p className="text-sm text-ink-muted mt-1">{project.year}</p>}
              </div>
            </div>
            <div className="flex gap-3 mt-4 pt-4 border-t border-line">
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium bg-brand/10 text-brand hover:bg-brand/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Редагувати
              </Link>
              <button
                onClick={() => handleDelete(project.id, project.nameDe)}
                disabled={deletingId === project.id}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium bg-error/10 text-error hover:bg-error/20 transition-colors disabled:opacity-50"
              >
                {deletingId === project.id ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
                {deletingId === project.id ? 'Видалення...' : 'Видалити'}
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="bg-surface-card border border-line rounded-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-2 flex items-center justify-center">
              <svg className="w-8 h-8 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-ink-2 font-medium">Проєктів ще немає</p>
            <p className="text-sm text-ink-muted mt-1 mb-4">Створіть свій перший проєкт</p>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-ink-on-brand text-sm font-medium"
            >
              + Створити проєкт
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}