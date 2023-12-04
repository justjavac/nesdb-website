"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { cn } from "@/utils"
import { buttonVariants } from "@/ui/button"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <div
      className={cn(
        buttonVariants({
          variant: "ghost",
        }),
        "w-9 px-0 cursor-pointer",
      )}
    >
      <SunIcon
        className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        onClick={() => setTheme("dark")}
      />
      <MoonIcon
        className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        onClick={() => setTheme("light")}
      />
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}
