import Link from "next/link"
import nesdb from "nes-db"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table"

export default function Home() {
  return (
    <div className="my-3 md:my-4">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>CRC32</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Catalog ID</TableHead>
            <TableHead>Publisher</TableHead>
            <TableHead>Board</TableHead>
            <TableHead>Mapper</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nesdb.games.map((game, i) => (
            <TableRow key={i}>
              <TableCell>{game.cartridge[0].crc}</TableCell>
              <TableCell>
                <Link href={`/game/${game.cartridge[0].crc}-${game.region}`} className="underline underline-offset-4 text-blue-400 hover:text-blue-600">
                  {game.name}
                </Link>
              </TableCell>
              <TableCell>{game.altname}</TableCell>
              <TableCell>{game.region}</TableCell>
              <TableCell>{game.catalog}</TableCell>
              <TableCell>{game.publisher}</TableCell>
              <TableCell>{game.cartridge[0].board.type}</TableCell>
              <TableCell>
                <Link
                  href={`/mapper/${game.cartridge[0].board.mapper}`}
                  className="underline underline-offset-4 text-blue-400 hover:text-blue-600"
                >
                  {game.cartridge[0].board.mapper}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
