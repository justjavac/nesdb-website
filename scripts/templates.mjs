import nesdb from "nes-db"

const siteName = "NES Game Database"

const icons = {
  logo: `<svg viewBox="0 0 512 512" fill="currentColor" class="h-6 w-6"><path d="M377.8,100.1C332.9,86.8,318.8,112,256,112s-76.9-25.3-121.8-11.9c-44.9,13.3-67.3,60.4-88.5,148.8  c-21.2,88.5-17.3,152.4,7.7,164.3c25,11.9,53.2-15.4,80.1-49.1C155.3,337.7,166.2,336,256,336c89.7,0,99,0.7,122.5,28.1  c26.9,33.7,55.1,61,80.1,49.1c25-11.9,28.9-75.8,7.7-164.3C445.1,160.5,422.6,113.5,377.8,100.1z M128.2,263.7  c-21.7,0-39.3-17.7-39.3-39.6c0-21.8,17.6-39.6,39.3-39.6c21.7,0,39.3,17.8,39.3,39.6S149.9,263.7,128.2,263.7z M309.7,243.6  c-10.6,0-19.3-8.7-19.3-19.4c0-10.7,8.7-19.4,19.3-19.4c10.7,0,19.4,8.7,19.4,19.4C329,234.9,320.4,243.6,309.7,243.6z M351.9,286  c-10.6,0-19.3-8.7-19.3-19.4c0-10.8,8.7-19.4,19.3-19.4c10.7,0,19.4,8.7,19.4,19.4C371.3,277.4,362.6,286,351.9,286z M351.9,201.1  c-10.6,0-19.3-8.7-19.3-19.4c0-10.7,8.7-19.4,19.3-19.4c10.7,0,19.4,8.7,19.4,19.4C371.3,192.4,362.6,201.1,351.9,201.1z   M394.2,243.6c-10.7,0-19.3-8.7-19.3-19.4c0-10.7,8.7-19.4,19.3-19.4c10.6,0,19.3,8.7,19.3,19.4  C413.5,234.9,404.9,243.6,394.2,243.6z"></path></svg>`,
  github: `<svg viewBox="0 0 438.549 438.549" class="h-5 w-5"><path fill="currentColor" d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path></svg>`,
  sun: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"><path d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
  moon: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"><path d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756 7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.37201 6.82247 11.0878 3.69887 11.6097C3.45736 11.65 3.20988 11.6772 2.96008 11.6906C2.74563 11.702 2.62729 11.9535 2.77721 12.1072C2.84551 12.1773 2.91535 12.2458 2.98667 12.3128L3.05883 12.3795L3.31883 12.6045L3.50684 12.7532L3.62796 12.8433L3.81491 12.9742L3.99079 13.089C4.11175 13.1651 4.23536 13.2375 4.36157 13.3059L4.62496 13.4412L4.88553 13.5607L5.18837 13.6828L5.43169 13.7686C5.56564 13.8128 5.70149 13.8529 5.83857 13.8885C5.94262 13.9155 6.04767 13.9401 6.15405 13.9622C6.27993 13.9883 6.40713 14.0109 6.53544 14.0298L6.85241 14.0685L7.11934 14.0892C7.24637 14.0965 7.37436 14.1002 7.50322 14.1002C11.1483 14.1002 14.1032 11.1453 14.1032 7.50023C14.1032 7.25044 14.0893 7.00389 14.0623 6.76131L14.0255 6.48407C13.991 6.26083 13.9453 6.04129 13.8891 5.82642C13.8213 5.56709 13.7382 5.31398 13.6409 5.06881L13.5279 4.80132L13.4507 4.63542L13.3766 4.48666C13.2178 4.17773 13.0353 3.88295 12.8312 3.60423L12.6782 3.40352L12.4793 3.16432L12.3157 2.98361L12.1961 2.85951L12.0355 2.70246L11.8134 2.50184L11.4925 2.24191L11.2483 2.06498L10.9562 1.87446L10.6346 1.68894L10.3073 1.52378L10.1938 1.47176L9.95488 1.3706L9.67791 1.2669L9.42566 1.1846L9.10075 1.09489L8.83599 1.03486L8.54406 0.98184ZM10.4032 5.30023C10.4032 4.27588 10.2002 3.29829 9.83244 2.40604C11.7623 3.28995 13.1032 5.23862 13.1032 7.50023C13.1032 10.593 10.596 13.1002 7.50322 13.1002C6.63646 13.1002 5.81597 12.9036 5.08355 12.5522C6.5419 12.0941 7.81081 11.2082 8.74322 10.0416C8.87963 10.2284 9.10028 10.3497 9.34928 10.3497C9.76349 10.3497 10.0993 10.0139 10.0993 9.59971C10.0993 9.24256 9.84965 8.94373 9.51535 8.86816C9.57741 8.75165 9.63653 8.63334 9.6926 8.51332C9.88358 8.63163 10.1088 8.69993 10.35 8.69993C11.0403 8.69993 11.6 8.14028 11.6 7.44993C11.6 6.75976 11.0406 6.20024 10.3505 6.19993C10.3853 5.90487 10.4032 5.60464 10.4032 5.30023Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
  chevronRight: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
}

