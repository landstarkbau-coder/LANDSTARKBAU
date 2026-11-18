// app/api/admin/projects/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import cloudinary  from '@/lib/cloudinary'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: { number: 'asc' },
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()

    // Знаходимо максимальний номер для нового проєкту
    const lastProject = await prisma.project.findFirst({
      orderBy: { number: 'desc' },
    })
    const nextNumber = lastProject ? lastProject.number + 1 : 1

    const project = await prisma.project.create({
      data: {
        number: nextNumber,
        nameDe: body.nameDe,
        nameEn: body.nameEn || body.nameDe,
        nameUa: body.nameUa || body.nameDe,
        nameRu: body.nameRu || body.nameDe,
        subtitleDe: body.subtitleDe,
        subtitleEn: body.subtitleEn,
        subtitleUa: body.subtitleUa,
        subtitleRu: body.subtitleRu,
        locationDe: body.locationDe,
        locationEn: body.locationEn || body.locationDe,
        locationUa: body.locationUa || body.locationDe,
        locationRu: body.locationRu || body.locationDe,
        descriptionDe: body.descriptionDe,
        descriptionEn: body.descriptionEn || body.descriptionDe,
        descriptionUa: body.descriptionUa || body.descriptionDe,
        descriptionRu: body.descriptionRu || body.descriptionDe,
        categoryDe: body.categoryDe,
        categoryEn: body.categoryEn || body.categoryDe,
        categoryUa: body.categoryUa || body.categoryDe,
        categoryRu: body.categoryRu || body.categoryDe,
        servicesDe: body.servicesDe || [],
        servicesEn: body.servicesEn || [],
        servicesUa: body.servicesUa || [],
        servicesRu: body.servicesRu || [],
        materialsDe: body.materialsDe || [],
        materialsEn: body.materialsEn || [],
        materialsUa: body.materialsUa || [],
        materialsRu: body.materialsRu || [],
        imageUrl: body.imageUrl,
        imagePublicId: body.imagePublicId,
        thumbnailUrl: body.thumbnailUrl,
        thumbnailPublicId: body.thumbnailPublicId,
        region: body.region,
        area: body.area,
        year: body.year ? parseInt(body.year) : null,
        gallery: body.gallery || [],
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    // Оновлюємо проєкт
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        nameDe: data.nameDe,
        nameEn: data.nameEn,
        nameUa: data.nameUa,
        nameRu: data.nameRu,
        subtitleDe: data.subtitleDe,
        subtitleEn: data.subtitleEn,
        subtitleUa: data.subtitleUa,
        subtitleRu: data.subtitleRu,
        locationDe: data.locationDe,
        locationEn: data.locationEn,
        locationUa: data.locationUa,
        locationRu: data.locationRu,
        descriptionDe: data.descriptionDe,
        descriptionEn: data.descriptionEn,
        descriptionUa: data.descriptionUa,
        descriptionRu: data.descriptionRu,
        categoryDe: data.categoryDe,
        categoryEn: data.categoryEn,
        categoryUa: data.categoryUa,
        categoryRu: data.categoryRu,
        servicesDe: data.servicesDe,
        servicesEn: data.servicesEn,
        servicesUa: data.servicesUa,
        servicesRu: data.servicesRu,
        materialsDe: data.materialsDe,
        materialsEn: data.materialsEn,
        materialsUa: data.materialsUa,
        materialsRu: data.materialsRu,
        imageUrl: data.imageUrl,
        imagePublicId: data.imagePublicId,
        thumbnailUrl: data.thumbnailUrl,
        thumbnailPublicId: data.thumbnailPublicId,
        region: data.region,
        area: data.area,
        year: data.year ? parseInt(data.year) : null,
        gallery: data.gallery,
      },
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    // 1. Знаходимо проєкт, щоб отримати publicId всіх фото
    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // 2. Збираємо всі publicId для видалення
    const publicIdsToDelete: string[] = []

    if (project.imagePublicId) publicIdsToDelete.push(project.imagePublicId)
    if (project.thumbnailPublicId) publicIdsToDelete.push(project.thumbnailPublicId)

    // Парсимо галерею (вона зберігається як JSON-масив об'єктів)
    if (Array.isArray(project.gallery)) {
      (project.gallery as any[]).forEach((item) => {
        if (item.publicId) publicIdsToDelete.push(item.publicId)
      })
    }

    // 3. Видаляємо фото з Cloudinary (якщо є що видаляти)
    if (publicIdsToDelete.length > 0) {
      try {
        // Використовуємо Admin API для пакетного видалення
        await cloudinary.api.delete_resources(publicIdsToDelete)
        console.log(`Deleted ${publicIdsToDelete.length} images from Cloudinary`)
      } catch (cloudinaryError) {
        // Логуємо помилку, але не зупиняємо видалення проєкту з бази,
        // щоб уникнути "застрягання" даних, якщо Cloudinary тимчасово недоступний
        console.error('Cloudinary deletion error:', cloudinaryError)
      }
    }

    // 4. Видаляємо проєкт з бази даних
    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Project deleted' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}