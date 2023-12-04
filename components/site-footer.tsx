export function SiteFooter() {
  return (
    <footer className="py-4 md:px-8 border-t">
      <div className="container flex flex-col items-center justify-between text-muted-foreground gap-4 md:flex-row">
        <p className="w-full text-center text-sm leading-loose">
          Copyright © 2023 保留所有权利。本网站由{" "}
          <a
            href="https://github.com/justjavac"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            @justjavac
          </a>{" "}
          创建。
        </p>
      </div>
    </footer>
  )
}
