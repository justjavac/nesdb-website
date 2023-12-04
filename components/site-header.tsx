import Link from "next/link"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/ui/button"
import { cn } from "@/utils"

export function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="md:mr-4 md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 font-bold text-lg">
            <Icons.logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">NES Game Database</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">{/* <SearchBox /> */}</div>
          <nav className="flex items-center">
            <Link href="https://github.com/justjavac/nes-db" target="_blank" rel="noreferrer">
              <div className={cn(buttonVariants({ variant: "ghost" }), "w-9 px-0")}>
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
