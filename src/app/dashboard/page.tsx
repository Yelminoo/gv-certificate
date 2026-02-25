import { prisma } from '@/lib/prisma'
import { DashboardCharts } from './DashboardCharts'

export const runtime = 'nodejs'

type Certificate = {
  id: string
  certificateNo: string
  issueDate: string
  identification: string
  weight: string
  dimensions: string
  cut: string
  shape: string
  color: string
  comment1: string
  comment2: string
  origin: string
  verifiedBy: string
  certifiedBy: string
  imageUrl?: string
  signatureUrl?: string
  createdAt: Date
}

export default async function DashboardPage() {
  const rawCertificates = await prisma.certificate.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })
  const certificates: Certificate[] = rawCertificates.map(cert => ({
    id: cert.id.toString(),
    certificateNo: cert.certificateNo,
    issueDate: cert.issueDate,
    identification: cert.identification,
    weight: cert.weight,
    dimensions: cert.dimensions ?? '',
    cut: cert.cut ?? '',
    shape: cert.shape ?? '',
    color: cert.color ?? '',
    comment1: cert.comment1 ?? '',
    comment2: cert.comment2 ?? '',
    origin: cert.origin ?? '',
    verifiedBy: cert.verifiedBy ?? '',
    certifiedBy: cert.certifiedBy ?? '',
    imageUrl: cert.imageUrl ?? undefined,
    signatureUrl: cert.signatureUrl ?? undefined,
    createdAt: cert.createdAt,
  }))
  const idCounts: Record<string, number> = {}
  certificates.forEach((cert: Certificate) => {
    const id = cert.identification || 'Unknown'
    idCounts[id] = (idCounts[id] || 0) + 1
  })
  const pieLabels = Object.keys(idCounts)
  const pieData = Object.values(idCounts)

  // Analytics: certificates per day (line chart)
  const dayCounts: Record<string, number> = {}
  certificates.forEach((cert: Certificate) => {
    const day = cert.createdAt ? cert.createdAt.toISOString().slice(0, 10) : 'Unknown'
    dayCounts[day] = (dayCounts[day] || 0) + 1
  })
  const lineLabels = Object.keys(dayCounts).sort()
  const lineData = lineLabels.map(day => dayCounts[day])


  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Certificate Dashboard</h1>
      <p className="mb-4 text-gray-600">Total certificates: {certificates.length}</p>

      <DashboardCharts
        pieLabels={pieLabels}
        pieData={pieData}
        lineLabels={lineLabels}
        lineData={lineData}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-black bg-white rounded-lg">
          <thead className="bg-white">
            <tr>
              <th className="px-3 py-2 border border-black text-black">Certificate No</th>
              <th className="px-3 py-2 border border-black text-black">Issue Date</th>
              <th className="px-3 py-2 border border-black text-black">Identification</th>
              <th className="px-3 py-2 border border-black text-black">Weight</th>
              <th className="px-3 py-2 border border-black text-black">Dimensions</th>
              <th className="px-3 py-2 border border-black text-black">Cut</th>
              <th className="px-3 py-2 border border-black text-black">Shape</th>
              <th className="px-3 py-2 border border-black text-black">Color</th>
              <th className="px-3 py-2 border border-black text-black">Comment1</th>
              <th className="px-3 py-2 border border-black text-black">Comment2</th>
              <th className="px-3 py-2 border border-black text-black">Origin</th>
              <th className="px-3 py-2 border border-black text-black">Verified By</th>
              <th className="px-3 py-2 border border-black text-black">Certified By</th>
              <th className="px-3 py-2 border border-black text-black">Image</th>
              <th className="px-3 py-2 border border-black text-black">Signature</th>
              <th className="px-3 py-2 border border-black text-black">Created At</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map(cert => (
              <tr key={cert.id} className="hover:bg-black hover:text-white transition-colors">
                <td className="px-3 py-2 border border-black font-mono">{cert.certificateNo}</td>
                <td className="px-3 py-2 border border-black">{cert.issueDate}</td>
                <td className="px-3 py-2 border border-black">{cert.identification}</td>
                <td className="px-3 py-2 border border-black">{cert.weight}</td>
                <td className="px-3 py-2 border border-black">{cert.dimensions}</td>
                <td className="px-3 py-2 border border-black">{cert.cut}</td>
                <td className="px-3 py-2 border border-black">{cert.shape}</td>
                <td className="px-3 py-2 border border-black">{cert.color}</td>
                <td className="px-3 py-2 border border-black">{cert.comment1}</td>
                <td className="px-3 py-2 border border-black">{cert.comment2}</td>
                <td className="px-3 py-2 border border-black">{cert.origin}</td>
                <td className="px-3 py-2 border border-black">{cert.verifiedBy}</td>
                <td className="px-3 py-2 border border-black">{cert.certifiedBy}</td>
                <td className="px-3 py-2 border border-black">
                  {cert.imageUrl ? (
                    <a href={cert.imageUrl} target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-white">View</a>
                  ) : '-'}
                </td>
                <td className="px-3 py-2 border border-black">
                  {cert.signatureUrl ? (
                    <a href={cert.signatureUrl} target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-white">View</a>
                  ) : '-'}
                </td>
                <td className="px-3 py-2 border border-black font-mono text-xs">{cert.createdAt?.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
