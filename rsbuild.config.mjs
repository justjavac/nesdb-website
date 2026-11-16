import { defineConfig } from "@rsbuild/core"

const devHtmlCache = new Map()

export default defineConfig({
  source: {
    entry: {
      index: "./src/main.js",
    },
  },
  html: {
    template: "./index.html",
  },
  output: {
    distPath: {
      root: "out",
    },
    cleanDistPath: true,
  },
  dev: {
    setupMiddlewares: (middlewares) => {
      middlewares.unshift(async (req, res, next) => {
        const { pathname } = new URL(req.url, `http://${req.headers.host || "localhost"}`)

        if (
          pathname === "/index.html" ||
          pathname.includes(".") ||
          pathname.startsWith("/static/") ||
          pathname.startsWith("/@") ||
          pathname.startsWith("/__")
        ) {
          return next()
        }

        try {
          const { injectPage, renderRoute } = await import("./scripts/templates.mjs")
          const page = renderRoute(pathname)
          const host = req.headers.host || "localhost"
          let template = devHtmlCache.get(host)

          if (!template) {
            template = await fetch(`http://${host}/index.html`).then((response) => response.text())
            devHtmlCache.set(host, template)
          }

          res.statusCode = page.status
          res.setHeader("Content-Type", "text/html; charset=utf-8")
          res.end(injectPage(template, page.content, page.title))
        } catch (error) {
          next(error)
        }
      })
    },
  },
})
