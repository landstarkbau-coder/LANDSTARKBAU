// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Locale = 'de' | 'en' | 'ua' | 'ru'

// ─── Хелпер: вибір локалізованого поля ───────────────
function pick<T>(locale: Locale, values: { de: T; en: T; ua: T; ru: T }): T {
  return values[locale] ?? values.de
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const rawLocale = searchParams.get('locale') || 'de'
    const locale: Locale = ['de', 'en', 'ua', 'ru'].includes(rawLocale)
      ? (rawLocale as Locale)
      : 'de'

    const projects = await prisma.project.findMany({
      orderBy: {
        number: 'asc',
      },
    })

    // Трансформуємо дані залежно від мови
    const transformedProjects = projects.map((project) => ({
      id: project.id,
      number: project.number,

      name: pick(locale, {
        de: project.nameDe,
        en: project.nameEn,
        ua: project.nameUa,
        ru: project.nameRu,
      }),
      subtitle: pick(locale, {
        de: project.subtitleDe,
        en: project.subtitleEn,
        ua: project.subtitleUa,
        ru: project.subtitleRu,
      }),
      location: pick(locale, {
        de: project.locationDe,
        en: project.locationEn,
        ua: project.locationUa,
        ru: project.locationRu,
      }),
      description: pick(locale, {
        de: project.descriptionDe,
        en: project.descriptionEn,
        ua: project.descriptionUa,
        ru: project.descriptionRu,
      }),
      category: pick(locale, {
        de: project.categoryDe,
        en: project.categoryEn,
        ua: project.categoryUa,
        ru: project.categoryRu,
      }),
      services: pick(locale, {
        de: project.servicesDe,
        en: project.servicesEn,
        ua: project.servicesUa,
        ru: project.servicesRu,
      }),
      materials: pick(locale, {
        de: project.materialsDe,
        en: project.materialsEn,
        ua: project.materialsUa,
        ru: project.materialsRu,
      }),

      // Спільні поля
      imageUrl: project.imageUrl,
      thumbnailUrl: project.thumbnailUrl,
      region: project.region,
      area: project.area,
      year: project.year,
      gallery: project.gallery,
    }))

    return NextResponse.json(transformedProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}