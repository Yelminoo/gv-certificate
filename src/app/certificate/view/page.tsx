"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import CertificateLayout from "@/components/CertificateLayout"

function CertificateView() {
  const searchParams = useSearchParams()
  const encoded = searchParams.get("data")

  if (!encoded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Invalid or missing certificate data
      </div>
    )
  }

  const data = JSON.parse(atob(encoded))

  const handlePrint = () => {
    window.print()
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
          date={data.date}
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
