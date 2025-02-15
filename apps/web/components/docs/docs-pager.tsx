import Link from "next/link"
import { type Doc } from "contentlayer/generated"

import { docsConfig } from "@/config/docs"
import { buttonVariants, cn } from "@shared/ui"
import { Icons } from "@/components/icons"

interface DocsPagerProps {
  doc: Doc
}

const getPagerForDoc = (doc: Doc) => {
  const flattenLinks = [null, ...flatten(docsConfig.sidebarNav), null]
  const activeIndex = flattenLinks.findIndex((link) => doc.url === link?.href)

  const prev = activeIndex !== 0 ? flattenLinks[activeIndex - 1] : null

  const next =
    activeIndex !== flattenLinks.length - 1
      ? flattenLinks[activeIndex + 1]
      : null

  return { prev, next }
}

const flatten = (links: { items?: any }[]): any => {
  return links.reduce((flat, link) => {
    return flat.concat(link.items ? flatten(link.items) : link)
  }, [])
}

export const DocsPager = ({ doc }: DocsPagerProps) => {
  const pager = getPagerForDoc(doc)

  if (!pager) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev && (
        <Link
          href={pager.prev.href}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
        >
          {pager.next.title}
          <Icons.chevronRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
