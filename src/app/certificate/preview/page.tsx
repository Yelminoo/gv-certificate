"use client"


import { useSearchParams } from "next/navigation"
import { Suspense, useState, useRef, useEffect } from "react"
import CertificateLayout from "@/components/CertificateLayout"
import CertificateDesign2 from "@/components/CertificateDesign2"
// domtoimage will be imported dynamically inside handleExportPNG
// import DebugCertificate from "@/components/DebugCertificate"

interface CertificateData {
  certificateNo: string;
  date: string;
  identification: string;
  weight: string;
  dimensions?: string;
  cut?: string;
  shape?: string;
  color?: string;
  comment1?: string;
  comment2?: string;
  origin?: string;
  verifiedBy?: string;
  certifiedBy?: string;
  imageUrl?: string;
  signatureUrl?: string;
}


function CertificatePreviewOptions() {
  const searchParams = useSearchParams();
  const [design, setDesign] = useState<"default" | "design2">("default");
  const [data, setData] = useState<CertificateData | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const encoded = searchParams.get("data");
    if (!encoded) {
      setInvalid(true);
      setData(null);
      setQrValue("");
      return;
    }
    try {
      const certData = JSON.parse(atob(encoded));
      setData(certData);
      // Only encode the certificate id (certificateNo) in the QR code
      const certId = certData.certificateNo || "";
      const base64Id = btoa(certId);
      setQrValue(`${window.location.origin}/certificate/view?id=${base64Id}`);
      setInvalid(false);
    } catch {
      setInvalid(true);
      setData(null);
      setQrValue("");
    }
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPNG = async () => {
    if (!certRef.current) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
    const domtoimage = await import("dom-to-image-more");
    domtoimage.toPng(certRef.current)
      .then((dataUrl: string) => {
        const link = document.createElement('a');
        link.download = `certificate-${design}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error: Error) => {
        alert('Export failed: ' + error.message);
      });
  };

  if (invalid) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 print:bg-white print:p-0">
        <p className="p-10">Invalid certificate data</p>
      </main>
    );
  }
  if (!data) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 print:bg-white print:p-0">
        <p className="p-10">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 print:bg-white print:p-0">
      {/* Action bar */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-center print:hidden gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setDesign("default")}
            className={`px-4 py-2 rounded-lg font-medium border transition-colors shadow-md ${design === "default" ? "bg-[#8d1b20] text-white" : "bg-white text-[#8d1b20] border-[#8d1b20]"}`}
          >
            Classic Design
          </button>
          <button
            onClick={() => setDesign("design2")}
            className={`px-4 py-2 rounded-lg font-medium border transition-colors shadow-md ${design === "design2" ? "bg-[#8d1b20] text-white" : "bg-white text-[#8d1b20] border-[#8d1b20]"}`}
          >
            Modern Design
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="bg-[#8d1b20] hover:bg-[#6d1418] text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
          >
            Print / Save PDF
          </button>
          <button
            onClick={handleExportPNG}
            className="bg-[#fbbf24] hover:bg-[#f59e42] text-black px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
          >
            Export as PNG
          </button>
        </div>
      </div>
      {/* Certificate Preview */}
      <div className="flex justify-center print:block">
        <div ref={certRef} className="w-full flex justify-center">
          {design === "default" ? (
            <CertificateLayout
              certificateNo={data.certificateNo}
              date={data.date}
              identification={data.identification}
              weight={data.weight}
              dimensions={data.dimensions}
              cut={data.cut}
              shape={data.shape}
              color={data.color}
              comment1={data.comment1}
              comment2={data.comment2}
              origin={data.origin}
              verifiedBy={data.verifiedBy}
              certifiedBy={data.certifiedBy}
              qrValue={qrValue}
              imageUrl={data.imageUrl || undefined}
              signatureUrl={data.signatureUrl || undefined}
            />
          ) : (
            <CertificateDesign2
              id={Number(data.certificateNo)}
              no={data.certificateNo}
              date={data.date}
              identification={data.identification}
              weight={data.weight}
              dimensions={data.dimensions || ""}
              cut={data.cut || ""}
              shape={data.shape || ""}
              color={data.color || ""}
              comment={data.comment1 || data.comment2 || ""}
              imageUrl={data.imageUrl || ""}
              origin={data.origin || ""}
              identifiedBy={data.verifiedBy || ""}
              signatureUrl={data.signatureUrl || ""}
            />  
            // <DebugCertificate
            //   no={data.certificateNo}
            //   date={data.date}
            //   identification={data.identification}
            //   weight={data.weight}
            //   cut={data.cut}
            //   shape={data.shape}
            //   color={data.color}
            //   comment1={data.comment1}
            //   comment2={data.comment2}
            //   origin={data.origin}
            //   verifiedBy={data.verifiedBy}
            //   certifiedBy={data.certifiedBy}
            //   qrValue={qrValue}
            //   imageUrl={data.imageUrl || undefined}
            //   signatureUrl={data.signatureUrl || undefined}
            // />
          )}
        </div>
      
      </div>
    </main>
  );
}

export default function CertificatePreviewPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading certificate...</div>}>
      <CertificatePreviewOptions />
    </Suspense>
  );
}