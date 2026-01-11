import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Merriweather, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"] })
const _playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["700", "800"] })

export const metadata: Metadata = {
  title: "TopScholar.AI - Top-Tier Academic Research Platform",
  description:
    "Discover the latest research from top-tier journals (UTD24) with AI-powered insights and personalized research recommendations",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
