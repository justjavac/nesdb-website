import nesdb from "nes-db"

export function getGameSlug(game: (typeof nesdb.games)[number]) {
  return `${game.cartridge[0].crc}-${game.region}`
}

export function parseGameSlug(slug: string) {
  const [crc, ...regionParts] = slug.split("-")
  return { crc, region: regionParts.join("-") }
}

export function getGameBySlug(slug: string) {
  const { crc, region } = parseGameSlug(slug)
  return nesdb.games.find((game) => game.cartridge[0].crc === crc && game.region === region)
}

export function getGamesByMapper(mapper: number) {
  return nesdb.games.filter((game) => game.cartridge[0].board.mapper === mapper)
}