const classes = {
  table: "w-full caption-bottom text-sm",
  scroll: "w-full overflow-x-auto",
  thead: "[&_tr]:border-b",
  tbody: "[&_tr:last-child]:border-0",
  row: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
  head: "p-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
  cell: "p-2 align-middle [&:has([role=checkbox])]:pr-0",
  link: "underline underline-offset-4 text-blue-400 hover:text-blue-600",
  button:
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2",
}

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")

const text = (value) => (value == null ? "" : escapeHtml(value))

const encodeUrl = (value) => escapeHtml(encodeURI(value))

const cell = (content, className = "") =>
  `<td class="${classes.cell}${className ? ` ${className}` : ""}">${content}</td>`

const head = (content, className = "") =>
  `<th class="${classes.head}${className ? ` ${className}` : ""}">${content}</th>`

const row = (content) => `<tr class="${classes.row}">${content}</tr>`

const tbody = (content) => `<tbody class="${classes.tbody}">${content}</tbody>`

const table = (content, className = "") =>
  `<table class="${classes.table}${className ? ` ${className}` : ""}">${content}</table>`

const tableScroll = (content, className = "") =>
  `<div class="${classes.scroll}${className ? ` ${className}` : ""}">${content}</div>`

const link = (href, content) => `<a href="${encodeUrl(href)}" class="${classes.link}">${content}</a>`

const gameSlug = (game) => `${game.cartridge[0].crc}-${game.region}`

const getGameBySlug = (slug) => {
  const [crc, ...regionParts] = slug.split("-")
  const region = regionParts.join("-")
  return nesdb.games.find((game) => game.cartridge[0].crc === crc && game.region === region)
}

function header() {
  return `<header class="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur"><div class="container flex h-14 items-center"><div class="md:mr-4 md:flex"><a href="/" class="mr-6 flex items-center space-x-2 font-bold text-lg">${icons.logo}<span class="hidden font-bold sm:inline-block">${siteName}</span></a></div><div class="flex flex-1 items-center justify-between space-x-2 md:justify-end"><div class="w-full flex-1 md:w-auto md:flex-none"></div><nav class="flex items-center"><a href="https://github.com/justjavac/nes-db" target="_blank" rel="noreferrer"><div class="${classes.button} w-9 px-0">${icons.github}<span class="sr-only">GitHub</span></div></a><button type="button" id="theme-toggle" aria-label="Toggle theme" class="${classes.button} relative w-9 px-0">${icons.sun}${icons.moon}<span class="sr-only">Toggle theme</span></button></nav></div></div></header>`
}

function footer() {
  return `<footer class="py-4 md:px-8 border-t"><div class="container flex flex-col items-center justify-between text-muted-foreground gap-4 md:flex-row"><p class="w-full text-center text-sm leading-loose">Copyright © 2023 保留所有权利。本网站由 <a href="https://github.com/justjavac" target="_blank" rel="noreferrer" class="font-medium underline underline-offset-4">@justjavac</a> 创建。</p></div></footer>`
}

