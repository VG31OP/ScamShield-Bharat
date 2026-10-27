import type { Metadata, Viewport } from "next";
import { Host_Grotesk, Instrument_Sans } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ScamShield Bharat 🇮🇳 | Citizen Cyber Defense & Scam Detection",
  description:
    "AI-assisted, explainable cyber scam and fraud detection platform for Indian citizens. Verify suspicious SMS, WhatsApp messages, banking links, and URLs in English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, and Kannada.",
  keywords: [
    "ScamShield Bharat",
    "cyber security india",
    "1930 helpline",
    "cybercrime portal",
    "scam detector",
    "fake KYC scam",
    "digital arrest",
    "electricity bill scam",
    "phishing URL checker",
    "I4C",
    "CERT-In",
  ],
  authors: [{ name: "ScamShield Bharat Civic Initiative" }],
  openGraph: {
    title: "ScamShield Bharat 🇮🇳 | Citizen Cyber Defense Platform",
    description:
      "Verify suspicious SMS, WhatsApp messages, and URLs before you click. 100% explainable security rules, zero data storage.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fcfcfd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hostGrotesk.variable} ${instrumentSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#fcfcfd] text-[#16191f]">
        {children}
      </body>
    </html>
  );
}
