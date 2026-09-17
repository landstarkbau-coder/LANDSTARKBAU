'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [draft, setDraft] = useState<ConsentState>({ analytics: false, marketing: false });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent');
    if (!stored) {
      setShowBanner(true);
    }
  }, []);

  const persist = (choice: ConsentState) => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      ...choice,
      timestamp: Date.now(),
      version: '1.1'
    }));

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: choice.analytics ? 'granted' : 'denied',
        ad_storage: choice.marketing ? 'granted' : 'denied',
        ad_user_data: choice.marketing ? 'granted' : 'denied',
        ad_personalization: choice.marketing ? 'granted' : 'denied',
      });
    }

    window.dispatchEvent(new Event('consent-updated'));
    setShowBanner(false);
    setShowDetails(false);
  };

  const handleAcceptAll = () => persist({ analytics: true, marketing: true });
  const handleRejectAll = () => persist({ analytics: false, marketing: false });
  const handleSaveDetails = () => persist(draft);

  const openSettings = () => {
    const stored = localStorage.getItem('cookie_consent');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDraft({ analytics: !!parsed.analytics, marketing: !!parsed.marketing });
      } catch {}
    }
    setShowDetails(false);
    setShowBanner(true);
  };

  useEffect(() => {
    window.addEventListener('open-cookie-settings', openSettings);
    return () => window.removeEventListener('open-cookie-settings', openSettings);
  }, []);

  if (!showBanner) return null;

  // Базові класи, які повторюються
  const panelClass = `fixed bottom-0 left-0 right-0 z-[9999] border-t transition-colors duration-300 ${
    isDark
      ? 'bg-gray-900/95 backdrop-blur-md border-white/10 text-white'
      : 'bg-white/95 backdrop-blur-md border-gray-200 text-gray-900'
  }`;

  const secondaryBtn = `px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 border ${
    isDark
      ? 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:text-white'
      : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
  }`;

  const primaryBtn = `px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 border ${
    isDark
      ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
      : 'bg-gray-900 border-gray-900 text-white hover:bg-gray-800'
  }`;

  const linkBtn = `text-xs underline transition-colors ${
    isDark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-700'
  }`;

  return (
    <div role="dialog" aria-label="Cookie-Einstellungen" className={panelClass}>
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-5">

        {!showDetails ? (
          /* ---------- ПЕРШИЙ РІВЕНЬ ---------- */
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex-1 min-w-0">
              <p className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.
                Notwendige Cookies sind für den Betrieb erforderlich.
                Analyse- und Marketing-Cookies helfen uns, unsere Website zu verbessern.
              </p>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <a href="/datenschutz" className={linkBtn}>
                  Mehr erfahren
                </a>
                <button type="button" onClick={() => setShowDetails(true)} className={linkBtn}>
                  Einstellungen anpassen
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
              <button type="button" onClick={handleRejectAll} className={secondaryBtn}>
                Alle ablehnen
              </button>
              <button type="button" onClick={handleAcceptAll} className={primaryBtn}>
                Alle akzeptieren
              </button>
            </div>
          </div>
        ) : (
          /* ---------- ДРУГИЙ РІВЕНЬ ---------- */
          <div className="flex flex-col gap-5">
            <div>
              <h3 className={`text-sm font-semibold tracking-wider mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Cookie-Einstellungen
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                Wählen Sie aus, welche Kategorien Sie zulassen möchten. Notwendige Cookies
                sind immer aktiv, da sie für den Betrieb der Website erforderlich sind.
              </p>
            </div>

            {/* Категорія 1 — Notwendige (заблокована) */}
            <div className={`flex items-start gap-3 p-3 rounded-lg border ${
              isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className={`mt-0.5 w-9 h-5 rounded-full flex items-center px-0.5 flex-shrink-0 ${
                isDark ? 'bg-white/30' : 'bg-gray-400'
              }`}>
                <div className="w-4 h-4 rounded-full bg-white shadow" />
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Notwendige Cookies
                </div>
                <div className={`text-xs mt-0.5 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                  Erforderlich für den Betrieb der Website. Können nicht deaktiviert werden.
                </div>
              </div>
            </div>

            {/* Категорія 2 — Analyse */}
            <div className={`flex items-start gap-3 p-3 rounded-lg border ${
              isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'
            }`}>
              <button
                type="button"
                role="switch"
                aria-checked={draft.analytics}
                onClick={() => setDraft((d) => ({ ...d, analytics: !d.analytics }))}
                className={`mt-0.5 w-9 h-5 rounded-full flex items-center px-0.5 flex-shrink-0 transition-colors ${
                  draft.analytics
                    ? isDark ? 'bg-white/70' : 'bg-gray-900'
                    : isDark ? 'bg-white/20' : 'bg-gray-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${
                  draft.analytics ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
              <div className="flex-1">
                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Analyse-Cookies
                </div>
                <div className={`text-xs mt-0.5 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                  Helfen uns zu verstehen, wie Besucher die Website nutzen (z. B. Google Analytics).
                </div>
              </div>
            </div>

            {/* Категорія 3 — Marketing */}
            <div className={`flex items-start gap-3 p-3 rounded-lg border ${
              isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'
            }`}>
              <button
                type="button"
                role="switch"
                aria-checked={draft.marketing}
                onClick={() => setDraft((d) => ({ ...d, marketing: !d.marketing }))}
                className={`mt-0.5 w-9 h-5 rounded-full flex items-center px-0.5 flex-shrink-0 transition-colors ${
                  draft.marketing
                    ? isDark ? 'bg-white/70' : 'bg-gray-900'
                    : isDark ? 'bg-white/20' : 'bg-gray-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${
                  draft.marketing ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
              <div className="flex-1">
                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Marketing-Cookies
                </div>
                <div className={`text-xs mt-0.5 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                  Werden verwendet, um Ihnen relevante Werbung anzuzeigen (z. B. Meta Pixel).
                </div>
              </div>
            </div>

            {/* Кнопки другого рівня */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button type="button" onClick={() => setShowDetails(false)} className={secondaryBtn}>
                Zurück
              </button>
              <button type="button" onClick={handleRejectAll} className={secondaryBtn}>
                Alle ablehnen
              </button>
              <button type="button" onClick={handleSaveDetails} className={primaryBtn}>
                Auswahl speichern
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}