function layout(content) {
  return `${header()}<main class="container flex-1">${content}</main>${footer()}`
}

function breadcrumb(items) {
  return `<div class="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">${items.join(icons.chevronRight)}</div>`
}

function gamesTable(games, withMapper) {
  const headers = ["CRC32", "Title", "Alt Title", "Region", "Catalog ID", "Publisher", "Board"]
  if (withMapper) headers.push("Mapper")

  const headerRow = row(headers.map((item) => head(item)).join(""))
  const bodyRows = games
    .map((game) => {
      const cartridge = game.cartridge[0]
      const cells = [
        cell(text(cartridge.crc)),
        cell(link(`/game/${gameSlug(game)}`, text(game.name))),
        cell(text(game.altname)),
        cell(text(game.region)),
        cell(text(game.catalog)),
        cell(text(game.publisher)),
        cell(text(cartridge.board.type)),
      ]

      if (withMapper) {
        cells.push(cell(link(`/mapper/${cartridge.board.mapper}`, text(cartridge.board.mapper))))
      }

      return row(cells.join(""))
    })
    .join("")

  return table(`<thead class="${classes.thead}">${headerRow}</thead>${tbody(bodyRows)}`, withMapper ? "min-w-[900px]" : "min-w-[800px]")
}

function homePage() {
  return `<div class="my-3 md:my-4">${tableScroll(gamesTable(nesdb.games, true))}</div>`
}

function mapperPage(mapper) {
  const games = nesdb.games.filter((game) => game.cartridge[0].board.mapper === Number(mapper))
  return `<div class="my-3 md:my-4">${breadcrumb([`<a href="/">Home</a>`, `<a href="/mapper/${text(mapper)}">mapper ${text(mapper)}</a>`])}${tableScroll(gamesTable(games, false))}</div>`
}

