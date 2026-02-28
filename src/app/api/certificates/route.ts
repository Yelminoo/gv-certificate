export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dbId = searchParams.get('dbId') || searchParams.get('id');
    if (!dbId) {
      return NextResponse.json({ error: 'Missing dbId' }, { status: 400 });
    }
    const idInt = parseInt(dbId, 10);
    if (isNaN(idInt)) {
      return NextResponse.json({ error: 'Invalid dbId' }, { status: 400 });
    }
    const deleted = await prisma.certificate.delete({ where: { id: idInt } });
    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const certificateData = {
      certificateNo: data.certificateNo,
      issueDate: data.date,
      identification: data.identification,
      weight: data.weight,
      dimensions: data.dimensions ?? null,
      cut: data.cut ?? null,
      shape: data.shape ?? null,
      color: data.color ?? null,
      comment1: data.comment1 ?? null,
      comment2: data.comment2 ?? null,
      origin: data.origin ?? null,
      verifiedBy: data.verifiedBy ?? null,
      certifiedBy: data.certifiedBy ?? null,
      imageUrl: data.imageUrl ?? null,
      signatureUrl: data.signatureUrl ?? null,
    }

    const created = await prisma.certificate.create({ data: certificateData })

    return NextResponse.json({
      success: true,
      message: 'Certificate saved successfully',
      dbId: created.id,
      certificateNo: created.certificateNo,
    })
  } catch (error) {
    const errorCode =
      typeof error === 'object' && error !== null && 'code' in error
        ? (error as { code?: string }).code
        : undefined

    if (errorCode === 'P2002') {
      return NextResponse.json({ error: 'Certificate number already exists' }, { status: 409 })
    }

    console.error('Error saving certificate:', error)
    return NextResponse.json(
      { error: 'Failed to save certificate' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const certNo = searchParams.get('certNo')
    const dbId = searchParams.get('dbId')
    const search = searchParams.get('search')

    if (certNo || dbId) {
      let certificate = null;
      if (dbId) {
        // Try to find by database id (integer)
        const idInt = parseInt(dbId, 10);
        if (!isNaN(idInt)) {
          certificate = await prisma.certificate.findUnique({ where: { id: idInt } });
        }
      }
      if (!certificate && certNo) {
        certificate = await prisma.certificate.findFirst({ where: { certificateNo: certNo } });
      }
      if (!certificate) {
        return NextResponse.json(
          { error: 'Certificate not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(certificate)
    }

    if (search) {
      const certificates = await prisma.certificate.findMany({
        where: {
          OR: [
            { certificateNo: { contains: search, mode: 'insensitive' } },
            { identification: { contains: search, mode: 'insensitive' } },
            { origin: { contains: search, mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json({ certificates, count: certificates.length })
    }

    const parsedLimit = Number.parseInt(searchParams.get('limit') || '100', 10)
    const parsedOffset = Number.parseInt(searchParams.get('offset') || '0', 10)
    const limit = Number.isNaN(parsedLimit) ? 100 : Math.min(Math.max(parsedLimit, 1), 500)
    const offset = Number.isNaN(parsedOffset) ? 0 : Math.max(parsedOffset, 0)

    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    })

    return NextResponse.json({ certificates, count: certificates.length })
  } catch (error) {
    console.error('Error fetching certificates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch certificates' },
      { status: 500 }
    )
  }
}
