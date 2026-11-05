import Link from "next/link";
import { CalendarDays, HandHeart, Home } from "lucide-react";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="relative z-20 w-full bg-white">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center gap-6 px-6 sm:h-[88px] sm:px-10 lg:px-16">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <HandHeart
            className="size-10 text-brand sm:size-11"
            strokeWidth={2.1}
            aria-hidden="true"
          />
          <span className="leading-none">
            <span className="block text-xl font-extrabold tracking-tight text-brand-dark sm:text-[26px]">
              SocialServe
            </span>
            <span className="mt-1 block text-[10px] font-medium tracking-tight text-brand-dark/70 sm:text-[11px]">
              Together for a Better Society
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden flex-1 items-center justify-center gap-10 lg:flex"
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark/90"
          >
            <Home className="size-4" strokeWidth={2.4} aria-hidden="true" />
            Home
          </Link>
          <Link
            href="/events"
            className="flex items-center gap-2 rounded-lg bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark/90"
          >
            <Home className="size-4" strokeWidth={2.4} aria-hidden="true" />
            Events
          </Link>
          <Link
            href="/add-event"
            className="flex items-center gap-2 rounded-lg bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark/90"
          >
            <Home className="size-4" strokeWidth={2.4} aria-hidden="true" />
            Add Event
          </Link>
          <Link
            href="/uc-events"
            className="flex items-center gap-2.5 text-sm font-semibold text-foreground transition-colors hover:text-brand"
          >
            <CalendarDays
              className="size-5"
              strokeWidth={2.2}
              aria-hidden="true"
            />
            Upcoming Events
          </Link>
        </nav>

        <Link
          href="/login"
          className={cn(
            buttonVariants({ size: "lg" }),
            "ml-auto h-11 shrink-0 rounded-lg border-transparent bg-brand px-7 text-sm font-semibold text-white hover:bg-brand/90 lg:ml-0",
          )}
        >
          Login
        </Link>
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ size: "lg" }),
            "ml-auto h-11 shrink-0 rounded-lg border-transparent bg-brand px-7 text-sm font-semibold text-white hover:bg-brand/90 lg:ml-0",
          )}
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
}
