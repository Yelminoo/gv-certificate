import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-[#8d1b20] shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/KLLogo.svg" alt="KL Logo" width={48} height={48} className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold text-[#8d1b20]">KL Certificate</h1>
              <p className="text-xs text-gray-600">Gemological Laboratory</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-[#8d1b20] transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/certificate/form" 
              className="text-gray-700 hover:text-[#8d1b20] transition-colors font-medium"
            >
              Create Certificate
            </Link>
            <Link 
              href="/certificate/form" 
              className="bg-[#8d1b20] text-white px-6 py-2 rounded-lg hover:bg-[#6d1518] transition-colors font-medium"
            >
              Get Started
            </Link>
          </nav>
          
          <button className="md:hidden text-[#8d1b20]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
