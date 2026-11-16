import { Route, Routes } from "react-router-dom"

import { ThemeProvider } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

import { DocumentTitle } from "./document-title"
import Game from "./pages/game"
import Home from "./pages/home"
import Mapper from "./pages/mapper"
import NotFound from "./pages/not-found"
import { ScrollToTop } from "./scroll-to-top"

export function App() {
  return (
    <ThemeProvider>
      <DocumentTitle />
      <ScrollToTop />
      <SiteHeader />
      <main className="container flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:slug" element={<Game />} />
          <Route path="/mapper/:slug" element={<Mapper />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
      <TailwindIndicator />
    </ThemeProvider>
  )
}
