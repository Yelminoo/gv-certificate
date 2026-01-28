"use client"

import { useSearchParams } from "next/navigation"
import CertificateLayout from "@/components/CertificateLayout"

export default function CertificatePreviewPage() {
  const searchParams = useSearchParams()
  const encoded = searchParams.get("data")

  if (!encoded) return <p className="p-10">Invalid certificate data</p>
  const qrValue =
    typeof window !== "undefined" && encoded
      ? `${window.location.origin}/certificate/view?data=${encoded}`
      : ""

  const data = JSON.parse(atob(encoded))

  const handlePrint = () => {
    window.print()
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      {/* Action bar */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-end print:hidden">
        <button
          onClick={handlePrint}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Print / Save PDF
        </button>
      </div>

      {/* Certificate */}
      <div className="flex justify-center">
        <CertificateLayout
        fullName={data.fullName}
        title={data.title}
        issueDate={data.issueDate}
        qrValue={qrValue}
      />

      </div>
    </main>
  )
}
