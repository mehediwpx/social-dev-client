import { CalendarDays, Heart, UserPlus, Users } from "lucide-react"
import { cn } from "cn"

import { SectionHeading } from "@/components/section-heading"

const features = [
  {
    icon: CalendarDays,
    title: "Find Local Events",
    description: "Discover upcoming social service events near you.",
    iconClassName: "bg-[#ddf5d7] text-[#4caf50]",
  },
  {
    icon: UserPlus,
    title: "Join & Volunteer",
    description: "Be a part of meaningful community activities.",
    iconClassName: "bg-[#d8ecfd] text-[#3b82f6]",
  },
  {
    icon: Heart,
    title: "Track Your Impact",
    description: "See your participation and contribution.",
    iconClassName: "bg-[#fde0e4] text-[#ef4444]",
  },
  {
    icon: Users,
    title: "Build a Better Society",
    description: "Together we can create a positive change.",
    iconClassName: "bg-[#e9defb] text-[#8b5cf6]",
  },
]

export function KeyFeatures() {
  return (
    <section className="bg-brand-cream pb-20 pt-4 sm:pb-24 sm:pt-6">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <SectionHeading>
          Our <span className="text-brand">Key Features</span>
        </SectionHeading>

        <ul className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-y-14 lg:mt-14 lg:grid-cols-4 lg:gap-0">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <li
                key={feature.title}
                className={cn(
                  "flex flex-col items-center px-4 text-center sm:px-8",
                  index > 0 && "lg:border-l lg:border-[#dcebd7]"
                )}
              >
                <span
                  className={cn(
                    "flex size-20 items-center justify-center rounded-full",
                    feature.iconClassName
                  )}
                >
                  <Icon className="size-9" strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 max-w-[230px] text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
