"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignaturePad from "@/components/SignaturePad";

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
    imageUrl: "",
    signatureUrl: "",
  })

  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [signatureSaved, setSignatureSaved] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError("")

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setForm(prev => ({
          ...prev,
          imageUrl: data.url
        }))
      } else {
        setUploadError(data.error || 'Upload failed')
      }
    } catch (error) {
      setUploadError('Failed to upload image')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleSignatureSave = (dataUrl: string) => {
    setForm(prev => ({
      ...prev,
      signatureUrl: dataUrl
    }))
    setSignatureSaved(true)
    setTimeout(() => setSignatureSaved(false), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Save certificate to database (D1 or file logs)
    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      const result = await res.json();
      // Debug: log API result to verify dbId
      console.log('Certificate API result:', result);
      if (result.success && result.dbId && result.certificateNo) {
        // Encode both dbId and certificateNo separated by _
        const qrPayload = `${result.dbId}_${result.certificateNo}`;
        const encodedData = btoa(JSON.stringify({ ...form, dbId: result.dbId }));
        // Optionally, you can pass the QR payload for preview
        router.push(`/certificate/preview?data=${encodedData}&qr=${btoa(qrPayload)}`);
      } else {
        alert('Failed to save certificate: missing db id')
        return;
      }
    } catch (error) {
      console.error('Failed to save certificate:', error)
      // Continue even if saving fails
    }
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

        {/* Image Upload Section - Separated Layout */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Gemstone Image Upload
          </label>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Upload Control */}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#8d1b20] file:text-white hover:file:bg-[#6d1418] file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8d1b20]"
                disabled={uploading}
              />
              {uploading && (
                <p className="text-sm text-blue-600 mt-2 flex items-center gap-2">
                  <span className="animate-pulse">⏳</span> Uploading...
                </p>
              )}
              {uploadError && (
                <p className="text-sm text-red-600 mt-2">❌ {uploadError}</p>
              )}
              {form.imageUrl && !uploading && (
                <p className="text-sm text-green-600 mt-2">✓ Image uploaded successfully!</p>
              )}
            </div>

            {/* Fixed Frame Preview */}
            <div className="shrink-0">
              <div className="w-48 h-48 border-2 border-gray-300 rounded-lg bg-white flex items-center justify-center overflow-hidden">
                {form.imageUrl ? (
                  <Image
                    src={form.imageUrl}
                    alt="Gemstone preview"
                    width={192}
                    height={192}
                    className="w-full h-full object-contain"
                    priority
                  />
                ) : (
                  <div className="text-center text-gray-400 p-4">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs">No image uploaded</p>
                  </div>
                )}
              </div>
            </div>
          </div>
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

        {/* E-Signature Drawing Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Draw Your E-Signature
          </label>
          
          <div className="flex flex-col items-start">
            <SignaturePad 
              onSave={handleSignatureSave}
              existingSignature={form.signatureUrl}
            />
            {signatureSaved && (
              <p className="text-sm text-green-600 mt-2">✓ Signature saved successfully!</p>
            )}
          </div>
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
