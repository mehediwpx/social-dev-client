import Link from "next/link"
import { HandHeart, Mail, MapPin, Phone } from "lucide-react"
import { cn } from "cn"

function FacebookGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.4 21v-7.6h2.55l.38-2.97H13.4V8.53c0-.86.24-1.44 1.47-1.44h1.57V4.43a21 21 0 0 0-2.29-.12c-2.27 0-3.82 1.39-3.82 3.94v2.18H7.75v2.97h2.58V21h3.07Z" />
    </svg>
  )
}

function YouTubeGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2-5.2 3.2Z"
      />
    </svg>
  )
}

function XGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.23l-4.88-6.37L5.4 21H2.32l7.17-8.19L2 3h6.39l4.41 5.83L17.75 3Zm-1.07 16.2h1.7L7.37 4.7H5.55l11.13 14.5Z" />
    </svg>
  )
}

function LinkedInGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5ZM3 9h4v12H3V9Zm6 0h3.83v1.64h.05c.53-1 1.85-2.06 3.8-2.06C20.6 8.58 21 11 21 14.09V21h-4v-6.15c0-1.47-.03-3.36-2.05-3.36-2.05 0-2.37 1.6-2.37 3.25V21H9V9Z" />
    </svg>
  )
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/events/create", label: "Create Event" },
  { href: "/about", label: "About Us" },
]

const helpfulLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/contact", label: "Contact Us" },
  { href: "/faqs", label: "FAQs" },
]

const contactItems = [
  {
    icon: Mail,
    content: (
      <a
        href="mailto:info@socialserve.org"
        className="underline underline-offset-2 transition-colors hover:text-brand-light"
      >
        info@socialserve.org
      </a>
    ),
  },
  {
    icon: Phone,
    content: <span>+880 1700 000000</span>,
  },
  {
    icon: MapPin,
    content: <span>Dhaka, Bangladesh</span>,
  },
]

const socialIcons = [
  { glyph: FacebookGlyph, label: "Facebook", href: "https://facebook.com" },
  { glyph: YouTubeGlyph, label: "YouTube", href: "https://youtube.com" },
  { glyph: XGlyph, label: "X (Twitter)", href: "https://x.com" },
  { glyph: LinkedInGlyph, label: "LinkedIn", href: "https://linkedin.com" },
]

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      {children}
    </div>
  )
}

export function FooterTop() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.1fr] lg:gap-14">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3">
            <HandHeart
              className="size-12 text-brand-light"
              strokeWidth={2.1}
              aria-hidden="true"
            />
            <span className="leading-none">
              <span className="block text-[30px] font-extrabold tracking-tight text-white">
                SocialServe
              </span>
              <span className="mt-1 block text-xs font-medium text-white/75">
                Together for a Better Society
              </span>
            </span>
          </Link>

          <p className="mt-5 max-w-[300px] text-[15px] leading-relaxed text-white/85">
            Join hands for a kinder, stronger and more developed community.
          </p>

          <ul className="mt-6 flex items-center gap-3">
            {socialIcons.map((social) => {
              const Glyph = social.glyph

              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-full bg-white text-brand-dark transition-colors hover:bg-brand-light"
                  >
                    <Glyph className="size-4" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <FooterColumn title="Quick Links">
          <ul className="mt-5 space-y-4">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[15px] text-white/90 transition-colors hover:text-brand-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Helpful Links">
          <ul className="mt-5 space-y-4">
            {helpfulLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[15px] text-white/90 transition-colors hover:text-brand-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Contact Us">
          <ul className="mt-5 space-y-4">
            {contactItems.map((contact, index) => {
              const Icon = contact.icon

              return (
                <li
                  key={index}
                  className={cn("flex items-center gap-4 text-[15px] text-white/90")}
                >
                  <Icon
                    className="size-[18px] shrink-0 text-white/90"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  {contact.content}
                </li>
              )
            })}
          </ul>
        </FooterColumn>
      </div>
    </div>
  )
}
