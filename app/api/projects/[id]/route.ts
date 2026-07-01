// app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'de';
    
    const project = await prisma.project.findUnique({
      where: { id },
    });
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    const transformedProject = {
      id: project.id,
      number: project.number,
      name: locale === 'de' ? project.nameDe : locale === 'en' ? project.nameEn : project.nameUa,
      subtitle: locale === 'de' ? project.subtitleDe : locale === 'en' ? project.subtitleEn : project.subtitleUa,
      location: locale === 'de' ? project.locationDe : locale === 'en' ? project.locationEn : project.locationUa,
      description: locale === 'de' ? project.descriptionDe : locale === 'en' ? project.descriptionEn : project.descriptionUa,
      fullDescription: locale === 'de' ? project.descriptionDe : locale === 'en' ? project.descriptionEn : project.descriptionUa,
      imageUrl: project.imageUrl,
      thumbnailUrl: project.thumbnailUrl,
      region: project.region,
      area: project.area,
      year: project.year,
      category: locale === 'de' ? project.categoryDe : locale === 'en' ? project.categoryEn : project.categoryUa,
      gallery: project.gallery,
      services: locale === 'de' ? project.servicesDe : locale === 'en' ? project.servicesEn : project.servicesUa,
      materials: locale === 'de' ? project.materialsDe : locale === 'en' ? project.materialsEn : project.materialsUa,
    };
    
    return NextResponse.json(transformedProject);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}