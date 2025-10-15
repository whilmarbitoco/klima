import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "KLIMA - Smart Weather Intelligence",
    template: "%s | KLIMA",
  },
  description:
    "Knowledge-base Local Intelligence for Microweather Analysis. AI-powered weather prediction with IoT integration for accurate, real-time forecasts.",
  keywords: [
    "KLIMA",
    "AI weather prediction",
    "microweather analysis",
    "IoT weather system",
    "smart agriculture",
    "climate intelligence",
  ],
  authors: [{ name: "KLIMA Team" }],
  creator: "KLIMA",
  publisher: "KLIMA",
  metadataBase: new URL("https://klima-eight.vercel.app"),
  openGraph: {
    title: "KLIMA - Smart Weather Intelligence",
    description:
      "AI-powered weather prediction and IoT-based microclimate analysis for smarter farming and forecasting.",
    url: "https://klima-eight.vercel.app/",
    siteName: "KLIMA",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "KLIMA Weather Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KLIMA - Smart Weather Intelligence",
    description:
      "AI-powered weather prediction and IoT-based microclimate analysis for smarter farming and forecasting.",
    creator: "@whilmarbitoco",
    images: ["/favicon.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased overflow-x-hidden text-gray-900 bg-gray-50">
        {children}
      </body>
    </html>
  );
}
