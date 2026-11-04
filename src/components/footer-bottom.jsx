import { Heart } from "lucide-react"

export function FooterBottom() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-6 text-center sm:px-10 lg:px-16">
      <p className="text-sm text-white/85 sm:text-[15px]">
        © 2026 <span className="font-semibold text-white">SocialServe</span>. All
        rights reserved. | Together for a Better Society{" "}
        <Heart
          className="inline size-4 -translate-y-px fill-[#ef4444] stroke-[#ef4444]"
          strokeWidth={1.5}
          aria-label="love"
        />
      </p>
    </div>
  )
}
