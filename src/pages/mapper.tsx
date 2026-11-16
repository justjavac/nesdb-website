import { ChevronRightIcon } from "@radix-ui/react-icons"
import { Link, useParams } from "react-router-dom"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableScroll } from "@/ui/table"
import { getGameSlug, getGamesByMapper } from "@/utils/nesdb"

export default function Mapper() {
  const { slug = "" } = useParams()
  const games = getGamesByMapper(Number(slug))

  return (
    <div className="my-3 md:my-4">
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
        <Link to="/">Home</Link>
        <ChevronRightIcon className="h-4 w-4" />
        <Link to={`/mapper/${slug}`}>mapper {slug}</Link>
      </div>
      <TableScroll>
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>CRC32</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Alt Title</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Catalog ID</TableHead>
              <TableHead>Publisher</TableHead>
              <TableHead>Board</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games.map((game, i) => (
              <TableRow key={i}>
                <TableCell>{game.cartridge[0].crc}</TableCell>
                <TableCell>
                  <Link
                    to={`/game/${getGameSlug(game)}`}
                    className="underline underline-offset-4 text-blue-400 hover:text-blue-600"
                  >
                    {game.name}
                  </Link>
                </TableCell>
                <TableCell>{game.altname}</TableCell>
                <TableCell>{game.region}</TableCell>
                <TableCell>{game.catalog}</TableCell>
                <TableCell>{game.publisher}</TableCell>
                <TableCell>{game.cartridge[0].board.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableScroll>
    </div>
  )
}
