import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarDays, Plus } from "lucide-react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"

function BannerWave() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="block h-[64px] w-full sm:h-[92px] lg:h-[112px]"
      >
        <path
          d="M0 56C220 118 470 116 720 84C970 52 1200 38 1440 62V120H0Z"
          className="fill-brand-cream"
        />
        <path
          d="M0 56C220 118 470 116 720 84C970 52 1200 38 1440 62"
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          className="stroke-brand-light"
        />
      </svg>
    </div>
  )
}

function HeadingSlashes() {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      aria-hidden="true"
      className="absolute -top-7 right-2 hidden h-12 w-12 text-brand-light sm:block"
    >
      <path d="M12 34 23 16" />
      <path d="M26 36 37 12" />
      <path d="M40 38 51 18" />
    </svg>
  )
}

export function Banner() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-deep text-white">
      <Image
        src="/banner-community.jpg"
        alt="Volunteers handing out supplies at a community event"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-linear-to-r from-brand-deep via-brand-deep/85 to-brand-deep/15" />
      <div className="absolute inset-0 bg-linear-to-t from-brand-deep/70 via-transparent to-brand-deep/10" />

      <div className="relative z-[5] mx-auto flex min-h-[500px] max-w-[1440px] items-center px-6 pb-28 pt-12 sm:px-10 sm:pb-28 lg:px-16">
        <div className="max-w-[640px]">
          <div className="relative">
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
              <span className="block">Let&apos;s Build a</span>
              <span className="block">Kinder &amp; Stronger</span>
              <span className="block">
                Community <span className="text-brand-light">Together</span>
              </span>
            </h1>
            <HeadingSlashes />
          </div>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/90 sm:mt-7 sm:text-lg">
            Join social service events, help people in need, and make a positive
            impact in your local area.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-9">
            <Link
              href="/events"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 rounded-full border-transparent bg-brand px-6 text-sm font-semibold text-white hover:bg-brand/90"
              )}
            >
              <CalendarDays className="size-5" strokeWidth={2.2} aria-hidden="true" />
              Explore Events
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/events/create"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 rounded-full border-white/70 bg-transparent px-6 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
              )}
            >
              <span className="flex size-6 items-center justify-center rounded-full border border-white/80">
                <Plus className="size-3.5" strokeWidth={2.4} aria-hidden="true" />
              </span>
              Create Event
            </Link>
          </div>
        </div>
      </div>

      <BannerWave />
    </section>
  )
}
