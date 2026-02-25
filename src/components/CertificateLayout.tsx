import Image from "next/image"
import QRCodeBox from "@/components/QRCodeBox"

type CertificateLayoutProps = {
  certificateNo: string
  date: string
  identification: string
  weight: string
  dimensions?: string
  cut?: string
  shape?: string
  color?: string
  comment1?: string
  comment2?: string
  origin?: string
  verifiedBy?: string
  certifiedBy?: string
  qrValue?: string
  imageUrl?: string
  signatureUrl?: string
}

export default function CertificateLayout({
  certificateNo,
  date,
  identification,
  weight,
  dimensions,
  cut,
  shape,
  color,
  comment1,
  comment2,
  origin,
  verifiedBy,
  certifiedBy,
  qrValue,
  imageUrl,
  signatureUrl,
}: CertificateLayoutProps) {
  return (
    <div
      id="certificate"
      className="w-full bg-gradient-to-br from-white via-gray-50 to-white p-[2%] relative shadow-2xl overflow-hidden"
      style={{
        aspectRatio: '7 / 4',
        maxWidth: '2100px',
        border: 'none',
        borderImage: 'none',
      }}
    >
      {/* Decorative Corner Elements */}
      {/* Borders removed for PNG export */}

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none overflow-hidden">
        <Image src="/KLLogo.svg" alt="Watermark" width={700} height={700} className="w-[30%] h-auto" />
      </div>

      {/* QR Code */}
      {qrValue && (
        <div className="absolute top-[1.5%] right-[1.5%] bg-white p-[0.8%] rounded-md shadow-lg z-30" style={{ width: 'clamp(80px, 7%, 130px)', aspectRatio: '1 / 1' }}>
          <div className="w-full aspect-square">
            <QRCodeBox value={qrValue} />
          </div>
          <p className="text-[clamp(6px,0.5vw,9px)] text-center text-gray-600 mt-[2px] font-semibold">SCAN VERIFY</p>
        </div>
      )}

      {/* Header Section */}
      <div className="relative z-10 mb-[1.5%]">
        <div className="grid grid-cols-12 gap-2 items-start mb-[1.5%] pb-[1%]">
          {/* Logo */}
          <div className="col-span-2 flex justify-center items-start">
            <div className="w-[clamp(60px,4.5vw,100px)] h-[clamp(60px,4.5vw,100px)] bg-gradient-to-br from-[#8d1b20] to-[#c92a2a] rounded-full p-[2px] flex-shrink-0">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <Image src="/KLLogo.svg" alt="Logo" width={90} height={90} className="w-[70%] h-auto" />
              </div>
            </div>
          </div>

          {/* Title and Info - Center */}
          <div className="col-span-8 text-center">
            <h1 className="text-[clamp(1.5rem,2.8vw,3.8rem)] font-bold text-[#8d1b20] tracking-wider leading-tight" style={{ textShadow: '2px 2px 4px rgba(141, 27, 32, 0.1)' }}>
              GEMSTONE CERTIFICATE
            </h1>
            <p className="text-[clamp(0.6rem,0.8vw,1rem)] text-gray-600 tracking-widest uppercase mb-[1%] leading-tight">Gemological Laboratory & Certification Authority</p>
            
            <div className="flex justify-center items-center gap-[2%] mt-[1%]">
              <div className="bg-[#8d1b20] text-white py-[0.6%] px-[2.5%] rounded-full">
                <span className="opacity-90 text-[clamp(0.6rem,0.7vw,0.9rem)]">Certificate No: </span>
                <span className="font-bold tracking-wider text-[clamp(0.65rem,0.75vw,0.95rem)]">{certificateNo}</span>
              </div>
              <div className="bg-[#8d1b20] text-white py-[0.6%] px-[2.5%] rounded-full">
                <span className="opacity-90 text-[clamp(0.6rem,0.7vw,0.9rem)]">Issue Date: </span>
                <span className="font-semibold text-[clamp(0.65rem,0.75vw,0.95rem)]">{date}</span>
              </div>
            </div>
          </div>

          {/* QR Space - Right */}
          <div className="col-span-2"></div>
        </div>
      </div>

      {/* Main Content - 7:4 Grid Layout */}
      <div className="relative z-10 grid grid-cols-7 gap-[1.5%] mb-[1.5%]">
        {/* Left Section - 4 columns */}
        <div className="col-span-4 space-y-[1.5%] overflow-hidden">
          {/* Identification - Full Width */}
          <div className="bg-gradient-to-r from-[#8d1b20]/5 to-transparent p-[2.5%] rounded-md">
            <p className="text-[clamp(0.55rem,0.7vw,0.85rem)] font-bold text-[#8d1b20] uppercase tracking-widest mb-[2px] leading-tight">Gem Identification</p>
            <p className="text-[clamp(1rem,1.5vw,1.9rem)] font-bold text-gray-900 break-words leading-tight">{identification}</p>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-2 gap-[2.5%] overflow-hidden">
            <div className="bg-white p-[3%] rounded-md shadow-md" style={{border: '1px solid white'}}>
              <p className="text-[clamp(0.5rem,0.6vw,0.75rem)] font-bold text-gray-500 uppercase tracking-wide mb-[2px] leading-tight">Weight</p>
              <p className="text-[clamp(1rem,1.5vw,1.9rem)] font-bold text-[#8d1b20] leading-tight">{weight} <span className="text-[clamp(0.7rem,1vw,1.3rem)]">cts</span></p>
            </div>

            {dimensions && (
              <div className="bg-white p-[3%] rounded-md shadow-md" style={{border: '1px solid white'}}>
                <p className="text-[clamp(0.5rem,0.6vw,0.75rem)] font-bold text-gray-500 uppercase tracking-wide mb-[2px] leading-tight">Dimensions</p>
                <p className="text-[clamp(0.75rem,1.1vw,1.4rem)] font-semibold text-gray-900 break-words leading-tight">{dimensions} <span className="text-[clamp(0.6rem,0.8vw,1rem)]">mm</span></p>
              </div>
            )}

            {cut && (
              <div className="bg-white p-[3%] rounded-md shadow-md" style={{border: '1px solid white'}}>
                <p className="text-[clamp(0.5rem,0.6vw,0.75rem)] font-bold text-gray-500 uppercase tracking-wide mb-[2px] leading-tight">Cut</p>
                <p className="text-[clamp(0.75rem,1.1vw,1.4rem)] font-semibold text-gray-900 break-words leading-tight">{cut}</p>
              </div>
            )}

            {shape && (
              <div className="bg-white p-[3%] rounded-md shadow-md" style={{border: '1px solid white'}}>
                <p className="text-[clamp(0.5rem,0.6vw,0.75rem)] font-bold text-gray-500 uppercase tracking-wide mb-[2px] leading-tight">Shape</p>
                <p className="text-[clamp(0.75rem,1.1vw,1.4rem)] font-semibold text-gray-900 break-words leading-tight">{shape}</p>
              </div>
            )}

            {color && (
              <div className="bg-white p-[3%] rounded-md shadow-md col-span-2" style={{border: '1px solid white'}}>
                <p className="text-[clamp(0.5rem,0.6vw,0.75rem)] font-bold text-gray-500 uppercase tracking-wide mb-[2px] leading-tight">Color</p>
                <p className="text-[clamp(0.75rem,1.1vw,1.4rem)] font-semibold text-gray-900 break-words leading-tight">{color}</p>
              </div>
            )}
          </div>

          {/* Comments Section */}
          {(comment1 || comment2) && (
            <div className="bg-amber-50 rounded-md p-[2.5%] overflow-hidden">
              <p className="text-[clamp(0.6rem,0.75vw,0.95rem)] font-bold text-amber-800 uppercase tracking-wide mb-1 flex items-center gap-1 leading-tight">
                <svg className="w-[clamp(12px,1vw,18px)] h-[clamp(12px,1vw,18px)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Laboratory Comments
              </p>
              {comment1 && <p className="text-[clamp(0.65rem,0.85vw,1.05rem)] text-gray-900 mb-[2px] leading-snug break-words">• {comment1}</p>}
              {comment2 && <p className="text-[clamp(0.65rem,0.85vw,1.05rem)] text-gray-900 leading-snug break-words">• {comment2}</p>}
            </div>
          )}
        </div>

        {/* Right Section - 3 columns */}
        <div className="col-span-3 flex flex-col gap-[2%] overflow-hidden">
          {/* Gemstone Image */}
          {imageUrl && (
            <div className="bg-white rounded-lg shadow-xl p-[3%] flex-1 min-h-0">
              <p className="text-[clamp(0.6rem,0.75vw,0.95rem)] font-bold text-gray-600 uppercase tracking-wide text-center mb-1 leading-tight">Specimen Photography</p>
              <div className="w-full h-[87%] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-md overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt="Gemstone" 
                  className="max-w-full max-h-full object-contain p-1"
                />
              </div>
            </div>
          )}

          {/* Origin Badge */}
          {origin && (
            <div className="bg-gradient-to-br from-[#8d1b20] to-[#c92a2a] rounded-lg p-[4%] shadow-lg text-center overflow-hidden">
              <p className="text-[clamp(0.6rem,0.75vw,0.95rem)] font-bold text-white/80 uppercase tracking-widest mb-1 leading-tight">Geographic Origin</p>
              <p className="text-[clamp(1.3rem,2.2vw,3rem)] font-bold text-white tracking-wide break-words leading-tight">{origin}</p>
            </div>
          )}
        </div>
      </div>

      {/* Signature & Verification Section */}
      <div className="relative z-10 grid grid-cols-2 gap-[3%] mt-auto">
        <div className="flex items-end overflow-hidden">
          <div className="text-gray-600 bg-gray-100 p-[2.5%] rounded-md w-full">
            <p className="font-semibold text-gray-800 mb-[2px] text-[clamp(0.75rem,0.95vw,1.2rem)] leading-tight">Authenticity Guarantee</p>
            <p className="text-[clamp(0.6rem,0.75vw,0.9rem)] leading-snug">
              This certificate verifies the gemstone&apos;s authenticity and characteristics as examined by our certified gemologists using advanced gemological instruments.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end justify-end overflow-hidden">
          {certifiedBy && (
            <div className="text-right">
              {signatureUrl ? (
                <div className="flex flex-col items-end mb-1">
                  <div className="w-[clamp(130px,16vw,280px)] h-[clamp(35px,4.5vw,85px)] flex items-center justify-end mb-[2px] overflow-hidden">
                    <img 
                      src={signatureUrl} 
                      alt="E-Signature" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="w-[clamp(130px,16vw,280px)]"></div>
                </div>
              ) : (
                <div className="w-[clamp(130px,18vw,320px)] mb-1"></div>
              )}
              <p className="text-[clamp(0.6rem,0.75vw,0.9rem)] text-gray-600 uppercase tracking-wide leading-tight">Digital E-Signature</p>
              <p className="font-bold text-gray-900 text-[clamp(0.85rem,1.2vw,1.5rem)] break-words leading-tight">{certifiedBy}</p>
              <p className="text-[clamp(0.6rem,0.75vw,0.9rem)] text-gray-600 font-semibold leading-tight">Graduate Gemologist AJP</p>
              {verifiedBy && (
                <p className="text-[clamp(0.6rem,0.75vw,0.9rem)] text-gray-500 mt-[2px] break-words leading-tight">Verified by: {verifiedBy}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
