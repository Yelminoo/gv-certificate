"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CertificateFormPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    fullName: "",
    title: "",
    issueDate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Certificate Information
        </h2>

        <input
          type="text"
          name="fullName"
          placeholder="Recipient Full Name"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          type="text"
          name="title"
          placeholder="Certificate Title (e.g. Web Development)"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          type="date"
          name="issueDate"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
        >
          Preview & Print
        </button>
      </form>
    </main>
  )
}
