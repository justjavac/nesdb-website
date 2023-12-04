import Link from "next/link"
import nesdb from "nes-db"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return nesdb.games.map((game) => ({ slug: `${game.cartridge[0].crc}-${game.region}` }))
}

export function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const [crc, region] = slug.split("-")
  const game = nesdb.games.find((game) => game.cartridge[0].crc === crc && game.region === region)
  if (!game) return {}
  return { title: game.name }
}

export default function Game({ params: { slug } }: { params: { slug: string } }) {
  const [crc, region] = slug.split("-")
  const game = nesdb.games.find((game) => game.cartridge[0].crc === crc && game.region === region)

  if (!game) notFound()

  return (
    <div className="my-3 md:my-4">
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
        <Link href="/">Home</Link>
        <ChevronRightIcon className="h-4 w-4" />
        <Link href={`/mapper/${game.cartridge[0].board.mapper}`}>mapper {game.cartridge[0].board.mapper}</Link>
        <ChevronRightIcon className="h-4 w-4" />
        <Link href={`/game/${crc}-{region}`}>{game.name}</Link>
      </div>
      <h1 className="scroll-mt-24 text-4xl font-bold tracking-tight">
        {game.name}
        <small className="ml-2 text-xl text-gray-400">{game.altname}</small>
      </h1>
      <div className="md:flex md:gap-4 md:grid-cols-2 my-6 md:my-8 flex-row-reverse">
        <Table className="w-fit h-fit border">
          <TableBody>
            <TableRow>
              <TableCell className="w-[150px]">Region</TableCell>
              <TableCell>{game.region}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Class</TableCell>
              <TableCell>{game.class}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Catalog</TableCell>
              <TableCell>{game.catalog}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Publisher</TableCell>
              <TableCell>{game.publisher}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Developer</TableCell>
              <TableCell>{game.developer}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Players</TableCell>
              <TableCell>{game.players}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Release Date</TableCell>
              <TableCell>{game.date}</TableCell>
            </TableRow>
            {game.peripherals?.device &&
              game.peripherals.device.map((device, i) => (
                <TableRow key={i}>
                  <TableCell>Peripheral</TableCell>
                  <TableCell>{device.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <div className="flex-1 grid gap-6 md:gap-8">
          {game.cartridge.map((cartridge, i) => (
            <Table key={i} className="border">
              <TableBody>
                {cartridge.revision && (
                  <TableRow>
                    <TableCell className="w-[100px]">Revision</TableCell>
                    <TableCell>{cartridge.revision}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell className="w-[100px]">Type</TableCell>
                  <TableCell>{cartridge.board.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PCB</TableCell>
                  <TableCell>{cartridge.board.pcb}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mapper</TableCell>
                  <TableCell>
                    <Link
                      href={`/mapper/${cartridge.board.mapper}`}
                      className="underline underline-offset-4 text-blue-400 hover:text-blue-600"
                    >
                      {cartridge.board.mapper}
                    </Link>
                  </TableCell>
                </TableRow>
                {cartridge.board.chip &&
                  cartridge.board.chip.map((chip, i) => (
                    <TableRow key={i}>
                      <TableCell>Chip Type</TableCell>
                      <TableCell>{chip.type}</TableCell>
                    </TableRow>
                  ))}
                {cartridge.board.wram && (
                  <TableRow>
                    <TableCell>WRAM Size</TableCell>
                    <TableCell>{cartridge.board.wram.size}</TableCell>
                  </TableRow>
                )}
                {cartridge.board.vram && (
                  <TableRow>
                    <TableCell>VRAM Size</TableCell>
                    <TableCell>{cartridge.board.vram.size}</TableCell>
                  </TableRow>
                )}
                {cartridge.board.cic && (
                  <TableRow>
                    <TableCell>CIC Type</TableCell>
                    <TableCell>{cartridge.board.cic.type}</TableCell>
                  </TableRow>
                )}
                {cartridge.board.pad == null && (
                  <TableRow>
                    <TableCell>Mirroring</TableCell>
                    <TableCell>Dynamic</TableCell>
                  </TableRow>
                )}
                {cartridge.board.pad?.h === 1 && (
                  <TableRow>
                    <TableCell>Mirroring</TableCell>
                    <TableCell>Horizontal</TableCell>
                  </TableRow>
                )}
                {cartridge.board.pad?.v === 1 && (
                  <TableRow>
                    <TableCell>Mirroring</TableCell>
                    <TableCell>Vertical</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={2}>
                    <Table className="ml-4 mt-2">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Type</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>CRC32</TableHead>
                          <TableHead>SHA1</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartridge.board.chr && (
                          <TableRow>
                            <TableCell>PRG+CHR</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>{cartridge.crc}</TableCell>
                            <TableCell>{cartridge.sha1}</TableCell>
                          </TableRow>
                        )}
                        {cartridge.board.prg.map((prg, i) => (
                          <TableRow key={i}>
                            <TableCell>PRG</TableCell>
                            <TableCell>{prg.name}</TableCell>
                            <TableCell>{prg.size}</TableCell>
                            <TableCell>{prg.crc}</TableCell>
                            <TableCell>{prg.sha1}</TableCell>
                          </TableRow>
                        ))}
                        {cartridge.board.chr &&
                          cartridge.board.chr.map((chr, i) => (
                            <TableRow key={i}>
                              <TableCell>CHR</TableCell>
                              <TableCell>{chr.name}</TableCell>
                              <TableCell>{chr.size}</TableCell>
                              <TableCell>{chr.crc}</TableCell>
                              <TableCell>{chr.sha1}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
        </div>
      </div>
    </div>
  )
}
