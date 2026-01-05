import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Cyborg | AI & Robotics Club",
  description: "The premier Artificial Intelligence and Robotics club of our college.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/white_icon.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/black_icon.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo_icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/white_icon.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
