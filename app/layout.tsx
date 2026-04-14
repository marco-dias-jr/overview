import type { Metadata } from "next"
import { headers } from "next/headers"
import { LenisProvider } from "@/components/lenis-provider"
import { Inter, Manrope } from "next/font/google"
import { detectLocaleFromAcceptLanguage } from "@/lib/portfolio-content"
import "./globals.css"

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Marco Dias | Full Stack Developer",
  description:
    "Engineering high-performance web systems and AI-integrated architectures.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const requestHeaders = await headers()
  const htmlLang = detectLocaleFromAcceptLanguage(
    requestHeaders.get("accept-language"),
  )

  return (
    <html
      lang={htmlLang}
      className={`${manrope.variable} ${inter.variable} h-full dark antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        <LenisProvider />
        {children}
      </body>
    </html>
  )
}
