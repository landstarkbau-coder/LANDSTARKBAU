// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'de';
    
    const projects = await prisma.project.findMany({
      orderBy: {
        number: 'asc',
      },
    });
    
    // Трансформуємо дані залежно від мови
    const transformedProjects = projects.map((project: any) => ({
      id: project.id,
      number: project.number,
      name: locale === 'de' ? project.nameDe : locale === 'en' ? project.nameEn : project.nameUa,
      subtitle: locale === 'de' ? project.subtitleDe : locale === 'en' ? project.subtitleEn : project.subtitleUa,
      location: locale === 'de' ? project.locationDe : locale === 'en' ? project.locationEn : project.locationUa,
      description: locale === 'de' ? project.descriptionDe : locale === 'en' ? project.descriptionEn : project.descriptionUa,
      imageUrl: project.imageUrl,
      thumbnailUrl: project.thumbnailUrl,
      region: project.region,
      area: project.area,
      year: project.year,
      category: project.category,
      gallery: project.gallery,
      services: project.services,
      materials: project.materials,
    }));
    
    return NextResponse.json(transformedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}