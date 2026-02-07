import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-3xl text-center px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32">
            <Image 
              src="/KLLogo.svg" 
              alt="KL Logo" 
              width={128} 
              height={128}
              className="w-full h-full"
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
          Certificate Generator
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Create professional certificates with QR verification and digital signature.
          Fill the form, generate, and print instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/certificate/form"
            className="inline-block px-10 py-4 bg-[#8d1b20] hover:bg-[#6d1418] text-white rounded-lg font-medium transition-colors shadow-lg text-lg"
          >
            Create Certificate
          </Link>
          
          <Link
            href="/certificate/form"
            className="inline-block px-10 py-4 bg-white hover:bg-gray-50 text-[#8d1b20] border-2 border-[#8d1b20] rounded-lg font-medium transition-colors text-lg"
          >
            Learn More
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="text-[#8d1b20] text-3xl mb-3">✓</div>
            <h3 className="font-semibold text-gray-900 mb-2">QR Verification</h3>
            <p className="text-gray-600 text-sm">Each certificate includes a unique QR code for instant verification</p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="text-[#8d1b20] text-3xl mb-3">🖨️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Print Ready</h3>
            <p className="text-gray-600 text-sm">Professional format ready to print or save as PDF</p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="text-[#8d1b20] text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Generation</h3>
            <p className="text-gray-600 text-sm">Create and download certificates in seconds</p>
          </div>
        </div>
      </div>
    </main>
  )
}
