// app/[locale]/cookies/page.tsx
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  const meta = {
    de: {
      title: 'Cookie-Richtlinie',
      description: 'Informationen zur Verwendung von Cookies und Analyse-Tools auf der Website von LANDSTARKBAU gemäß DSGVO.',
    },
    en: {
      title: 'Cookie Policy',
      description: 'Information about the use of cookies and analytics tools on the LANDSTARKBAU website in accordance with GDPR.',
    },
    ru: {
      title: 'Политика Cookie',
      description: 'Информация об использовании файлов cookie и аналитических инструментов на сайте LANDSTARKBAU в соответствии с GDPR.',
    },
    uk: {
      title: 'Політика Cookie',
      description: 'Інформація про використання файлів cookie та аналітичних інструментів на сайті LANDSTARKBAU відповідно до GDPR.',
    },
  };

  const content = meta[locale as keyof typeof meta] || meta.de;

  return {
    title: content.title,
    description: content.description,
    alternates: getAlternates(locale, "/cookies"),
  };
}

export default function CookiePolicy() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-surface-2">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-4xl mx-auto backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-line bg-surface-card">

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-ink">Cookie-Richtlinie</h1>

          <h2 className="text-xl font-semibold mb-3 mt-6 text-ink">Notwendige Cookies</h2>
          <table className="w-full text-sm mt-3 border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2 px-3 border-b border-line text-ink-2">Name</th>
                <th className="text-left py-2 px-3 border-b border-line text-ink-2">Zweck</th>
                <th className="text-left py-2 px-3 border-b border-line text-ink-2">Dauer</th>
                <th className="text-left py-2 px-3 border-b border-line text-ink-2">Anbieter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-3 border-b border-line-subtle text-ink-2">cookie_consent</td>
                <td className="py-2 px-3 border-b border-line-subtle text-ink-2">Speichert Ihre Cookie-Präferenzen</td>
                <td className="py-2 px-3 border-b border-line-subtle text-ink-2">365 Tage</td>
                <td className="py-2 px-3 border-b border-line-subtle text-ink-2">LANDSTARKBAU</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-xl font-semibold mb-3 mt-8 text-ink">Analyse-Cookies (optional)</h2>
          <table className="w-full text-sm mt-3 border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2 px-3 border-b border-line text-ink-2">Name</th>
                <th className="text-left py-2 px-3 border-b border-line text-ink-2">Zweck</th>
                <th className="text-left py-2 px-3 border-b border-line text-ink-2">Dauer</th>
                <th className="text-left py-2 px-3 border-b border-line text-ink-2">Anbieter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-3 border-b border-line-subtle text-ink-2">_ga</td>
                <td className="py-2 px-3 border-b border-line-subtle text-ink-2">Unterscheidet Nutzer für Statistiken</td>
                <td className="py-2 px-3 border-b border-line-subtle text-ink-2">2 Jahre</td>
                <td className="py-2 px-3 border-b border-line-subtle text-ink-2">Google LLC</td>
              </tr>
              <tr>
                <td className="py-2 px-3 border-b border-line-subtle text-ink-2">_gid</td>
                <td className="py-2 px-3 border-b border-line-subtle text-ink-2">Unterscheidet Nutzer für Statistiken</td>
                <td className="py-2 px-3 border-b border-line-subtle text-ink-2">24 Stunden</td>
                <td className="py-2 px-3 border-b border-line-subtle text-ink-2">Google LLC</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-xl font-semibold mb-3 mt-8 text-ink">Wie Sie Ihre Einwilligung widerrufen</h2>
          <p className="text-sm leading-relaxed text-ink-2">Klicken Sie auf „Cookie-Einstellungen ändern" im Footer.</p>

        </div>
      </div>
    </main>
  )
}