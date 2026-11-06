'use client';
import { useState, useEffect } from 'react';

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [draft, setDraft] = useState<ConsentState>({ analytics: false, marketing: false });

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
  const panelClass =
    'fixed bottom-0 left-0 right-0 z-[9999] border-t border-line bg-surface-overlay backdrop-blur-md text-ink transition-colors duration-300';

  const secondaryBtn =
    'px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 border border-line-strong bg-surface-card text-ink-2 hover:bg-surface-card-hover hover:text-ink';

  const primaryBtn =
    'px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 border bg-brand border-brand text-ink-on-brand hover:bg-brand-hover hover:border-brand-hover';

  const linkBtn =
    'text-xs underline text-ink-muted hover:text-ink transition-colors';

  // Стилі для перемикача
  const switchTrack = (active: boolean) =>
    `mt-0.5 w-9 h-5 rounded-full flex items-center px-0.5 flex-shrink-0 transition-colors ${
      active
        ? 'bg-brand'
        : 'bg-line-strong'
    }`;

  const switchKnob = (active: boolean) =>
    `w-4 h-4 rounded-full shadow transition-transform ${
      active ? 'translate-x-4' : 'translate-x-0'
    } bg-ink-on-brand`;

  return (
    <div role="dialog" aria-label="Cookie-Einstellungen" className={panelClass}>
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-5">

        {!showDetails ? (
          /* ---------- ПЕРШИЙ РІВЕНЬ ---------- */
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex-1 min-w-0">
              <p className="text-sm leading-relaxed text-ink-2">
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
              <h3 className="text-sm font-semibold tracking-wider mb-3 text-ink">
                Cookie-Einstellungen
              </h3>
              <p className="text-xs leading-relaxed text-ink-muted">
                Wählen Sie aus, welche Kategorien Sie zulassen möchten. Notwendige Cookies
                sind immer aktiv, da sie für den Betrieb der Website erforderlich sind.
              </p>
            </div>

            {/* Категорія 1 — Notwendige (заблокована) */}
            <div className="flex items-start gap-3 p-3 rounded-lg border border-line bg-surface-card">
              <div className="mt-0.5 w-9 h-5 rounded-full flex items-center px-0.5 flex-shrink-0 bg-line-strong">
                <div className="w-4 h-4 rounded-full bg-ink-on-brand shadow" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-ink">
                  Notwendige Cookies
                </div>
                <div className="text-xs mt-0.5 text-ink-muted">
                  Erforderlich für den Betrieb der Website. Können nicht deaktiviert werden.
                </div>
              </div>
            </div>

            {/* Категорія 2 — Analyse */}
            <div className="flex items-start gap-3 p-3 rounded-lg border border-line bg-surface-card">
              <button
                type="button"
                role="switch"
                aria-checked={draft.analytics}
                onClick={() => setDraft((d) => ({ ...d, analytics: !d.analytics }))}
                className={switchTrack(draft.analytics)}
              >
                <div className={switchKnob(draft.analytics)} />
              </button>
              <div className="flex-1">
                <div className="text-sm font-medium text-ink">
                  Analyse-Cookies
                </div>
                <div className="text-xs mt-0.5 text-ink-muted">
                  Helfen uns zu verstehen, wie Besucher die Website nutzen (z. B. Google Analytics).
                </div>
              </div>
            </div>

            {/* Категорія 3 — Marketing */}
            <div className="flex items-start gap-3 p-3 rounded-lg border border-line bg-surface-card">
              <button
                type="button"
                role="switch"
                aria-checked={draft.marketing}
                onClick={() => setDraft((d) => ({ ...d, marketing: !d.marketing }))}
                className={switchTrack(draft.marketing)}
              >
                <div className={switchKnob(draft.marketing)} />
              </button>
              <div className="flex-1">
                <div className="text-sm font-medium text-ink">
                  Marketing-Cookies
                </div>
                <div className="text-xs mt-0.5 text-ink-muted">
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