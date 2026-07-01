// app/components/ScrollToHash.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const checkHashAndScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Невелика затримка гарантує, що DOM повністю оновився після навігації.
    const timeoutId = setTimeout(checkHashAndScroll, 150);
    return () => clearTimeout(timeoutId);
  }, [pathname]); // Спрацьовує при кожній зміні шляху (включаючи зміну локалі).

  return null;
}