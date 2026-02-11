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
      className="w-[1123px] h-[794px] bg-white p-10 relative shadow-2xl border-4 border-[#8d1b20]"
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <Image src="/KLLogo.svg" alt="Watermark" width={384} height={384} className="w-96 h-96" />
      </div>

      {qrValue && (
        <div className="absolute top-4 right-4 text-center bg-white p-2 rounded shadow-md z-20">
          <QRCodeBox value={qrValue} />
        </div>
      )}

      <div className="relative z-10 mb-6">
        <div className="border-b-4 border-[#8d1b20] pb-3">
          <div className="flex items-center gap-3 mb-3">
            <Image src="/KLLogo.svg" alt="Logo" width={64} height={64} className="w-16 h-16" />
            <div>
              <h1 className="text-3xl font-bold text-[#8d1b20]">GEMSTONE CERTIFICATE</h1>
              <p className="text-xs text-gray-600">Gemological Laboratory</p>
            </div>
          </div>
          <div className="flex justify-end gap-6 text-sm">
            <div>
              <span className="text-gray-600">Certificate No: </span>
              <span className="font-bold text-[#8d1b20]">{certificateNo}</span>
            </div>
            <div>
              <span className="text-gray-600">Date: </span>
              <span className="font-semibold text-gray-900">{date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="border-b border-gray-300 pb-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Identification</p>
            <p className="text-lg font-semibold text-gray-900">{identification}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border-b border-gray-300 pb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Weight</p>
              <p className="text-base font-semibold text-[#8d1b20]">{weight} cts</p>
            </div>

            {dimensions && (
              <div className="border-b border-gray-300 pb-2">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Dimensions</p>
                <p className="text-sm font-medium text-gray-900">{dimensions} mm</p>
              </div>
            )}
          </div>

          {cut && (
            <div className="border-b border-gray-300 pb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Cut</p>
              <p className="text-base font-medium text-gray-900">{cut}</p>
            </div>
          )}

          {shape && (
            <div className="border-b border-gray-300 pb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Shape</p>
              <p className="text-base font-medium text-gray-900">{shape}</p>
            </div>
          )}

          {color && (
            <div className="border-b border-gray-300 pb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Color</p>
              <p className="text-base font-medium text-gray-900">{color}</p>
            </div>
          )}

          {(comment1 || comment2) && (
            <div className="border-b border-gray-300 pb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Comments</p>
              {comment1 && <p className="text-sm text-gray-800 leading-tight">{comment1}</p>}
              {comment2 && <p className="text-sm text-gray-800 leading-tight">{comment2}</p>}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          {imageUrl && (
            <div className="border-2 border-[#8d1b20] rounded-lg p-3 bg-white mb-4">
              <p className="text-xs text-gray-600 uppercase tracking-wide text-center mb-2">Gemstone Image</p>
              <div className="w-full h-48 flex items-center justify-center bg-gray-50 rounded">
                <img 
                  src={imageUrl} 
                  alt="Gemstone" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}

          {origin && (
            <div className="border border-[#8d1b20] rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 uppercase tracking-wide text-center mb-2">Origin</p>
              <p className="text-2xl font-bold text-[#8d1b20] text-center">{origin}</p>
            </div>
          )}

          <div className="mt-auto pt-8">
            <div className="text-right">
              {certifiedBy && (
                <div className="mb-6">
                  {signatureUrl ? (
                    <div className="flex flex-col items-end">
                      <div className="w-48 h-16 mb-2 flex items-center justify-end">
                        <img 
                          src={signatureUrl} 
                          alt="E-Signature" 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="border-t-2 border-[#8d1b20] w-48 mb-2"></div>
                    </div>
                  ) : (
                    <div className="border-t-2 border-[#8d1b20] w-64 ml-auto mb-2"></div>
                  )}
                  <p className="text-xs text-gray-600 uppercase">E-Signature</p>
                  <p className="font-semibold text-gray-900">{certifiedBy}</p>
                  <p className="text-xs text-gray-500">Graduate Gemologist AJP</p>
                </div>
              )}

              {verifiedBy && (
                <div>
                  <p className="text-xs text-gray-600 uppercase">Verified & Certified By</p>
                  <p className="font-medium text-gray-900">{verifiedBy}</p>
                  <p className="text-xs text-gray-500">Graduate Gemologist</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-10 right-10 z-10">
        <p className="text-xs text-gray-500 text-center border-t border-gray-300 pt-2">
          This certificate guarantees the authenticity and quality of the gemstone as described above.
        </p>
      </div>
    </div>
  )
}
