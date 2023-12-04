import type { Metadata, Viewport } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

export const metadata: Metadata = {
  title: {
    default: "NES Game Database",
    template: `%s - NES Game Database`,
  },
  description: "NES Game Database",
  keywords: ["nes", "db", "game", "database"],
  creator: "justjavac",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col h-screen min-h-screen bg-background antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
          <SiteHeader />
          <main className="container flex-1">{children}</main>
          <SiteFooter />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
