"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import CertificateLayout from "@/components/CertificateLayout"

import { useEffect, useState } from "react"

function CertificateView() {
  const searchParams = useSearchParams()
  const encodedData = searchParams.get("data")
  const encodedDbId = searchParams.get("dbId")
  interface CertificateData {
    certificateNo: string;
    date?: string;
    issueDate?: string;
    identification: string;
    weight: string;
    dimensions?: string;
    cut?: string;
    shape?: string;
    color?: string;
    comment1?: string;
    comment2?: string;
    origin?: string;
    verifiedBy?: string;
    certifiedBy?: string;
    qrValue?: string;
    imageUrl?: string;
    signatureUrl?: string;
  }
  const [data, setData] = useState<CertificateData | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (encodedData) {
      try {
        setData(JSON.parse(atob(encodedData)))
      } catch {
        setError("Invalid certificate data format")
      }
      return
    }
    if (encodedDbId) {
      const dbId = encodedDbId;
      try {
        // Optionally validate dbId format here
      } catch {
        setError("Invalid database id")
        return
      }
      fetch(`/api/certificates?dbId=${encodeURIComponent(dbId)}`)
        .then(async (res) => {
          if (!res.ok) throw new Error("Certificate not found")
          return res.json()
        })
        .then((cert) => setData(cert))
        .catch((err) => setError(err.message))
      return
    }
    setError("Invalid or missing certificate data")
  }, [encodedData, encodedDbId])

  const handlePrint = () => {
    window.print()
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-700">
        {error}
      </div>
    )
  }
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading...</div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 print:bg-white print:p-0">
      {/* Action bar */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-end print:hidden">
        <button
          onClick={handlePrint}
          className="bg-[#8d1b20] hover:bg-[#6d1418] text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
        >
          Print / Save PDF
        </button>
      </div>

      {/* Certificate */}
      <div className="flex justify-center print:block">
        <CertificateLayout
          certificateNo={data.certificateNo}
          date={data.date ?? data.issueDate ?? ""}
          identification={data.identification}
          weight={data.weight}
          dimensions={data.dimensions}
          cut={data.cut}
          shape={data.shape}
          color={data.color}
          comment1={data.comment1}
          comment2={data.comment2}
          origin={data.origin}
          verifiedBy={data.verifiedBy}
          certifiedBy={data.certifiedBy}
          qrValue={data.qrValue}
          imageUrl={data.imageUrl}
          signatureUrl={data.signatureUrl}
        />
      </div>
    </main>
  )
}

export default function CertificateViewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading certificate...</div>}>
      <CertificateView />
    </Suspense>
  )
}
