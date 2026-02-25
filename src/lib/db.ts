// Cloudflare D1 Database Types and Helpers

export interface Certificate {
  id?: number
  certificate_no: string
  issue_date: string
  identification: string
  weight: string
  dimensions?: string
  cut?: string
  shape?: string
  color?: string
  comment1?: string
  comment2?: string
  origin?: string
  verified_by?: string
  certified_by?: string
  image_url?: string
  signature_url?: string
  created_at?: string
  updated_at?: string
}

export interface Upload {
  id?: number
  file_name: string
  original_name: string
  file_size?: number
  mime_type?: string
  url: string
  uploaded_at?: string
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement
  dump(): Promise<ArrayBuffer>
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>
  exec(query: string): Promise<D1ExecResult>
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement
  first<T = unknown>(colName?: string): Promise<T | null>
  run(): Promise<D1Result>
  all<T = unknown>(): Promise<D1Result<T>>
  raw<T = unknown>(): Promise<T[]>
}

export interface D1Result<T = unknown> {
  results?: T[]
  success: boolean
  error?: string
  meta: {
    duration: number
    size_after: number
    rows_read: number
    rows_written: number
  }
}

export interface D1ExecResult {
  count: number
  duration: number
}

// Helper functions for database operations
export class CertificateDB {
  constructor(private db: D1Database) {}

  async createCertificate(cert: Certificate): Promise<Certificate | null> {
    try {
      const result = await this.db
        .prepare(`
          INSERT INTO certificates (
            certificate_no, issue_date, identification, weight,
            dimensions, cut, shape, color, comment1, comment2,
            origin, verified_by, certified_by, image_url, signature_url
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
        .bind(
          cert.certificate_no,
          cert.issue_date,
          cert.identification,
          cert.weight,
          cert.dimensions || null,
          cert.cut || null,
          cert.shape || null,
          cert.color || null,
          cert.comment1 || null,
          cert.comment2 || null,
          cert.origin || null,
          cert.verified_by || null,
          cert.certified_by || null,
          cert.image_url || null,
          cert.signature_url || null
        )
        .run()

      if (result.success) {
        return await this.getCertificateByCertNo(cert.certificate_no)
      }
      return null
    } catch (error) {
      console.error('Error creating certificate:', error)
      throw error
    }
  }

  async getCertificateByCertNo(certNo: string): Promise<Certificate | null> {
    try {
      const result = await this.db
        .prepare('SELECT * FROM certificates WHERE certificate_no = ?')
        .bind(certNo)
        .first<Certificate>()

      return result
    } catch (error) {
      console.error('Error fetching certificate:', error)
      return null
    }
  }

  async getAllCertificates(limit = 100, offset = 0): Promise<Certificate[]> {
    try {
      const result = await this.db
        .prepare('SELECT * FROM certificates ORDER BY created_at DESC LIMIT ? OFFSET ?')
        .bind(limit, offset)
        .all<Certificate>()

      return result.results || []
    } catch (error) {
      console.error('Error fetching certificates:', error)
      return []
    }
  }

  async searchCertificates(searchTerm: string): Promise<Certificate[]> {
    try {
      const result = await this.db
        .prepare(`
          SELECT * FROM certificates 
          WHERE certificate_no LIKE ? 
             OR identification LIKE ? 
             OR origin LIKE ?
          ORDER BY created_at DESC
        `)
        .bind(`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`)
        .all<Certificate>()

      return result.results || []
    } catch (error) {
      console.error('Error searching certificates:', error)
      return []
    }
  }

  async logUpload(upload: Upload): Promise<Upload | null> {
    try {
      const result = await this.db
        .prepare(`
          INSERT INTO uploads (file_name, original_name, file_size, mime_type, url)
          VALUES (?, ?, ?, ?, ?)
        `)
        .bind(
          upload.file_name,
          upload.original_name,
          upload.file_size || null,
          upload.mime_type || null,
          upload.url
        )
        .run()

      if (result.success) {
        return await this.db
          .prepare('SELECT * FROM uploads WHERE file_name = ?')
          .bind(upload.file_name)
          .first<Upload>()
      }
      return null
    } catch (error) {
      console.error('Error logging upload:', error)
      throw error
    }
  }
}
