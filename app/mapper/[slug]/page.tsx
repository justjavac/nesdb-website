import Link from "next/link"
import nesdb from "nes-db"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table"
import { ChevronRightIcon } from "@radix-ui/react-icons"

export function generateStaticParams() {
  return [...Array(256).keys()].map((_, i) => ({ slug: i.toString() }))
}

export function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  return { title: `Mapper ${slug}` }
}

export default function Mapper({ params: { slug } }: { params: { slug: string } }) {
  const games = nesdb.games.filter((game) => game.cartridge[0].board.mapper === Number(slug))

  return (
    <div className="my-3 md:my-4">
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
        <Link href="/">Home</Link>
        <ChevronRightIcon className="h-4 w-4" />
        <Link href={`/mapper/${slug}`}>mapper {slug}</Link>
      </div>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game, i) => (
            <TableRow key={i}>
              <TableCell>{game.cartridge[0].crc}</TableCell>
              <TableCell>
                <Link
                  href={`/game/${game.cartridge[0].crc}-${game.region}`}
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
    </div>
  )
}
