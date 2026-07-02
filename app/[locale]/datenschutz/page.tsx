// app/[locale]/datenschutz/page.tsx
'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import { useTheme } from '@/app/context/ThemeContext'

export default function DatenschutzPage() {
  const locale = useLocale()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const content = {
    de: {
      title: 'Datenschutzerklärung',
      subtitle: 'Informationen zum Datenschutz',
      intro: 'Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TMG).',
      responsible: 'Verantwortlicher für die Datenverarbeitung',
      responsibleText: 'LANDSTARKBAU, Generaloberst-Beck-Straße 14, 55129 Mainz Deutschland, (+49) 016 110 10 30, landstarkbau@gmail.com',
      dataCollection: 'Erhebung und Speicherung personenbezogener Daten',
      dataCollectionText: 'Beim Besuch unserer Website werden durch den von Ihnen verwendeten Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sogenannten Logfile gespeichert. Folgende Daten werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten Löschung gespeichert:',
      dataList: [
        'IP-Adresse des anfragenden Rechners',
        'Datum und Uhrzeit des Zugriffs',
        'Name und URL der abgerufenen Datei',
        'Website, von der aus der Zugriff erfolgt (Referrer-URL)',
        'Verwendeter Browser und ggf. das Betriebssystem Ihres Rechners'
      ],
      contactForm: 'Kontaktformular',
      contactFormText: 'Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, über ein auf der Website bereitgestelltes Formular Kontakt mit uns aufzunehmen. Dabei ist die Angabe einer gültigen E-Mail-Adresse sowie Ihres Namens erforderlich, damit wir wissen, von wem die Anfrage stammt und um diese beantworten zu können.',
      yourRights: 'Ihre Rechte',
      yourRightsText: 'Sie haben das Recht:',
      rightsList: [
        'Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen',
        'Berichtigung oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen',
        'Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen',
        'Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen',
        'Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen'
      ],
      back: 'Zurück zur Startseite'
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'Information about data protection',
      intro: 'The protection of your personal data is important to us. We process your data exclusively on the basis of legal provisions (GDPR, TMG).',
      responsible: 'Responsible for data processing',
      responsibleText: 'LANDSTARKBAU, Generaloberst-Beck-Straße 14, 55129 Mainz Deutschland, (+49) 016 110 10 30, landstarkbau@gmail.com',
      dataCollection: 'Collection and storage of personal data',
      dataCollectionText: 'When you visit our website, information is automatically sent to the server of our website by the browser you use. This information is temporarily stored in a so-called log file. The following data is collected without your intervention and stored until automated deletion:',
      dataList: [
        'IP address of the requesting computer',
        'Date and time of access',
        'Name and URL of the retrieved file',
        'Website from which access is made (referrer URL)',
        'Browser used and, if applicable, the operating system of your computer'
      ],
      contactForm: 'Contact form',
      contactFormText: 'If you have any questions, we offer you the opportunity to contact us via a form provided on the website. It is necessary to provide a valid e-mail address and your name so that we know who the request comes from and can answer it.',
      yourRights: 'Your rights',
      yourRightsText: 'You have the right:',
      rightsList: [
        'To request information about your personal data processed by us',
        'To request correction or completion of your personal data stored with us',
        'To request deletion of your personal data stored with us',
        'To request restriction of processing of your personal data',
        'To object to the processing of your personal data'
      ],
      back: 'Back to home'
    },
    ua: {
      title: 'Політика конфіденційності',
      subtitle: 'Інформація про захист даних',
      intro: 'Захист ваших персональних даних є для нас важливим. Ми обробляємо ваші дані виключно на підставі законодавчих положень (GDPR, TMG).',
      responsible: 'Відповідальний за обробку даних',
      responsibleText: 'LANDSTARKBAU, Generaloberst-Beck-Straße 14, 55129 Mainz Deutschland, (+49) 016 110 10 30, landstarkbau@gmail.com',
      dataCollection: 'Збір та зберігання персональних даних',
      dataCollectionText: 'Під час відвідування нашого веб-сайту інформація автоматично надсилається на сервер нашого веб-сайту через ваш браузер. Ця інформація тимчасово зберігається в так званому файлі журналу. Наступні дані збираються без вашої участі та зберігаються до автоматичного видалення:',
      dataList: [
        'IP-адреса комп\'ютера, що робить запит',
        'Дата та час доступу',
        'Назва та URL-адреса отриманого файлу',
        'Веб-сайт, з якого здійснено доступ (URL-адреса реферера)',
        'Використаний браузер та, за можливості, операційна система вашого комп\'ютера'
      ],
      contactForm: 'Контактна форма',
      contactFormText: 'Якщо у вас виникли запитання, ми пропонуємо вам можливість зв\'язатися з нами через форму, розміщену на веб-сайті. Необхідно вказати дійсну адресу електронної пошти та ваше ім\'я, щоб ми знали, від кого надійшов запит, і могли на нього відповісти.',
      yourRights: 'Ваші права',
      yourRightsText: 'Ви маєте право:',
      rightsList: [
        'Запитувати інформацію про ваші персональні дані, які ми обробляємо',
        'Вимагати виправлення або доповнення ваших персональних даних, що зберігаються у нас',
        'Вимагати видалення ваших персональних даних, що зберігаються у нас',
        'Вимагати обмеження обробки ваших персональних даних',
        'Заперечувати проти обробки ваших персональних даних'
      ],
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
            <p className={`text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{t.intro}</p>
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.responsible}</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{t.responsibleText}</p>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.dataCollection}</h3>
              <p className={`text-sm leading-relaxed mb-3 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{t.dataCollectionText}</p>
              <ul className={`list-disc list-inside space-y-1 text-sm ml-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                {t.dataList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.contactForm}</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{t.contactFormText}</p>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.yourRights}</h3>
              <p className={`text-sm leading-relaxed mb-3 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{t.yourRightsText}</p>
              <ul className={`list-disc list-inside space-y-1 text-sm ml-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                {t.rightsList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
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