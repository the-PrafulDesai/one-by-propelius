import type { SVGProps } from "react";
import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/ui/Container";

// The installed lucide-react version ships no brand/social glyphs, so these
// are hand-drawn minimal outlines for the footer's social row.
function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.24 2h2.76l-6.53 7.46L22 22h-6.83l-4.78-6.24L4.9 22H2.14l6.94-7.94L2 2h6.91l4.32 5.71L18.24 2Zm-1.2 18h1.53L7.02 3.89H5.39L17.04 20Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5A2.48 2.48 0 1 1 0 3.5a2.48 2.48 0 0 1 4.98 0ZM.24 8h4.48v15.5H.24V8ZM8.5 8h4.29v2.12h.06c.6-1.13 2.06-2.32 4.25-2.32 4.55 0 5.39 3 5.39 6.9v8.8h-4.48v-7.8c0-1.86-.03-4.25-2.59-4.25-2.6 0-3 2.03-3 4.12v7.93H8.5V8Z" />
    </svg>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.75 15.5v-7l6.5 3.5-6.5 3.5Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "X (Twitter)", href: "#", icon: XIcon },
  { label: "LinkedIn", href: "#", icon: LinkedInIcon },
  { label: "GitHub", href: "#", icon: GitHubIcon },
  { label: "YouTube", href: "#", icon: YouTubeIcon },
];

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Product Modules", href: "#product" },
      { label: "Workflow", href: "#workflow" },
      { label: "Features", href: "#features" },
      { label: "Book a Demo", href: "#contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Community", href: "#" },
      { label: "Tutorials", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security", href: "#" },
      { label: "Cookies Policy", href: "#" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#fafafe]">
      <Container className="relative max-w-[1320px] pt-16 sm:pt-20 lg:pt-24">
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between lg:gap-16">
          <div className="max-w-[280px]">
            <Link
              href="/"
              aria-label="ONE by Propelius home"
              className="flex items-center gap-2"
            >
              <Image
                src="/images/logos/onelogo_withoutbg.png"
                alt=""
                width={30}
                height={30}
                className="size-7"
              />
              <span className="flex items-baseline gap-1.5">
                <span className="text-[21px] font-semibold tracking-[-0.04em] text-[#111118]">
                  ONE
                </span>
                <span className="text-[12px] font-medium text-[#7b7b89]">
                  by Propelius
                </span>
              </span>
            </Link>

            <p className="mt-4 text-[14px] leading-[1.65] text-[#6c6c78]">
              The connected ERP for modern software companies.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-xl border border-[#e4e4ee] text-[#6c6c78] transition-colors duration-200 hover:border-[#c9c3ff] hover:text-[#635bff]"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:gap-x-10">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#111118]">
                  {column.heading}
                </p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-[#6c6c78] transition-colors duration-200 hover:text-[#635bff]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Giant faint company-name watermark, clipped by the footer edges. */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative mt-10 h-[4.5rem] select-none overflow-hidden sm:h-[7.5rem] md:h-[9.5rem] lg:mt-14 lg:h-[11.5rem] xl:h-[14rem]"
        >
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(3rem,17vw,16rem)] font-bold leading-none tracking-tight text-[#111118]/[0.05] lg:left-0 lg:translate-x-0">
            Propelius
          </span>
        </div>

        <div className="relative flex flex-col items-center gap-2 border-t border-[#e8e8f0] py-6 sm:flex-row sm:justify-center">
          <p className="text-[13px] text-[#8b8b96]">
            © {year} ONE by Propelius. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
