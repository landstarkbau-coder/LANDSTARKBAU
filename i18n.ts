// i18n.ts
import { getRequestConfig } from 'next-intl/server';

export const locales = ['de', 'en'];
export const defaultLocale = 'de';

export default getRequestConfig(async ({ locale }) => {
  // Переконуємось, що locale завжди string
  const currentLocale = locale || defaultLocale;
  
  return {
    locale: currentLocale,
    messages: (await import(`./messages/${currentLocale}.json`)).default,
  };
});