"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CertificateFormPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    certificateNo: "",
    date: "",
    identification: "",
    weight: "",
    dimensions: "",
    cut: "",
    shape: "",
    color: "",
    comment1: "",
    comment2: "",
    origin: "",
    verifiedBy: "",
    certifiedBy: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const encodedData = btoa(JSON.stringify(form))
    router.push(`/certificate/preview?data=${encodedData}`)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl space-y-4 border-2 border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Gemstone Certificate Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="certificateNo"
            placeholder="Certificate No. *"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8d1b20]"
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8d1b20]"
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          name="identification"
          placeholder="Identification (e.g., Natural Ruby) *"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8d1b20]"
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="weight"
            placeholder="Weight (e.g., 2.50 cts) *"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8d1b20]"
            onChange={handleChange}
          />

          <input
            type="text"
            name="dimensions"
            placeholder="Dimensions (e.g., 8.5 x 6.2 x 4.1 mm)"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8d1b20]"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="cut"
            placeholder="Cut (e.g., Mixed)"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8d1b20]"
            onChange={handleChange}
          />

          <input
            type="text"
            name="shape"
            placeholder="Shape (e.g., Oval)"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8d1b20]"
            onChange={handleChange}
          />

          <input
            type="text"
            name="color"
            placeholder="Color (e.g., Pinkish Red)"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8d1b20]"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Comments (max 2 lines)</label>
          <input
            type="text"
            name="comment1"
            placeholder="Comment Line 1"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8d1b20] mb-2"
            onChange={handleChange}
          />
          <input
            type="text"
            name="comment2"
            placeholder="Comment Line 2"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8d1b20]"
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          name="origin"
          placeholder="Origin (e.g., Myanmar)"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8d1b20]"
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="verifiedBy"
            placeholder="Verified By (Graduate Gemologist)"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8d1b20]"
            onChange={handleChange}
          />

          <input
            type="text"
            name="certifiedBy"
            placeholder="Certified By (Graduate Gemologist AJP)"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8d1b20]"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#8d1b20] hover:bg-[#6d1418] text-white py-3 rounded-lg font-medium transition-colors shadow-md mt-6"
        >
          Preview & Print Certificate
        </button>
      </form>
    </main>
  )
}
