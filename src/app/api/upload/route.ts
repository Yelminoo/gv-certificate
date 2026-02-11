import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

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

    // Get the file extension
    const fileExtension = file.name.split('.').pop()
    
    // Create filename with datetime and original name
    const now = new Date()
    const datetime = now.toISOString()
      .replace(/:/g, '-')
      .replace(/\..+/, '')
      .replace('T', '_')
    
    // Remove extension from original name
    const originalNameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name
    
    const newFileName = `${datetime}_${originalNameWithoutExt}.${fileExtension}`
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save to public/uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    const filePath = join(uploadDir, newFileName)
    
    await writeFile(filePath, buffer)

    // Return the public URL
    return NextResponse.json({
      success: true,
      fileName: newFileName,
      url: `/uploads/${newFileName}`
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
