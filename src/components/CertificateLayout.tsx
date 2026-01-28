type CertificateLayoutProps = {
  fullName: string
  title: string
  issueDate: string
  qrValue?: string
}

import QRCodeBox from "@/components/QRCodeBox"

export default function CertificateLayout({
  fullName,
  title,
  issueDate,
  qrValue,
}: CertificateLayoutProps) {
  return (
    <div
      id="certificate"
      className="w-[1123px] h-[794px] bg-white p-20 text-center border-8 border-gray-800 relative"
    >
      {/* QR CODE */}
      {qrValue && (
        <div className="absolute top-10 right-10">
          <QRCodeBox value={qrValue} />
        </div>
      )}

      <h1 className="text-5xl font-bold mb-10 text-gray-900">
        Certificate of Completion
      </h1>

      <p className="text-xl mb-4 text-gray-700">This is to certify that</p>

      <p className="text-4xl font-semibold mb-6 text-gray-900">
        {fullName}
      </p>

      <p className="text-xl mb-6 text-gray-700">
        has successfully completed
      </p>

      <p className="text-3xl font-medium mb-12 text-gray-900">
        {title}
      </p>

      <div className="flex justify-between items-end mt-20">
        <div className="text-left">
          <p className="font-semibold text-gray-900">Issue Date</p>
          <p className="text-gray-700">{issueDate}</p>
        </div>

        <div className="text-right">
          <p className="font-semibold text-gray-900">Authorized Signature</p>
          <div className="w-48 border-t border-gray-800 mt-4"></div>
        </div>
      </div>
    </div>
  )
}
