"use client";

import QRCodeBox from "@/components/QRCodeBox";
import React, { useRef, useState } from "react";
// toPng will be dynamically imported in the handler to avoid SSR issues

interface CertificateDesign2Props {
  id: number;
  no: string;
  qrValue?: string;
  date: string;
  identification: string;
  weight: string;
  dimensions: string;
  cut: string;
  shape: string;
  color: string;
  comment: string;
  imageUrl: string;
  origin: string;
  identifiedBy: string;
  signatureUrl: string;
}

export default function CertificateDesign2(props: CertificateDesign2Props) {
  const {
    no,
    date,
    identification,
    weight,
    dimensions,
    cut,
    shape,
    color,
    comment,
    imageUrl,
    origin,
    identifiedBy,
    signatureUrl,
    qrValue,
    // props spread removed as 'rest' is unused
  } = props;

  const certRef = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState({
    gem: !imageUrl,
    sign: !signatureUrl,
  });

  const waitForImages = async () => {
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (imagesLoaded.gem && imagesLoaded.sign) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  };

  const handleDownload = async () => {
    if (typeof window === "undefined" || !certRef.current) return;

    await waitForImages();

    // Dynamically import toPng only on client
    const { toPng } = await import("html-to-image");
    const dataUrl = await toPng(certRef.current, {
      backgroundColor: "#ffffff",
      pixelRatio: 2,
      cacheBust: true,
    });

    const link = document.createElement("a");
    link.download = "certificate.png";
    link.href = dataUrl;
    link.click();
  };

  const handlePrint = async () => {
    if (typeof window === "undefined" || !certRef.current) return;

    await waitForImages();

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
      <head>
        <title>Certificate</title>
        <style>
          body {
            margin:0;
            padding:0;
            background:white;
            display:flex;
            justify-content:center;
            align-items:center;
            color:black;
          }

          #certificate-root {
            width:700px;
            height:400px;
          }

          .qr-container {
            width:70px !important;
            height:70px !important;
            overflow:hidden !important;
            display:flex;
            align-items:center;
            justify-content:center;
          }

          .qr-container canvas,
          .qr-container svg {
            width:100% !important;
            height:100% !important;
          }

          img {
            max-width:100%;
            height:auto;
          }

          @page {
            margin:0;
          }
        </style>
      </head>
      <body>
        <div id="certificate-root">
          ${certRef.current.outerHTML}
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 300);
    };
  };

  // Use qrValue prop if provided
  const qr = qrValue || "";

  // Helper Row Component
  const Row = ({ label, value }: { label: string; value: string }) => (
    <div
      style={{
        display: "flex",
        marginBottom: "6px",
        color: "#000",
      }}
    >
      <div style={{ width: "110px", fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ width: "10px" }}>:</div>
      <div style={{ flex: 1 }}>{value}</div>
    </div>
  );

  return (
    <div
      style={{
        width: "700px",
        height: "400px",
        position: "relative",
        background: "#fff",
        margin: "0 auto",
        color: "#000",
      }}
    >
      <div
        ref={certRef}
        style={{
          width: "700px",
          height: "400px",
          background: "#fff",
          display: "flex",
          color: "#000",
        }}
      >
        {/* LEFT SIDE */}
        <div
          style={{
            width: "46%",
            padding: "24px",
            fontSize: "13px",
            color: "#000",
          }}
        >
          <Row label="No" value={no} />
          <Row label="Date" value={date} />
          <Row label="Identification" value={identification} />
          <Row label="Weight" value={weight} />
          <Row label="Dimensions" value={dimensions} />
          <Row label="Cut" value={cut} />
          <Row label="Shape" value={shape} />
          <Row label="Color" value={color} />
          <Row label="Comment" value={comment} />
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            width: "46%",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#000",
          }}
        >
          <div
            className="qr-container"
            style={{
              width: "70px",
              height: "70px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {qr && <QRCodeBox value={qr} />}
          </div>

          {imageUrl ? (
            <img
              src={imageUrl}
              crossOrigin="anonymous"
              onLoad={() => setImagesLoaded((p) => ({ ...p, gem: true }))}
              onError={() => setImagesLoaded((p) => ({ ...p, gem: true }))}
              style={{
                maxHeight: "100px",
                marginTop: "10px",
              }}
              alt="Gemstone"
            />
          ) : null}

          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <div>Origin : {origin}</div>
            <div>Identified By : {identifiedBy}</div>
          </div>

          {signatureUrl ? (
            <img
              src={signatureUrl}
              crossOrigin="anonymous"
              onLoad={() => setImagesLoaded((p) => ({ ...p, sign: true }))}
              onError={() => setImagesLoaded((p) => ({ ...p, sign: true }))}
              style={{
                height: "28px",
                marginTop: "10px",
              }}
              alt="Signature"
            />
          ) : null}
        </div>
      </div>

      <button
        onClick={handleDownload}
        style={{
          position: "absolute",
          right: 120,
          bottom: 16,
          cursor: "pointer",
        }}
      >
        Download PNG
      </button>

      <button
        onClick={handlePrint}
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          cursor: "pointer",
        }}
      >
        Print PDF
      </button>
    </div>
  );
}