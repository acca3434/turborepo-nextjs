import Link from "next/link"

import { type MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { useLockBody } from "@/hooks/use-lock-body"
import { cn } from "@shared/ui"
import { Icons } from "@/components/icons"

interface MobileNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  close: () => false | void
}

export function MobileNav({ items, children, close }: MobileNavProps) {
  useLockBody()

  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh)] grid-flow-row auto-rows-max overflow-auto border-t border-t-slate-200 pb-20 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2" onClick={close}>
          <Icons.logo />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>

        <nav>
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              onClick={close}
              className={cn(
                "flex w-full items-center p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  )
}
