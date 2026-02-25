import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { prisma } from '@/lib/prisma'
import { buildSpacesPublicUrl, getSpacesClient, getSpacesConfig } from '@/lib/spaces'

export const runtime = 'nodejs'

function sanitizeFilename(fileName: string): { baseName: string; extension: string } {
  const lastDot = fileName.lastIndexOf('.')
  const base = (lastDot > 0 ? fileName.slice(0, lastDot) : fileName)
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const extension = (lastDot > 0 ? fileName.slice(lastDot + 1) : 'bin')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')

  return {
    baseName: base || 'file',
    extension: extension || 'bin',
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const config = getSpacesConfig()
    const spaces = getSpacesClient(config)

    const now = new Date()
    const year = String(now.getUTCFullYear())
    const month = String(now.getUTCMonth() + 1).padStart(2, '0')
    const { baseName, extension } = sanitizeFilename(file.name || 'upload.bin')
    const fileName = `${randomUUID()}-${baseName}.${extension}`
    const objectKey = `${config.projectPrefix}/${year}/${month}/${fileName}`

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const mimeType = file.type || 'application/octet-stream'

    await spaces.send(
      new PutObjectCommand({
        Bucket: config.bucket,
        Key: objectKey,
        Body: buffer,
        ContentType: mimeType,
        ContentLength: buffer.length,
        CacheControl: 'public, max-age=31536000, immutable',
        ACL: 'public-read', // Make uploaded file public
      })
    )

    const url = buildSpacesPublicUrl(config, objectKey)

    await prisma.upload.create({
      data: {
        fileName,
        originalName: file.name,
        fileSize: file.size,
        mimeType,
        url,
      },
    })

    return NextResponse.json({
      success: true,
      fileName,
      key: objectKey,
      url,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
