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

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center">
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
