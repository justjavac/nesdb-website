import "./globals.css"

const STORAGE_KEY = "theme"
const MEDIA_QUERY = "(prefers-color-scheme: dark)"
const root = document.documentElement
const media = window.matchMedia(MEDIA_QUERY)

function getSystemTheme() {
  return media.matches ? "dark" : "light"
}

function getStoredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system"
}

function applyTheme(theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme
  root.classList.toggle("dark", resolved === "dark")
  root.style.colorScheme = resolved
}

function setTheme(theme) {
  const style = document.createElement("style")
  style.textContent = "*{transition:none!important}"
  document.head.appendChild(style)

  localStorage.setItem(STORAGE_KEY, theme)
  applyTheme(theme)

  requestAnimationFrame(() => requestAnimationFrame(() => style.remove()))
}

document.getElementById("theme-toggle")?.addEventListener("click", () => {
  setTheme(root.classList.contains("dark") ? "light" : "dark")
})

media.addEventListener("change", () => {
  if (getStoredTheme() === "system") {
    applyTheme("system")
  }
})

window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY) {
    applyTheme(getStoredTheme())
  }
})

applyTheme(getStoredTheme())