function gamePage(game, slug) {
  const cartridge = game.cartridge[0]
  const mapper = cartridge.board.mapper

  const infoRows = [
    row(cell("Region", "w-[150px]") + cell(text(game.region))),
    row(cell("Class") + cell(text(game.class))),
    row(cell("Catalog") + cell(text(game.catalog))),
    row(cell("Publisher") + cell(text(game.publisher))),
    row(cell("Developer") + cell(text(game.developer))),
    row(cell("Players") + cell(text(game.players))),
    row(cell("Release Date") + cell(text(game.date))),
  ]

  for (const device of game.peripherals?.device ?? []) {
    infoRows.push(row(cell("Peripheral") + cell(text(device.name))))
  }

  const infoTable = `<table class="caption-bottom text-sm w-fit h-fit border">${tbody(infoRows.join(""))}</table>`

  const cartridgeTables = game.cartridge
    .map((cartridge) => {
      const rows = []

      if (cartridge.revision) {
        rows.push(row(cell("Revision", "w-[100px]") + cell(text(cartridge.revision))))
      }

      rows.push(row(cell("Type", "w-[100px]") + cell(text(cartridge.board.type))))
      rows.push(row(cell("PCB") + cell(text(cartridge.board.pcb))))
      rows.push(
        row(cell("Mapper") + cell(link(`/mapper/${cartridge.board.mapper}`, text(cartridge.board.mapper)))),
      )

      for (const chip of cartridge.board.chip ?? []) {
        rows.push(row(cell("Chip Type") + cell(text(chip.type))))
      }

      if (cartridge.board.wram) {
        rows.push(row(cell("WRAM Size") + cell(text(cartridge.board.wram.size))))
      }

      if (cartridge.board.vram) {
        rows.push(row(cell("VRAM Size") + cell(text(cartridge.board.vram.size))))
      }

      if (cartridge.board.cic) {
        rows.push(row(cell("CIC Type") + cell(text(cartridge.board.cic.type))))
      }

      if (cartridge.board.pad == null) {
        rows.push(row(cell("Mirroring") + cell("Dynamic")))
      }

      if (cartridge.board.pad?.h === 1) {
        rows.push(row(cell("Mirroring") + cell("Horizontal")))
      }

      if (cartridge.board.pad?.v === 1) {
        rows.push(row(cell("Mirroring") + cell("Vertical")))
      }

      const romRows = []

      if (cartridge.board.chr) {
        romRows.push(
          row(
            cell("PRG+CHR") +
              cell("") +
              cell("") +
              cell(text(cartridge.crc)) +
              cell(text(cartridge.sha1)),
          ),
        )
      }

      for (const prg of cartridge.board.prg ?? []) {
        romRows.push(
          row(
            cell("PRG") +
              cell(text(prg.name)) +
              cell(text(prg.size)) +
              cell(text(prg.crc)) +
              cell(text(prg.sha1)),
          ),
        )
      }

      for (const chr of cartridge.board.chr ?? []) {
        romRows.push(
          row(
            cell("CHR") +
              cell(text(chr.name)) +
              cell(text(chr.size)) +
              cell(text(chr.crc)) +
              cell(text(chr.sha1)),
          ),
        )
      }

      const romHeader = row(
        head("Type", "w-[100px]") + head("Name") + head("Size") + head("CRC32") + head("SHA1"),
      )
      const romTable = table(
        `<thead class="${classes.thead}">${romHeader}</thead>${tbody(romRows.join(""))}`,
        "min-w-[720px]",
      )

      rows.push(row(`<td class="${classes.cell}" colspan="2">${tableScroll(romTable, "mt-2")}</td>`))

      return table(tbody(rows.join("")), "border")
    })
    .join("")

  const gameHref = encodeUrl(`/game/${slug}`)
  const content = `<div class="my-3 md:my-4">${breadcrumb([
    `<a href="/">Home</a>`,
    `<a href="/mapper/${mapper}">mapper ${mapper}</a>`,
    `<a href="${gameHref}">${text(game.name)}</a>`,
  ])}<h1 class="scroll-mt-24 text-4xl font-bold tracking-tight">${text(game.name)}<small class="ml-2 text-xl text-gray-400">${text(game.altname)}</small></h1><div class="md:flex md:gap-4 md:grid-cols-2 my-6 md:my-8 flex-row-reverse">${infoTable}<div class="flex-1 grid gap-6 md:gap-8">${cartridgeTables}</div></div></div>`

  return content
}

function notFoundPage() {
  return `<div class="flex flex-col h-full w-full items-center text-center justify-center"><h1 class="text-3xl font-bold tracking-tight sm:text-5xl">404 - Game Not Found</h1></div>`
}

export function renderRoute(pathname) {
  const route = pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname

  if (route === "/") {
    return { content: layout(homePage()), title: null, status: 200 }
  }

  const mapperMatch = route.match(/^\/mapper\/([^/]+)$/)
  if (mapperMatch) {
    return { content: layout(mapperPage(mapperMatch[1])), title: `Mapper ${mapperMatch[1]}`, status: 200 }
  }

  const gameMatch = route.match(/^\/game\/([^/]+)$/)
  if (gameMatch) {
    let slug = gameMatch[1]
    try {
      slug = decodeURIComponent(slug)
    } catch {
      // Keep the raw slug when the URL is malformed.
    }

    const game = getGameBySlug(slug)
    if (game) {
      return { content: layout(gamePage(game, slug)), title: game.name, status: 200 }
    }
  }

  return { content: layout(notFoundPage()), title: null, status: 404 }
}

const appPattern = /<div id="app"[^>]*><\/div>/
const titlePattern = /<title>[\s\S]*?<\/title>/

export function injectPage(template, content, title) {
  const pageTitle = escapeHtml(title ? `${title} - ${siteName}` : siteName)

  return template
    .replace(titlePattern, () => `<title>${pageTitle}</title>`)
    .replace(appPattern, () => `<div id="app" class="flex min-h-0 flex-1 flex-col">${content}</div>`)
}

export { gameSlug }
