// app/lib/seo.ts

export function getAlternates(locale: string, pathname: string) {
  const baseUrl = "https://landstarkbau.de";
  const locales = ["de", "en", "ru", "uk"];
  
  // Формуємо об'єкт мов
  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    // Якщо pathname це "/", то буде https://landstarkbau.de/de
    // Якщо pathname це "/projects", буде https://landstarkbau.de/de/projects
    languages[l] = `${baseUrl}/${l}${pathname === "/" ? "" : pathname}`;
  });

  return {
    // Canonical вказує на поточну мовну версію цієї ж сторінки
    canonical: `${baseUrl}/${locale}${pathname === "/" ? "" : pathname}`,
    languages: {
      ...languages,
      "x-default": `${baseUrl}/de${pathname === "/" ? "" : pathname}`, // Німецька для невідомих мов
    },
  };
}