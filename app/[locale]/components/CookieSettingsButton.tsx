'use client';

export function CookieSettingsButton() {
  const handleClick = () => {
    // Відкриваємо панель категорій одразу (не перший рівень)
    window.dispatchEvent(
      new CustomEvent('open-cookie-settings', { detail: { details: true } })
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-xs text-ink-muted hover:text-ink transition-colors"
    >
      Cookie-Einstellungen ändern
    </button>
  );
}