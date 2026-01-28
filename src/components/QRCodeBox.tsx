"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"

type QRCodeBoxProps = {
  value: string
}

export default function QRCodeBox({ value }: QRCodeBoxProps) {
  const [qr, setQr] = useState<string>("")

  useEffect(() => {
    QRCode.toDataURL(value, { width: 150 })
      .then(setQr)
      .catch(console.error)
  }, [value])

  if (!qr) return null

  return (
    <img
      src={qr}
      alt="Certificate QR Code"
      className="w-32 h-32"
    />
  )
}
