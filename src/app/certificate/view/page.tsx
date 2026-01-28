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
          fullName={data.fullName}
          title={data.title}
          issueDate={data.issueDate}
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
