import { NextRequest, NextResponse } from 'next/server'
import { logCertificate, CertificateLogEntry } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Extract filename from URLs if present
    const imageFile = data.imageUrl ? data.imageUrl.split('/').pop() : undefined
    const signatureFile = data.signatureUrl ? 'embedded-signature' : undefined

    const logEntry: CertificateLogEntry = {
      timestamp: new Date().toISOString(),
      certificateNo: data.certificateNo,
      date: data.date,
      identification: data.identification,
      weight: data.weight,
      dimensions: data.dimensions,
      cut: data.cut,
      shape: data.shape,
      color: data.color,
      comment1: data.comment1,
      comment2: data.comment2,
      origin: data.origin,
      verifiedBy: data.verifiedBy,
      certifiedBy: data.certifiedBy,
      imageFile,
      signatureFile,
    }

    await logCertificate(logEntry)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logging error:', error)
    return NextResponse.json(
      { error: 'Failed to log certificate' },
      { status: 500 }
    )
  }
}
