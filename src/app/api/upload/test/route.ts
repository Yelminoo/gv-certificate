import { NextResponse } from 'next/server'
import { HeadBucketCommand } from '@aws-sdk/client-s3'
import { getSpacesClient, getSpacesConfig } from '@/lib/spaces'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const config = getSpacesConfig()
    const spaces = getSpacesClient(config)
    await spaces.send(new HeadBucketCommand({ Bucket: config.bucket }))
    return NextResponse.json({ ok: true, bucket: config.bucket, region: config.region, prefix: config.projectPrefix })
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 500 })
  }
}
