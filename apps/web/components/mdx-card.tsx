import Link from "next/link"

import { cn } from "@shared/ui"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string
  disabled?: boolean
}

export const MdxCard = ({
  href,
  className,
  children,
  disabled,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        "group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
          {children}
        </div>
      </div>

      {href && (
        <Link
          href={disabled ? "#" : href}
          className="absolute inset-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
        >
          <span className="sr-only">view</span>
        </Link>
      )}
    </div>
  )
}
