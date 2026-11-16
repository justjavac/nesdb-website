import fs from "node:fs"
import path from "node:path"

import nesdb from "nes-db"

import { gameSlug, injectPage, renderRoute } from "./templates.mjs"

const outDir = path.resolve("out")
const templatePath = path.join(outDir, "index.html")
const template = fs.readFileSync(templatePath, "utf8")
const pages = new Map()

pages.set("/", renderRoute("/"))

for (const game of nesdb.games) {
  const route = `/game/${gameSlug(game)}`
  if (!pages.has(route)) {
    pages.set(route, renderRoute(route))
  }
}

for (let mapper = 0; mapper < 256; mapper++) {
  const route = `/mapper/${mapper}`
  pages.set(route, renderRoute(route))
}

for (const [route, page] of pages) {
  const filePath = route === "/" ? templatePath : path.join(outDir, `${route.slice(1)}.html`)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, injectPage(template, page.content, page.title))
}

const notFound = renderRoute("/404")
fs.writeFileSync(path.join(outDir, "404.html"), injectPage(template, notFound.content, notFound.title))

console.log(`Generated ${pages.size + 1} static pages in ${outDir}`)
