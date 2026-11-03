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
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1>Cookie-Richtlinie</h1>
      
      <h2>Notwendige Cookies</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Zweck</th><th>Dauer</th><th>Anbieter</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>cookie_consent</td>
            <td>Speichert Ihre Cookie-Präferenzen</td>
            <td>365 Tage</td>
            <td>LANDSTARKBAU</td>
          </tr>
        </tbody>
      </table>

      <h2>Analyse-Cookies (optional)</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Zweck</th><th>Dauer</th><th>Anbieter</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>_ga</td>
            <td>Unterscheidet Nutzer für Statistiken</td>
            <td>2 Jahre</td>
            <td>Google LLC</td>
          </tr>
          <tr>
            <td>_gid</td>
            <td>Unterscheidet Nutzer für Statistiken</td>
            <td>24 Stunden</td>
            <td>Google LLC</td>
          </tr>
        </tbody>
      </table>

      <h2>Wie Sie Ihre Einwilligung widerrufen</h2>
      <p>Klicken Sie auf „Cookie-Einstellungen ändern" im Footer.</p>
    </div>
  );
}