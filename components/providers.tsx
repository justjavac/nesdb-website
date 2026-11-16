import * as React from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = "theme"
const MEDIA_QUERY = "(prefers-color-scheme: dark)"

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(MEDIA_QUERY).matches ? "dark" : "light"
}

function getInitialSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light"
  }

  return getSystemTheme()
}

function getStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system"
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "system"
  }

  return getStoredTheme()
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme
  const root = document.documentElement

  root.classList.remove("light", "dark")
  root.classList.add(resolved)
  root.style.colorScheme = resolved
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(getInitialTheme)
  const [systemTheme, setSystemTheme] = React.useState<ResolvedTheme>(getInitialSystemTheme)

  const resolvedTheme = theme === "system" ? systemTheme : theme

  React.useEffect(() => {
    applyTheme(theme)
  }, [theme, systemTheme])

  React.useEffect(() => {
    if (theme !== "system") {
      return
    }

    const media = window.matchMedia(MEDIA_QUERY)
    const onChange = () => setSystemTheme(getSystemTheme())

    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [theme])

  React.useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setThemeState(getStoredTheme())
      }
    }

    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const setTheme = React.useCallback((nextTheme: Theme) => {
    const style = document.createElement("style")
    style.textContent = "*{transition:none!important}"
    document.head.appendChild(style)

    localStorage.setItem(STORAGE_KEY, nextTheme)
    applyTheme(nextTheme)
    setThemeState(nextTheme)

    requestAnimationFrame(() => requestAnimationFrame(() => style.remove()))
  }, [])

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
