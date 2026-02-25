import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

interface DebugCertificateProps {
  no: string;
  date: string;
  identification: string;
  weight: string;
  // imageUrl: string; // Removed as unused
  signatureUrl: string;
}

export default function DebugCertificate({
  no,
  date,
  identification,
  weight,
  // imageUrl, // Removed as unused
  signatureUrl,
}: DebugCertificateProps) {
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certRef.current) return;

    const dataUrl = await toPng(certRef.current, {
      backgroundColor: '#ffffff',
      pixelRatio: 1, // prevents border artifacts
      cacheBust: true,
    });

    const link = document.createElement('a');
    link.download = 'certificate.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div>
      {/* Certificate */}
      <div
        ref={certRef}
        id="certificate-debug"
        style={{
          backgroundColor: '#ffffff',
          width: '600px',
          padding: '10px',

          border: 'none',
          outline: 'none',
          boxShadow: 'none',

          color: '#000000',

          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'geometricPrecision',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Certificate Debug
        </div>

        <div>No: {no}</div>
        <div>Date: {date}</div>
        <div>Identification: {identification}</div>
        <div>Weight: {weight}</div>

        <div style={{ marginTop: '10px' }}>
          {/* <img
            src={imageUrl}
            alt="Gem"
            crossOrigin="anonymous"
            style={{
              maxWidth: '200px',
              maxHeight: '120px',
              display: 'block',
              margin: '0 auto',
              backgroundColor: '#ffffff',
              border: '0',
            }}
          /> */}
        </div>

        <div style={{ marginTop: '10px' }}>
          <img
            src={signatureUrl}
            alt="Signature"
            crossOrigin="anonymous"
            style={{
              height: '40px',
              display: 'block',
              margin: '0 auto',
              backgroundColor: '#ffffff',
              border: '0',
            }}
          />
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        style={{
          marginTop: '20px',
          padding: '8px 16px',
          cursor: 'pointer',
        }}
      >
        Download PNG
      </button>
    </div>
  );
}