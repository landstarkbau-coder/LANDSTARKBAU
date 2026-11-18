// app/admin/components/AdminHeader.tsx
'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/app/[locale]/components/ThemeToggle' // ← Імпорт

export default function AdminHeader() {
  const pathname = usePathname()
  
  // Приховуємо хедер на сторінці логіну
  if (pathname === '/admin/login') return null

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface-overlay/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/projects" className="text-xl font-bold text-ink">
            ⚙️ Admin Panel
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link 
              href="/admin/projects" 
              className={`text-sm font-medium transition-colors ${pathname.startsWith('/admin/projects') ? 'text-brand' : 'text-ink-muted hover:text-ink'}`}
            >
              Проєкти
            </Link>
          </nav>
        </div>
        
        {/* Права частина: Тема + Вийти */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="text-sm px-4 py-2 rounded-full border border-line hover:bg-surface-card-hover transition-colors text-ink"
          >
            Вийти
          </button>
        </div>
      </div>
    </header>
  )
}