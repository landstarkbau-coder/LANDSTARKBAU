// app/admin/login/page.tsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError('Невірний email або пароль')
      } else {
        router.push('/admin/projects')
        router.refresh()
      }
    } catch (err) {
      setError('Сталася помилка. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-2">
      <div className="w-full max-w-md p-8 rounded-2xl border border-line bg-surface-card shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2 text-ink">Admin Panel</h1>
        <p className="text-center text-ink-muted mb-8">Увійдіть, щоб керувати проєктами</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-2 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-line bg-surface-input text-ink focus:outline-none focus:ring-2 focus:ring-brand/20"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-2 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-line bg-surface-input text-ink focus:outline-none focus:ring-2 focus:ring-brand/20"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-error">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-full bg-brand text-ink-on-brand font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
          >
            {loading ? 'Вхід...' : 'Увійти'}
          </button>
        </form>
      </div>
    </div>
  )
}