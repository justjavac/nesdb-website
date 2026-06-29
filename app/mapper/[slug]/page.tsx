import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { getGameSlug, getGamesByMapper } from "@/utils/nesdb"

export function generateStaticParams() {
  return [...Array(256).keys()].map((_, i) => ({ slug: i.toString() }))
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  return { title: `Mapper ${slug}` }
}

export default async function Mapper({ params }: PageProps) {
  const { slug } = await params
  const games = getGamesByMapper(Number(slug))

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
                  href={`/game/${getGameSlug(game)}`}
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
