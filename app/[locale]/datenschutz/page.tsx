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
      intro: 'Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TDDDG).',
      responsible: 'Verantwortlicher für die Datenverarbeitung',
      responsibleText: 'LANDSTARKBAU, Generaloberst-Beck-Straße 14, 55129 Mainz, Deutschland, (+49) 160 110 10 30, landstarkbau@gmail.com',
      generalInfo: 'Allgemeine Informationen zur Datenverarbeitung',
      generalInfoText: 'Beim Besuch unserer Website werden personenbezogene Daten verarbeitet (z. B. IP-Adresse). Die Verarbeitung erfolgt ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TDDDG).',
      logfiles: 'Server-Logfiles',
      logfilesText: 'Beim Besuch unserer Website werden durch den von Ihnen verwendeten Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sogenannten Logfile gespeichert. Folgende Daten werden dabei ohne Ihr Zutun erfasst:',
      logfilesList: [
        'IP-Adresse des anfragenden Rechners',
        'Datum und Uhrzeit des Zugriffs',
        'Name und URL der abgerufenen Datei',
        'Website, von der aus der Zugriff erfolgt (Referrer-URL)',
        'Verwendeter Browser und ggf. das Betriebssystem Ihres Rechners'
      ],
      logfilesLegal: 'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Sicherstellung eines störungsfreien Betriebs und der Systemsicherheit).',
      logfilesRetention: 'Speicherdauer: Die Server-Logfiles werden nach 7 Tagen automatisch gelöscht.',
      contactForm: 'Kontaktformular und Kontakt per E-Mail',
      contactFormText: 'Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, über ein auf der Website bereitgestelltes Formular oder per E-Mail Kontakt mit uns aufzunehmen. Dabei ist die Angabe einer gültigen E-Mail-Adresse sowie Ihres Namens erforderlich, damit wir wissen, von wem die Anfrage stammt und um diese beantworten zu können.',
      contactFormLegal: 'Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung oder vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).',
      contactFormRetention: 'Speicherdauer: Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
      gaTitle: 'Google Analytics 4',
      gaText: 'Diese Website nutzt Google Analytics 4 (GA4), einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland ("Google").',
      gaData: 'Verarbeitete Daten:',
      gaDataList: [
        'Gekürzte IP-Adresse (IP-Anonymisierung ist standardmäßig aktiviert)',
        'Aufgerufene URLs und Interaktionsereignisse (Klicks, Scrollen, Formularübermittlungen)',
        'Ungefährer Standort (auf Basis der IP-Adresse)',
        'Geräte- und Browserinformationen',
        'Besuchszeit und Verweildauer'
      ],
      gaCookies: 'Von GA4 gesetzte Cookies:',
      gaCookiesTable: [
        { name: '_ga', duration: '2 Jahre', purpose: 'Unterscheidung einzelner Nutzer' },
        { name: '_ga_<container-id>', duration: '2 Jahre', purpose: 'Speicherung des Sitzungsstatus' },
        { name: '_gid', duration: '24 Stunden', purpose: 'Unterscheidung einzelner Sitzungen' }
      ],
      gaCookieName: 'Cookie-Name',
      gaCookieDuration: 'Speicherdauer',
      gaCookiePurpose: 'Zweck',
      gaLegal: 'Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Ihre ausdrückliche Einwilligung über das Cookie-Banner). GA4 wird erst nach Ihrer Einwilligung im Bereich "Analyse-Cookies" aktiviert.',
      gaTransfer: 'Datenübermittlung in Drittländer: Daten werden an Server von Google übermittelt, die teilweise in den USA liegen. Google LLC ist nach dem EU-U.S. Data Privacy Framework (DPF) zertifiziert, wodurch ein angemessenes Datenschutzniveau gewährleistet wird.',
      gaConfig: 'Datenschutzfreundliche Konfiguration: IP-Anonymisierung aktiviert, Google Signals deaktiviert, Werbepersonalisierung deaktiviert, Aufbewahrungsdauer in GA4 auf 14 Monate eingestellt.',
      gaWithdraw: 'Widerruf der Einwilligung: Sie können Ihre Einwilligung zur Nutzung von GA4 jederzeit über den Link "Cookie-Einstellungen ändern" im Footer widerrufen. Zusätzlich können Sie ein Browser-Add-on zur Deaktivierung von Google Analytics installieren.',
      avvTitle: 'Auftragsverarbeitungsvertrag (AVV)',
      avvText: 'Wir haben mit Google einen Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO abgeschlossen. Google verarbeitet die Daten ausschließlich nach unseren Weisungen und nicht für eigene Zwecke.',
      newsletterTitle: 'Newsletter',
      newsletterText: 'Wenn Sie unseren Newsletter abonnieren, werden Ihre E-Mail-Adresse und ggf. Ihr Name für den Versand des Newsletters verwendet. Wir setzen das Double-Opt-In-Verfahren ein: Nach der Anmeldung erhalten Sie eine E-Mail mit einem Bestätigungslink.',
      newsletterLegal: 'Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung).',
      newsletterWithdraw: 'Widerruf: Sie können den Newsletter jederzeit über den Link in jedem Newsletter oder per E-Mail an landstarkbau@gmail.com abbestellen.',
      yourRights: 'Ihre Rechte',
      yourRightsText: 'Sie haben folgende Rechte:',
      rightsList: [
        'Recht auf Auskunft (Art. 15 DSGVO)',
        'Recht auf Berichtigung (Art. 16 DSGVO)',
        'Recht auf Löschung (Art. 17 DSGVO)',
        'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)',
        'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)',
        'Recht auf Widerspruch (Art. 21 DSGVO)',
        'Recht auf Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO): Sie können eine erteilte Einwilligung jederzeit widerrufen. Dies berührt nicht die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung.',
        'Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO): Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Die für uns zuständige Behörde ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz.'
      ],
      profilingTitle: 'Profiling / automatisierte Entscheidungsfindung',
      profilingText: 'Eine automatisierte Entscheidungsfindung einschließlich Profiling gemäß Art. 22 DSGVO findet nicht statt.',
      cookieTitle: 'Cookie-Richtlinie',
      cookieIntro: 'Diese Website verwendet Cookies. Nachfolgend finden Sie eine Übersicht der verwendeten Cookies und deren Zweck.',
      cookieNecessary: 'Technisch notwendige Cookies',
      cookieNecessaryText: 'Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden.',
      cookieNecessaryTable: [
        { name: 'cookie_consent', purpose: 'Speicherung Ihrer Cookie-Präferenzen', duration: '365 Tage' },
        { name: 'Spracheinstellungen', purpose: 'Speicherung der gewählten Sprache', duration: '365 Tage' }
      ],
      cookieAnalytics: 'Analyse-Cookies',
      cookieAnalyticsText: 'Diese Cookies werden nur nach Ihrer Einwilligung gesetzt.',
      cookieMarketing: 'Marketing-Cookies',
      cookieMarketingText: 'Derzeit werden keine Marketing-Cookies eingesetzt. Sollten künftig Marketing-Cookies verwendet werden, wird diese Richtlinie entsprechend aktualisiert.',
      cookieManage: 'So verwalten Sie Cookies',
      cookieManageText: 'Sie können Ihre Cookie-Einstellungen jederzeit über den Link "Cookie-Einstellungen ändern" im Footer ändern. Darüber hinaus können Sie Cookies in Ihren Browsereinstellungen verwalten oder löschen.',
      back: 'Zurück zur Startseite'
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'Information about data protection',
      intro: 'The protection of your personal data is important to us. We process your data exclusively on the basis of legal provisions (GDPR, TDDDG).',
      responsible: 'Responsible for data processing',
      responsibleText: 'LANDSTARKBAU, Generaloberst-Beck-Straße 14, 55129 Mainz, Deutschland, (+49) 160 110 10 30, landstarkbau@gmail.com',
      generalInfo: 'General information on data processing',
      generalInfoText: 'When you visit our website, personal data is processed (e.g. IP address). Processing is carried out exclusively on the basis of legal provisions (GDPR, TDDDG).',
      logfiles: 'Server log files',
      logfilesText: 'When you visit our website, information is automatically sent to the server of our website by the browser you use. This information is temporarily stored in a so-called log file. The following data is collected without your intervention:',
      logfilesList: [
        'IP address of the requesting computer',
        'Date and time of access',
        'Name and URL of the retrieved file',
        'Website from which access is made (referrer URL)',
        'Browser used and, if applicable, the operating system of your computer'
      ],
      logfilesLegal: 'Legal basis: Art. 6 (1) (f) GDPR (legitimate interest in ensuring fault-free operation and system security).',
      logfilesRetention: 'Retention period: Server log files are automatically deleted after 7 days.',
      contactForm: 'Contact form and contact by e-mail',
      contactFormText: 'If you have any questions, we offer you the opportunity to contact us via a form provided on the website or by e-mail. It is necessary to provide a valid e-mail address and your name so that we know who the request comes from and can answer it.',
      contactFormLegal: 'Legal basis: Art. 6 (1) (b) GDPR (performance of a contract or pre-contractual measures) or Art. 6 (1) (f) GDPR (legitimate interest in answering inquiries).',
      contactFormRetention: 'Retention period: The data will be deleted as soon as the request has been finally processed and no legal retention obligations prevent this.',
      gaTitle: 'Google Analytics 4',
      gaText: 'This website uses Google Analytics 4 (GA4), a web analytics service provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland ("Google").',
      gaData: 'Processed data:',
      gaDataList: [
        'Shortened IP address (IP anonymization is activated by default)',
        'Accessed URLs and interaction events (clicks, scrolling, form submissions)',
        'Approximate location (based on IP address)',
        'Device and browser information',
        'Visit time and duration'
      ],
      gaCookies: 'Cookies set by GA4:',
      gaCookiesTable: [
        { name: '_ga', duration: '2 years', purpose: 'Distinguishing individual users' },
        { name: '_ga_<container-id>', duration: '2 years', purpose: 'Storing session status' },
        { name: '_gid', duration: '24 hours', purpose: 'Distinguishing individual sessions' }
      ],
      gaCookieName: 'Cookie name',
      gaCookieDuration: 'Duration',
      gaCookiePurpose: 'Purpose',
      gaLegal: 'Legal basis: Art. 6 (1) (a) GDPR (your explicit consent via the cookie banner). GA4 is only activated after your consent in the "Analysis cookies" section.',
      gaTransfer: 'Data transfer to third countries: Data is transmitted to Google servers, some of which are located in the USA. Google LLC is certified under the EU-U.S. Data Privacy Framework (DPF), which ensures an adequate level of data protection.',
      gaConfig: 'Privacy-friendly configuration: IP anonymization activated, Google Signals deactivated, advertising personalization deactivated, retention period in GA4 set to 14 months.',
      gaWithdraw: 'Revocation of consent: You can revoke your consent to the use of GA4 at any time via the "Cookie-Einstellungen ändern" link in the footer. You can also install a browser add-on to deactivate Google Analytics.',
      avvTitle: 'Data Processing Agreement (DPA)',
      avvText: 'We have concluded a data processing agreement (DPA) with Google in accordance with Art. 28 GDPR. Google processes the data exclusively according to our instructions and not for its own purposes.',
      newsletterTitle: 'Newsletter',
      newsletterText: 'If you subscribe to our newsletter, your e-mail address and, if applicable, your name will be used to send the newsletter. We use the double opt-in procedure: after registration, you will receive an e-mail with a confirmation link.',
      newsletterLegal: 'Legal basis: Art. 6 (1) (a) GDPR (your consent).',
      newsletterWithdraw: 'Revocation: You can unsubscribe from the newsletter at any time via the link in each newsletter or by e-mail to landstarkbau@gmail.com.',
      yourRights: 'Your rights',
      yourRightsText: 'You have the following rights:',
      rightsList: [
        'Right of access (Art. 15 GDPR)',
        'Right to rectification (Art. 16 GDPR)',
        'Right to erasure (Art. 17 GDPR)',
        'Right to restriction of processing (Art. 18 GDPR)',
        'Right to data portability (Art. 20 GDPR)',
        'Right to object (Art. 21 GDPR)',
        'Right to withdraw consent (Art. 7 (3) GDPR): You can withdraw your consent at any time. This does not affect the lawfulness of processing carried out before the withdrawal.',
        'Right to lodge a complaint with a supervisory authority (Art. 77 GDPR): You have the right to lodge a complaint with a data protection supervisory authority. The authority responsible for us is the Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz.'
      ],
      profilingTitle: 'Profiling / automated decision-making',
      profilingText: 'Automated decision-making including profiling pursuant to Art. 22 GDPR does not take place.',
      cookieTitle: 'Cookie Policy',
      cookieIntro: 'This website uses cookies. Below you will find an overview of the cookies used and their purpose.',
      cookieNecessary: 'Strictly necessary cookies',
      cookieNecessaryText: 'These cookies are required for the operation of the website and cannot be deactivated.',
      cookieNecessaryTable: [
        { name: 'cookie_consent', purpose: 'Storing your cookie preferences', duration: '365 days' },
        { name: 'language settings', purpose: 'Storing the selected language', duration: '365 days' }
      ],
      cookieAnalytics: 'Analytics cookies',
      cookieAnalyticsText: 'These cookies are only set after your consent.',
      cookieMarketing: 'Marketing cookies',
      cookieMarketingText: 'No marketing cookies are currently used. Should marketing cookies be used in the future, this policy will be updated accordingly.',
      cookieManage: 'How to manage cookies',
      cookieManageText: 'You can change your cookie settings at any time via the "Cookie-Einstellungen ändern" link in the footer. You can also manage or delete cookies in your browser settings.',
      back: 'Back to home'
    },
    ua: {
      title: 'Політика конфіденційності',
      subtitle: 'Інформація про захист даних',
      intro: 'Захист ваших персональних даних є для нас важливим. Ми обробляємо ваші дані виключно на підставі законодавчих положень (GDPR, TDDDG).',
      responsible: 'Відповідальний за обробку даних',
      responsibleText: 'LANDSTARKBAU, Generaloberst-Beck-Straße 14, 55129 Mainz, Deutschland, (+49) 160 110 10 30, landstarkbau@gmail.com',
      generalInfo: 'Загальна інформація про обробку даних',
      generalInfoText: 'Під час відвідування нашого веб-сайту обробляються персональні дані (наприклад, IP-адреса). Обробка здійснюється виключно на підставі законодавчих положень (GDPR, TDDDG).',
      logfiles: 'Файли журналу сервера',
      logfilesText: 'Під час відвідування нашого веб-сайту інформація автоматично надсилається на сервер нашого веб-сайту через ваш браузер. Ця інформація тимчасово зберігається в так званому файлі журналу. Наступні дані збираються без вашої участі:',
      logfilesList: [
        'IP-адреса комп\'ютера, що робить запит',
        'Дата та час доступу',
        'Назва та URL-адреса отриманого файлу',
        'Веб-сайт, з якого здійснено доступ (URL-адреса реферера)',
        'Використаний браузер та, за можливості, операційна система вашого комп\'ютера'
      ],
      logfilesLegal: 'Правова основа: ст. 6 ч. 1 п. f GDPR (законний інтерес — забезпечення безперебійної роботи та безпеки системи).',
      logfilesRetention: 'Термін зберігання: файли журналу сервера автоматично видаляються через 7 днів.',
      contactForm: 'Контактна форма та контакт електронною поштою',
      contactFormText: 'Якщо у вас виникли запитання, ми пропонуємо вам можливість зв\'язатися з нами через форму, розміщену на веб-сайті, або електронною поштою. Необхідно вказати дійсну адресу електронної пошти та ваше ім\'я, щоб ми знали, від кого надійшов запит, і могли на нього відповісти.',
      contactFormLegal: 'Правова основа: ст. 6 ч. 1 п. b GDPR (виконання договору або переддоговірні заходи) або ст. 6 ч. 1 п. f GDPR (законний інтерес — відповідь на запити).',
      contactFormRetention: 'Термін зберігання: дані видаляються після завершення обробки запиту, за умови відсутності законодавчих обов\'язків щодо зберігання.',
      gaTitle: 'Google Analytics 4',
      gaText: 'Цей веб-сайт використовує Google Analytics 4 (GA4), службу веб-аналітики компанії Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ірландія ("Google").',
      gaData: 'Оброблювані дані:',
      gaDataList: [
        'Скорочена IP-адреса (IP-анонімізація увімкнена за замовчуванням)',
        'Відвідані URL-адреси та події взаємодії (кліки, прокрутка, відправка форм)',
        'Приблизне місцезнаходження (на основі IP-адреси)',
        'Інформація про пристрій та браузер',
        'Час відвідування та тривалість перебування'
      ],
      gaCookies: 'Cookie, що встановлюються GA4:',
      gaCookiesTable: [
        { name: '_ga', duration: '2 роки', purpose: 'Розрізнення окремих користувачів' },
        { name: '_ga_<container-id>', duration: '2 роки', purpose: 'Збереження статусу сесії' },
        { name: '_gid', duration: '24 години', purpose: 'Розрізнення окремих сесій' }
      ],
      gaCookieName: 'Назва Cookie',
      gaCookieDuration: 'Термін зберігання',
      gaCookiePurpose: 'Призначення',
      gaLegal: 'Правова основа: ст. 6 ч. 1 п. a GDPR (ваша явна згода через Cookie-банер). GA4 активується лише після вашої згоди в розділі "Analyse-Cookies".',
      gaTransfer: 'Передача даних третім країнам: дані передаються на сервери Google, частина з яких розташована в США. Google LLC сертифікована відповідно до EU-U.S. Data Privacy Framework (DPF), що забезпечує належний рівень захисту даних.',
      gaConfig: 'Конфігурація, орієнтована на захист даних: IP-анонімізація увімкнена, Google Signals вимкнено, рекламна персоналізація вимкнена, термін зберігання даних в GA4 встановлено на 14 місяців.',
      gaWithdraw: 'Відкликання згоди: ви можете в будь-який час відкликати згоду на використання GA4 через посилання "Cookie-Einstellungen ändern" у нижньому колонтитулі. Крім того, ви можете встановити браузерне доповнення для відмови від Google Analytics.',
      avvTitle: 'Договір про обробку замовлень (AVV)',
      avvText: 'Ми уклали з Google договір про обробку замовлень (AVV) відповідно до ст. 28 GDPR. Google обробляє дані лише за нашими вказівками та не використовує їх для власних цілей.',
      newsletterTitle: 'Newsletter',
      newsletterText: 'Якщо ви підписуєтесь на наш Newsletter, ваша електронна адреса та, за наявності, ім\'я використовуються для надсилання Newsletter. Ми використовуємо процедуру подвійного підтвердження (Double-Opt-In): після реєстрації ви отримаєте електронний лист із посиланням для підтвердження.',
      newsletterLegal: 'Правова основа: ст. 6 ч. 1 п. a GDPR (ваша згода).',
      newsletterWithdraw: 'Відкликання: ви можете в будь-який час скасувати підписку через посилання в кожному Newsletter або надіславши листа на landstarkbau@gmail.com.',
      yourRights: 'Ваші права',
      yourRightsText: 'Ви маєте наступні права:',
      rightsList: [
        'Право на доступ (ст. 15 GDPR)',
        'Право на виправлення (ст. 16 GDPR)',
        'Право на видалення (ст. 17 GDPR)',
        'Право на обмеження обробки (ст. 18 GDPR)',
        'Право на перенесення даних (ст. 20 GDPR)',
        'Право на заперечення (ст. 21 GDPR)',
        'Право на відкликання згоди (ст. 7 ч. 3 GDPR): ви можете в будь-який час відкликати надану згоду. Це не впливає на законність обробки, здійсненої на основі згоди до моменту відкликання.',
        'Право на подання скарги до наглядового органу (ст. 77 GDPR): ви маєте право подати скаргу до наглядового органу з питань захисту даних. Відповідним органом для нас є Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz.'
      ],
      profilingTitle: 'Профілювання / автоматизоване прийняття рішень',
      profilingText: 'Автоматизоване прийняття рішень, включаючи профілювання, відповідно до ст. 22 GDPR не здійснюється.',
      cookieTitle: 'Політика Cookie',
      cookieIntro: 'Цей веб-сайт використовує Cookie. Нижче наведено огляд використовуваних Cookie та їх призначення.',
      cookieNecessary: 'Технічно необхідні Cookie',
      cookieNecessaryText: 'Ці Cookie необхідні для роботи веб-сайту і не можуть бути вимкнені.',
      cookieNecessaryTable: [
        { name: 'cookie_consent', purpose: 'Зберігання ваших налаштувань Cookie', duration: '365 днів' },
        { name: 'Мовні налаштування', purpose: 'Збереження обраної мови', duration: '365 днів' }
      ],
      cookieAnalytics: 'Аналітичні Cookie',
      cookieAnalyticsText: 'Ці Cookie встановлюються лише після вашої згоди.',
      cookieMarketing: 'Маркетингові Cookie',
      cookieMarketingText: 'Наразі маркетингові Cookie не використовуються. Якщо в майбутньому маркетингові Cookie будуть використовуватися, ця політика буде відповідно оновлена.',
      cookieManage: 'Як керувати Cookie',
      cookieManageText: 'Ви можете в будь-який час змінити свої налаштування Cookie через посилання "Cookie-Einstellungen ändern" у нижньому колонтитулі. Крім того, ви можете налаштувати або видалити Cookie у своєму браузері.',
      back: 'На головну'
    }
  }

  const t = content[locale as keyof typeof content] || content.de

  const cardClass = `max-w-4xl backdrop-blur-sm rounded-2xl p-8 md:p-10 border ${
    isDark ? 'bg-white/5 border-white/10' : 'bg-white/60 border-gray-200'
  }`

  const h3Class = `text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`
  const pClass = `text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-700'}`
  const smallClass = `text-xs mt-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`
  const ulClass = `list-disc list-inside space-y-1 text-sm ml-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`

  const tableClass = `w-full text-sm mt-3 border-collapse`
  const thClass = `text-left py-2 px-3 border-b ${isDark ? 'border-white/10 text-white/70' : 'border-gray-200 text-gray-600'}`
  const tdClass = `py-2 px-3 border-b ${isDark ? 'border-white/5 text-white/60' : 'border-gray-100 text-gray-600'}`

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

        <div className={cardClass}>
          <div className="space-y-8">

            <p className={pClass}>{t.intro}</p>

            {/* Відповідальний */}
            <div>
              <h3 className={h3Class}>{t.responsible}</h3>
              <p className={pClass}>{t.responsibleText}</p>
            </div>

            {/* Загальна інформація */}
            <div>
              <h3 className={h3Class}>{t.generalInfo}</h3>
              <p className={pClass}>{t.generalInfoText}</p>
            </div>

            {/* Logfiles */}
            <div>
              <h3 className={h3Class}>{t.logfiles}</h3>
              <p className={`${pClass} mb-3`}>{t.logfilesText}</p>
              <ul className={ulClass}>
                {t.logfilesList.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className={smallClass}>{t.logfilesLegal}</p>
              <p className={smallClass}>{t.logfilesRetention}</p>
            </div>

            {/* Контактна форма */}
            <div>
              <h3 className={h3Class}>{t.contactForm}</h3>
              <p className={pClass}>{t.contactFormText}</p>
              <p className={smallClass}>{t.contactFormLegal}</p>
              <p className={smallClass}>{t.contactFormRetention}</p>
            </div>

            {/* Google Analytics */}
            <div>
              <h3 className={h3Class}>{t.gaTitle}</h3>
              <p className={pClass}>{t.gaText}</p>
              <p className={`${pClass} mt-3 font-medium`}>{t.gaData}</p>
              <ul className={ulClass}>
                {t.gaDataList.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className={`${pClass} mt-4 font-medium`}>{t.gaCookies}</p>
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={thClass}>{t.gaCookieName}</th>
                    <th className={thClass}>{t.gaCookieDuration}</th>
                    <th className={thClass}>{t.gaCookiePurpose}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.gaCookiesTable.map((c, i) => (
                    <tr key={i}>
                      <td className={tdClass}><code>{c.name}</code></td>
                      <td className={tdClass}>{c.duration}</td>
                      <td className={tdClass}>{c.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={smallClass}>{t.gaLegal}</p>
              <p className={smallClass}>{t.gaTransfer}</p>
              <p className={smallClass}>{t.gaConfig}</p>
              <p className={smallClass}>{t.gaWithdraw}</p>
            </div>

            {/* AVV */}
            <div>
              <h3 className={h3Class}>{t.avvTitle}</h3>
              <p className={pClass}>{t.avvText}</p>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className={h3Class}>{t.newsletterTitle}</h3>
              <p className={pClass}>{t.newsletterText}</p>
              <p className={smallClass}>{t.newsletterLegal}</p>
              <p className={smallClass}>{t.newsletterWithdraw}</p>
            </div>

            {/* Права */}
            <div>
              <h3 className={h3Class}>{t.yourRights}</h3>
              <p className={`${pClass} mb-3`}>{t.yourRightsText}</p>
              <ul className={ulClass}>
                {t.rightsList.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            {/* Профілювання */}
            <div>
              <h3 className={h3Class}>{t.profilingTitle}</h3>
              <p className={pClass}>{t.profilingText}</p>
            </div>

            {/* Cookie-політика */}
            <div className={`pt-6 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.cookieTitle}
              </h3>
              <p className={`${pClass} mb-4`}>{t.cookieIntro}</p>

              <h4 className={`text-base font-semibold mb-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
                {t.cookieNecessary}
              </h4>
              <p className={`${pClass} mb-2`}>{t.cookieNecessaryText}</p>
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={thClass}>{t.gaCookieName}</th>
                    <th className={thClass}>{t.gaCookiePurpose}</th>
                    <th className={thClass}>{t.gaCookieDuration}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.cookieNecessaryTable.map((c, i) => (
                    <tr key={i}>
                      <td className={tdClass}><code>{c.name}</code></td>
                      <td className={tdClass}>{c.purpose}</td>
                      <td className={tdClass}>{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h4 className={`text-base font-semibold mt-6 mb-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
                {t.cookieAnalytics}
              </h4>
              <p className={`${pClass} mb-2`}>{t.cookieAnalyticsText}</p>
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={thClass}>{t.gaCookieName}</th>
                    <th className={thClass}>{t.gaCookieDuration}</th>
                    <th className={thClass}>{t.gaCookiePurpose}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.gaCookiesTable.map((c, i) => (
                    <tr key={i}>
                      <td className={tdClass}><code>{c.name}</code></td>
                      <td className={tdClass}>{c.duration}</td>
                      <td className={tdClass}>{c.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h4 className={`text-base font-semibold mt-6 mb-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
                {t.cookieMarketing}
              </h4>
              <p className={pClass}>{t.cookieMarketingText}</p>

              <h4 className={`text-base font-semibold mt-6 mb-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
                {t.cookieManage}
              </h4>
              <p className={pClass}>{t.cookieManageText}</p>
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