import fs from "node:fs"
import path from "node:path"

import nesdb from "nes-db"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"

import { App } from "../src/App"
import { getGameSlug } from "../utils/nesdb"
import { formatTitle, getPageTitle } from "../utils/page-title"

const outDir = path.resolve("out")
const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8")

const rootPattern = /<div id="root"[^>]*><\/div>/
const titlePattern = /<title>[\s\S]*?<\/title>/

if (!rootPattern.test(template)) {
  throw new Error('Could not find the root element in "out/index.html"')
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function renderPage(pathname: string) {
  const markup = renderToString(
    <StaticRouter location={pathname}>
      <App />
    </StaticRouter>,
  )
  const title = escapeHtml(formatTitle(getPageTitle(pathname)))

  return template
    .replace(titlePattern, () => `<title>${title}</title>`)
    .replace(rootPattern, (root) => root.replace("></div>", `>${markup}</div>`))
}

function writePage(route: string, html: string) {
  const filePath = route === "/" ? path.join(outDir, "index.html") : path.join(outDir, `${route.slice(1)}.html`)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, html)
}

const routes = new Set<string>(["/"])

for (const game of nesdb.games) {
  routes.add(`/game/${getGameSlug(game)}`)
}

for (let mapper = 0; mapper < 256; mapper++) {
  routes.add(`/mapper/${mapper}`)
}

for (const route of routes) {
  writePage(route, renderPage(route))
}

writePage("/404", renderPage("/404"))

console.log(`Generated ${routes.size + 1} static pages in ${outDir}`)
