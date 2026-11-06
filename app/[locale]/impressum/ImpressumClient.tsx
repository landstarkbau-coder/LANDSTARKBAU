// app/[locale]/impressum/ImpressumClient.tsx
'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'

export default function ImpressumClient() {
  const locale = useLocale()

  const content = {
    de: {
      title: 'Impressum',
      subtitle: 'Angaben gemäß § 5 TMG',
      company: 'LANDSTARKBAU',
      address: "Kölnstraße 502, 53117 Bonn",
      phone: '(+49) 160 110 10 30',
      email: 'landstarkbau@gmail.com',
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
      address: "Kölnstraße 502, 53117 Bonn",
      phone: '(+49) 160 110 10 30',
      email: 'landstarkbau@gmail.com',
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
      address: "Kölnstraße 502, 53117 Bonn",
      phone: '(+49) 160 110 10 30',
      email: 'landstarkbau@gmail.com',
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
    <main className="min-h-screen pt-32 pb-20 bg-surface-2">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        <div className="mb-8">
          <Link
            href={`/${locale}`}
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            Startseite
          </Link>
          <span className="mx-2 text-line-strong">/</span>
          <span className="text-sm text-ink-2">{t.title}</span>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-ink">{t.title}</h1>
          <p className="text-lg text-ink-2">{t.subtitle}</p>
          <div className="w-16 h-px bg-line-strong mt-4" />
        </div>

        <div className="max-w-4xl backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-line bg-surface-card">
          <div className="space-y-6">

            <div>
              <h2 className="text-xl font-bold mb-2 text-ink">{t.company}</h2>
              <p className="text-ink-2">{t.address}</p>
              <p className="text-ink-2">{t.phone}</p>
              <p className="text-ink-2">{t.email}</p>
            </div>

            <div className="pt-4 border-t border-line">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <p className="text-sm text-ink-muted">{t.ceo}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-line">
              <h3 className="text-lg font-semibold mb-2 text-ink">{t.disclaimer}</h3>
              <p className="text-sm leading-relaxed text-ink-2">{t.disclaimerText}</p>
            </div>

            <div className="pt-4 border-t border-line">
              <h3 className="text-lg font-semibold mb-2 text-ink">{t.copyright}</h3>
              <p className="text-sm leading-relaxed text-ink-2">{t.copyrightText}</p>
            </div>

          </div>
        </div>

        <div className="mt-8">
          <Link
            href={`/${locale}`}
            className="transition-colors flex items-center gap-2 text-ink-muted hover:text-ink"
          >
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