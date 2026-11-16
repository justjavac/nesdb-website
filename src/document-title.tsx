import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import { formatTitle, getPageTitle } from "@/utils/page-title"

export function DocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = formatTitle(getPageTitle(pathname))
  }, [pathname])

  return null
}
