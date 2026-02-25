"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"

type QRCodeBoxProps = {
  value: string
}

export default function QRCodeBox({ value }: QRCodeBoxProps) {
  const [qr, setQr] = useState<string>("")

  useEffect(() => {
    QRCode.toDataURL(value, { width: 300, margin: 1 })
      .then(setQr)
      .catch(console.error)
  }, [value])

  if (!qr) return null

  return (
    <img
      src={qr}
      alt="Certificate QR Code"
      className="w-full h-full object-contain"
    />
  )
}
