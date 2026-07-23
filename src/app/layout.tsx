import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flight-academy-simulator.local"),
  title: {
    default: "Flight Academy Simulator",
    template: "%s | Flight Academy Simulator"
  },
  description: "Plataforma de estudos para pilotagem em simuladores de voo.",
  applicationName: "Flight Academy Simulator",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Flight Academy",
    statusBarStyle: "black-translucent"
  },
  formatDetection: {
    telephone: false
  },
  robots: {
    index: false,
    follow: false
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/icons/maskable-512.png", color: "#39d7ff" }
    ]
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Flight Academy Simulator",
    description: "Plataforma de estudos para pilotagem em simuladores de voo.",
    siteName: "Flight Academy Simulator"
  }
};

export const viewport: Viewport = {
  themeColor: "#070b12",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
