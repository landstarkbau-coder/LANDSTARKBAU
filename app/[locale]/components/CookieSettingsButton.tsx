'use client';

interface CookieSettingsButtonProps {
  isDark: boolean;
}

export function CookieSettingsButton({ isDark }: CookieSettingsButtonProps) {
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
      className={`text-xs transition-colors ${
        isDark
          ? 'text-white/30 hover:text-white'
          : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      Cookie-Einstellungen ändern
    </button>
  );
}