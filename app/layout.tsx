import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "TheCloudbox - Enterprise DevOps & Managed Services",
  description:
    "Expert DevOps, managed services, cloud migration, and infrastructure solutions for modern enterprises. 24/7 NOC, IaC, managed Kafka, MongoDB, Elasticsearch, MySQL, PostgreSQL, and Redis clusters.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/png" }],
    other: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  keywords: [
    "DevOps",
    "Managed Services",
    "Cloud Migration",
    "Data Center Migration",
    "Cost Optimization",
    "NOC as a Service",
    "Infrastructure as Code",
    "Managed Kafka",
    "Managed MongoDB",
    "Managed Elasticsearch",
    "Managed MySQL",
    "Managed PostgreSQL",
    "Managed Redis",
    "Kubernetes",
    "AWS",
    "GCP",
    "Azure",
    "AIOps",
  ],
  authors: [{ name: "TheCloudbox" }],
  creator: "TheCloudbox",
  publisher: "TheCloudbox",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "TheCloudbox - Enterprise DevOps & Managed Services",
    description:
      "Expert DevOps, managed services, cloud migration, and infrastructure solutions for modern enterprises.",
    siteName: "TheCloudbox",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheCloudbox - Enterprise DevOps & Managed Services",
    description:
      "Expert DevOps, managed services, cloud migration, and infrastructure solutions for modern enterprises.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
