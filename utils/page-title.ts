import { getGameBySlug } from "./nesdb"

export const SITE_NAME = "NES Game Database"

export function getPageTitle(pathname: string) {
  const mapper = pathname.match(/^\/mapper\/([^/]+)\/?$/)
  if (mapper) {
    return `Mapper ${mapper[1]}`
  }

  const game = pathname.match(/^\/game\/([^/]+)\/?$/)
  if (game) {
    return getGameBySlug(decodeURIComponent(game[1]))?.name ?? null
  }

  return null
}

export function formatTitle(title: string | null) {
  return title ? `${title} - ${SITE_NAME}` : SITE_NAME
}
