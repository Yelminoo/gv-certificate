import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Certificate Generator
        </h1>

        <p className="text-gray-600 mb-8">
          Create professional certificates with QR verification and e-signature.
          Fill the form, generate, and print instantly.
        </p>

        <Link
          href="/certificate/form"
          className="inline-block px-8 py-4 bg-black text-white rounded-xl hover:opacity-90 transition"
        >
          Create Certificate
        </Link>
      </div>
    </main>
  )
}
