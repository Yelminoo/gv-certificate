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

  if (!qr) return null;

  // Only render <img> if qr is a valid data URL or image URL
  if (typeof qr === "string" && (qr.startsWith("data:image") || qr.startsWith("/"))) {
    return (
      <img
        src={qr}
        alt="Certificate QR Code"
        className="w-full h-full object-contain"
      />
    );
  }
  return null;
}
