// app/admin/layout.tsx
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/app/context/ThemeContext' // ← Перевірте шлях
import AdminHeader from './components/AdminHeader'
import AdminFooter from './components/AdminFooter'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-surface-2">
          <AdminHeader />
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <AdminFooter />
        </div>
      </ThemeProvider>
    </SessionProvider>
  )
}