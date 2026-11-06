// app/[locale]/agb/AgbClient.tsx
'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'

export default function AgbClient() {
  const locale = useLocale()

  const content = {
    de: {
      title: 'Allgemeine Geschäftsbedingungen',
      subtitle: 'AGB',
      intro: 'Die folgenden Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, Leistungen und Angebote der LANDSTARKBAU.',
      scope: 'Geltungsbereich',
      scopeText: 'Diese AGB gelten für alle Geschäftsbeziehungen zwischen der LANDSTARKBAU und dem Kunden. Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, wir haben ausdrücklich schriftlich zugestimmt.',
      contract: 'Vertragsabschluss',
      contractText: 'Ein Vertrag kommt durch die schriftliche Auftragsbestätigung oder durch die Ausführung der bestellten Leistung zustande. Angebote sind freibleibend und unverbindlich.',
      prices: 'Preise und Zahlungsbedingungen',
      pricesText: 'Alle Preise verstehen sich in Euro zuzüglich der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt nach Erhalt der Rechnung innerhalb von 14 Tagen ohne Abzug.',
      execution: 'Ausführung der Leistungen',
      executionText: 'Die Ausführung der Leistungen erfolgt nach den allgemein anerkannten Regeln der Technik. Die LANDSTARKBAU behält sich vor, Änderungen im Leistungsumfang vorzunehmen, wenn diese aufgrund von technischen Entwicklungen oder gesetzlichen Vorgaben erforderlich werden.',
      warranty: 'Gewährleistung',
      warrantyText: 'Die Gewährleistungsfrist beträgt 2 Jahre ab Abnahme der Leistung. Bei Mängeln hat der Kunde das Recht auf Nacherfüllung. Die LANDSTARKBAU hat das Recht, die Nacherfüllung zu verweigern, wenn diese unmöglich ist oder einen unverhältnismäßigen Aufwand verursachen würde.',
      liability: 'Haftung',
      liabilityText: 'Die LANDSTARKBAU haftet für Schäden nur bei Vorsatz oder grober Fahrlässigkeit. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, soweit es sich nicht um Schäden handelt, die durch die Verletzung des Lebens, des Körpers oder der Gesundheit entstanden sind.',
      final: 'Schlussbestimmungen',
      finalText: 'Es gilt das Recht der Bundesrepublik Deutschland. Erfüllungsort und Gerichtsstand ist der Sitz der LANDSTARKBAU in München.',
      back: 'Zurück zur Startseite'
    },
    en: {
      title: 'Terms & Conditions',
      subtitle: 'AGB',
      intro: 'The following Terms & Conditions apply to all contracts, services and offers of LANDSTARKBAU.',
      scope: 'Scope',
      scopeText: 'These Terms & Conditions apply to all business relationships between LANDSTARKBAU and the customer. Deviating conditions of the customer are not recognized unless we have expressly agreed in writing.',
      contract: 'Contract conclusion',
      contractText: 'A contract is concluded by written order confirmation or by execution of the ordered service. Offers are subject to change and non-binding.',
      prices: 'Prices and payment terms',
      pricesText: 'All prices are in Euro plus statutory VAT. Payment is due within 14 days of receipt of the invoice without deduction.',
      execution: 'Execution of services',
      executionText: 'The execution of the services is carried out according to generally recognized rules of technology. LANDSTARKBAU reserves the right to make changes to the scope of services if this becomes necessary due to technical developments or legal requirements.',
      warranty: 'Warranty',
      warrantyText: 'The warranty period is 2 years from acceptance of the service. In the event of defects, the customer has the right to subsequent performance. LANDSTARKBAU has the right to refuse subsequent performance if this is impossible or would cause disproportionate effort.',
      liability: 'Liability',
      liabilityText: 'LANDSTARKBAU is only liable for damages in the event of intent or gross negligence. Liability for slight negligence is excluded, unless it is damage caused by injury to life, limb or health.',
      final: 'Final provisions',
      finalText: 'The law of the Federal Republic of Germany applies. Place of performance and jurisdiction is the registered office of LANDSTARKBAU in Munich.',
      back: 'Back to home'
    },
    ua: {
      title: 'Загальні умови',
      subtitle: 'AGB',
      intro: 'Наступні Загальні умови (AGB) застосовуються до всіх договорів, послуг та пропозицій LANDSTARKBAU.',
      scope: 'Сфера застосування',
      scopeText: 'Ці Загальні умови застосовуються до всіх ділових відносин між LANDSTARKBAU та клієнтом. Інші умови клієнта не визнаються, якщо ми не дали на це прямої письмової згоди.',
      contract: 'Укладення договору',
      contractText: 'Договір укладається шляхом письмового підтвердження замовлення або виконанням замовленої послуги. Пропозиції не є остаточними та мають інформаційний характер.',
      prices: 'Ціни та умови оплати',
      pricesText: 'Усі ціни вказані в євро з додаванням законного податку на додану вартість. Оплата здійснюється протягом 14 днів з моменту отримання рахунку без вирахувань.',
      execution: 'Виконання послуг',
      executionText: 'Виконання послуг здійснюється відповідно до загальновизнаних технічних норм. LANDSTARKBAU залишає за собою право вносити зміни до обсягу послуг, якщо це необхідно через технічний розвиток або законодавчі вимоги.',
      warranty: 'Гарантія',
      warrantyText: 'Гарантійний строк становить 2 роки з моменту прийняття послуги. У разі виявлення недоліків клієнт має право на усунення недоліків. LANDSTARKBAU має право відмовити в усуненні недоліків, якщо це неможливо або вимагає непропорційних витрат.',
      liability: 'Відповідальність',
      liabilityText: 'LANDSTARKBAU несе відповідальність за збитки лише у разі умислу або грубої необережності. Відповідальність за легку необережність виключається, за винятком випадків, коли йдеться про шкоду, заподіяну життю, тілу або здоров\'ю.',
      final: 'Прикінцеві положення',
      finalText: 'Застосовується право Федеративної Республіки Німеччина. Місцем виконання та підсудності є місцезнаходження LANDSTARKBAU в Мюнхені.',
      back: 'На головну'
    }
  }

  const t = content[locale as keyof typeof content] || content.de

  // Список секцій — щоб не дублювати JSX 8 разів
  const sections = [
    { heading: t.scope, text: t.scopeText },
    { heading: t.contract, text: t.contractText },
    { heading: t.prices, text: t.pricesText },
    { heading: t.execution, text: t.executionText },
    { heading: t.warranty, text: t.warrantyText },
    { heading: t.liability, text: t.liabilityText },
    { heading: t.final, text: t.finalText },
  ]

  return (
    <main className="min-h-screen pt-32 pb-20 bg-surface">
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
            <p className="text-sm leading-relaxed text-ink-2">{t.intro}</p>

            {sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold mb-2 text-ink">{section.heading}</h3>
                <p className="text-sm leading-relaxed text-ink-2">{section.text}</p>
              </div>
            ))}
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