// scripts/seed.js
require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const projects = [
  {
    number: 1,
    nameDe: 'MODERNE STADTVILLA',
    nameEn: 'MODERN CITY VILLA',
    nameUa: 'СУЧАСНА МІСЬКА ВІЛЛА',
    nameRu: 'СОВРЕМЕННАЯ ГОРОДСКАЯ ВИЛЛА',

    subtitleDe: 'Minimalismus & Eleganz',
    subtitleEn: 'Minimalism & Elegance',
    subtitleUa: 'Мінімалізм та елегантність',
    subtitleRu: 'Минимализм и элегантность',

    locationDe: 'München',
    locationEn: 'Munich',
    locationUa: 'Мюнхен',
    locationRu: 'Мюнхен',

    descriptionDe:
      'Exklusive moderne Villa mit klaren architektonischen Linien, großzügigem Vorplatz und hochwertiger Fassadengestaltung. Die Kombination aus Naturstein, Glas und Holz schafft ein zeitlos elegantes Erscheinungsbild.',
    descriptionEn:
      'Exclusive modern villa with clean architectural lines, spacious courtyard and premium facade finishes. The combination of natural stone, glass and wood creates a timeless elegant appearance.',
    descriptionUa:
      'Ексклюзивна сучасна вілла з чіткими архітектурними лініями, просторим внутрішнім подвір’ям та преміальним оздобленням фасаду. Поєднання каменю, скла та дерева створює позачасовий елегантний вигляд.',
    descriptionRu:
      'Эксклюзивная современная вилла с чёткими архитектурными линиями, просторным внутренним двором и премиальной отделкой фасада. Сочетание натурального камня, стекла и дерева создаёт вневременный элегантный облик.',

    imageUrl: '/projects/pr1/pr11.png',
    thumbnailUrl: '/projects/pr1/pr11.png',

    region: 'Bayern',
    area: '850 m²',
    year: 2025,

    categoryDe: 'Villa & Landschaftsbau',
    categoryEn: 'Villa & Landscape Construction',
    categoryUa: 'Будівництво вілли та благоустрій',
    categoryRu: 'Строительство виллы и благоустройство',

    servicesDe: [
      'Architekturplanung',
      'Fassadengestaltung',
      'Pflasterarbeiten',
      'Landschaftsbau',
      'Außenbeleuchtung',
    ],
    servicesEn: [
      'Architectural Design',
      'Facade Construction',
      'Paving Works',
      'Landscape Design',
      'Outdoor Lighting',
    ],
    servicesUa: [
      'Архітектурне проєктування',
      'Оздоблення фасаду',
      'Укладання бруківки',
      'Ландшафтний дизайн',
      'Зовнішнє освітлення',
    ],
    servicesRu: [
      'Архитектурное проектирование',
      'Отделка фасада',
      'Укладка брусчатки',
      'Ландшафтный дизайн',
      'Наружное освещение',
    ],

    materialsDe: [
      'Natursteinplatten',
      'Architekturbeton',
      'Glasgeländer',
      'Holzverkleidung',
      'Betonpflaster',
    ],
    materialsEn: [
      'Natural Stone Panels',
      'Architectural Concrete',
      'Glass Railings',
      'Wood Cladding',
      'Concrete Pavers',
    ],
    materialsUa: [
      'Натуральний камінь',
      'Архітектурний бетон',
      'Скляні огорожі',
      'Дерев’яне облицювання',
      'Бетонна бруківка',
    ],
    materialsRu: [
      'Натуральный камень',
      'Архитектурный бетон',
      'Стеклянные ограждения',
      'Деревянная облицовка',
      'Бетонная брусчатка',
    ],

    gallery: [
      '/projects/pr1/pr11.png',
      '/projects/pr1/pr12.jpg',
      '/projects/pr1/pr13.jpg',
      '/projects/pr1/pr14.jpg',
    ],
  },
  {
    number: 2,
    nameDe: 'LUXUSVILLA AM SEE',
    nameEn: 'LAKESIDE LUXURY VILLA',
    nameUa: 'РОЗКІШНА ВІЛЛА БІЛЯ ОЗЕРА',
    nameRu: 'РОСКОШНАЯ ВИЛЛА У ОЗЕРА',

    subtitleDe: 'Exklusivität & Weite',
    subtitleEn: 'Exclusivity & Space',
    subtitleUa: 'Престиж та простір',
    subtitleRu: 'Престиж и простор',

    locationDe: 'Hamburg',
    locationEn: 'Hamburg',
    locationUa: 'Гамбург',
    locationRu: 'Гамбург',

    descriptionDe:
      'Moderne Luxusvilla mit großzügiger Gartenanlage, klarer Architektur und hochwertigen Naturmaterialien. Offene Außenbereiche und weitläufige Grünflächen schaffen eine perfekte Verbindung zwischen Komfort und Natur.',
    descriptionEn:
      'Modern luxury villa with expansive landscaped grounds, clean architectural design and premium natural materials. Open outdoor spaces and vast green areas create a perfect balance of comfort and nature.',
    descriptionUa:
      'Сучасна розкішна вілла з великою озелененою територією, лаконічною архітектурою та преміальними матеріалами. Просторі зовнішні зони та доглянуті газони створюють ідеальне поєднання комфорту й природи.',
    descriptionRu:
      'Современная роскошная вилла с обширным озеленённым участком, лаконичной архитектурой и премиальными натуральными материалами. Просторные внешние зоны и ухоженные газоны создают идеальное сочетание комфорта и природы.',

    imageUrl: '/projects/pr2/pr21.png',
    thumbnailUrl: '/projects/pr2/pr21.png',

    region: 'Hamburg',
    area: '1200 m²',
    year: 2025,

    categoryDe: 'Villa & Landschaftsarchitektur',
    categoryEn: 'Villa & Landscape Architecture',
    categoryUa: 'Вілла та ландшафтна архітектура',
    categoryRu: 'Вилла и ландшафтная архитектура',

    servicesDe: [
      'Architekturplanung',
      'Landschaftsgestaltung',
      'Terrassenbau',
      'Rasenanlage',
      'Außenbeleuchtung',
    ],
    servicesEn: [
      'Architectural Design',
      'Landscape Design',
      'Terrace Construction',
      'Lawn Installation',
      'Outdoor Lighting',
    ],
    servicesUa: [
      'Архітектурне проєктування',
      'Ландшафтний дизайн',
      'Будівництво тераси',
      'Влаштування газону',
      'Зовнішнє освітлення',
    ],
    servicesRu: [
      'Архитектурное проектирование',
      'Ландшафтный дизайн',
      'Строительство террасы',
      'Устройство газона',
      'Наружное освещение',
    ],

    materialsDe: [
      'Naturstein',
      'Holzfassade',
      'Glas',
      'Betonpflaster',
      'Dekorativer Rasen',
    ],
    materialsEn: [
      'Natural Stone',
      'Wood Cladding',
      'Glass',
      'Concrete Paving',
      'Decorative Lawn',
    ],
    materialsUa: [
      'Натуральний камінь',
      'Дерев’яне облицювання',
      'Скло',
      'Бетонна бруківка',
      'Декоративний газон',
    ],
    materialsRu: [
      'Натуральный камень',
      'Деревянная облицовка',
      'Стекло',
      'Бетонная брусчатка',
      'Декоративный газон',
    ],

    gallery: [
      '/projects/pr2/pr21.png',
      '/projects/pr2/pr22.jpg',
      '/projects/pr2/pr23.jpg',
    ],
  },
  {
    number: 3,
    nameDe: 'PARK AM WASSER',
    nameEn: 'WATERFRONT PARK',
    nameUa: 'ПАРК БІЛЯ ВОДИ',
    nameRu: 'ПАРК У ВОДЫ',

    subtitleDe: 'Natur & Urbanes Leben',
    subtitleEn: 'Nature & Urban Living',
    subtitleUa: 'Природа та міський комфорт',
    subtitleRu: 'Природа и городской комфорт',

    locationDe: 'Berlin',
    locationEn: 'Berlin',
    locationUa: 'Берлін',
    locationRu: 'Берлин',

    descriptionDe:
      'Moderner öffentlicher Park mit Wasserpromenade, großzügigen Grünflächen und hochwertigen Erholungsbereichen. Die harmonische Verbindung von Landschaftsarchitektur, Wasserflächen und moderner Infrastruktur schafft einen attraktiven Raum für Freizeit und Erholung.',
    descriptionEn:
      'Modern public park with a waterfront promenade, spacious green areas and premium recreational facilities. The harmonious combination of landscape architecture, water features and contemporary infrastructure creates an attractive space for relaxation and leisure.',
    descriptionUa:
      'Сучасний громадський парк із набережною, просторими зеленими зонами та якісними місцями для відпочинку. Гармонійне поєднання ландшафтної архітектури, водних елементів та сучасної інфраструктури створює привабливий простір для дозвілля.',
    descriptionRu:
      'Современный общественный парк с набережной, просторными зелёными зонами и качественными зонами отдыха. Гармоничное сочетание ландшафтной архитектуры, водных элементов и современной инфраструктуры создаёт привлекательное пространство для отдыха и досуга.',

    imageUrl: '/projects/pr3/pr31.png',
    thumbnailUrl: '/projects/pr3/pr31.png',

    region: 'Berlin',
    area: '4800 m²',
    year: 2024,

    categoryDe: 'Landschaftsarchitektur',
    categoryEn: 'Landscape Architecture',
    categoryUa: 'Ландшафтна архітектура',
    categoryRu: 'Ландшафтная архитектура',

    servicesDe: [
      'Parkplanung',
      'Ufergestaltung',
      'Beleuchtung',
      'Pflanzkonzepte',
      'Freiraumgestaltung',
    ],
    servicesEn: [
      'Park Planning',
      'Waterfront Design',
      'Lighting',
      'Planting Design',
      'Public Space Development',
    ],
    servicesUa: [
      'Проєктування парку',
      'Благоустрій набережної',
      'Освітлення',
      'Озеленення',
      'Створення громадських просторів',
    ],
    servicesRu: [
      'Проектирование парка',
      'Благоустройство набережной',
      'Освещение',
      'Озеленение',
      'Создание общественных пространств',
    ],

    materialsDe: [
      'Naturstein',
      'Holzdecks',
      'Glasgeländer',
      'Zierkiefern',
      'Architekturbeton',
    ],
    materialsEn: [
      'Natural Stone',
      'Wood Decking',
      'Glass Railings',
      'Ornamental Pines',
      'Architectural Concrete',
    ],
    materialsUa: [
      'Натуральний камінь',
      'Терасна дошка',
      'Скляні огорожі',
      'Декоративні сосни',
      'Архітектурний бетон',
    ],
    materialsRu: [
      'Натуральный камень',
      'Террасная доска',
      'Стеклянные ограждения',
      'Декоративные сосны',
      'Архитектурный бетон',
    ],

    gallery: [
      '/projects/pr3/pr31.png',
      '/projects/pr3/pr32.jpg',
      '/projects/pr3/pr33.jpg',
      '/projects/pr3/pr34.png',
    ],
  },
  {
    number: 4,
    nameDe: 'MODERNER HANGGARTEN',
    nameEn: 'MODERN HILLSIDE GARDEN',
    nameUa: 'СУЧАСНИЙ САД НА СХИЛІ',
    nameRu: 'СОВРЕМЕННЫЙ САД НА СКЛОНЕ',

    subtitleDe: 'Architektur & Natur',
    subtitleEn: 'Architecture & Nature',
    subtitleUa: 'Архітектура та природа',
    subtitleRu: 'Архитектура и природа',

    locationDe: 'Freiburg im Breisgau',
    locationEn: 'Freiburg im Breisgau',
    locationUa: 'Фрайбург-ім-Брайсгау',
    locationRu: 'Фрайбург-им-Брайсгау',

    descriptionDe:
      'Elegante Wohnanlage mit modernem Eingangsbereich, geometrischer Gartengestaltung und hochwertiger Pflasterung. Die harmonische Verbindung aus Architektur, Ziergehölzen und natürlicher Hügellandschaft schafft ein exklusives Wohnumfeld.',
    descriptionEn:
      'Elegant residential property featuring a modern entrance area, geometric garden design and premium paving. The harmonious combination of architecture, ornamental plants and natural hillside surroundings creates an exclusive living environment.',
    descriptionUa:
      'Елегантна приватна резиденція із сучасною вхідною зоною, геометричним садом та преміальним мощенням. Гармонійне поєднання архітектури, декоративних рослин і природного пагорбистого ландшафту створює ексклюзивний житловий простір.',
    descriptionRu:
      'Элегантная частная резиденция с современной входной зоной, геометрическим садом и премиальным мощением. Гармоничное сочетание архитектуры, декоративных растений и природного холмистого ландшафта создаёт эксклюзивное жилое пространство.',

    imageUrl: '/projects/pr4/pr41.png',
    thumbnailUrl: '/projects/pr4/pr41.png',

    region: 'Baden-Württemberg',
    area: '650 m²',
    year: 2024,

    categoryDe: 'Garten- und Landschaftsbau',
    categoryEn: 'Garden & Landscape Design',
    categoryUa: 'Садовий та ландшафтний дизайн',
    categoryRu: 'Садовый и ландшафтный дизайн',

    servicesDe: [
      'Eingangsbereich Gestaltung',
      'Pflasterarbeiten',
      'Ziergarten',
      'Beleuchtungskonzept',
      'Landschaftsgestaltung',
    ],
    servicesEn: [
      'Entrance Area Design',
      'Paving Works',
      'Ornamental Garden',
      'Lighting Concept',
      'Landscape Design',
    ],
    servicesUa: [
      'Оформлення вхідної зони',
      'Укладання бруківки',
      'Декоративний сад',
      'Проєкт освітлення',
      'Ландшафтний дизайн',
    ],
    servicesRu: [
      'Оформление входной зоны',
      'Укладка брусчатки',
      'Декоративный сад',
      'Проект освещения',
      'Ландшафтный дизайн',
    ],

    materialsDe: [
      'Betonplatten',
      'Naturstein',
      'Zierkies',
      'Formschnittgehölze',
      'Architekturbeton',
    ],
    materialsEn: [
      'Concrete Slabs',
      'Natural Stone',
      'Decorative Gravel',
      'Topiary Plants',
      'Architectural Concrete',
    ],
    materialsUa: [
      'Бетонні плити',
      'Натуральний камінь',
      'Декоративний гравій',
      'Формовані декоративні кущі',
      'Архітектурний бетон',
    ],
    materialsRu: [
      'Бетонные плиты',
      'Натуральный камень',
      'Декоративный гравий',
      'Формованные декоративные кустарники',
      'Архитектурный бетон',
    ],

    gallery: [
      '/projects/pr4/pr41.png',
      '/projects/pr4/pr42.jpg',
      '/projects/pr4/pr43.jpg',
      '/projects/pr4/pr44.jpg',
    ],
  },
  {
    number: 5,
    nameDe: 'SPORT- UND FREIZEITPARK',
    nameEn: 'SPORTS & RECREATION PARK',
    nameUa: 'СПОРТИВНО-ВІДПОЧИНКОВИЙ ПАРК',
    nameRu: 'СПОРТИВНО-РАЗВЛЕКАТЕЛЬНЫЙ ПАРК',

    subtitleDe: 'Bewegung für Alle',
    subtitleEn: 'Active Life for Everyone',
    subtitleUa: 'Активний відпочинок для всіх',
    subtitleRu: 'Активный отдых для всех',

    locationDe: 'Köln',
    locationEn: 'Cologne',
    locationUa: 'Кельн',
    locationRu: 'Кёльн',

    descriptionDe:
      'Moderner Freizeitpark mit Multifunktionssportplatz, Outdoor-Fitnessbereich und sicheren Spielzonen für Kinder. Das Projekt vereint Sport, Erholung und Familienfreizeit in einer funktionalen und attraktiven Umgebung.',
    descriptionEn:
      'Modern recreation park featuring a multifunctional sports court, outdoor fitness area and safe playgrounds for children. The project combines sports, leisure and family activities in a functional and attractive environment.',
    descriptionUa:
      'Сучасний парк активного відпочинку з багатофункціональним спортивним майданчиком, зоною воркауту та безпечними дитячими майданчиками. Проєкт поєднує спорт, дозвілля та сімейний відпочинок в одному просторі.',
    descriptionRu:
      'Современный парк активного отдыха с многофункциональной спортивной площадкой, зоной воркаута и безопасными детскими площадками. Проект объединяет спорт, досуг и семейный отдых в одном пространстве.',

    imageUrl: '/projects/pr5/pr51.png',
    thumbnailUrl: '/projects/pr5/pr51.png',

    region: 'Nordrhein-Westfalen',
    area: '6200 m²',
    year: 2025,

    categoryDe: 'Sport- und Freizeitanlagen',
    categoryEn: 'Sports & Recreation Facilities',
    categoryUa: 'Спортивні та рекреаційні об’єкти',
    categoryRu: 'Спортивные и рекреационные объекты',

    servicesDe: [
      'Sportplatzbau',
      'Spielplatzgestaltung',
      'Outdoor-Fitness',
      'Gummibeläge',
      'Landschaftsbau',
    ],
    servicesEn: [
      'Sports Court Construction',
      'Playground Design',
      'Outdoor Fitness Area',
      'Rubber Safety Surfacing',
      'Landscape Design',
    ],
    servicesUa: [
      'Будівництво спортивних майданчиків',
      'Проєктування дитячих зон',
      'Воркаут-зона',
      'Безпечне гумове покриття',
      'Ландшафтний дизайн',
    ],
    servicesRu: [
      'Строительство спортивных площадок',
      'Проектирование детских зон',
      'Зона воркаута',
      'Безопасное резиновое покрытие',
      'Ландшафтный дизайн',
    ],

    materialsDe: [
      'EPDM-Belag',
      'Stahlkonstruktionen',
      'Sportbeschichtung',
      'Holzelemente',
      'Sicherheitsboden',
    ],
    materialsEn: [
      'EPDM Surfacing',
      'Steel Structures',
      'Sports Flooring',
      'Wood Elements',
      'Safety Flooring',
    ],
    materialsUa: [
      'EPDM-покриття',
      'Сталеві конструкції',
      'Спортивне покриття',
      'Дерев’яні елементи',
      'Ударопоглинаюче покриття',
    ],
    materialsRu: [
      'EPDM-покрытие',
      'Стальные конструкции',
      'Спортивное покрытие',
      'Деревянные элементы',
      'Ударопоглощающее покрытие',
    ],

    gallery: [
      '/projects/pr5/pr51.png',
      '/projects/pr5/pr52.jpg',
      '/projects/pr5/pr53.jpg',
      '/projects/pr5/pr54.jpg',
      '/projects/pr5/pr55.jpg',
      '/projects/pr5/pr56.jpg',
    ],
  },
]

async function main() {
  console.log('🌱 Seeding database...\n')

  for (const project of projects) {
    try {
      const existing = await prisma.project.findUnique({
        where: { number: project.number },
      })

      if (existing) {
        await prisma.project.update({
          where: { number: project.number },
          data: project,
        })
        console.log(`🔄 Updated: ${project.nameDe}`)
      } else {
        await prisma.project.create({
          data: project,
        })
        console.log(`✅ Created: ${project.nameDe}`)
      }
    } catch (error) {
      console.error(`❌ Error with ${project.nameDe}:`, error.message)
    }
  }

  const count = await prisma.project.count()
  console.log(`\n📊 Total projects in database: ${count}`)
  console.log('🎉 Seeding finished!')

  await prisma.$disconnect()
  await pool.end()
}

main().catch(console.error)