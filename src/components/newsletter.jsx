"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function EnvelopeIllustration({ className }) {
  return (
    <svg
      viewBox="0 0 230 170"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* dashed flight path */}
      <path
        d="M30 150C14 112 36 84 82 88"
        stroke="#b9e0bb"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="2 12"
      />
      {/* leaves */}
      <path d="M18 92c12-2 18 4 20 15-12 2-18-4-20-15Z" fill="#f2a3b2" />
      <path d="M54 26c-9-7-9-17 0-23 9 6 9 16 0 23Z" fill="#8ed08f" />
      <path d="M206 66c10-1 16 5 18 15-10 2-17-4-18-15Z" fill="#8ed08f" />

      {/* letter peeking out of the envelope */}
      <rect
        x="70"
        y="18"
        width="100"
        height="78"
        rx="12"
        fill="#ffffff"
        stroke="#e3ece3"
        strokeWidth="2"
      />
      <rect x="84" y="36" width="72" height="7" rx="3.5" fill="#58b958" />
      <rect x="84" y="49" width="72" height="7" rx="3.5" fill="#58b958" />
      <rect x="84" y="62" width="44" height="7" rx="3.5" fill="#58b958" />

      {/* envelope */}
      <rect x="46" y="66" width="148" height="84" rx="14" fill="#47a94b" />
      <path d="M48 70 120 132 192 70c-1-1-3-2-6-2H54c-3 0-5 1-6 2Z" fill="#3e9441" />

      {/* paper plane */}
      <path d="M156 8 226 26l-42 20-8 24-16-24Z" fill="#57b25a" />
      <path d="M156 8 176 46l-12-16Z" fill="#82d586" />
    </svg>
  )
}

function SkylineIllustration({ className }) {
  return (
    <svg
      viewBox="0 0 300 150"
      preserveAspectRatio="xMaxYMax meet"
      aria-hidden="true"
      className={className}
    >
      <g fill="#a5d4b3" opacity="0.75">
        <rect x="20" y="62" width="24" height="88" />
        <rect x="52" y="40" width="28" height="110" />
        <rect x="62" y="26" width="4" height="16" />
        <rect x="92" y="72" width="20" height="78" />
        <rect x="120" y="32" width="30" height="118" />
        <rect x="158" y="60" width="24" height="90" />
        <rect x="190" y="22" width="34" height="128" />
        <rect x="204" y="10" width="5" height="14" />
        <rect x="232" y="52" width="26" height="98" />
        <rect x="266" y="74" width="22" height="76" />
      </g>
      <g fill="#63c170">
        <circle cx="36" cy="112" r="14" />
        <rect x="33" y="122" width="6" height="28" rx="3" />
        <circle cx="66" cy="120" r="10" />
        <rect x="64" y="126" width="4" height="24" rx="2" />
        <circle cx="238" cy="108" r="18" />
        <rect x="234" y="122" width="8" height="28" rx="4" />
      </g>
    </svg>
  )
}

export function Newsletter() {
  function handleSubmit(event) {
    event.preventDefault()
    event.currentTarget.reset()
  }

  return (
    <section className="bg-white pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="relative overflow-hidden rounded-2xl bg-[#eef9ec] px-6 py-8 sm:px-10 sm:py-9">
          <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[230px_minmax(0,1fr)_300px] lg:gap-10">
            <EnvelopeIllustration className="mx-auto h-28 w-auto sm:h-32 lg:h-40" />

            <div className="text-center">
              <h2 className="text-[26px] font-extrabold tracking-tight text-foreground sm:text-3xl">
                Subscribe to Our Newsletter
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Get the latest events and community updates delivered to your
                inbox.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-6 flex w-full max-w-[465px] flex-col items-stretch gap-3 sm:flex-row"
              >
                <Input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="h-11 flex-1 rounded-lg border-[#dbe7d8] bg-white px-4 text-sm"
                />
                <Button
                  type="submit"
                  className="h-11 shrink-0 rounded-lg border-transparent bg-brand px-6 text-sm font-semibold text-white hover:bg-brand/90"
                >
                  Subscribe
                </Button>
              </form>
            </div>

            <SkylineIllustration className="hidden h-28 w-full lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
