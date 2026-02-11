import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GV Certificate - Gemstone Certificate Generator",
  description: "Create professional gemstone certificates with QR verification and digital signature. Generate, print, and verify certificates instantly with our secure certification system.",
  applicationName: "GV Certificate",
  keywords: ["gemstone certificate", "certificate generator", "QR verification", "digital signature", "gemological certificate", "gemstone authentication"],
  authors: [{ name: "GV Certificate" }],
  creator: "GV Certificate",
  publisher: "GV Certificate",
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/KLLogo.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    title: "GV Certificate - Gemstone Certificate Generator",
    description: "Create professional gemstone certificates with QR verification and digital signature. Generate, print, and verify certificates instantly.",
    siteName: "GV Certificate",
  },
  twitter: {
    card: 'summary_large_image',
    title: "GV Certificate - Gemstone Certificate Generator",
    description: "Create professional gemstone certificates with QR verification and digital signature.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="print:hidden">
          <Header />
        </div>
        <main className="flex-grow">
          {children}
        </main>
        <div className="print:hidden">
          <Footer />
        </div>
      </body>
    </html>
  );
}
