// lib/germany-geo.ts
// Мапа: Назва міста (як в базі) -> ID федеральної землі (як в GeoJSON)
export const CITY_TO_REGION: Record<string, string> = {
  // Nordrhein-Westfalen
  'Bonn': 'DE-NW',
  'Köln': 'DE-NW',
  'Düsseldorf': 'DE-NW',
  'Dortmund': 'DE-NW',
  'Essen': 'DE-NW',
  'Duisburg': 'DE-NW',
  'Bochum': 'DE-NW',
  'Wuppertal': 'DE-NW',
  'Bielefeld': 'DE-NW',
  'Münster': 'DE-NW',
  'Aachen': 'DE-NW',

  // Berlin
  'Berlin': 'DE-BE',

  // Bayern
  'München': 'DE-BY',
  'Nürnberg': 'DE-BY',
  'Augsburg': 'DE-BY',
  'Regensburg': 'DE-BY',
  'Würzburg': 'DE-BY',

  // Hamburg
  'Hamburg': 'DE-HH',

  // Hessen
  'Frankfurt': 'DE-HE',
  'Wiesbaden': 'DE-HE',
  'Kassel': 'DE-HE',
  'Darmstadt': 'DE-HE',

  // Baden-Württemberg
  'Stuttgart': 'DE-BW',
  'Mannheim': 'DE-BW',
  'Karlsruhe': 'DE-BW',
  'Freiburg': 'DE-BW',
  'Heidelberg': 'DE-BW',
  'Ulm': 'DE-BW',

  // Niedersachsen
  'Hannover': 'DE-NI',
  'Braunschweig': 'DE-NI',
  'Osnabrück': 'DE-NI',
  'Oldenburg': 'DE-NI',

  // Bremen
  'Bremen': 'DE-HB',
  'Bremerhaven': 'DE-HB',

  // Rheinland-Pfalz
  'Mainz': 'DE-RP',
  'Ludwigshafen': 'DE-RP',
  'Koblenz': 'DE-RP',
  'Trier': 'DE-RP',

  // Saarland
  'Saarbrücken': 'DE-SL',

  // Schleswig-Holstein
  'Kiel': 'DE-SH',
  'Lübeck': 'DE-SH',

  // Brandenburg
  'Potsdam': 'DE-BB',
  'Cottbus': 'DE-BB',

  // Sachsen
  'Dresden': 'DE-SN',
  'Leipzig': 'DE-SN',
  'Chemnitz': 'DE-SN',

  // Sachsen-Anhalt
  'Magdeburg': 'DE-ST',
  'Halle': 'DE-ST',

  // Thüringen
  'Erfurt': 'DE-TH',
  'Jena': 'DE-TH',
  'Gera': 'DE-TH',

  // Mecklenburg-Vorpommern
  'Rostock': 'DE-MV',
  'Schwerin': 'DE-MV',
}