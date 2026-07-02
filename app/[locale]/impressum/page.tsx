// app/[locale]/impressum/page.tsx
'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import { useTheme } from '@/app/context/ThemeContext'

export default function ImpressumPage() {
  const locale = useLocale()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const content = {
    de: {
      title: 'Impressum',
      subtitle: 'Angaben gemäß § 5 TMG',
      company: 'LANDSTARKBAU',
      address: 'Generaloberst-Beck-Straße 14, 55129 Mainz Deutschland',
      phone: '(+49) 016 110 10 30',
      email: 'landstarkbau@gmail.com',
    //   taxId: 'Steuernummer: 123/456/78901',
    //   vatId: 'USt-IdNr.: DE123456789',
    //   register: 'Handelsregister: Amtsgericht München, HRB 123456',
      ceo: 'Geschäftsführer: Viacheslav Chaikovskyi',
      disclaimer: 'Haftungsausschluss',
      disclaimerText: 'Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',
      copyright: 'Urheberrecht',
      copyrightText: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
      back: 'Zurück zur Startseite'
    },
    en: {
      title: 'Imprint',
      subtitle: 'Information according to § 5 TMG',
      company: 'LANDSTARKBAU',
      address: 'Generaloberst-Beck-Straße 14, 55129 Mainz Deutschland',
      phone: '(+49) 016 110 10 30',
      email: 'landstarkbau@gmail.com',
    //   taxId: 'Tax number: 123/456/78901',
    //   vatId: 'VAT ID: DE123456789',
    //   register: 'Commercial register: Munich District Court, HRB 123456',
      ceo: 'Managing Director: Viacheslav Chaikovskyi',
      disclaimer: 'Disclaimer',
      disclaimerText: 'The contents of this website have been created with the greatest possible care. However, we cannot guarantee the accuracy, completeness and timeliness of the content.',
      copyright: 'Copyright',
      copyrightText: 'The content and works on these pages created by the site operators are subject to German copyright law. Duplication, processing, distribution and any form of exploitation outside the limits of copyright require the written consent of the respective author or creator.',
      back: 'Back to home'
    },
    ua: {
      title: 'Імпресум',
      subtitle: 'Інформація згідно з § 5 TMG',
      company: 'LANDSTARKBAU',
      address: 'Generaloberst-Beck-Straße 14, 55129 Mainz Deutschland',
      phone: '(+49) 016 110 10 30',
      email: 'landstarkbau@gmail.com',
    //   taxId: 'Податковий номер: 123/456/78901',
    //   vatId: 'ПДВ-ідент.: DE123456789',
    //   register: 'Торговий реєстр: Окружний суд Мюнхена, HRB 123456',
      ceo: 'Керуючий директор: Viacheslav Chaikovskyi ',
      disclaimer: 'Відмова від відповідальності',
      disclaimerText: 'Зміст цього веб-сайту створено з максимальною ретельністю. Однак ми не можемо гарантувати точність, повноту та актуальність інформації.',
      copyright: 'Авторське право',
      copyrightText: 'Контент та роботи на цих сторінках, створені операторами сайту, підлягають дії німецького законодавства про авторське право. Копіювання, обробка, розповсюдження та будь-яка форма використання за межами авторського права вимагають письмової згоди відповідного автора або творця.',
      back: 'На головну'
    }
  }

  const t = content[locale as keyof typeof content] || content.de

  return (
    <main className={`min-h-screen pt-32 pb-20 ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-gray-50 to-gray-100'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        
        <div className="mb-8">
          <Link href={`/${locale}`} className={`text-sm transition-colors ${isDark ? 'text-white/40 hover:text-white/70' : 'text-gray-500 hover:text-gray-800'}`}>
            Startseite
          </Link>
          <span className={`mx-2 ${isDark ? 'text-white/20' : 'text-gray-300'}`}>/</span>
          <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-700'}`}>{t.title}</span>
        </div>

        <div className="mb-10">
          <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.title}</h1>
          <p className={`text-lg ${isDark ? 'text-white/50' : 'text-gray-600'}`}>{t.subtitle}</p>
          <div className={`w-16 h-px ${isDark ? 'bg-white/20' : 'bg-gray-300'} mt-4`} />
        </div>

        <div className={`max-w-4xl backdrop-blur-sm rounded-2xl p-8 md:p-10 border ${
          isDark 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white/60 border-gray-200'
        }`}>
          <div className="space-y-6">
            
            <div>
              <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.company}</h2>
              <p className={`${isDark ? 'text-white/70' : 'text-gray-700'}`}>{t.address}</p>
              <p className={`${isDark ? 'text-white/70' : 'text-gray-700'}`}>{t.phone}</p>
              <p className={`${isDark ? 'text-white/70' : 'text-gray-700'}`}>{t.email}</p>
            </div>

            <div className={`pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* <div>
                  <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t.taxId}</p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t.vatId}</p>
                </div> */}
                {/* <div className="md:col-span-2">
                  <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t.register}</p>
                </div> */}
                <div className="md:col-span-2">
                  <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t.ceo}</p>
                </div>
              </div>
            </div>

            <div className={`pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.disclaimer}</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{t.disclaimerText}</p>
            </div>

            <div className={`pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.copyright}</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{t.copyrightText}</p>
            </div>

          </div>
        </div>

        <div className="mt-8">
          <Link href={`/${locale}`} className={`transition-colors flex items-center gap-2 ${isDark ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t.back}
          </Link>
        </div>

      </div>
    </main>
  )
}