"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CertificateLayout from "@/components/CertificateLayout";
import CertificateDesign2 from "@/components/CertificateDesign2";

interface Certificate {
  certificateNo: string;
  issueDate?: string;
  date?: string;
  identification: string;
  weight: string;
  dimensions: string;
  cut: string;
  shape: string;
  color: string;
  comment1?: string;
  comment2?: string;
  origin: string;
  verifiedBy: string;
  certifiedBy: string;
  qrValue: string;
  imageUrl?: string;
  signatureUrl?: string;
}

export default function QrPreviewPage() {
  const searchParams = useSearchParams();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Accept both ?id= and ?dbId= for backward compatibility
    const encoded = searchParams.get("id") || searchParams.get("dbId");
    if (encoded) {
      let dbId = "";
      try {
        dbId = atob(encoded);
      } catch {
        setError("Invalid database id");
        return;
      }
      // If dbId contains an underscore, split and use the part before _
      if (dbId.includes("_")) {
        dbId = dbId.split("_")[0];
      }
      if (!/^[0-9]+$/.test(dbId)) {
        setError("Missing or invalid db id in QR code");
        return;
      }
      fetch(`/api/certificates?dbId=${encodeURIComponent(dbId)}`)
        .then(async (res) => {
          if (!res.ok) throw new Error("Certificate not found");
          return res.json();
        })
        .then((data) => setCertificate(data))
        .catch((err) => setError(err.message));
      return;
    }
    setError("Missing database id");
  }, [searchParams]);

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-700">{error}</div>;
  }
  if (!certificate) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 print:bg-white print:p-0">
      <div className="flex justify-center print:block">
        <CertificateDesign2
          id={Number(certificate.certificateNo)}
          no={certificate.certificateNo}
          date={certificate.issueDate || certificate.date || ""}
          identification={certificate.identification}
          weight={certificate.weight}
          dimensions={certificate.dimensions || ""}
          cut={certificate.cut || ""}
          shape={certificate.shape || ""}
          color={certificate.color || ""}
          comment={certificate.comment1 || certificate.comment2 || ""}
          imageUrl={certificate.imageUrl || ""}
          origin={certificate.origin || ""}
          identifiedBy={certificate.verifiedBy || ""}
          signatureUrl={certificate.signatureUrl || ""}
          qrValue={certificate.qrValue}
        />
      </div>
    </main>
  );
}
