import { S3Client } from '@aws-sdk/client-s3'

export type SpacesConfig = {
  region: string
  endpoint: string
  bucket: string
  accessKeyId: string
  secretAccessKey: string
  projectPrefix: string
  publicBaseUrl: string
}

function normalizePathSegment(input: string): string {
  return input.replace(/^\/+|\/+$/g, '')
}

export function getSpacesConfig(): SpacesConfig {
  const region = process.env.SPACES_REGION
  const bucket = process.env.SPACES_BUCKET
  const accessKeyId = process.env.SPACES_ACCESS_KEY_ID
  const secretAccessKey = process.env.SPACES_SECRET_ACCESS_KEY

  const missing = [
    ['SPACES_REGION', region],
    ['SPACES_BUCKET', bucket],
    ['SPACES_ACCESS_KEY_ID', accessKeyId],
    ['SPACES_SECRET_ACCESS_KEY', secretAccessKey],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name)

  if (missing.length > 0) {
    throw new Error(`Missing Spaces environment variables: ${missing.join(', ')}`)
  }

  const endpoint = process.env.SPACES_ENDPOINT || `https://${region}.digitaloceanspaces.com`
  const projectPrefix = normalizePathSegment(process.env.SPACES_PROJECT_PREFIX || 'gv-certificate/uploads')
  const publicBaseUrl =
    process.env.SPACES_PUBLIC_BASE_URL || `https://${bucket}.${region}.digitaloceanspaces.com`

  return {
    region: region as string,
    endpoint,
    bucket: bucket as string,
    accessKeyId: accessKeyId as string,
    secretAccessKey: secretAccessKey as string,
    projectPrefix,
    publicBaseUrl,
  }
}

const clients = new Map<string, S3Client>()

export function getSpacesClient(config: SpacesConfig): S3Client {
  const key = `${config.endpoint}|${config.region}|${config.accessKeyId}`
  const existing = clients.get(key)
  if (existing) {
    return existing
  }

  const client = new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    forcePathStyle: false,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  })

  clients.set(key, client)
  return client
}

export function buildSpacesPublicUrl(config: SpacesConfig, objectKey: string): string {
  return `${config.publicBaseUrl.replace(/\/+$/, '')}/${objectKey}`
}
