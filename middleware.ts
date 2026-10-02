// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,   // ← ОСЬ ЦЕ ДОДАЙ
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};