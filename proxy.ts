// proxy.ts
import NextAuth from 'next-auth'
import authConfig from './auth.config'
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/request'
import { NextRequest, NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
})

export default async function proxy(req: NextRequest) {
  const { nextUrl } = req
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')
  const isLoginPage = nextUrl.pathname === '/admin/login'

  // 1. Перевірка авторизації для /admin/*
  if (isAdminRoute) {
    if (isLoginPage) {
      return NextResponse.next() // сторінка логіну доступна всім
    }

    const session = await auth()
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    return NextResponse.next() // авторизований — пропускаємо
  }

  // 2. Локалізація для публічного сайту
  return intlMiddleware(req)
}

export const config = {
  // НЕ виключаємо admin з matcher'а!
  matcher: ['/((?!api|_next/static|_next/image|_next/data|.*\\..*).*)'],
}