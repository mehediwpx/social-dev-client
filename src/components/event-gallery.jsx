import Image from "next/image"

import { SectionHeading } from "@/components/section-heading"

const galleryItems = [
  {
    src: "/gallery-1.jpg",
    alt: "Volunteers planting a tree sapling together",
  },
  {
    src: "/gallery-2.jpg",
    alt: "Volunteers taking a group selfie after an event",
  },
  {
    src: "/gallery-3.jpg",
    alt: "Volunteer team preparing aid boxes for distribution",
  },
  {
    src: "/gallery-4.jpg",
    alt: "Volunteer helping a senior citizen at an outreach event",
  },
]

export function EventGallery() {
  return (
    <section className="bg-white pb-12 pt-16 sm:pb-16 sm:pt-20">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <SectionHeading>
          Our Event <span className="text-brand">Gallery</span>
        </SectionHeading>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-11 lg:grid-cols-4">
          {galleryItems.map((item) => (
            <li
              key={item.src}
              className="overflow-hidden rounded-lg shadow-[0_10px_30px_rgba(13,74,39,0.08)]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={680}
                height={420}
                className="h-[205px] w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
