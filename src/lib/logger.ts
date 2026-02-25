import { writeFile, appendFile, mkdir, readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export interface CertificateLogEntry {
  timestamp: string
  certificateNo: string
  date: string
  identification: string
  weight: string
  dimensions?: string
  cut?: string
  shape?: string
  color?: string
  comment1?: string
  comment2?: string
  origin?: string
  verifiedBy?: string
  certifiedBy?: string
  imageFile?: string
  signatureFile?: string
}

export async function logCertificate(data: CertificateLogEntry): Promise<void> {
  try {
    const logsDir = join(process.cwd(), 'logs')
    
    // Create logs directory if it doesn't exist
    if (!existsSync(logsDir)) {
      await mkdir(logsDir, { recursive: true })
    }

    const now = new Date()
    const logFileName = `certificates_${now.toISOString().split('T')[0]}.log`
    const logFilePath = join(logsDir, logFileName)

    // Format log entry
    const logEntry = `
========================================
Timestamp: ${data.timestamp}
Certificate No: ${data.certificateNo}
Date: ${data.date}
Identification: ${data.identification}
Weight: ${data.weight}
${data.dimensions ? `Dimensions: ${data.dimensions}` : ''}
${data.cut ? `Cut: ${data.cut}` : ''}
${data.shape ? `Shape: ${data.shape}` : ''}
${data.color ? `Color: ${data.color}` : ''}
${data.comment1 ? `Comment 1: ${data.comment1}` : ''}
${data.comment2 ? `Comment 2: ${data.comment2}` : ''}
${data.origin ? `Origin: ${data.origin}` : ''}
${data.verifiedBy ? `Verified By: ${data.verifiedBy}` : ''}
${data.certifiedBy ? `Certified By: ${data.certifiedBy}` : ''}
${data.imageFile ? `Image File: ${data.imageFile}` : ''}
${data.signatureFile ? `Signature: ${data.signatureFile}` : ''}
========================================
`

    // Append to log file
    await appendFile(logFilePath, logEntry)

    // Also create a JSON log for easier parsing
    const jsonLogFileName = `certificates_${now.toISOString().split('T')[0]}.json`
    const jsonLogFilePath = join(logsDir, jsonLogFileName)
    
    let jsonLogs: CertificateLogEntry[] = []
    
    if (existsSync(jsonLogFilePath)) {
      const content = await readFile(jsonLogFilePath, 'utf-8')
      jsonLogs = JSON.parse(content)
    }
    
    jsonLogs.push(data)
    await writeFile(jsonLogFilePath, JSON.stringify(jsonLogs, null, 2))

    console.log(`Certificate logged: ${data.certificateNo} at ${data.timestamp}`)
  } catch (error) {
    console.error('Failed to log certificate:', error)
  }
}
