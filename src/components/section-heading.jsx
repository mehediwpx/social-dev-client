import { cn } from "cn"

export function SectionHeading({ children, className }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-4 sm:gap-5", className)}
    >
      <span className="h-[3px] w-12 rounded-full bg-brand-dark/70 sm:w-16" />
      <h2 className="text-center text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
        {children}
      </h2>
      <span className="h-[3px] w-12 rounded-full bg-brand-dark/70 sm:w-16" />
    </div>
  )
}
